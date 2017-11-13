<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_investor_lexis_results extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_investor_lexis_results';

    public $id;
    public $investor_id;
    public $match_id;
    public $updated_by;
    public $updated_dt;
    public $reason;
    public $is_active;
    public $status;
    
    function onUpdate($old, $q, $roo)
    {
        $this->addActivityEvent($old, $roo);
        
        $this->validateProcess($roo);
    }
    
    function addActivityEvent($old, $roo)
    {
        switch ($this->status) {
            case 1 :
                $action = 'LEXIS NEXIS ACCEPT';
                $remarks = 'Lexis Nexis Accepted';
                break;
            case -1:
                $action = 'LEXIS NEXIS REJECT';
                $remarks = 'Lexis Nexis Rejected';
                break;
            default :
                
                if($old->status == 1){
                    $action = 'LEXIS NEXIS UN-ACCEPT';
                    $remarks = 'Lexis Nexis Un-accepted';
                    break;
                }
                
                $action = 'LEXIS NEXIS UN-REJECT';
                $remarks = 'Lexis Nexis Un-rejected';
                    
                break;
        }
        
        $e = $roo->addEvent($action, $this, $remarks);
        
        $o = clone($e);
        $e->modx_users_id = $this->investor_id;
        $e->update($o);
        
    }
    
    function validateProcess($roo)
    {
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        $coba_investor_lexis_results->setFrom(array(
            'investor_id' => $this->investor_id,
            'is_active' => 1,
            'status' => 0
        ));
        
        if($coba_investor_lexis_results->count()){
            return;
        }
        
        $modx_users = DB_DataObject::factory('modx_users');
        
        if(empty($this->investor_id) || !$modx_users->get($this->investor_id)){
            return;
        }
        
        $modx_users->sendLexisNexisComplianceEmail();
        
    }
    
}
