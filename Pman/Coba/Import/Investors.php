<?php

require_once 'Pman.php';

//require_once 'assets/components/accounts/phpexcel/Classes/PHPExcel/IOFactory.php';


class Pman_Coba_Import_Investors extends Pman 
{

    /**
     *  get .. same as roo... 
     * 
     */
    var $column_map = array(
        'NAME' => 'name',
        'LAST NAME' => 'last_name',
        'FIRST NAME' => 'first_name',
        'MIDDLE NAME' => 'middle_name',
        'SPOUSE NAME' => 'spouse_name',
        'ADVISOR' => 'advisor',
        'CONTRACT SIGNED DATE' => 'contract_sign_date',
        'CLIENT SUPPORT' => 'client_support',
        'E-MAIL' => 'email',
        'ADDRESS 1' => 'address_1',
        'ADDRESS 2' => 'address_2',
        'CITY' => 'city',
        'STATE/PROVINCE' => 'province',
        'ZIP/POSTAL CODE' => 'zip',
        'COUNTRY/REGION' => 'country',
        'CLIENT TYPE' => 'client_type'
    );
    var $import_duplicate = false;
    var $row_array = array();

    function getAuth() 
    {
        if (HTML_FlexyFramework::get()->cli) {
            return true;
        }
        
        return parent::getAuth();
    }

    function get() 
    {
        $this->jerr('Invalid URL');
    }

    function post() 
    {
        if (isset($_POST['import_duplicate']) && $_POST['import_duplicate']) {
            $this->import_duplicate = true;
        }

        $img = DB_DataObject::Factory('images');
        $img->setFrom(array(
            'onid' => 0,
            'ontable' => 'investor'
        ));

        $img->onUpload(false);

        require_once 'File/Convert.php';
        $fc = new File_Convert($img->getStoreName(), $img->mimetype);

        $csv = $fc->convert('text/csv');

        if (!$csv) {
            $this->jerr("Error", "File Convert Error");
        }

        $this->validateCsv($csv);
        
        $this->importCsv($csv);
    }

    function validateCsv($csv) 
    {

        ini_set("auto_detect_line_endings", true);

        $fh = fopen($csv, 'r');
        
        if (!$fh) {
            $this->jerr("Error", "invalid file");
        }
        
        $bom = "\xEF\xBB\xBF";
        for ($i = 0; $i < 3; $i++) {
            if ($bom[$i] != fgetc($fh)) {
                fseek($fh, 0);
                break;
            }
        }

        // we need to break this into cols..
        $cols = false;

        $count = 1;
        $error_msg = '';
        while (false !== ($n = fgetcsv($fh, 10000, ',', '"'))) {

            if (!$cols) {

                $cols = array();
                foreach ($n as $k) {
                    $cols[] = strtoupper(trim($k));
                }

                continue;
            }
            $row = array();
            $row['row_no'] = $count + 1;
            //print_r($cols);
            foreach ($cols as $i => $k) {
                //$row[$k] = $n[$i];
                $row[$this->column_map[$k]] = trim($n[$i]);
            }
            //print_r($row);
            $this->validateRow($row);

            if (!$this->import_duplicate) {
                if (in_array($row['email'], $this->row_array)) {
                    $error_msg .= 'Row ' . $row['row_no'] . ' : ' . $row['email'] . '<br>';
                } else {
                    $this->row_array[] = $row['email'];
                }
            }

            $count++;
        }

        fclose($fh);
        if (strlen($error_msg) > 0) {
            $this->jerr('duplicate', 'Duplicated email in file<br>' . $error_msg);
        }
    }

    function advisor($name) 
    {
        static $cache = array();
        if (isset($cache[$name])) {
            return $cache[$name]->id;
        }
        $p = PDO_DataObject::factory('core_person')->
            set([ 'name' => $name, 'active' => 1]);
        if ($p->count() > 1) {
            $this->jerr("Error", "more than one entry for '$name'");
        }
        try {
            $p = PDO_DataObject::factory('core_person')->load('name', $name);
            $cache[$name] = $p;
            return $p->id;
        } catch (PDO_DataObject_Exception_NoData $e) {
            return 0;
        }
    }

    function importCsv($csv) 
    {
        ini_set("auto_detect_line_endings", true);

        $fh = fopen($csv, 'r');
        if (!$fh) {
            $this->jerr("Error", "invalid file");
        }
        $bom = "\xEF\xBB\xBF";
        for ($i = 0; $i < 3; $i++) {
            if ($bom[$i] != fgetc($fh)) {
                fseek($fh, 0);
                break;
            }
        }

        // we need to break this into cols..
        $cols = false;
        $count = 1;
        $error_msg = '';
        while (false !== ($n = fgetcsv($fh, 10000, ',', '"'))) {

            if (!$cols) {

                $cols = array();
                foreach ($n as $k) {
                    $cols[] = strtoupper(trim($k));
                }

                continue;
            }
            $row = array();
            $row['row_no'] = $count + 1;

            foreach ($cols as $i => $k) {
                //$row[$k] = $n[$i];
                $row[$this->column_map[$k]] = trim($n[$i]);
            }

            $error_msg .= $this->importRow($row);
            $count++;
        }

        fclose($fh);

        if (strlen($error_msg) > 0) {
            $this->jerr('duplicate record', 'Records already exist in System<br>' . $error_msg);
        }
        $this->jok("DONE");
    }

    function validateRow($row) 
    {
        $error_msg = '';

        //if(trim($row['name']) =='') {	    
        //    $error_msg.= ' Missing Name, ';
        //}
        if ($row['first_name'] == '') {
            $error_msg .= ' Missing First Name, ';
        }

        if ($row['last_name'] == '') {
            $error_msg .= ' Missing Last Name, ';
        }

        if ($row['email'] == '') {
            $error_msg .= ' Missing Email, ';
        }
        if ($row['client_type'] == '') {
            $error_msg .= ' Missing Type, ';
        }
        if (strtolower($row['client_type']) == 'joint' && $row['spouse_name'] == '') {
            $error_msg .= ' Missing Spouse, ';
        }
        if (strtolower($row['client_type']) == 'corporate' && $row['name'] == '') {
            $error_msg .= ' Missing Company Name, ';
        }
        if ($row['spouse_name'] != '') {
            $second_user_name_array = explode(" ", $row['spouse_name']);
            if (count($second_user_name_array) == 1) {
                $error_msg .= ' Incorrect Spouse Firstname or Lastname, ';
            }
        }

        if (!$this->advisor($row['advisor'])) {
            $error_msg .= ' Missing Advisor - not registered : ' . $row['advisor'];
        }

        if (strlen($error_msg) > 0) {
            $this->jerr("invalid data", 'Row ' . $row['row_no'] . ' : ' . $error_msg);
        }
    }

    function importRow($row) 
    {
        $ff = HTML_FlexyFramework::get();
        if (empty($ff->Coba['default_fund'])) {
            $this->jerr("Error", "No default fund");
        }

        $accmgt = DB_DataObject::Factory('modx_accountmgmts');
        $accmgt->isin_code = trim($ff->Coba['default_fund']);

        if ($accmgt->find(true)) {
            $isin_code = $accmgt->isin_code;
        }

        if (empty($isin_code)) {
            $this->jerr("Error", "Invalid fund name");
        }

        $u = DB_DataObject::Factory('modx_users');
        $u->username = trim($row['email']);

        if ($u->find(true)) {
            return 'Row ' . $row['row_no'] . ' : ' . $row['email'] . '<br>';
            //$this->jerr("Error","Users already exists : " . $row['email'] );
        }

        $u->setFrom(array(
            'username' => trim($row['email']),
            'investment_advisor' => trim($row['advisor'])
        ));


        $u->insert();

        // create modx_accounts
        $o = PDO_DataObject::factory('modx_accounts');

        $o->setFrom(array(
            'user_id' => $u->id,
            'isin_code' => $isin_code,
            'isin_original_code' => $isin_code,
            'name' => $ff->Coba['default_fund'],
            'user_account_type' => strtolower($row['client_type'])
        ));
        $o->insert();

        // create ext_data 
        $e = PDO_DataObject::factory('ext_data');

        $spouse_firstname = '';
        $spouse_lastname = '';
        $company_name = '';

        if (trim($row['spouse_name']) != '') {
            $second_user_name_array = explode(" ", $row['spouse_name']);
            if (count($second_user_name_array) > 1) {
                $spouse_firstname = trim($second_user_name_array[0]);
                $spouse_lastname = trim($second_user_name_array[1]);
            }
        }

        if (trim(strtolower($row['client_type'])) == 'corporate') {
            $company_name = $row['name'];
        }


        $e->setFrom(array(
            'userdata_id' => $u->id,
            'isin_code' => $isin_code,
            'fund_name' => $ff->Coba['default_fund'],
            'in_email' => $row['email'],
            'account_type' => strtolower($row['client_type']),
            'company_name' => $company_name,
            'firstname_second_ap' => $spouse_firstname,
            'lastname_second_ap' => $spouse_lastname,
            'in_firstname' => $row['first_name'],
            'in_lastname' => $row['last_name'],
            'in_middlename' => $row['middle_name'],
            'in_addressline1' => $row['address_1'],
            'in_addressline2' => $row['address_2'],
            'in_city' => $row['city'],
            'in_country' => $row['country'],
            'in_postalcode' => $row['zip'],
            'province' => $row['province'],
            'investment_advisor_id' => $this->advisor($row['advisor'])
        ));
        $e->insert();

        $fullname = array();

        foreach (array('in_firstname', 'in_middlename', 'in_lastname') as $k) {
            if (empty($e->{$k})) {
                continue;
            }
            $fullname[] = $e->{$k};
        }

        $fullname = implode(' ', $fullname);

        $modx_user_attributes = PDO_DataObject::factory('modx_user_attributes');
        $modx_user_attributes->setFrom(array(
            'internalKey' => $u->id,
            'fullname' => $fullname,
            'email' => $e->in_email
        ));

        $modx_user_attributes->insert();

        /*
         * Create Event Log
         */
        
        $name = ($e->account_type == 'corporate') ? $company_name : $fullname;
        
        $event = DB_DataObject::factory('Events');
        $event->setFrom(array(
            'event_when' => date('Y-m-d H:i:s'),
            'action' => 'REGISTER',
            'person_table' => 'modx_users',
            'modx_users_id' => $u->id,
            'remarks' => "{$name} has been imported"
        ));
        
        $event->insert();
        
        return;
    }

}
