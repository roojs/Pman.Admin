<?php

require_once 'Pman/Core/UpdateDatabase.php';

class Pman_Coba_UpdateDatabase extends Pman_Core_UpdateDatabase
{

    static $cli_desc = "Update SQL - Beta";

    static $cli_opts = array(

    );

    var $cli = false;

    var $opts;

    var $country_mapping = array();

    var $client_path = '';

    var $imageURI = '';

    function getAuth()
    {
        $ff = HTML_FlexyFramework::get();
        if (!empty($ff->cli)) {
            $this->cli = true;
            return true;
        }

        parent::getAuth(); // load company!
        $au = $this->getAuthUser();
        if (!$au || $au->company()->comptype != 'OWNER') {
            $this->jerr("Not authenticated", array('authFailure' => true));
        }
        $this->authUser = $au;
        return true;
    }

    function get($tbl,   $opts = Array())
    {
        $this->updateData();
    }

    function updateData()
    {
        $ff = HTML_FlexyFramework2::get();

        if(!isset($ff->Pman) || !isset($ff->Pman['local_base_url'])){
            die("Please setup local_base_url");
        }

        $this->local_base_url = $ff->Pman['local_base_url'];

        if(!empty($ff->Coba['client_dir'])){
            $this->client_path = __DIR__ . "/../../Coba/Clients/{$ff->Coba['client_dir']}";
        }
        // reqired / prefered binaries..
        $this->checkSystem(array('pdftk'), array());

        $this->imageURI = "http://localhost{$this->local_base_url}/Roo/Images";

        $this->updateImagesNoOfPage();
        
        $this->initFund();

        $this->initCountry();

        $this->initState();

        $this->initCoreCompany();

        $this->initEnums();
        
        $this->initGroups();

        $this->initDeclarations();

        $this->initUserDeclarations();

        $this->initAdviserStaff();

        $this->validateUserProfile();

        $this->i18nSetPrefer();
        
    }

    function initFund()
    {
        $ff = HTML_FlexyFramework2::get();

        if(empty($ff->Coba['default_fund'])){
            die('Please setup default fund');
        }

        $fund = $ff->Coba['default_fund'];

        $modx_accountmgmts = DB_DataObject::factory('modx_accountmgmts');

        if($modx_accountmgmts->get('isin_code', $fund)){
            return;
        }

        $modx_accountmgmts->setFrom(array(
            'isin_code' => $fund,
            'name' => $fund
        ));

        $modx_accountmgmts->insert();
    }

    function initCountry()
    {
        $modx_country = DB_DataObject::factory('modx_country');

        foreach ($modx_country->fetchAll() as $mc){

            $coba_country = DB_DataObject::factory('coba_country');
            $coba_country->setFrom(array(
                'abbrv' => $mc->country_abbrv
            ));

            if($coba_country->find(true)){
                $this->country_mapping[$mc->id] = $coba_country->id;
                continue;
            }

            $coba_country->setFrom(array(
                'name' => $mc->country
            ));

            $coba_country->insert();

            $this->country_mapping[$mc->id] = $coba_country->id;

        }

    }

    function initState()
    {
        $modx_state = DB_DataObject::factory('modx_state');

        foreach ($modx_state->fetchAll() as $ms){

            if(empty($this->country_mapping[$ms->country_id])){
                continue;
            }

            $coba_state = DB_DataObject::factory('coba_state');
            $coba_state->setFrom(array(
                'name' => $ms->state,
                'country_id' => $this->country_mapping[$ms->country_id]
            ));

            if($coba_state->find(true)){
                continue;
            }

            $coba_state->insert();

        }

    }

    function initCoreCompany()
    {
        if(empty($this->client_path)){
            return;
        }

        $file = "{$this->client_path}/configuration.json";

        if(!file_exists($file)){
            $this->jerr("Missing configuration file");
        }

        $cfg = json_decode(file_get_contents($file), true);

        /*
         * Make sure the necessary files have been set...
         */

        if(
                empty($cfg['code']) ||
                empty($cfg['name']) ||
                empty($cfg['country'])
        ) {
            $this->jerr("Invalid configuration file");
        }

        $owner = DB_DataObject::factory('core_enum');

        $owner->setFrom(array(
            'etype' => 'COMPTYPE',
            'name' => 'OWNER',
            'active' => 1
        ));

        if(!$owner->find(true)){
            $this->jerr("Missing COMPTYPE configuration");
        }

        $core_company = DB_DataObject::factory('core_company');

        if($core_company->get('code', $cfg['code'])){
            return;
        }

        $core_company->setFrom($cfg);

        $core_company->setFrom(array(
            'created_dt' => date('Y-m-d H:i:s'),
            'comptype_id' => $owner->id
        ));

        $core_company->insert();

    }

    var $declaration_types = array(
        'declaration',
        'forms',
        'checklist',
        'popup'
    );

    var $declaration_seq = array();

    function initDeclarations()
    {
        if(empty($this->client_path)){
            return;
        }

        $csv = $this->clientFilename('forms_docs_checklist.csv',$this);

//        $csv = '/home/edward/Downloads/forms_docs_checklist.csv';
//
//        if(!file_exists($csv)){
//            $this->jerr("Missing Declarations configuration file");
//        }

        ini_set("auto_detect_line_endings", true);

        $fh = fopen($csv, 'r');

        if (!$fh) {
            $this->jerr("invalid file");
        }

        $req = array('FUND','SECTION', 'DATABASE_COL', 'TITLE', 'INDIVIDUAL', 'JOINT', 'COMPANY', 'COMPANY LISTED');

        $cols = false;
        $rows = array();

        while(false !== ($n = fgetcsv($fh,10000, ',', '"'))) {

            if(!array_filter($n)){ // empty row
                continue;
            }

            if (!$cols) {

                $cols = array();

                foreach($n as $k) {
                    $cols[] = strtoupper(trim($k));
                }

                if (empty($cols)) {
                    continue;
                }

                foreach($req as $r) {

                    if (!in_array($r,$cols)) {
                        $cols = false;
                        break;
                    }
                }

                continue;
            }

            foreach($cols as $i => $k) {
                $row[$k] = trim($n[$i]);
            }

            $rows[] = $row;
        }

        if (empty($cols)) {
            $this->jerr("could not find a row with " . implode(' / ', $req));
        }

        fclose($fh);

        $coba_declarations = DB_DataObject::factory('coba_declarations');
        $coba_declarations->setFrom(array(
            'is_active' => 1
        ));

        $this->coba_declarations = array();

        foreach ($coba_declarations->fetchAll() as $c){
            $target = "{$c->dec_type}-{$c->nickname}-{$c->used_by}";

            if(array_key_exists($target, $this->coba_declarations)){
                continue;
            }

            $this->coba_declarations[$target] = clone ($c);
        }

        $coba_declarations = DB_DataObject::factory('coba_declarations');
        $coba_declarations->setFrom(array(
            'is_active' => 1
        ));

        $coba_declarations->selectAdd();
        $coba_declarations->selectAdd("
            coba_declarations.dec_type AS dec_type,
            MAX(coba_declarations.seq_order) AS max_seq
        ");

        $coba_declarations->groupBy('coba_declarations.dec_type');

        $this->declaration_seq = $coba_declarations->fetchAll('dec_type', 'max_seq');

        foreach ($rows as $r){

            if(
                    empty($r['SECTION']) ||
                    empty($r['TITLE']) ||
                    $r['SECTION'] == 'Passcode' // not handle this at present...
            ){
                continue;
            }

            $fund_id = 0;

            if(!empty($row['FUND']) && $row['FUND'] != '*'){

                $modx_accountmgmts = DB_DataObject::factory('modx_accountmgmts');

                if(!$modx_accountmgmts->get('isin_code', $row['FUND'])){
                    echo "Invalid Fund : {$r['FUND']} \n";
                    continue;
                }

                $fund_id = $modx_accountmgmts->id;
            }

            $dec_type = strtolower($r['SECTION']);

            if(empty($dec_type) || !in_array($dec_type, $this->declaration_types)){
                echo "Invalid Declaration Type : {$r['SECTION']} \n";
                continue;
            }

            $method = "process_{$dec_type}";

            if(!method_exists($this, $method)){
                echo "Invalid method : {$method} \n";
                continue;
            }

            $this->{$method}($fund_id, $dec_type, $r);

        }

        foreach ($this->coba_declarations as $c){
            $o = clone ($c);
            $c->is_active = 0;
            $c->update($o);
        }

    }

    var $field_mapping = array(
        'INDIVIDUAL' => 'I',
        'JOINT' => 'J',
        'COMPANY' => 'C',
        'COMPANY LISTED' => 'CL'
    );

    function process_declaration($fund_id, $dec_type, $row)
    {
        if(!isset($this->declaration_seq[$dec_type])){
            $this->declaration_seq[$dec_type] = 0;
        }

        $this->declaration_seq[$dec_type] = $this->declaration_seq[$dec_type] + 1;

        foreach ($this->field_mapping as $k => $v){

            $target = "{$dec_type}-{$row['DATABASE_COL']}-{$v}";

            if(array_key_exists($target, $this->coba_declarations)){
                unset($this->coba_declarations[$target]);
            }

            
            
            $file = self::clientFilename($row[$k], $this);

            echo "Declaration ({$k}) : {$file}\n";

            $coba_declarations = DB_DataObject::factory('coba_declarations');
            $coba_declarations->setFrom(array(
                'fund_id' => $fund_id,
                'dec_type' => $dec_type,
                'nickname' => empty($row['DATABASE_COL']) ? '' : $row['DATABASE_COL'],
                'is_active' => 1,
                'used_by' => $v
            ));

            $o = false;

            if($coba_declarations->find(true)){
                $o = clone ($coba_declarations);
            }

            if(empty($row[$k]) || !file_exists($file)){

                if(!empty($o)){
                    $coba_declarations->is_active = 0;
                    $coba_declarations->update($o);
                }

                echo "Ignore : File not found\n";

                continue;
            }

            $coba_declarations->setFrom(array(
                'title' => (empty($row['TITLE'])) ? '' : $row['TITLE'],
                'seq_order' => $this->declaration_seq[$dec_type]
            ));

            if(empty($o)){
                $coba_declarations->setFrom(array(
                    'created_dt' => date('Y-m-d')
                ));
            }

            (empty($o)) ? $coba_declarations->insert() : $coba_declarations->update($o);

            $images = DB_DataObject::factory('Images');
            $images->setFrom(array(
                'onid' => $coba_declarations->id,
                'ontable' => $coba_declarations->tableName()
            ));

            $images->find(true);

            if($this->verifyDeclarationFile($images, $file)){
                $this->uploadDeclarationFile($coba_declarations, $file);
            }

        }

    }

    function process_forms($fund_id, $dec_type, $row)
    {
        if(!isset($this->declaration_seq[$dec_type])){
            $this->declaration_seq[$dec_type] = 0;
        }

        $this->declaration_seq[$dec_type] = $this->declaration_seq[$dec_type] + 1;

        foreach ($this->field_mapping as $k => $v){

            $target = "{$dec_type}-{$row['DATABASE_COL']}-{$v}";

            if(array_key_exists($target, $this->coba_declarations)){
                unset($this->coba_declarations[$target]);
            }

            $file = self::clientFilename($row[$k], $this);

            echo "Form ({$k}) : {$file}\n";

            $coba_declarations = DB_DataObject::factory('coba_declarations');
            $coba_declarations->setFrom(array(
                'fund_id' => $fund_id,
                'dec_type' => $dec_type,
                'nickname' => empty($row['DATABASE_COL']) ? '' : $row['DATABASE_COL'],
                'is_active' => 1,
                'used_by' => $v
            ));

            $o = false;

            if($coba_declarations->find(true)){
                $o = clone ($coba_declarations);
            }

            if(empty($row[$k]) || !file_exists($file)){

                if(!empty($o)){
                    $coba_declarations->is_active = 0;
                    $coba_declarations->update($o);
                }

                echo "Ignore : File not found\n";

                continue;
            }

            $coba_declarations->setFrom(array(
                'title' => (empty($row['TITLE'])) ? '' : $row['TITLE'],
                'seq_order' => $this->declaration_seq[$dec_type]
            ));

            if(empty($o)){
                $coba_declarations->setFrom(array(
                    'created_dt' => date('Y-m-d')
                ));
            }

            (empty($o)) ? $coba_declarations->insert() : $coba_declarations->update($o);

            $images = DB_DataObject::factory('Images');
            $images->setFrom(array(
                'onid' => $coba_declarations->id,
                'ontable' => $coba_declarations->tableName(),
                'imgtype' => ''
            ));

            $images->find(true);

            if($this->verifyDeclarationFile($images, $file)){
                $this->uploadDeclarationFile($coba_declarations, $file);
            }

            $ext = pathinfo($file);

            $dn = dirname($file);

            $instructions = "{$dn}/{$ext['filename']}.instructions.{$ext['extension']}";

            echo "Form Instructions : {$instructions}\n";

            $images = DB_DataObject::factory('Images');
            $images->setFrom(array(
                'onid' => $coba_declarations->id,
                'ontable' => $coba_declarations->tableName(),
                'imgtype' => 'instructions'
            ));

            $images->find(true);

            if($this->verifyDeclarationFile($images, $instructions)){
                $this->uploadDeclarationFile($coba_declarations, $instructions, 'instructions');
            }


        }

    }

    function process_checklist($fund_id, $dec_type, $row)
    {
        if(!isset($this->declaration_seq[$dec_type])){
            $this->declaration_seq[$dec_type] = 0;
        }

        $this->declaration_seq[$dec_type] = $this->declaration_seq[$dec_type] + 1;

        foreach ($this->field_mapping as $k => $v){

            $target = "{$dec_type}-{$row['DATABASE_COL']}-{$v}";

            if(array_key_exists($target, $this->coba_declarations)){
                unset($this->coba_declarations[$target]);
            }

            $coba_declarations = DB_DataObject::factory('coba_declarations');
            $coba_declarations->setFrom(array(
                'fund_id' => $fund_id,
                'dec_type' => $dec_type,
                'nickname' => empty($row['DATABASE_COL']) ? '' : $row['DATABASE_COL'],
                'is_active' => 1,
                'used_by' => $v
            ));

            $o = false;

            if($coba_declarations->find(true)){
                $o = clone ($coba_declarations);
            }

            if(empty($row[$k]) || $row[$k] != 'y'){

                if(!empty($o)){
                    $coba_declarations->is_active = 0;
                    $coba_declarations->update($o);
                }

                continue;
            }

            $coba_declarations->setFrom(array(
                'title' => (empty($row['TITLE'])) ? '' : $row['TITLE'],
                'seq_order' => $this->declaration_seq[$dec_type]
            ));

            if(empty($o)){
                $coba_declarations->setFrom(array(
                    'created_dt' => date('Y-m-d')
                ));
            }

            (empty($o)) ? $coba_declarations->insert() : $coba_declarations->update($o);

        }

    }

    function process_popup($fund_id, $dec_type, $row)
    {
        if(!isset($this->declaration_seq[$dec_type])){
            $this->declaration_seq[$dec_type] = 0;
        }

        $this->declaration_seq[$dec_type] = $this->declaration_seq[$dec_type] + 1;

        foreach ($this->field_mapping as $k => $v){

            $target = "{$dec_type}-{$row['DATABASE_COL']}-{$v}";

            if(array_key_exists($target, $this->coba_declarations)){
                unset($this->coba_declarations[$target]);
            }

            $file = self::clientFilename($row[$k], $this);

            echo "Popup ({$k}) : {$file}\n";

            $coba_declarations = DB_DataObject::factory('coba_declarations');
            $coba_declarations->setFrom(array(
                'fund_id' => $fund_id,
                'dec_type' => $dec_type,
                'nickname' => empty($row['DATABASE_COL']) ? '' : $row['DATABASE_COL'],
                'is_active' => 1,
                'used_by' => $v
            ));

            $o = false;

            if($coba_declarations->find(true)){
                $o = clone ($coba_declarations);
            }

            if(empty($row[$k]) || !file_exists($file)){

                if(!empty($o)){
                    $coba_declarations->is_active = 0;
                    $coba_declarations->update($o);
                }

                echo "Ignore : File not found\n";

                continue;
            }

            $coba_declarations->setFrom(array(
                'title' => (empty($row['TITLE'])) ? '' : $row['TITLE'],
                'seq_order' => $this->declaration_seq[$dec_type]
            ));

            if(empty($o)){
                $coba_declarations->setFrom(array(
                    'created_dt' => date('Y-m-d')
                ));
            }

            (empty($o)) ? $coba_declarations->insert() : $coba_declarations->update($o);

            $images = DB_DataObject::factory('Images');
            $images->setFrom(array(
                'onid' => $coba_declarations->id,
                'ontable' => $coba_declarations->tableName()
            ));

            $images->find(true);

            if($this->verifyDeclarationFile($images, $file)){
                $this->uploadDeclarationFile($coba_declarations, $file);
            }

        }
    }

    function verifyDeclarationFile($image, $file)
    {
        if(empty($image->id)){
            return true;
        }

        $ofile = $image->getStoreName();

        /*
         * File is already up to date
         */
        if(file_exists($file) && file_exists($ofile) && md5(file_get_contents($ofile)) == md5(file_get_contents($file))){
            echo "Ignore : Already up-to-date\n";
            return false;
        }

        echo "Deleting : {$ofile}\n";

        /*
         * Otherwise, delete it...
         */

        $ff = HTML_FlexyFramework2::get();

        if(empty($ff->Pman['local_autoauth'])){
            $ff->page->jerr('Please set up local_autoauth');
        }

        $res = $this->curl($this->imageURI, array(
            '_delete' => $image->id
        ), 'POST');

        $response = str_replace('<HTML><HEAD></HEAD><BODY>', '', $res);
        $response = str_replace('</BODY></HTML>', '', $response);
        $response = json_decode($response, true);

        if(!is_array($response) || empty($response['success'])){
            echo "Error occur on deleting image => {$this->imageURI}\n";
            print_R($res);
            print_r($image);
            print_R($response);
            exit;
        }

        return true;
    }

    function uploadDeclarationFile($coba_declarations, $file, $imgtype = '')
    {
        if(!file_exists($file)){
            echo "Ignore : file not found\n";
            return;
        }

        echo "Uploading : {$file}\n";

        if (function_exists('curl_file_create')) {
            $cFile = curl_file_create(realpath($file));
        } else {
            $cFile = '@' . realpath($file);
        }

        $ff = HTML_FlexyFramework2::get();

        if(empty($ff->Pman['local_autoauth'])){
            $ff->page->jerr('Please set up local_autoauth');
        }

        $res = $this->curl($this->imageURI, array(
            'onid' => $coba_declarations->id,
            'ontable' => $coba_declarations->tableName(),
            'imgtype' => $imgtype,
            'imageUpload' => $cFile
        ), 'POST');

        $response = str_replace('<HTML><HEAD></HEAD><BODY>', '', $res);
        $response = str_replace('</BODY></HTML>', '', $response);
        $response = json_decode($response, true);

        if(!is_array($response) || empty($response['success'])){
            echo "Error occur on uploading file => {$this->imageURI}\n";
            echo "{$file}\n";
            print_r($res);
            print_r($coba_declarations);
            print_R($response);
            exit;
        }
    }

    function initUserDeclarations()
    {
        $users = array();

        $ext_data = DB_DataObject::factory('ext_data');
        $ext_data->autoJoin();

        $ext_data->whereAdd("
            join_userdata_id_id.active = 1
        ");

        foreach ($ext_data->fetchAll() as $e){

            if(!isset($users[$e->account_type])){
                $users[$e->account_type] = array();
            }

            $users[$e->account_type][] = clone ($e);

        }

        $coba_declarations = DB_DataObject::factory('coba_declarations');
        $coba_declarations->setFrom(array(
            'dec_type' => 'declaration',
            'is_active' => 1
        ));

        $account_type_mapping = array(
            'I' => 'individual',
            'J' => 'joint',
            'C' => 'corporate',
            'CL' => 'corporate'
        );

        foreach ($coba_declarations->fetchAll() as $c){

            if(empty($account_type_mapping[$c->used_by]) || empty($users[$account_type_mapping[$c->used_by]])){
                continue;
            }

            foreach ($users[$account_type_mapping[$c->used_by]] as $u){

                $coba_investor_declarations = DB_DataObject::factory('coba_investor_declarations');
                $coba_investor_declarations->setFrom(array(
                    'user_id' => $u->userdata_id,
                    'dec_id' => $c->id
                ));

                if($coba_investor_declarations->find(true)){
                    continue;
                }

                $coba_investor_declarations->setFrom(array(
                    'is_agreed' => 0
                ));

                $coba_investor_declarations->insert();

            }

        }

    }

    function initEnums()
    {
        $enum = DB_DataObject::factory('core_enum');

        $enum->initEnums(
            array(
                array(
                    'etype' => '',
                    'name' => 'Coba-Laundering',
                    'display_name' =>  'Coba Anti-Money Laundering',
                    'cn' => array(
                        array(
                            'name' => 'SALARY',
                            'display_name' => 'Salary/Employment Income',
                            'seqid' => 1
                        ),
                        array(
                            'name' => 'INHERITANCE',
                            'display_name' => 'Inheritance',
                            'seqid' => 2
                        ),
                        array(
                            'name' => 'GIFTS',
                            'display_name' => 'Gifts',
                            'seqid' => 3
                        ),
                        array(
                            'name' => 'SALEOFASSETS',
                            'display_name' => 'Sale of assets',
                            'seqid' => 4
                        ),
                        array(
                            'name' => 'OTHER',
                            'display_name' => 'Other',
                            'seqid' => 5
                        )
                    )
                ),
            )
        );

        $data_enum_investor_profile = $this->readCSV();
        $data_enum_investor_profile = $this->modifyEnumArray($data_enum_investor_profile);
        foreach ($data_enum_investor_profile as $questionKey => $question) {
            $enum->initEnums(array($question));
        }

    }

    function readCSV()
    {
        $ff = HTML_FlexyFramework2::get();
        $filename =
        $fp = fopen($this->clientFilename("Enum_Schema_InvestorProfile.csv",$this),"r");
        $header = null;
        while ($row = fgetcsv($fp)) {
            if ($header === null) {
                $header = $row;
                continue;
            }
            $rowsCSV[] = array_combine($header, $row);
        }
        fclose($fp);
        return $rowsCSV;
    }

    function modifyEnumArray($rowsCSV)
     {
      foreach ($rowsCSV as $rowCSV) {
          if(!isset($etypes[$rowCSV['etype']])){
              $etypes[$rowCSV['etype']] = array(
                  'etype' => '',
                  'name' => $rowCSV['etype'],
                  'display_name' => $rowCSV['question'],
                  'cn' => []
              );
          }

          $etypes[$rowCSV['etype']]['cn'][] = array(
              'name' => $rowCSV['name'],
              'display_name' => $rowCSV['display_name'],
              'seqid' => $rowCSV['seqid']
          );
      }
        return array_values($etypes);
    }
    
 
    static function clientFilename($doc, $pman)
    {
        $csv = "{$pman->client_path}/{$doc}";
        $csv_default = __DIR__ . "/../../Coba/Clients/default/{$doc}";
        
        if(file_exists($csv)) {
            return $csv;
        }

        if (file_exists($csv_default)) {
            return $csv_default;
        }
        if ($pman == false) {
            return false;
        }
        
        $pman->jerr("Missing client File: $doc");

    }

    function initAdviserStaff()
    {
        if(empty($this->client_path)){
            return;
        }

        $csv = $this->clientFilename('staff.csv', $this);

        ini_set("auto_detect_line_endings", true);

        $fh = fopen($csv, 'r');

        if (!$fh) {
            $this->jerr("invalid file");
        }

        $req = array('NAME', 'EMAIL', 'ROLE');

        $cols = false;
        $rows = array();

        while(false !== ($n = fgetcsv($fh,10000, ',', '"'))) {

            if(!array_filter($n)){ // empty row
                continue;
            }

            if (!$cols) {

                $cols = array();

                foreach($n as $k) {
                    $cols[] = strtoupper(trim($k));
                }

                if (empty($cols)) {
                    continue;
                }

                foreach($req as $r) {

                    if (!in_array($r,$cols)) {
                        $cols = false;
                        break;
                    }
                }

                continue;
            }

            foreach($cols as $i => $k) {
                $row[$k] = trim($n[$i]);
            }

            $rows[] = $row;
        }

        if (empty($cols)) {
            $this->jerr("could not find a row with " . implode(' / ', $req));
        }

        fclose($fh);

        $this->adviserGroup = $this->lookupAdviserGroup();

        $this->adviserCompany = $this->lookupAdviserCompany();

        foreach ($rows as $row){

            if(
                    empty($row['NAME']) ||
                    empty($row['EMAIL']) ||
                    !filter_var($row['EMAIL'], FILTER_VALIDATE_EMAIL)
            ){
                echo "Invalid Data : \n";
                print_r($row);
                continue;
            }

            $this->process_adviser($row);

        }

    }

    function lookupAdviserGroup()
    {
        $core_group = DB_DataObject::factory('core_group');
        $core_group->setFrom(array(
            'name' => 'Adviser'
        ));

        if(!$core_group->find(true)){
            $core_group->insert();
        }

        return $core_group;
    }

    function lookupAdviserCompany()
    {
        $core_company = DB_DataObject::factory('core_company');
        $core_company->setFrom(array(
            'comptype' => 'OWNER'
        ));

        if(!$core_company->find(true)){
            $this->jerr('Error occur on lookup adviser company?!');
        }

        return $core_company;
    }

    function process_adviser($row)
    {
        $core_person = DB_DataObject::factory('core_person');
        $core_person->setFrom(array(
            'email' => $row['EMAIL']
        ));

        if(!$core_person->find(true)){

            $name = $core_person->escape($row['NAME']);

            $core_person->setFrom(array(
                'name' => $name,
                'company_id' => $this->adviserCompany->id,
                'role' => empty($row['ROLE']) ? '' : $row['ROLE'],
                'active' => 1
            ));

            $core_person->insert();

        }

        if (empty($row['ROLE']) || $row['ROLE'] != 'Adviser') {
            $this->adviserGroup->removeMember($core_person);
            return;
        }

        $this->adviserGroup->addMember($core_person);

    }

    function validateUserProfile()
    {
        $ext_data = DB_DataObject::factory('ext_data');

        foreach ($ext_data->fetchAll() as $d){

            $modx_user_attributes = DB_DataObject::factory('modx_user_attributes');

            if($modx_user_attributes->get('internalKey', $d->userdata_id)){
                continue;
            }

            $fullname = array();

            foreach (array('in_firstname', 'in_middlename', 'in_lastname') as $k) {
                if (empty($d->{$k})) {
                    continue;
                }
                $fullname[] = $d->{$k};
            }

            $fullname = implode(' ', $fullname);

            echo "Creating modx_user_attributes for {$fullname}...\n";

            $modx_user_attributes = PDO_DataObject::factory('modx_user_attributes');
            $modx_user_attributes->setFrom(array(
                'internalKey' => $d->userdata_id,
                'fullname' => $fullname,
                'email' => $d->in_email
            ));

            $modx_user_attributes->insert();

        }
    }

    function i18nSetPrefer()
    {
        $a = [
            'USD',
            'HKD',
            'GBP',
            'AUD',
            'EUR',
            'CNY',
            'CHF',
            'NZD',
            'INR',
            'SGD',
            'JPY'
        ];

        $x  = DB_DataObject::factory('i18n');
        $x->ltype = 'm';
        $x->is_prefer = 1;
        if ($x->count() >0) {
            return;
        }
        foreach ($a as $i => $cur) {
            $y = DB_DataObject::factory('i18n');
            $y->is_active = 1;
            $y->inlang = 'en';
            $y->ltype = 'm';
            if (!$y->get("lkey",$cur)) {
                $this->jerr("could not find currency $cur in i18n");
            }
            $yy = clone($y);
            $y->is_prefer = 1;
            if (!$y->update($yy)) {
                
                $this->jerr("update is_prefer failed");
            }
        }
        

    }
    
    function initGroups()
    {
        $groups = array(
            array(
                'name' => 'Adviser'
            ),
            array(
                'name' => 'Advisor - not public'
            )
        );
        
        $core_group = DB_DataObject::factory('core_group');
        
        $core_group->initDatabase($this, $groups);
    }
    
    function updateImagesNoOfPage()
    {
        $images = DB_DataObject::factory('Images');
        $images->setFrom(array(
            'mimetype' => 'application/pdf',
            'no_of_pages' => 0
        ));
        
        foreach ($images->fetchAll() as $i){
            
            $file = $i->getStoreName();
            
            if(!file_exists($file)){
                continue;
            }
            
            $o = clone($i);
            
            $i->no_of_pages = $i->getPdfPages($file);
            
            $i->update($o);
            
        }
    }

}
