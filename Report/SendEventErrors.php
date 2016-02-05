<?php

require_once 'Pman/Roo.php';

class Pman_Admin_Report_SendEventErrors extends Pman_Roo
{
    static $cli_desc = "Send event errors occured in the last 24 hours";
    
    static $cli_opts = array(
        
    );
    
    function getAuth()
    {
        $ff = HTML_FlexyFramework::get();
        
        if (!$ff->cli) {
            die("cli only");
        }
        
        return true;
    }
    
    function get()
    {
        $this->transObj = DB_DataObject::Factory('core_enum');
        
        $this->transObj->query('BEGIN');
        
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));
        
        $hydra_person = DB_DataObject::factory('hydra_person');
        $hydra_person->company_processed = 0;
        $cols = $hydra_person->table();
        
        if(!isset($cols['company_processed'])){
            $this->jerr('Migration has been completed. Do not need to run again');
        }
        
        foreach ($hydra_person->fetchAll() as $hydra_person){
            
            $core_enum = DB_DataObject::factory('core_enum');
            
            if(
                    empty($hydra_person->employer_id) || 
                    !empty($hydra_person->company_processed) ||
                    !$core_enum->get($hydra_person->employer_id)
            ){
                continue;
            }
            
            $company = DB_DataObject::factory('hydra_company');
            $company->whereAdd("BINARY name = '{$company->escape($core_enum->name)}'");
            
            if(!$company->find(true)){
                $company = DB_DataObject::factory('hydra_company');
                $company->name = $core_enum->name;
                $company->insert();
            }
            
            $o = clone($hydra_person);
            $hydra_person->employer_id = $company->id;
            $hydra_person->company_processed = 1;
            $hydra_person->update($o);
            
        }
        
        $this->jok("Done");
        
    }
    
    
}