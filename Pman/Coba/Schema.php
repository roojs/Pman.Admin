<?php

require_once 'Pman.php';

class Pman_Coba_Schema extends Pman 
{
    var $form_doc_data;
    
    var $config = array();
    
    var $related = array();
    
    var $binary_mapping = array(
        'Contact' => 1,
        'KYC' => 2,
        'Declarations' => 4
    );
    
    var $table = '';
    
    var $ignore = array(
        'Individual' => array(
            'in_prohibited_activities',
            'in_capital_summary',
            'social_security_number',
            'in_other_corrcountry',
            'in_correspondence_country',
            'in_correspondence_postalcode',
            'countries_of_tax_residence_other'
        ),
        'Joint' => array(
            'in_prohibited_activities',
            'prohibited_activities_second_ap',
            'in_capital_summary',
            'capital_summary_second_ap',
            'social_security_number',
            'social_security_number_second_ap',
            'in_other_corrcountry',
            'in_correspondence_country',
            'in_correspondence_postalcode',
            'correspondence_postalcode_second_ap',
            'countries_of_tax_residence_other',
            'countries_of_tax_residence_second_other'
        ),
        'Corporate' => array(
            'in_uscitizen',
            'in_usa_tin_number',
            'countries_of_tax_residence',
            'in_prohibited_activities',
            
            'in_addressline1',
            'in_addressline2',
            'in_district',
            'in_country',
            'in_other_country',
            'in_postalcode',
            'in_correspondence_addressline1',
            'in_correspondence_addressline2',
            'in_correspondence_district',
            'in_correspondence_country',
            'in_other_corrcountry',
            'in_correspondence_postalcode',
            'countries_of_tax_residence_other'
            
        ),
        'coba_person' => array(
            'other_country',
            'other_nationality'
        ),
        'coba_company' => array(
            'is_listed_company',
            'not_domociled_usa',
            'giin_number'
        ),
        'coba_address' => array(
            'state'
        )
    );
    
    function loadFormsDoc($user) 
    {
        // $user == a PDO dataojbect of modx_users
        // Call $user->ext_data() to return the related ext_data dataobject..
        // load the forsm_docs_checklist.csv
        // only store data in form_doc_data related to users fund / investor_type.
    }

    function formSection($user, $section) 
    {
        if (empty($this->form_doc_data)) {
            $this->loadFormsDoc($user);
        }
        return $this->form_doc_data[$section];
    }

    //check the completeness of the accreditation by selectAdd
    function modifySelectAdd($do) 
    {
        $this->table = $do->tableName();
        
        $rowsCSV = $this->readCSV('all'); //read all mandatory CSV rows

        $this->buildConfig();
        
        $query = $this->buildQuery();
        
        $do->selectAdd($query);
        
    }

    //modify the summary according to different account type
    function modifySummary($data) 
    {
        $rowsCSV = $this->readCSV($data['account_type']); //read mandatory CSV row by account type
        $summary = array();
        $req_field = array('Label', 'type', 'Data Table', 'column_name', 'dependent_column_name', 'dependent_val', 'dependent_table', 'being_dependent', 'if_checked');
        foreach ($rowsCSV as $rowNum => $rowCSV) {
            foreach ($req_field as $field) {
                $summary[$rowCSV['Step']][$rowCSV['Section']][$rowCSV['Applicant']][$rowNum][$field] = isset($rowCSV[$field]) ? $rowCSV[$field] : null;
            }
            //assign data from ext_data to the schema var
            $summary[$rowCSV['Step']][$rowCSV['Section']][$rowCSV['Applicant']][$rowNum]['data'] = isset($data[$rowCSV['column_name']]) ? $data[$rowCSV['column_name']] : null;
        }
        return $summary;
        //$summary[step][section][Applicant][question number][Label/data/type...] <---5D array
    }

    //open CSV file & get mandatory rows for different account types - $t
    //$t can be 'all', 'individual', 'joint', 'company'
    function readCSV($t) 
    {
        $ff = HTML_FlexyFramework2::get();
        
        $file = __DIR__ . "/../../Coba/Clients/{$ff->Coba['client_dir']}/accreditationSchema.csv";
        
        if(!file_exists($file)){
            die("{$file} not exist?!\n");
        }
        
        $fp = fopen($file, "r");
        
        $header = null;
        //TODO change to switch
        if ($t == "all") {
            while ($row = fgetcsv($fp)) {
                if ($header === null) {
                    $header = $row;
                    continue;
                }
                $rowsCSV[] = array_combine($header, $row);
            }
        } else {
            $t = ucfirst($t);
            while ($row = fgetcsv($fp)) {
                if ($header === null) {
                    $header = $row;
                    continue;
                } else {
                    $tempRow = array_combine($header, $row);
                    if (!empty($tempRow[$t])) {
                        $rowsCSV[] = array_combine($header, $row);
                    }
                }
            }
        }
        
        fclose($fp);
        return $rowsCSV;
    }
    
    function buildConfig()
    {
        $data = $this->readCSV('all');
        
        $this->config = array();
        
        $types = array(
            'Individual',
            'Corporate',
            'Joint'
        );
        
        foreach ($data as $d){
            
            foreach ($types as $t){
                
                if(!isset($this->config[$t])){
                    $this->config[$t] = array();
                }
                
                if(
                        empty($d[$t]) || 
                        $d[$t] != 'M' ||
                        empty($d['Data Table'])
                ){
                    continue;
                }
                
                if(!isset($this->config[$t][$d['Step']])){
                    $this->config[$t][$d['Step']] = array();
                }
                
                $cfg = array(
                    'table' => $d['Data Table'],
                    'column' => $d['column_name'],
                    'type' => strtolower($d['Data Type']),
                    'represent' => strtolower($d['type']),
                    'dependent' => array()
                );
                
                if(!empty($d['dependent_column_name'])){
                    $cfg['dependent'] = array(
                        'table' => $d['dependent_table'],
                        'column' => $d['dependent_column_name'],
                        'value' => $d['dependent_val']
                    );
                }
                
                if($d['Data Table'] != $this->table){
                    
                    if(!isset($this->related[$d['Data Table']])){
                        $this->related[$d['Data Table']] = array();
                    }
                    
                    if(isset($this->related[$d['Data Table']][$d['column_name']])){
                        continue;
                    }
                    
                    $this->related[$d['Data Table']][$d['column_name']] = $cfg;
                    continue;
                    
                }
                
                $this->config[$t][$d['Step']][] = $cfg;
                
            }
            
        }
        
        return;
        
    }
    
    function buildQuery()
    {
        $query = array();
        $query[] = "CASE";
        
        foreach (array_keys($this->config) as $type){
            
            $account_type = strtolower($type);
            
            $query[] = "WHEN {$this->table}.account_type = '{$account_type}' THEN";
            
            $data = $this->buildQueryData($type);
            $data['Declarations'] = $this->buildDeclarationQuery();
            
            $subquery = array();
            
            foreach ($data as $k => $v){
                foreach ($v as $vv){
                    $subquery[] = "(CASE WHEN {$vv} THEN {$this->binary_mapping[$k]} ELSE 0 END)"; 
                }
            }
            
            $query[] = "CASE (" . implode(" | ", $subquery) . ")";
            
            $query[] = "
                WHEN 1 THEN 
                    'Contact' 
                WHEN 2 THEN 
                    'KYC' 
                WHEN 3 THEN 
                    'Contact,KYC' 
                WHEN 4 THEN 
                    'Declarations' 
                WHEN 5 THEN 
                    'Contact,Declarations' 
                WHEN 6 THEN 
                    'KYC,Declarations' 
                WHEN 7 THEN 
                    'Contact,KYC,Declarations' 
                ELSE 
                    '' 
                END
            ";
        }
        
        $query[] = "END AS check_complete";
        
        return implode(' ', $query);
        
    }
    
    function buildQueryData($type)
    {
        if(empty($this->config) || empty($this->config[$type])){
            return;
        }
        
        $query = array();
        
        foreach ($this->config[$type] as $step => $fields){
            
            if(!isset($query[$step])){
                $query[$step] = array();
            }
            
            $extraMethod = "build{$type}{$step}Extra";
            
            if(method_exists($this, $extraMethod)){
                
                $query[$step] = array_merge($query[$step], $this->{$extraMethod}());
            }
            
            foreach ($fields as $k => $v){
                
                if(in_array($v['column'], $this->ignore[$type])){
                    continue;
                }
                
                if($v['table'] != $this->table){
                    continue;
                }
                
                $equation = $this->data_type_equation($v['type']);
                
                if(!empty($v['represent']) && $v['represent'] == 'checkbox'){
                    $equation = array("IS NULL", "= ''");
                }
                
                $q = array();
                
                foreach ($equation as $e){
                    $q[] = "{$v['table']}.{$v['column']} {$e}";
                }
                
                if(empty($v['dependent'])){
                    $query[$step][] = '(' . implode(' OR ', $q) . ')';
                    continue;
                }
                
                $q = array(
                    '(' . implode(' OR ', $q) . ')'
                );
                
                $q[] = "{$v['dependent']['table']}.{$v['dependent']['column']} = '{$v['dependent']['value']}'";
                
                $query[$step][] = '(' . implode(' AND ', $q) . ')';
                
            }
            
        }
        
        return $query;
        
    }
    
    function buildIndividualContactExtra()
    {
        $extra = array();
        
        $tn = $this->table;
        
        $extra[] = "
            (
                    {$tn}.not_have_passport = 1 
                AND 
                    {$tn}.not_have_id_card = 1
            )
        ";
        $extra[] = "
            (
                    {$tn}.in_nationality = 'Others' 
                AND 
                    {$tn}.in_other_nationality = ''
            )
        ";
        $extra[] = "
            (
                    {$tn}.in_correspondence_address = 'no' 
                AND 
                    {$tn}.in_correspondence_country = 'Others' 
                AND 
                    {$tn}.in_other_corrcountry = ''
            )
        ";
        $extra[] = "
            (
                    {$tn}.in_correspondence_address = 'no' 
                AND 
                    {$tn}.post_code_na_corr = '0' 
                AND 
                    {$tn}.in_correspondence_postalcode = ''
            )";
        
        return $extra;
    }
    
    function buildIndividualKYCExtra()
    {
        $extra = array();
        
        $tn = $this->table;
        
        $extra[] = "
            (
                    (
                            {$tn}.in_uscitizen = 'yes' 
                        OR 
                            {$tn}.in_have_us_tax_id = 'yes'
                    ) 
                AND 
                    {$tn}.social_security_number = ''
            )
            OR
            (
                    {$tn}.in_uscitizen = 'no' 
                AND 
                    {$tn}.countries_of_tax_residence != ''
                AND
                    INSTR({$tn}.countries_of_tax_residence, 'Others') != 0
                AND
                    {$tn}.countries_of_tax_residence_other = ''
            )
        ";
        $extra[] = "({$tn}.in_prohibited_activities != 1)";
        $extra[] = "
            (
                INSTR(
                    {$tn}.anti_money_laundering,
                    (SELECT core_enum.id FROM core_enum WHERE core_enum.etype = 'Coba-Laundering' AND name = 'OTHER' )
                ) != 0
                AND 
                {$tn}.in_capital_summary = ''
            )
        ";
        
        return $extra;
    }
    
    function buildJointContactExtra()
    {
        $extra = array();
        
        $tn = $this->table;
        
        $extra[] = "
                (
                        {$tn}.not_have_passport = 1 
                    AND 
                        {$tn}.not_have_id_card = 1
                )
            OR
                (
                        {$tn}.in_nationality = 'Others' 
                    AND 
                        {$tn}.in_other_nationality = ''
                )
            OR
                (
                        {$tn}.in_correspondence_address = 'no' 
                    AND 
                        (
                            (
                                    {$tn}.in_correspondence_country = 'Others' 
                                AND 
                                    {$tn}.in_other_corrcountry = ''
                            )
                        OR
                            (
                                    {$tn}.post_code_na_corr = '0' 
                                AND 
                                    {$tn}.in_correspondence_postalcode = ''
                            )
                        )
                )
            OR
                (
                        {$tn}.not_have_passport_ap2 = 1 
                    AND 
                        {$tn}.not_have_id_card_ap2 = 1
                )
            OR
                (
                        {$tn}.nationality_second_ap = 'Others' 
                    AND 
                        {$tn}.other_nationality_second_ap = ''
                )
            OR
                (
                        {$tn}.is_same_as_ap1 = 'no' 
                    AND 
                        {$tn}.country_second_ap = 'Others' 
                    AND 
                        {$tn}.other_country_second_ap = ''
                )
            OR
                (
                        {$tn}.correspondence_address_second_ap = 'no' 
                    AND 
                        (
                                (
                                        {$tn}.correspondence_country_second_ap = 'Others' 
                                    AND 
                                        {$tn}.other_corr_country_second_ap = ''
                                )
                            OR
                                (
                                        {$tn}.post_code_na_corr_ap2 = '0' 
                                    AND 
                                        {$tn}.correspondence_postalcode_second_ap = ''
                                )
                        )
                )
                
        ";
             
        return $extra;
    }
    
    function buildJointKYCExtra()
    {
        $extra = array();
        
        $tn = $this->table;
        
        $extra[] = "
                (
                        (
                                {$tn}.in_uscitizen = 'yes' 
                            OR 
                                {$tn}.in_have_us_tax_id = 'yes'
                        ) 
                    AND 
                        {$tn}.social_security_number = ''
                )
            OR
                (
                        (
                                {$tn}.uscitizen_second_ap = 'yes' 
                            OR 
                                {$tn}.in_have_us_tax_id_second = 'yes'
                        ) 
                    AND 
                        {$tn}.social_security_number_second_ap = ''
                )
            OR
                (
                        {$tn}.in_uscitizen = 'no' 
                    AND 
                        {$tn}.countries_of_tax_residence != ''
                    AND
                        INSTR({$tn}.countries_of_tax_residence, 'Others') != 0
                    AND
                        {$tn}.countries_of_tax_residence_other = ''
                )
            OR
                (
                        {$tn}.uscitizen_second_ap = 'no' 
                    AND 
                        {$tn}.countries_of_tax_residence_second != ''
                    AND
                        INSTR({$tn}.countries_of_tax_residence_second, 'Others') != 0
                    AND
                        {$tn}.countries_of_tax_residence_second_other = ''
                )
            OR
                (
                        {$tn}.in_prohibited_activities != 1
                )
            OR
                (
                        {$tn}.prohibited_activities_second_ap != 1
                )
        ";
                    
        $extra[] = "
            (
                INSTR(
                    {$tn}.anti_money_laundering,
                    (SELECT core_enum.id FROM core_enum WHERE core_enum.etype = 'Coba-Laundering' AND name = 'OTHER' )
                ) != 0
                AND 
                {$tn}.in_capital_summary = ''
            )
        ";
        $extra[] = "
            (
                INSTR(
                    {$tn}.anti_money_laundering_second_ap,
                    (SELECT core_enum.id FROM core_enum WHERE core_enum.etype = 'Coba-Laundering' AND name = 'OTHER' )
                ) != 0
                AND 
                {$tn}.capital_summary_second_ap = ''
            )
        ";
        
        return $extra;
    }
    
    function buildCorporateContactExtra()
    {
        $extra = array();
        
        $tn = $this->table;
        
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'no' 
                AND 
                    (
                            {$tn}.in_addressline1 = '' 
                        OR
                            {$tn}.in_addressline2 = ''
                        OR
                            {$tn}.in_district = ''
                        OR
                            {$tn}.in_country = ''
                        OR
                            (
                                    {$tn}.in_correspondence_address = 'no' 
                                AND 
                                    (
                                            {$tn}.in_correspondence_addressline1 = ''
                                        OR
                                            {$tn}.in_correspondence_addressline2 = ''
                                        OR
                                            {$tn}.in_correspondence_district = ''
                                        OR
                                            {$tn}.in_correspondence_country = ''
                                        OR
                                            (
                                                    {$tn}.in_correspondence_country = 'Others' 
                                                AND 
                                                    {$tn}.in_other_corrcountry = ''
                                            )
                                        OR
                                            (
                                                    {$tn}.post_code_na_corr = '0' 
                                                AND 
                                                    {$tn}.in_correspondence_postalcode = ''
                                            )
                                    )
                            )
                        OR
                            (
                                    {$tn}.companies_domicile = 'Others' 
                                AND 
                                    {$tn}.in_other_nationality = ''
                            )
                        OR
                            (
                                    {$tn}.in_country = 'Others' 
                                AND 
                                    {$tn}.in_other_country = ''
                            )
                        OR
                            (
                                    {$tn}.post_code_na = '0' 
                                AND 
                                    {$tn}.in_postalcode = ''
                            )
                    )
            )
        ";
        
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'no'
                AND
                    (
                        SELECT 
                                COUNT(coba_investor_relation.id)
                        FROM
                                coba_investor_relation
                        WHERE
                                coba_investor_relation.modx_user_id = ext_data.userdata_id
                            AND
                                coba_investor_relation.relation = 'DIRECTOR'
                    ) < 1
            )
        ";
        
        $related = $this->buildRelatedQuery();
        
        $where = array_merge($related['coba_person'], $related['coba_address']);
        
        $where = '(' . implode(" \nOR\n ", $where) . ')';
        
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'no'
                AND
                    (
                        SELECT 
                                COUNT(coba_person.id)
                        FROM
                                coba_person
                        LEFT JOIN
                                coba_address
                        ON
                                coba_address.id = coba_person.coba_address_id
                        WHERE
                                $where
                            AND
                                coba_person.id IN (
                                    SELECT 
                                            coba_investor_relation.coba_person_id
                                    FROM
                                            coba_investor_relation
                                    WHERE
                                            coba_investor_relation.modx_user_id = ext_data.userdata_id
                                        AND
                                            coba_investor_relation.relation = 'DIRECTOR'

                                )
                    ) > 0
            )
        ";
        
        return $extra;
    }
    
    function buildCorporateKYCExtra()
    {
        $extra = array();
        
        $tn = $this->table;
        
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'no' 
                AND 
                    (
                            {$tn}.in_uscitizen = ''
                        OR
                            (
                                    {$tn}.in_uscitizen = 'yes' 
                                AND 
                                    {$tn}.in_usa_tin_number = ''
                            )
                        OR
                            (
                                    {$tn}.in_uscitizen = 'no' 
                                AND 
                                    {$tn}.countries_of_tax_residence = ''
                            )
                        OR
                            (
                                    {$tn}.in_uscitizen = 'no' 
                                AND 
                                    {$tn}.countries_of_tax_residence != ''
                                AND
                                    INSTR({$tn}.countries_of_tax_residence, 'Others') != 0
                                AND
                                    {$tn}.countries_of_tax_residence_other = ''
                            )
                    )
            )
        ";
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'yes' 
                AND 
                    (
                            {$tn}.countries_of_tax_residence = ''
                        OR
                            (
                                    {$tn}.in_uscitizen = 'no' 
                                AND 
                                    {$tn}.countries_of_tax_residence != ''
                                AND
                                    INSTR({$tn}.countries_of_tax_residence, 'Others') != 0
                                AND
                                    {$tn}.countries_of_tax_residence_other = ''
                            )
                    )
            )
        ";
        $extra[] = "({$tn}.in_prohibited_activities != 1)";
        
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'no'
                AND
                    (
                        SELECT 
                                COUNT(coba_investor_relation.id)
                        FROM
                                coba_investor_relation
                        WHERE
                                coba_investor_relation.modx_user_id = ext_data.userdata_id
                            AND
                                coba_investor_relation.relation = 'SHAREHOLDER'
                    ) < 1
            )
        ";
        
        $related = $this->buildRelatedQuery();
        
        $where = array_merge($related['coba_person'], $related['coba_address']);
        
        $where = '(' . implode(" \nOR\n ", $where) . ')';
        
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'no'
                AND
                    (
                        SELECT 
                                COUNT(coba_person.id)
                        FROM
                                coba_person
                        LEFT JOIN
                                coba_address
                        ON
                                coba_address.id = coba_person.coba_address_id
                        WHERE
                                $where
                            AND
                                coba_person.id IN (
                                    SELECT 
                                            coba_investor_relation.coba_person_id
                                    FROM
                                            coba_investor_relation
                                    WHERE
                                            coba_investor_relation.modx_user_id = ext_data.userdata_id
                                        AND
                                            coba_investor_relation.relation = 'SHAREHOLDER'

                                )
                    ) > 0
            )
        ";
        
        $coba_company = '(' . implode(" \nOR\n ", $related['coba_company']) . ')';
        $coba_address = '(' . implode(" \nOR\n ", $related['coba_address']) . ')';
        
        $extra[] = "
            (
                    {$tn}.is_listed_company = 'no'
                AND
                    (
                        SELECT 
                                COUNT(coba_company.id)
                        FROM
                                coba_company
                        LEFT JOIN
                                coba_address
                        ON
                                coba_address.id = coba_company.coba_address_id
                        WHERE
                            (
                                    $coba_company
                                OR
                                    CASE WHEN coba_company.is_listed_company = '0' THEN
                                        $coba_address
                                    ELSE
                                        FALSE
                                    END
                            )   
                            AND
                                coba_company.id IN (
                                    SELECT 
                                            coba_investor_relation.coba_company_id
                                    FROM
                                            coba_investor_relation
                                    WHERE
                                            coba_investor_relation.modx_user_id = ext_data.userdata_id
                                        AND
                                            coba_investor_relation.relation = 'SHAREHOLDER'

                                )
                    ) > 0
            )
        ";
        
        return $extra;
    }
    
    function buildRelatedQuery()
    {
        $query = array();
        
        foreach ($this->related as $k => $v){
            
            if(!isset($query[$k])){
                $query[$k] = array();
            }
            
            foreach ($v as $vv){
                
                if(!empty($this->ignore[$k]) && in_array($vv['column'], $this->ignore[$k])){
                    continue;
                }
                
                $equation = $this->data_type_equation($vv['type']);
                
                if(!empty($vv['represent']) && $vv['represent'] == 'checkbox'){
                    $equation = array("IS NULL", "= ''");
                }
                
                $q = array();
                
                foreach ($equation as $e){
                    $q[] = "{$vv['table']}.{$vv['column']} {$e}";
                }
                
                if(empty($vv['dependent'])){
                    $query[$k][] = '(' . implode(' OR ', $q) . ')';
                    continue;
                }
                
                $q = array(
                    '(' . implode(' OR ', $q) . ')'
                );
                
                $q[] = "{$vv['dependent']['table']}.{$vv['dependent']['column']} = '{$vv['dependent']['value']}'";
                
                $query[$k][] = '(' . implode(' AND ', $q) . ')';
            }
            
            if($k == 'coba_person'){
                $query[$k][] = "
                    (
                            coba_person.not_have_passport = 1 
                        AND 
                            coba_person.not_have_id_card = 1
                    )
                ";
                $query[$k][] = "
                    (
                            coba_person.nationality = 'ot' 
                        AND 
                            coba_person.other_nationality = ''
                    )
                ";
                $query[$k][] = "(coba_person.coba_address_id = '0')";
            }
            
            if($k == 'coba_company'){
                $query[$k][] = "(coba_company.is_listed_company = '-1')";
                $query[$k][] = "
                    (
                            coba_company.is_listed_company = '0' 
                        AND 
                            (
                                    coba_company.not_domociled_usa IS NULL 
                                OR 
                                    coba_company.not_domociled_usa = ''
                                OR
                                    (
                                            coba_company.not_domociled_usa = '0'
                                        AND
                                            coba_company.giin_number = ''
                                    )
                                OR
                                    coba_company.coba_address_id = '0'
                            )
                    )
                ";
            }
            
            if($k == 'coba_address'){
                $query[$k][] = "
                    (
                            coba_address.country != 'ot' 
                        AND 
                            coba_address.state = '0'
                    )
                ";
                $query[$k][] = "
                    (
                            coba_address.country = 'ot' 
                        AND 
                            (
                                    coba_address.other_country = '' 
                                OR 
                                    coba_address.other_state = ''
                            )
                    )
                ";
            }
            
        }
        
        return $query;
        
    }
    
    function buildDeclarationQuery()
    {
        $query = array();
        
        $query[] = "
            (
                SELECT
                        COUNT(coba_investor_declarations.id)
                FROM
                        coba_investor_declarations
                WHERE
                        coba_investor_declarations.user_id = ext_data.userdata_id
                    AND
                        coba_investor_declarations.is_agreed = 0
                    AND
                        coba_investor_declarations.dec_id IN (
                            SELECT
                                    id
                            FROM
                                    coba_declarations
                            WHERE
                                    coba_declarations.dec_type = 'declaration'
                                AND
                                    coba_declarations.is_active = 1
                                AND
                                    (
                                        CASE WHEN ext_data.account_type = 'individual' THEN
                                            coba_declarations.used_by = 'I'
                                        WHEN ext_data.account_type = 'joint' THEN
                                            coba_declarations.used_by = 'J'
                                        WHEN ext_data.account_type = 'corporate' AND ext_data.is_listed_company != 'yes' THEN
                                            coba_declarations.used_by = 'C'
                                        WHEN ext_data.account_type = 'corporate' AND ext_data.is_listed_company = 'yes' THEN
                                            coba_declarations.used_by = 'CL'
                                        END
                                    )
                        )
            ) > 0
            
        ";
        
        return $query;
        
    }
    
    function data_type_equation($type)
    {
        $type = strtolower(preg_replace('/\(.*\)/', '', $type));
        
        $equation = array();
        
        switch ($type) {
            case 'varchar' :
            case 'enum' :
            case 'mediumtext' :
            case 'text' :
                $equation[] = "= ''";
                break;
            case 'date' :
                $equation[] = "= ''";
                $equation[] = "= '0000-00-00'";
                break;
            case 'int' :
            case 'tinyint' :
                $equation[] = "= 0";
                break;
            default :
                $equation[] = 'IS NULL';
                break;
                
        }
        
        return $equation;
    }

}
