<?php

require_once 'Pman.php';
require_once 'Pman/Coba/Schema.php';

class Pman_Coba_Reports_InvestorRiskProfile extends Pman
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
    var $name_advisor1;
    var $name_advisor2;    

    //schema buffer for matching the data with shareholder of shareholder
    
    var $totalScore;
    var $questions;	 
    //var $investor_profile = 'Enum_Schema_InvestorProfile.csv';
    var $risk_profile = 'InvestorRiskProfileQuestions.csv';
    var $profile_comment = 'InvestorRiskProfileComment.csv';	 
	 
    var $sections;
    var $layout_map;	
    var $comments;
     
    var $ret;
    var $risk_profile_mapping;   
    var $show_profile_html = true;  	
   
    var $comment_mapping = array ();
	 
    function getAuth()
    {
        return true;
    }

    function get($userdata_id,$opts = Array())
    {
        // load profile
        $p = DB_DataObject::factory('coba_person_investor_profile');
        $p->autojoin();
        $p->modx_user_id = $userdata_id;
                                        
        //print_r(sizeof($p));                                        
        foreach ($p->fetchAll() as $c){        
            $this->ret[] = $c->toArray();
        }        
        //print_r($this->ret);
        if(sizeof($this->ret) ==0){
            die('No Record found');        
        }
        
        $this->ext_data = PDO_DataObject::factory('ext_data')->load('userdata_id',$this->ret[0]['modx_user_id'])->toArray();
        //print_r($this->ext_data);
        $account_type = $this->ext_data['account_type'];
        $x = new Pman_Coba_Schema();
        $this->summary = $x->modifySummary($this->ext_data);

        $this->template = "investor-risk-profile-{$this->ext_data['account_type']}.html";
        $this->user_name = $this->ext_data['in_firstname']." ".$this->ext_data['in_lastname'];
        
        switch ($account_type) {
            case 'individual':
                $account_type_for_declaration = 'I';
                break;
                
            case 'joint':
                $account_type_for_declaration = 'J';
                 if($this->ret[0]['is_second_ap']==1) {
                    $this->user_name = $this->ext_data['firstname_second_ap']." ".$this->ext_data['lastname_second_ap'];	
                } else {
                    $this->user_name = $this->ext_data['in_firstname']." ".$this->ext_data['in_lastname'];
                }
                break;
                
            case 'corporate':
                $account_type_for_declaration = 'C';
                $this->user_name = $this->ext_data['company_name'];                
                //$this->modx_user_id = $userdata_id;
                break;
                
            default:
                $account_type_for_declaration = 'I';                
                break;
        }
        
        $this->report_date = date('F j, Y, h:i A');

        $commentCSV = $this->readCSV($this->profile_comment);	     
        $this->comment_mapping = $this->modifyCommentArray($commentCSV);
         
        $rowsCSV = $this->readCSV($this->risk_profile);
        $questions = $this->modifyMappingArray($rowsCSV);
                        
        foreach($this->ret as $investor => $inv_value) { 
            $this->totalScore[$investor] = 0; 			
            foreach($questions as $stepKey => $step ) {
                foreach($step as $secKey => $sec) {
                   foreach($sec as $q) {            			
                                   		 	
                       
                       $score=0;
                       if($q['show_score']){                                       	       	   
                           $score = $this->ret[$investor][$q['column_name'] . '_seqid'];   
                           $this->totalScore[$investor] += $score;            	                        	                   	                                              	       
                       }
                       
                       if($q['type']=='checkbox' || $q['type']=='text'){
                           $answer = $this->ret[$investor][$q['column_name']];
                       } else {
                          $answer = $this->ret[$investor][$q['column_name'] . '_display_name'];
                       }
                       
                       if(!isset($this->layout_map[$stepKey][$secKey]['show_score'])) 
                       {
                           $this->layout_map[$stepKey][$secKey]['show_score'] =$q['show_score'];
                       }  	
							 
                       if(!isset($this->layout_map[$stepKey][$secKey]['show_template'])) 
                       {
                           $this->layout_map[$stepKey][$secKey]['show_template'] =$q['show_template'];
                       }							 
                      
                       if(!isset($this->layout_map[$stepKey][$secKey]['template_name'])) 
                       {
                           $this->layout_map[$stepKey][$secKey]['template_name'] =$q['template_name'];
                       }   
                       
                       if(!isset($this->layout_map[$stepKey][$secKey]['heading'])) 
                       { 
                           $this->layout_map[$stepKey][$secKey]['heading'] =$q['Section'];
                       }
                       
                       if(!isset($this->layout_map[$stepKey][$secKey]['show_info'])) 
                       { 
                           $this->layout_map[$stepKey][$secKey]['show_info'] =$q['show_info'];
                       }
                       
                       if(!isset($this->layout_map[$stepKey][$secKey]['layout_dependent_column_name'])) 
                       { 
                           $this->layout_map[$stepKey][$secKey]['layout_dependent_column_name'] =$q['layout_dependent_column_name'];
                       }

                       if(!isset($this->layout_map[$stepKey][$secKey]['layout_dependent_val'])) 
                       { 
                           $this->layout_map[$stepKey][$secKey]['layout_dependent_val'] =$q['layout_dependent_val'];
                       }                       
                       
                       if(!isset($this->layout_map[$stepKey]['column_group'])) 
                       { 
                           $this->layout_map[$stepKey]['column_group'] =$q['column_group'];
                       }
                          
                       if($this->layout_map[$stepKey]['column_group'] =='Y') {
                           $this->sections[$stepKey][$investor][$secKey][$q['column_name']] =  array(
                                                                                 'display_name' => $q['Label'],
                                                                                 'answer' => $answer,
                                                                                 'score' => $score,
                                                                                 'type' => $q['type'],
                                                                                 'row' => $q                                                                                 
                                                                                );                                                                                                                   	       
                       
                       } else {
                           $this->sections[$stepKey][$secKey][$investor][$q['column_name']] =  array(
                                                                                 'display_name' => $q['Label'],
                                                                                 'answer' => $answer,
                                                                                 'score' => $score,
                                                                                 'type' => $q['type'],
                                                                                 'row' => $q                                                                                 
                                                                                );                                                                                                                   	       
                       
                       }
                    }     
            	 
                 }
            }                  
            $this->comments[$investor] = $this->findInRange($this->totalScore[$investor],$this->comment_mapping);
                      
        }
        
        //print_r($this->sections);
                		  
        $profileCSV = $this->readCSV($this->risk_profile);
        $this->risk_profile_mapping = $this->modifyMappingArray($profileCSV);		    
             	             
        $ff = HTML_FlexyFramework2::get();
        //$this->ref_code = $this->ret[0]['modx_user_id'];
        $this->ref_code = $ff->Coba['default_fund']."-".$this->ret[0]['modx_user_id'];
        
        $this->client_dir = $ff->Coba['client_dir'];
    }

    function findInRange($number, $array)
    {
        foreach ($array as $key => $value) {
            list($min, $max) = explode('-', $key);
            if ($number >= $min && $number <= $max) {
                return $value;
            }
        }

        return null;
    }    
    
    function getTotalScore($investor)
    { 
       $result = 0;
       foreach ( $this->sections['section_3'][$investor] as $key => $value) {
            $result += $value['score'];	 	 
       }
       return $result;
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
            $key = str_replace("coba.","",$rowCSV['etype']); 
            if(!isset($etypes[$key])){
                $etypes[$key] = array(                   
                    'name' => $key,
                    'display_name' => $rowCSV['question']
                );

            }

        }        
        return array_values($etypes);
        //return $etypes;

    }

     function modifyMappingArray($rowsCSV) {

        foreach ($rowsCSV as $rowCSV) {
            if(!isset($etypes[$rowCSV['Step']][$rowCSV['Section']][$rowCSV['column_name']])){
                $etypes[$rowCSV['Step']][$rowCSV['Section']][$rowCSV['column_name']] = $rowCSV;
            }
        }        
        return $etypes;        
    }
    
    function modifyCommentArray($rowsCSV) {

        foreach ($rowsCSV as $rowCSV) {
            if(!isset($r[$rowCSV['range']])){
                $r[$rowCSV['range']] = $rowCSV;
            }
        }        
        return $r;        
    }

    //output question from each section && switch the output for different questions' type
    function outputQuestionByType($row,$investor)
    {        
        $checked = 'check';
        $str ='';
        switch ($row['type']) {
        case 'checkbox':
            if ($this->ret[$investor][$row['column_name']]){
                $checked ='unchecked';
            }
            $str = "<span class='glyphicon glyphicon-{$checked} text-primary'></span>";
            break;
            
        default:            
            $str = $this->ret[$investor][$row['column_name']];
            break;
        }        
        return $str;
    }
   
   function outputField($row)
    {        
        $checked = 'check';
        $str ='';
        switch ($row['type']) {
        case 'checkbox':
            if ($row['answer'] ==0){
                $checked ='unchecked';
            }
            $str = "<span class='glyphicon glyphicon-{$checked} text-primary'></span>";
            break;
            
        default:            
            $str = $row['answer'];
            break;
        }        
        return $str;
    }   
   
    //check the field dependency
    function checkDependency($row,$investor)
    {    	  
        if (empty($row['row']['dependent_column_name'])) {
            return true;
        }
         
        if ($row['row']['dependent_val'] == $this->ret[$investor][$row['row']['dependent_column_name']]) {  				 
                return true;
                                   
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
    
   function getApplicationKey($value) {
        return $value + 1;    		        		
   }  
			
   function get_inv_info($investor){      
      if($this->ret[$investor]['is_second_ap']){
         return $this->renderRow('Title',$this->ext_data['title_second_ap']) .
                $this->renderRow('First Name',$this->ext_data['firstname_second_ap']) .
                $this->renderRow('Middle Name',$this->ext_data['middlename_second_ap']) .
                $this->renderRow('Last Name',$this->ext_data['lastname_second_ap']);
      } else {
         return  $this->renderRow('Title',$this->ext_data['in_title']) .
                 $this->renderRow('First Name',$this->ext_data['in_firstname']) .
                 $this->renderRow('Middle Name',$this->ext_data['in_middlename']) .
                 $this->renderRow('Last Name',$this->ext_data['in_lastname']);
      }      
   }       

   function display_score($investor)
   {
      return $this->totalScore[$investor];
   }

   function display_comments($investor,$key)
   {
      return $this->comments[$investor][$key];
   }

   function renderRow($key,$value){
       return "<tr class='app-sum-body-indi-data-row'>
            <td class='col-md-6 app-sum-body-indi-data'>               
                {$key}
            </td>
            <td class='col-md-6 app-sum-body-indi-data'>
                {$value}
            </td>
            </tr>";       
   }

   function renderField($str){
       return htmlspecialchars($str);
   }
   
   function is_show_score($stepKey,$secKey) {
       return $this->layout_map[$stepKey][$secKey]['show_score'];
   }
   
   function is_show_info($stepKey,$secKey) {
       if ($this->ext_data['account_type'] != 'joint') {
          return false;   	
       }
       return $this->layout_map[$stepKey][$secKey]['show_info'];
   }   
   
   function get_template_name($stepKey,$secKey) {
      //print_r($this->layout_map[$stepKey][$secKey]['template_name']);
       $this->html_template =  $this->layout_map[$stepKey][$secKey]['template_name'];   	 
   }       
   
   function get_heading($stepKey,$secKey,$investor) {
      if($this->layout_map[$stepKey][$secKey]['layout_dependent_column_name'] !='') 
      {              
          if ($this->layout_map[$stepKey][$secKey]['layout_dependent_val'] != 
              $this->ret[$investor][$this->layout_map[$stepKey][$secKey]['layout_dependent_column_name']]) {  				 
                return ;                                   
          } 
      }
      
      if($this->layout_map[$stepKey][$secKey]['heading'] !='N/A') {
         return $this->layout_map[$stepKey][$secKey]['heading'];      
      }     	 
   }      
   
   function is_show_section($stepKey,$secKey,$investor) {
      if($this->layout_map[$stepKey][$secKey]['layout_dependent_column_name'] =='') 
      {              
          return true;  
      }   
      if ($this->layout_map[$stepKey][$secKey]['layout_dependent_val'] == 
          $this->ret[$investor][$this->layout_map[$stepKey][$secKey]['layout_dependent_column_name']]) {  				 
          return true;                                   
      }              	 
   }         
   
   function is_show_template($stepKey,$secKey) {
       return $this->layout_map[$stepKey][$secKey]['show_template']; 
                                      
   }
   
   function is_column_group($stepKey) {   	
   	 if($this->layout_map[$stepKey]['column_group']=='Y') {
           return true;
       }  
                                      
   }
}
