<?php

require_once 'Pman.php';
require_once 'Pman/Coba/Schema.php';

class Pman_Coba_ReportShare extends Pman
{

    var $masterTemplate = '';
    var $tempalte = "individual.html";
    //var $tempalte_prefix = "compliance-report-";
    var $tempalte_prefix = '';
    var $client_css;
 
    var $summary;
    var $declarations;
    var $documents;

    var $modx_user_id;
    var $dependentRow;
    var $report_date;
    var $user_name;
    var $name_advisor1;
    var $name_advisor2;
    
    //schema buffer for matching the data with shareholder of shareholder
    var $schema_data_individual;
    var $schema_data_company;

    var $check_completed_declaration;
    var $check_completed_document;
    var $account_type;
    var $field_def ;
    
    var $report_schema = 'accreditationSchema.csv';
    var $section_layout = 'summaryReportLayout.csv';
    var $field_dependency = 'summaryReportFieldDepend.csv';
    
    var $section_map = array();
    
    var $country_map = array();
    
    var $depend_map = array();
    
    var $state_map = array();
    
    function getAuth()
    {
        return true;
    }

    function get($userdata_id,$opts = Array())
    {        
        $this->ext_data = PDO_DataObject::factory('ext_data');
        $this->ext_data->autoJoin();        
        $this->ext_data->get('userdata_id',$userdata_id);
       
        //split the string value and lookup        
        $this->ext_data->anti_money_laundering = $this->decodeEnum($this->ext_data->anti_money_laundering);
        $this->ext_data->anti_money_laundering_second_ap = $this->decodeEnum($this->ext_data->anti_money_laundering_second_ap);
        
        $x = new Pman_Coba_Schema();
        $this->summary = $x->modifySummary($this->ext_data->toArray());
        
        $this->name_advisor = $this->ext_data->investment_advisor_id_name;
        $this->user_name = $this->ext_data->in_firstname." ".$this->ext_data->in_lastname;
        
        $this->template = "{$this->tempalte_prefix}{$this->ext_data->account_type}.html";        
        
        switch ($this->ext_data->account_type) {
            case 'individual':
                $this->used_by = 'I';                                
                break;
                
            case 'joint':
                $this->used_by = 'J';                                
                break;
                
            case 'corporate':
                $this->used_by = 'C';
                if($this->ext_data->is_listed_company == 'yes'){
                    $this->used_by = 'CL';
                }
                $this->user_name = $this->ext_data->company_name;                
                $this->modx_user_id = $userdata_id;
                break;
                
            default:
                $this->used_by = 'I';                
                break;
        }
        
        
                
        //init ref code
        $ff = HTML_FlexyFramework2::get();
        $this->ref_code = $ff->Coba['default_fund']."-".$userdata_id;
        //$this->ref_code = $userdata_id;        
        
        $this->client_dir = $ff->Coba['client_dir'];

        
        //load declaration        
        $this->declarations = $this->load_inv_declaration('declaration');     
        //print_r($this->declarations);
        
        //load document                
        $this->documents = $this->load_inv_declaration('checklist');
        //print_r($this->documents);
        
        $this->report_date = date('F j, Y, h:i A');

        $rowsCSV = $this->readCSV($this->report_schema);
        $this->field_def = $this-> modifyEnumArray($rowsCSV);
        
        
        $rowsLayout = $this->readCSV($this->section_layout);
        $this->section_map = $this->modifyLayoutArray($rowsLayout);
        	
        $rowsDepend = $this->readCSV($this->field_dependency);
        $this->depend_map = $this->modifyDependArray($rowsDepend);        	
        //print_r($this->ext_data);
        $this->load_com_shareholder();
        $this->load_ind_shareholder();
        $this->load_director();
                	
        $this->load_LexisNexis();
        
    }

    function is_show_section($sectionKey){
        // no varible set, display section
        
        if(!isset($this->section_map[$sectionKey])){
            return true;	
        }
        
        if(strtolower($this->section_map[$sectionKey][$this->ext_data->account_type]) !='y'){
            return true;	
        }

        // check for joint account
        if($this->ext_data->account_type =='joint')
        {
            if($this->ext_data->{$this->section_map[$sectionKey]['dependent_column_name']} == $this->section_map[$sectionKey]['dependent_val'] && 
               $this->ext_data->{$this->section_map[$sectionKey]['dependent_column_name_sec_ap']} == $this->section_map[$sectionKey]['dependent_val_sec_ap']
              )
            {
                if($this->section_map[$sectionKey]['dependent_action'] == 'show'){                	  
                    return true;        	                   
                }
	
            }
            return true;
        }
        if(strtolower($this->section_map[$sectionKey]['condition']) =='count'){
            if($this->section_map[$sectionKey]['dependent_column_name'] =='com_shareholder')
            {
               if(sizeof($this->data_company_shareholder) == $this->section_map[$sectionKey]['dependent_val'] &&
                  $this->section_map[$sectionKey]['dependent_action'] == 'hide' 
                 )
               {
                  return false;
               }
               return true; 
            } 	
        }
         
        if($this->ext_data->{$this->section_map[$sectionKey]['dependent_column_name']} == $this->section_map[$sectionKey]['dependent_val']){

            if($this->section_map[$sectionKey]['dependent_action'] == 'show'){        
                return true;        	   
            }
	
        }
                        
    }
    //check the field dependency
    function checkDependency($row)
    {
      return $this->checkDependencyData($row,null);
    }
    
    function checkDependencyData($row,$obj)
    {
        if ($row['being_dependent'] == 'Y') {                   
            //buffering the data for dependency checking
            $this->dependentRow[$row['Section']][$row['Data Table']][$row['column_name']] = $row['data'];                                        
            if ($row['if_checked'] == 'show') {
                if (!$row['data']) {
                    return false;
                }
            } else {
                if($row['data']) {
                    return false;
                }
            }
        }
        
        if (empty($row['dependent_column_name'])) {        	
            return true;
        }        
        // check for denepdency not covered in schema         
        if(isset($this->depend_map[$row['column_name']]))
        {
            if(strtolower($this->depend_map[$row['column_name']][$this->ext_data->account_type]) !='y'){
                return true;	
            }
            if(strtolower($this->depend_map[$row['column_name']]['condition']) =='equal'){
               if($obj){
                  if($row['dependent_table']!='ext_data') {                                                                          		
                      if($obj->{$row['dependent_table'] . '_id_' . $row['dependent_column_name']} == $this->depend_map[$row['column_name']]['dependent_val']){
                          if($this->depend_map[$row['column_name']]['dependent_action'] == 'show'){                	  
                             return true;        	                   
                          }
                          return false;
                      }                  
                  }
               }
               
               if($this->ext_data->{$this->depend_map[$row['column_name']]['dependent_column_name']} == $this->depend_map[$row['column_name']]['dependent_val']){
                          if($this->depend_map[$row['column_name']]['dependent_action'] == 'show'){                	  
                             return true;        	                   
                          }
                          return false;
              }      
            }
	
            if(strtolower($this->depend_map[$row['column_name']]['condition']) =='contain'){
               //print_r($this->depend_map[$row['column_name']]);            	                              
               $pos = strpos($this->ext_data->{$this->depend_map[$row['column_name']]['dependent_column_name']}, $this->depend_map[$row['column_name']]['dependent_val']);
               if ($pos !== false) {
                   if($this->depend_map[$row['column_name']]['dependent_action'] == 'show'){                	  
                       return true;        	                   
                   }
                   return false; 
               }         
                      
            }
            
            if(strtolower($this->depend_map[$row['column_name']]['condition']) =='and'){            	
                if($this->ext_data->{$this->depend_map[$row['column_name']]['dependent_column_name']} == $this->depend_map[$row['column_name']]['dependent_val'] && 
                   $this->ext_data->{$this->depend_map[$row['column_name']]['dependent_column_name_sec']} == $this->depend_map[$row['column_name']]['dependent_val_sec']
                  )
                {
                    if($this->depend_map[$row['column_name']]['dependent_action'] == 'show'){                	  
                        return true;        	                   
                    } 
                    return false;                        
                }
                return false;                	
            }
            
            if(strtolower($this->depend_map[$row['column_name']]['condition']) =='or'){            	
                if($this->ext_data->{$this->depend_map[$row['column_name']]['dependent_column_name']} == $this->depend_map[$row['column_name']]['dependent_val'] || 
                   $this->ext_data->{$this->depend_map[$row['column_name']]['dependent_column_name_sec']} == $this->depend_map[$row['column_name']]['dependent_val_sec']
                  )
                {
                    if($this->depend_map[$row['column_name']]['dependent_action'] == 'show'){                    		                	  
                        return true;   
                             	                   
                    }                     
                    return false;                        
                }	
            }        	   
            
           
        }
        
        if ($row['dependent_val'] == $this->dependentRow[$row['Section']][$row['dependent_table']][$row['dependent_column_name']]) {  				 
            return true;
        } else {                
            if($this->field_def[$row['dependent_column_name']][$this->account_type] == 'M') {
                return true;                
            }                
        }
    }

    //------check specific section for corporate------
    function is_director_section($sectionKey)
    {
        if ($sectionKey == "Directors") {
            return true;
        }        
    }

    function is_individual_shareholder($sectionKey)
    {
        if ($sectionKey == 'KYC: Shareholders: Individual') {
            return true;
        }       
    }

    function is_company_shareholder($sectionKey)
    {
        if ($sectionKey == 'KYC: Shareholders: Company') {
            return true;
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
                
        if ($this->checkDependencyData($row,$client_data)) {
            //$str = $this->renderTblRow($this->tabbing($tab_num) . $row['Label'] ,$this->renderOutputQuestion($row));
            $str = $this->renderTblRowTab($this->tabbing($tab_num), $row ,$this->renderOutputQuestion($row));            
            echo $str;
        }
    }


    function print_com_label_and_data($client_data,$row,$tab_num)
    {
        $field_name = $row['Data Table']."_id_".$row['column_name'];        
        $display_row=true;
        $row['data'] = $client_data->$field_name;        
        if($client_data->coba_company_id_is_listed_company){        	   
            if($field_name != 'coba_company_id_is_listed_company' &&  
               $field_name != 'coba_company_id_exchange_traded_on' &&
               $field_name != 'coba_company_id_stock_symbol' ) 
            {
                $display_row=false;
            }        	                                                              	                               
        }        
        
        
        if ($this->checkDependencyData($row,$client_data) && $display_row) {
            //$str = $this->renderTblRow($this->tabbing($tab_num) . $row['Label'] ,$this->renderOutputQuestion($row));
            $str = $this->renderTblRowTab($this->tabbing($tab_num), $row ,$this->renderOutputQuestion($row));            
            echo $str;
        }
    }
    //output question from each section && switch the output for different questions' type
    function outputQuestionByType($row)
    {
        $checked = 'check';
        $str ='';
        switch ($row['type']) {
        case 'checkbox':
            if (!$row['data']){
                $checked ='unchecked';
            }
            $str = "<span class='glyphicon glyphicon-{$checked} text-primary'></span>";
            break;
        case 'radio':
            $str = ucfirst($row['data']);
            break;
        default:
            $str = $this->renderField($row);
            //$str = $row['data'];
            break;
        }        
        return $str;
    }

    function print_shareholder_of_shareholder($com_shareholder,$tab_num)
    {
        $tab_num ++;
        $x = PDO_DataObject::factory('coba_investor_relation');
        $x->autoJoin();
        $x->autoJoinPersonAddr();
                
        $x->selectAddCountryStates(); 
        $x->relation = 'SHAREHOLDER';
        $x->parent_company_id = $com_shareholder->coba_company_id;
        $x->coba_company_id = '0';
        
        $data_ind_shareholder = $x->fetchAll();
        
        foreach ($data_ind_shareholder as $ind_shareholder_key
                  => $ind_shareholder) {
            //print_r($ind_shareholder);
            $this->setMapping($ind_shareholder);  
            $str = $this->renderTblHeading($this->tabbing($tab_num), 
                      'Shareholder : Individual '  .
                      $this->modifyClientNumber($ind_shareholder_key));
            echo $str;                                        
            
            foreach ($this->schema_data_individual as $ind_row) {
                $this->print_label_and_data($ind_shareholder,$ind_row,$tab_num);
            }
            
            echo "</table>";
        }

        $x = PDO_DataObject::factory('coba_investor_relation');
        $x->autoJoin();
        $x->autoJoinComAddr();
        $x->selectAddCountryStates(); 
        
        $x->relation = 'SHAREHOLDER';
        $x->parent_company_id = $com_shareholder->coba_company_id;
        $x->coba_person_id = '0';
        
        $data_com_shareholder = $x->fetchAll();
        
        if (count($data_com_shareholder)) {
            foreach ($data_com_shareholder as $com_shareholder_key
                      => $com_shareholder) {
                //print_r($com_shareholder);
                $this->setMapping($com_shareholder);  
                $str = $this->renderTblHeading($this->tabbing($tab_num), 
                           'Shareholder : Company '  .
                            $this->modifyClientNumber($com_shareholder_key));
                echo $str;
                                                                       
                foreach ($this->schema_data_company as $com_row) {                	  
                    $this->print_com_label_and_data	($com_shareholder,$com_row,$tab_num);
                }
                
                echo "</table>";
                $this->print_shareholder_of_shareholder($com_shareholder,$tab_num);
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
    
    function readCSV($filename)
    {
        $ff = HTML_FlexyFramework2::get();
        $file = __DIR__ . "/../../../Coba/Clients/{$ff->Coba['client_dir']}/{$filename}";
        $fp = fopen($file,"r");
    	  
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
   
    function modifyEnumArray($rowsCSV) {

        foreach ($rowsCSV as $rowCSV) {
            if(strtolower($rowCSV['being_dependent'])=='y') {
                if(!isset($etypes[$rowCSV['column_name']])){
                    $etypes[$rowCSV['column_name']] = array(                        
                        'Individual' => $rowCSV['Individual'],
                        'Corporate' => $rowCSV['Corporate'],
                        'Joint' => $rowCSV['Joint'],
                        'dependent_val' => $rowCSV['dependent_val']                        
                    );
                }
            }
            
        }
        
        return $etypes;
    }
       
    function modifyLayoutArray($rowsCSV) {

        foreach ($rowsCSV as $rowCSV) {
            if(!isset($r[$rowCSV['Section']])){
                $r[$rowCSV['Section']] = $rowCSV;
            }
        }        
        return $r;        
    }
    
    function modifyDependArray($rowsCSV) {

        foreach ($rowsCSV as $rowCSV) {
            if(!isset($r[$rowCSV['column_name']])){
                $r[$rowCSV['column_name']] = $rowCSV;
            }
        }        
        return $r;        
    }    
    
    function formatDate($date, $format = 'Y-m-d')
    {
        return date($format, strtotime($date));
    }    
    
    function load_LexisNexis()
    {
       $ff = HTML_FlexyFramework::get();
        
        if(empty($ff->Coba) || empty($ff->Coba['LexisNexis'])){
            return;
        }
        
        $this->nexisCompleted = false;
        
        $file = "{$ff->Pman['storedir']}/soap/responses/{$this->ext_data->userdata_id}.json";
        
        if(!file_exists($file)){
            return;
        }
        
        $this->nexisReportDate = date('F j, Y, h:i A', filemtime($file));
        
        $this->nexisCompleted = true;        
        
        $response = json_decode(file_get_contents($file));
        
        if(
                empty($response->SearchResult) || 
                empty($response->SearchResult->Records) || 
                empty($response->SearchResult->Records->ResultRecord) || 
                empty($response->SearchResult->Records->ResultRecord->Watchlist) || 
                empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches) || 
                empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch)
        ) {
            return;
        }
        
        $matches = $response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch;
        $matches = is_array($matches) ? $matches : array($matches);
        $total = count($matches);
        
        $this->nexis_has_matches = false;
        
        if($total < 1){
            return;
        }
        
        
        $this->nexis_has_matches = true;
        
        $this->nexisMatches = array();
        
        $this->nexisRejected = array();
        
        $processed = array();
        
        foreach ($matches as $k => $v){
            
            if(in_array($v->EntityUniqueID, $processed)){
                continue;
            }
            
            $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
            $coba_investor_lexis_results->autoJoin();
            $coba_investor_lexis_results->setFrom(array(
                'investor_id' => $this->ext_data->userdata_id,
                'match_id' => $v->EntityUniqueID,
                'is_active' => 1
            ));
            
            if(!$coba_investor_lexis_results->find(true)){
                continue;
            }
            
            $processed[] = $v->EntityUniqueID;
            
            $v->coba_investor_lexis_result = clone ($coba_investor_lexis_results);
            
            if($coba_investor_lexis_results->status == -1){
                $this->nexisRejected[] = $v;
                continue;
            }
            
            $this->nexisMatches[] = $v;
            
        }
        
    }    
    
    function nexis_comments($comments)
    {    
        $c = array_map('trim', explode("\n", $comments));
        
        $c = implode("<br/>", array_filter($c));
        
        $c = array_map('trim', explode('||', $c));
        
        $c = implode("<br/>", array_filter($c));
        
        $c = array_map('trim', explode('|', $c));
        
        $c = array_map(function($str){
            $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
         
            if(preg_match($reg_exUrl, $str, $url)) {
                
                if(parse_url($str, PHP_URL_HOST) == 'members.worldcompliance.com'){
                    return '';
                }
                
                return preg_replace($reg_exUrl, '<a href="'.$url[0].'" target="_blank">'. wordwrap($url[0], 40, ' ', true).'</a>', $str);
            }
            
            if(preg_match($reg_exUrl, $str, $url)) {
                return preg_replace($reg_exUrl, '<a href="'.$url[0].'" target="_blank">'. wordwrap($url[0], 40, ' ', true).'</a>', $str);
            }

            return $str; 
        }, $c);
     
        $c = implode("<br/>", array_filter($c));
        
        $c = array_map('trim', explode(';', $c));
        
        $c = implode("<br/>", array_filter($c));
        
        return $c;
        
    }
    
    function nexis_infoKey($info)
    {
        $key = $info->Type;
        
        if($info->Type == 'DOB'){
            $key = 'Date of Birth';
        }
        
        if($info->Type == 'Other'){
            $key = 'Other Information';
        }
        
        if($info->Type == 'PlaceOfBirth'){
            $key = 'Place of Birth';
        }
        
        return $key;
        
    }    
    
    function load_director()
    {
        $x = PDO_DataObject::factory('coba_investor_relation');
        $x->autoJoin();
        $x->autoJoinPersonAddr();
                                     
        $x->selectAddCountryStates();                                     	                  	         	        
        $x->relation = 'DIRECTOR';
        $x->modx_user_id = $this->modx_user_id;                

        $this->data_director = $x->fetchAll();
            
        foreach($this->data_director as $director){  
           //print_r($director);	       
           $this->setMapping($director);               	                                                  
        }        
    }    
    
    function load_ind_shareholder()
    {
        $x = PDO_DataObject::factory('coba_investor_relation');
        $x->autoJoin();
        $x->autoJoinPersonAddr();
              
        $x->selectAddCountryStates();
        $x->relation = 'SHAREHOLDER';
        $x->modx_user_id = $this->modx_user_id;
        $x->coba_company_id = 0;    
            
        $this->data_individual_shareholder = $x->fetchAll();
        foreach($this->data_individual_shareholder as $shareholder){      
           //print_r($shareholder);  
           $this->setMapping($shareholder);                            
        }        
    }
    
    function load_com_shareholder()
    {
        $x = PDO_DataObject::factory('coba_investor_relation');
        $x->autoJoin();        
        $x->autoJoinComAddr();
              
        $x->selectAddCountryStates();
        $x->relation = 'SHAREHOLDER';
        $x->modx_user_id = $this->modx_user_id;
        $x->coba_person_id = 0;
        $x->parent_company_id = 0;
                
        $this->data_company_shareholder = $x->fetchAll();
        //$this->com_shareholder_count=0;
        foreach($this->data_company_shareholder as $shareholder){  
           //$this->com_shareholder_count ++;
           $this->setMapping($shareholder);          		
               
        }        
           
    }    
    
    function renderTblHeading($col_1, $col_2){
         return "<table class='app-sum-body-indi-data-table'>
                   <tr class='app-sum-body-indi-data-row'>
                     <td class='col-md-6 app-sum-body-indi-data'>
                       {$col_1}
                       <span class='app-sum-body-corp-title'>                                    
                         {$col_2}
                       </span>
                     </td>
                     <td class='col-md-6 app-sum-body-indi-data'>
                     </td>
                   </tr>";                        
    }
        
    function renderTblRowTab($tab,$row,$col_2){    	  
        return "<tr class='app-sum-body-indi-data-row'>                
                <td class='col-md-6 app-sum-body-indi-data'>
                    {$tab}{$this->renderRowLabel($row)}                    
                    </td>
                <td class='col-md-6 app-sum-body-indi-data'>
                   {$col_2}
                    </td>
               </tr>";                                         
    }    
    
   function renderRowLabel($row){
        if($this->ext_data->account_type=='corporate' && $row['column_name']=='in_correspondence_address' ) {
            return 'Registered Address is correspondence Address';
        }	     
        return htmlspecialchars($row['Label']);   	             	                                              
    }        
    
    function renderOutputQuestion($row)
    {
        $checked = 'check';
        $str ='';
        //print_r($row);
        switch ($row['type']) {
        case 'checkbox':
            if (!$row['data']){
                $checked ='unchecked';
            }
            $str = "<span class='glyphicon glyph icon-{$checked} text-primary'></span>";
            break;
        case 'radio':
            $str = ucfirst($row['data']);
            break;            
        default:
            $str = $this->renderField($row);
            break;
        }
               
        return $str;
    }    
    
    function renderSectionKey($key){   
    
        if($this->ext_data->account_type=='corporate' && strtolower($key)=='residential address' ) {
            return 'Registered Address';
        }	  
        return htmlspecialchars($key);                                        
    }        
    
    function renderField($row) {
        $str ='';
        //$other_val='ot';
        switch ($row['column_name']) {                    
            case 'nationality':                                                 
            case 'country':                   
            case 'place_of_birth':
            case 'domicile':     
            //case 'companies_domicile':
                if($row['data'] == 'ot'|| $row['data'] == '**' || $row['data'] == 'Others' ) {
                    $str='<b>Others</b>';
                } else {
                    $str = $this->country_map[strtolower($row['data'])];                
                }      		                
                break;
                
            case 'in_nationality':
            case 'nationality_second_ap':     
            case 'in_country':
            case 'in_correspondence_country':
            case 'correspondence_country_second_ap':
            case 'country_second_ap':   
            case 'companies_domicile':  
                if($row['data'] == 'ot'|| $row['data'] == '**' || $row['data'] == 'Others' ) {
                    $str='<b>Others</b>';
                } else {
                    $str = htmlspecialchars($row['data']);                
                }     
                break;
                              
            case 'countries_of_tax_residence':
            case 'countries_of_tax_residence_second':   
                $pos = strpos($row['data'], 'Others');
                if($pos !== false){
                    $str='<b>' . htmlspecialchars($row['data']). '</b>';
                } else {
                    $str = htmlspecialchars($row['data']);
                }                                                    
                break;          
                   
            case 'other_country':
            case 'in_other_country':  
            case 'other_country_second_ap':
            case 'in_other_corrcountry':
            case 'other_corr_country_second_ap':  
            case 'other_companies_domicile':
            case 'other_domicile':
            case 'in_other_nationality':
            case 'other_nationality_second_ap':
            case 'other_nationality':
            case 'countries_of_tax_residence_second_other':
            case 'countries_of_tax_residence_other':
                $str = "<b>" . htmlspecialchars($row['data']). "</b>"; 	                            
                break;
                       
            case 'state':
                $str = $this->state_map[strtolower($row['data'])];                   		       		                
                break;             
            default:
                $str = htmlspecialchars($row['data']);
                break;
        }        
        return $str;
    }    
    
    function setMapping($row)
    {	 		   
        if(isset($row->coba_person_id_place_of_birth) && 
           isset($row->place_of_birth_name)) {
	 		
            if (!in_array(strtolower($row->coba_person_id_place_of_birth), $this->country_map)) {	 	          	
                $this->country_map[strtolower($row->coba_person_id_place_of_birth)] = $row->place_of_birth_name;
            }
        }
	 	
        if(isset($row->coba_person_id_nationality) && 
           isset($row->nationality_name)) {
	 		
            if (!in_array(strtolower($row->coba_person_id_nationality), $this->country_map)) {	 	          	
                $this->country_map[strtolower($row->coba_person_id_nationality)] = $row->nationality_name;
            }
        }	 	
	 	
        if(isset($row->coba_address_id_country) && 
           isset($row->country_name)) {
	 		
            if (!in_array(strtolower($row->coba_address_id_country), $this->country_map)) {	 	         	
               $this->country_map[strtolower($row->coba_address_id_country)] = $row->country_name;
            }
        }	 		 	
	 	
        if(isset($row->coba_company_id_domicile) && 
           isset($row->domicile_name)) {
	 		
            if (!in_array(strtolower($row->coba_company_id_domicile), $this->country_map)) {	 	         	
               $this->country_map[strtolower($row->coba_company_id_domicile)] = $row->domicile_name;
            }
        }	 	
	 	
        if(isset($row->coba_address_id_state) && 
           isset($row->state_name)) {
	 		
            if (!in_array(strtolower($row->coba_address_id_state), $this->state_map)) {	 	         	
               $this->state_map[strtolower($row->coba_address_id_state)] = $row->state_name;
            }
        }	 	
 
	 	
    }    
    
    function decodeEnum($value) {
         $arr = explode(",", $value);
         $result = "";			
         foreach($arr as $str){				
            $temp = PDO_DataObject::factory('core_enum');				        	
            $temp->get('id',$str);				
            $result .= $temp->display_name . ", ";        		        		
         }  
			
         return substr($result, 0, -2) ;  
    }
    
    function load_inv_declaration($type){
        $z = PDO_DataObject::factory('coba_investor_declarations');
        $z->user_id = $this->ext_data->userdata_id;        
        
        $u = PDO_DataObject::factory('coba_declarations');
        
        if($type=='checklist'){
            $u->whereAddUserFilter($this->ext_data);                
        }              
        $z->joinAdd($u, 'LEFT');                       		        
        $z->whereAdd("
                     ({$u->tableName()}.dec_type = '{$type}') 
                     AND
                     ({$u->tableName()}.used_by = '{$this->used_by}')
                     AND
                     ({$u->tableName()}.is_active = 1)
                     ");
                     
        if($type=='checklist'){
            $z->selectAdd("(SELECT GROUP_CONCAT(id) FROM Images WHERE Images.onid = {$z->tableName()}.id) AS images_ids");        
        }                     
                                             
        return $z->fetchAll();    
    }
    
}
