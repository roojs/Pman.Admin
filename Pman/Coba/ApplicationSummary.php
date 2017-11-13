<?php

require_once 'Pman.php';

class Pman_Coba_ApplicationSummary extends Pman
{

    var $masterTemplate = "application-summary-master.html";
    var $tempalte = "individual.html";
    var $client_css;

    var $summary;
    var $declarations;
    var $documents;

    var $modx_user_id;
    var $dependentRow;
    var $report_date;
    var $user_name;
    var $name_advisor;
    var $data_director;
    var $data_individual_shareholder;
    var $data_company_shareholder;
    var $ref_code;

    //schema buffer for matching the data with shareholder of shareholder
    var $schema_data_individual;
    var $schema_data_company;

    function getAuth()
    {
        return true;
    }

    function get($userdata_id,$opts = Array())
    {
        // ------load data for template-------
        //phpinfo();
        require_once 'Pman/Coba/Schema.php';
        //load ext_data
        $temp = PDO_DataObject::factory('ext_data');
        $temp->autoJoin();
        $temp->get('userdata_id',$userdata_id);
        $this->ext_data = $temp->toArray();
        //var_dump($this->ext_data);exit;
        $account_type = $this->ext_data['account_type'];
        $x = new Pman_Coba_Schema();
        $this->summary = $x->modifySummary($this->ext_data);
        //print_r($this->ext_data);exit;
        $this->name_advisor = $this->ext_data['investment_advisor_id_firstname']." ".$this->ext_data['investment_advisor_id_lastname'];
        //var_dump($this->name_advisor);exit;
        //switch template && init name for diff account type
        switch ($account_type) {
            case 'individual':
                $account_type_for_declaration = 'I';
                $this->user_name = $this->ext_data['in_firstname']." ".$this->ext_data['in_lastname'];
                $this->template = "application-summary-{$this->ext_data['account_type']}.html";
                break;
            case 'joint':
                $account_type_for_declaration = 'J';
                $this->user_name = $this->ext_data['in_firstname']." ".$this->ext_data['in_lastname'];
                $this->template = "application-summary-{$this->ext_data['account_type']}.html";
                break;
            case 'corporate':
                $account_type_for_declaration = 'C';
                $this->user_name = $this->ext_data['company_name'];
                $this->template = "application-summary-{$this->ext_data['account_type']}.html";
                $this->modx_user_id = $userdata_id;
                break;
            default:
                $account_type_for_declaration = 'I';
                $this->user_name = $this->ext_data['in_firstname']." ".$this->ext_data['in_lastname'];
                $this->template = "application-summary-{$this->ext_data['account_type']}.html";
                break;
        }
        //init ref code
        $ff = HTML_FlexyFramework2::get();
        $this->ref_code = $ff->Coba['default_fund']."-".$userdata_id;

        //load declaration
        $y = PDO_DataObject::factory('coba_declarations');
        $t = PDO_DataObject::factory('coba_investor_declarations');
        $t->set
              (
                  [
                      'user_id' => $userdata_id
                  ]
              );
        $y->joinAdd($t);
        $y->set
              (
                  [
                      'dec_type' => 'declaration',
                      'used_by' => $account_type_for_declaration
                  ]
              );
        $this->declarations = $y->fetchAll();
        //var_dump($this->declarations);

        //load document
        $z = PDO_DataObject::factory('coba_declarations');
        $z->set
              (
                  [
                      'user_id' => $userdata_id
                  ]
              );
        $u = PDO_DataObject::factory('coba_investor_declarations');
        $z->joinAdd($u);
        $z->set
              (
                  [
                      'dec_type' => 'checklist',
                      'used_by' => $account_type_for_declaration
                  ]
              );
        $this->documents = $z->fetchAll();
        $this->report_date = date('F j, Y, h:i A');



        $ff = HTML_FlexyFramework2::get();
    }

    //check the field dependency
    function checkDependency($row)
    {
        if ($row['being_dependent'] == 'Y') {
            //buffering the data for dependency checking
            $this->dependentRow[$row['Section']][$row['Data Table']][$row['column_name']]
                = $row['data']; //dependentRow[section][data table][column_name] = data

            //checking for check_box hide or show property when the box if checked
            if ($row['if_checked'] == 'show') {
                if (!$row['data']) {
                    return FALSE;
                }
            } else {
                if($row['data']) {
                    return FALSE;
                }
            }
        }

        //checking the data with the corresponding dependent row in the buffer
        if (!empty($row['dependent_column_name'])) {
            if ($row['dependent_val']
                    == $this->dependentRow[$row['Section']][$row['dependent_table']][$row['dependent_column_name']]) {
                return TRUE;
            } else {
                return FALSE;
            }
        } else {
            return TRUE;
        }
    }

    //------check specific section for corporate------
    function is_director_section($sectionKey)
    {
        if ($sectionKey == "Directors") {
            $x = PDO_DataObject::factory('coba_investor_relation');
            $x->autoJoin();
            $x->_join .= "
              LEFT JOIN
                  coba_address
              ON
                  coba_address.id = join_coba_person_id_id.coba_address_id
            ";
            $address = DB_DataObject::factory('coba_address');
            $x->selectAs($address, 'coba_address_id_%s');

            $x->set(array(
                'relation' => 'DIRECTOR',
                'modx_user_id' => $this->modx_user_id
            ));

            $this->data_director = $x->fetchAll();
            return true;
        } else {
            return false;
        }
    }

    function is_individual_shareholder($sectionKey)
    {
        if ($sectionKey == 'KYC: Shareholders: Individual') {
            $x = PDO_DataObject::factory('coba_investor_relation');
            $x->autoJoin();
            $x->_join .= "
              LEFT JOIN
                  coba_address
              ON
                  coba_address.id = join_coba_person_id_id.coba_address_id
            ";
            $address = DB_DataObject::factory('coba_address');
            $x->selectAs($address, 'coba_address_id_%s');

            $x->set(array(
                'relation' => 'SHAREHOLDER',
                'modx_user_id' => $this->modx_user_id,
                'coba_company_id' => '0'
            ));

            $this->data_individual_shareholder = $x->fetchAll();

            return true;
        } else {
            return false;
        }
    }

    function is_company_shareholder($sectionKey)
    {
        if ($sectionKey == 'KYC: Shareholders: Company') {
            $x = PDO_DataObject::factory('coba_investor_relation');
            $x->autoJoin();
            $x->_join .= "
              LEFT JOIN
                  coba_address
              ON
                  coba_address.id = join_coba_company_id_id.coba_address_id
            ";

            $address = DB_DataObject::factory('coba_address');
            $x->selectAs($address, 'coba_address_id_%s');
            $x->set(array(
                'relation' => 'SHAREHOLDER',
                'modx_user_id' => $this->modx_user_id,
                'coba_person_id' => '0',
                'parent_company_id' => '0'
            ));
            $this->data_company_shareholder = $x->fetchAll();
            return true;
        } else {
            return false;
        }
    }

    //------saving buffer for specific section------
    function save_buffer_for_individual_shareholder($row)
    {
        if (!isset($this->schema_data_individual)) {
            $this->schema_data_individual = $row;
        }
    }

    function save_buffer_for_company_shareholder($row)
    {
        if (!isset($this->schema_data_company)) {
            $this->schema_data_company = $row;
        }
    }

    function print_label_and_data($client_data,$row,$tab_num)
    {
        $field_name = $row['Data Table']."_id_".$row['column_name'];
        //var_dump($client_data);
        $row['data'] = $client_data->$field_name;
        if ($this->checkDependency($row)) {
            echo "
                <tr class='app-sum-body-indi-data-row'>
                    <td class='col-md-6 app-sum-body-indi-data'>
                    {$this->tabbing($tab_num)}
                    {$row['Label']}
                    </td>
                    <td class='col-md-6 app-sum-body-indi-data'>
                 ";
            $this->outputQuestionByType($row);
            echo "</td></tr>";
        }
    }

    //output question from each section && switch the output for different questions' type
    function outputQuestionByType($row)
    {
        switch ($row['type']) {
        case 'checkbox':
            if ($row['data']){
                echo "<span class='glyphicon glyphicon-check app-sum-icon'></span>";
            } else {
                echo "<span class='glyphicon glyphicon-unchecked app-sum-icon'></span>";
            }
            break;
        default:
            echo $row['data'];
            break;
        }
    }

    function print_shareholder_of_shareholder($company_shareholder,$tab_num)
    {
        $tab_num ++;
        $x = PDO_DataObject::factory('coba_investor_relation');
        $x->autoJoin();

        $x->_join .= "
          LEFT JOIN
              coba_address
          ON
              coba_address.id = join_coba_person_id_id.coba_address_id
        ";

        $address = DB_DataObject::factory('coba_address');
        $x->selectAs($address, 'coba_address_id_%s');


        $x->set(array(
            'relation' => 'SHAREHOLDER',
            'parent_company_id' => $company_shareholder->coba_company_id,
            'coba_company_id' => '0'
        ));
        $data_individual_shareholder = $x->fetchAll();

        foreach ($data_individual_shareholder as $individual_shareholder_key
                  => $individual_shareholder) {
            echo "
                <table class='app-sum-body-indi-data-table'>
                    <tr class='app-sum-body-indi-data-row'>
                        <td class='col-md-6 app-sum-body-indi-data'>
                            {$this->tabbing($tab_num)}
                            <span class='app-sum-body-corp-title'>
                                Individual Shareholder
                                {$this->modifyClientNumber($individual_shareholder_key)}
                            </span>
                        </td>
                        <td class='col-md-6 app-sum-body-indi-data'>
                        </td>
                    </tr>
            ";
            foreach ($this->schema_data_individual as $individual_row) {
                $this->print_label_and_data($individual_shareholder,$individual_row,$tab_num);
            }
            echo "</table>";
        }

        $x = PDO_DataObject::factory('coba_investor_relation');
        $x->autoJoin();

        $x->_join .= "
          LEFT JOIN
              coba_address
          ON
              coba_address.id = join_coba_company_id_id.coba_address_id
        ";

        $address = DB_DataObject::factory('coba_address');
        $x->selectAs($address, 'coba_address_id_%s');

        $x->set(array(
            'relation' => 'SHAREHOLDER',
            'parent_company_id' => $company_shareholder->coba_company_id,
            'coba_person_id' => '0',
        ));
        $data_company_shareholder = $x->fetchAll();


        if (count($data_company_shareholder)) {
            foreach ($data_company_shareholder as $company_shareholder_key
                      => $company_shareholder) {
                echo "
                    <table class='app-sum-body-indi-data-table'>
                        <tr class='app-sum-body-indi-data-row'>
                            <td class='col-md-6 app-sum-body-indi-data'>
                                {$this->tabbing($tab_num)}
                                <span class='app-sum-body-corp-title'>
                                    Company Shareholder
                                    {$this->modifyClientNumber($company_shareholder_key)}
                                </span>
                            </td>
                            <td class='col-md-6 app-sum-body-indi-data'>
                            </td>
                        </tr>
                ";
                foreach ($this->schema_data_company as $company_row) {
                    $this->print_label_and_data($company_shareholder,$company_row,$tab_num);
                }
                echo "</table>";
                $this->print_shareholder_of_shareholder($company_shareholder,$tab_num);
            }
        }
    }

    function tabbing($tab_num)
    {
        $n = 0;
        $tabbing_class_string = "";
        while ($n < $tab_num) {
            $tabbing_class_string.="<span class='app-sum-body-tabbing'></span>";
            $n++;
        };
        return $tabbing_class_string;
    }

    function modifyClientNumber($n)
    {
        return $n+1;
    }

    function PHP_var_dump($a)
    {
        var_dump($a);
        exit;
    }
}
