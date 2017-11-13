<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Ext_data extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'ext_data';

    function applyFilters($q, $au, $roo)
    {
        $this->selectAdd("
            CASE
                WHEN in_middlename='' THEN
                    CONCAT_WS(' ', in_firstname,in_lastname)
                ELSE
                    CONCAT_WS(' ', in_firstname,in_middlename,in_lastname)
            END AS full_name
        ");

        if (!empty($q['_search_filter'])) {
            $search_filter = str_replace(' ','%',trim($this->escape($q['_search_filter'])));
            $this->whereAdd("(
                    in_email LIKE '%{$search_filter}%' 
                OR 
                   concat(in_firstname, in_middlename, in_lastname) LIKE '%{$search_filter}%'                    
                OR
                   concat(in_lastname, in_firstname, in_middlename) LIKE '%{$search_filter}%'                  
                OR			      
                   company_name LIKE '%{$search_filter}%'
            )");            
        }
         		   
        if (!empty($q['_with_status'])) {
            require_once 'Pman/Coba/Schema.php';
            $x = new Pman_Coba_Schema(); // ctor -> load
            
            $x->modifySelectAdd($this); //modifying the select add query for checking the completeness of the user profile
            
            $this->selectAddIsMissingDocument();
            
        }
        
        if (!empty($q['_include_deleted'])) {
            $this->whereAdd("ext_data.deleted_by>=0");
        } else {
            $this->whereAdd("ext_data.deleted_by=0");
        }
    }
    
    function selectAddIsMissingDocument()
    {
        $this->selectAdd("
            CASE WHEN 
            (
                (
                    SELECT
                            COUNT(coba_investor_declarations.id)
                    FROM
                            coba_investor_declarations
                    WHERE
                            coba_investor_declarations.user_id = ext_data.userdata_id
                        AND
                            coba_investor_declarations.dec_id IN (

                                SELECT
                                        coba_declarations.id
                                FROM
                                        coba_declarations
                                WHERE
                                        coba_declarations.dec_type = 'checklist'
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
                                    AND
                                        (
                                            CASE WHEN 
                                                (ext_data.account_type = 'individual' AND ext_data.not_have_passport = 1) OR
                                                (ext_data.account_type = 'joint' AND ext_data.not_have_passport = 1 AND ext_data.not_have_passport_ap2 = 1)
                                            THEN
                                                coba_declarations.nickname != 'passport_copy'
                                            ELSE
                                                TRUE
                                            END
                                        )
                                    AND
                                        (
                                            CASE WHEN 
                                                (ext_data.account_type = 'individual' AND ext_data.not_have_id_card = 1) OR
                                                (ext_data.account_type = 'joint' AND ext_data.not_have_id_card = 1 AND ext_data.not_have_id_card_ap2 = 1)
                                            THEN
                                                coba_declarations.nickname != 'id_copy'
                                            ELSE
                                                TRUE
                                            END
                                        )
                                    AND
                                        (
                                            CASE WHEN 
                                                (ext_data.account_type = 'individual' AND ext_data.in_uscitizen = 'yes') OR
                                                (ext_data.account_type = 'joint' AND ext_data.in_uscitizen = 'yes' AND ext_data.uscitizen_second_ap = 'yes')
                                            THEN
                                                coba_declarations.nickname != 'w8ben'
                                            ELSE
                                                TRUE
                                            END
                                        )
                                    AND
                                        (
                                            CASE WHEN 
                                                (ext_data.account_type = 'individual' AND ext_data.in_uscitizen = 'no') OR
                                                (ext_data.account_type = 'joint' AND ext_data.in_uscitizen = 'no' AND ext_data.uscitizen_second_ap = 'no')
                                            THEN
                                                coba_declarations.nickname != 'w9'
                                            ELSE
                                                TRUE
                                            END
                                        )
                                    AND
                                        (
                                            CASE WHEN 
                                                (ext_data.account_type = 'corporate' AND ext_data.is_listed_company = 'yes') OR
                                                (ext_data.account_type = 'corporate' AND ext_data.in_uscitizen = 'yes')
                                            THEN
                                                coba_declarations.nickname != 'w8bene'
                                            ELSE
                                                TRUE
                                            END
                                        )
                                    
                                    
                            )
                        AND
                            (
                                SELECT
                                        COUNT(Images.id)
                                FROM
                                        Images
                                WHERE
                                        Images.ontable = 'coba_investor_declarations'
                                    AND
                                        Images.onid = coba_investor_declarations.id
                            ) > 0
                ) 
                = 
                (
                    SELECT
                            COUNT(coba_declarations.id)
                    FROM
                            coba_declarations
                    WHERE
                            coba_declarations.dec_type = 'checklist'
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
                        AND
                            (
                                CASE WHEN 
                                    (ext_data.account_type = 'individual' AND ext_data.not_have_passport = 1) OR
                                    (ext_data.account_type = 'joint' AND ext_data.not_have_passport = 1 AND ext_data.not_have_passport_ap2 = 1)
                                THEN
                                    coba_declarations.nickname != 'passport_copy'
                                ELSE
                                    TRUE
                                END
                            )
                        AND
                            (
                                CASE WHEN 
                                    (ext_data.account_type = 'individual' AND ext_data.not_have_id_card = 1) OR
                                    (ext_data.account_type = 'joint' AND ext_data.not_have_id_card = 1 AND ext_data.not_have_id_card_ap2 = 1)
                                THEN
                                    coba_declarations.nickname != 'id_copy'
                                ELSE
                                    TRUE
                                END
                            )
                        AND
                            (
                                CASE WHEN 
                                    (ext_data.account_type = 'individual' AND ext_data.in_uscitizen = 'yes') OR
                                    (ext_data.account_type = 'joint' AND ext_data.in_uscitizen = 'yes' AND ext_data.uscitizen_second_ap = 'yes')
                                THEN
                                    coba_declarations.nickname != 'w8ben'
                                ELSE
                                    TRUE
                                END
                            )
                        AND
                            (
                                CASE WHEN 
                                    (ext_data.account_type = 'individual' AND ext_data.in_uscitizen = 'no') OR
                                    (ext_data.account_type = 'joint' AND ext_data.in_uscitizen = 'no' AND ext_data.uscitizen_second_ap = 'no')
                                THEN
                                    coba_declarations.nickname != 'w9'
                                ELSE
                                    TRUE
                                END
                            )
                        AND
                            (
                                CASE WHEN 
                                    (ext_data.account_type = 'corporate' AND ext_data.is_listed_company = 'yes') OR
                                    (ext_data.account_type = 'corporate' AND ext_data.in_uscitizen = 'yes')
                                THEN
                                    coba_declarations.nickname != 'w8bene'
                                ELSE
                                    TRUE
                                END
                            )
                        
                )
            ) THEN
                0
            ELSE
                1
            END AS is_missing_document

        ");
       
    }
    
    function toRooSingleArray($au, $q)
    {
        $ret = $this->toArray();
        
        if(!empty($q['_with_lexis_nexis'])){
            
            $ff = HTML_FlexyFramework::get();
            
            if(!empty($ff->Coba) && !empty($ff->Coba['LexisNexis'])){
                
                $file = "{$ff->Pman['storedir']}/soap/responses/{$ret['userdata_id']}.json";
                
                $ret['is_lexis_nexis_search_completed'] = (file_exists($file)) ? 1 : 0;
                
                $ret['total_lexis_nexis'] = 0;
                
                if (!$ret['is_lexis_nexis_search_completed']  ) {
                    return $ret;
                }
                
                $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
                $coba_investor_lexis_results->setFrom(array(
                    'investor_id' => $ret['userdata_id'],
                    'is_active' => 1
                ));
                $coba_investor_lexis_results->whereAdd("coba_investor_lexis_results.status != -1");
                
                $ret['total_lexis_nexis'] = $coba_investor_lexis_results->count();
                
                $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
                $coba_investor_lexis_results->setFrom(array(
                    'investor_id' => $ret['userdata_id'],
                    'is_active' => 1,
                    'status' => 0
                ));
                
                $ret['is_lexis_nexis_view_completed'] = ($coba_investor_lexis_results->count()) ? 0 : 1;
                
            }
        }
        
        if(!empty($q['_with_compliance_status'])){
            
            $ret['compliance_status'] = 'PENDING';
            $ret['compliance_status_by'] = '';
            $ret['compliance_coba_investor_notes'] = 0;
            
            $coba_investor_notes = DB_DataObject::factory('coba_investor_notes');
            $coba_investor_notes->setFrom(array(
                'investor_id' => $ret['userdata_id'],
                'note_type' => 'COMPLIANCE REJECTED'
            ));
            
            if($coba_investor_notes->find(true)){
                $ret['compliance_status'] = 'REJECTED';
                $ret['compliance_status_by'] = DB_DataObject::factory('core_person')->load($coba_investor_notes->created_by)->name;
                $ret['compliance_coba_investor_notes'] = $coba_investor_notes->toArray();
            } else {
                
                $events = DB_DataObject::factory('Events');
                $events->setFrom(array(
                    'modx_users_id' => $ret['userdata_id'],
                    'action' => 'COMPLIANCE APPROVED'
                ));
                
                if($events->find(true)){
                    $ret['compliance_status'] = 'APPROVED';
                    $ret['compliance_status_by'] = DB_DataObject::factory('core_person')->load($events->person_id)->name;
                }
                
            }
        }
        
        return $ret;
    }
    
    function beforeDelete($dependants, $roo)
    {
        $roo->jerr('ERROR', 'Record delete is not allowed');
    }
    
    function beforeUpdate($old, $q,$roo)
    {    			    	  
        if(!empty($q['_is_delete'])){
            $ff = HTML_FlexyFramework::get();
            $pg = $ff->page;
            $au = $pg->getAuthUser();		                    	
            if ($au->id) {
                $this->deleted_by = $au->id;
                $this->deleted_dt = date('Y-m-d H:i:s');                	
            }        	                           
        }
        
        if(!empty($q['_accept'])){
            
            $e = $roo->addEvent('COMPLIANCE APPROVED', false, 'Compliance officer approved');
        
            $o = clone($e);
            $e->modx_users_id = $this->userdata_id;
            $e->update($o);
            $roo->jok('OK');
        }
        
    }
    
    function getUserName()
    {
        if($this->in_middlename !='' ) {
            return $this->in_firstname. " " . $this->in_middlename. " " .$this->in_lastname;        
        }
        return $this->in_firstname. " " .$this->in_lastname;
    }
    
    function getUserNameSecAp()
    {    	
        if($this->middlename_second_ap !='' ) {
            return $this->firstname_second_ap." " . $this->middlename_second_ap. " ".$this->lastname_second_ap;                    
        }
        return $this->firstname_second_ap." ".$this->lastname_second_ap;        
    }
    
    function getFullName()
    {
        if($this->account_type == 'corporate'){
            return $this->company_name;
        }
        
        $fullname = array();
        
        foreach (array('in_firstname', 'in_middlename', 'in_lastname') as $k) {
            if (empty($this->{$k})) {
                continue;
            }
            
            $fullname[] = $this->{$k};
        }
        
        $fullname = implode(' ', $fullname);
        
        return $fullname;
    }
    
}
