<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_investor_notes extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_investor_notes';

    public $id;
    public $investor_id;
    public $created_by;
    public $created_dt;
    public $notes;
    public $note_type;

    function onInsert($q, $roo)
    {
        if(!empty($this->note_type) && $this->note_type == 'COMPLIANCE REJECTED'){
            
            $this->addComplianceLog($roo);
            
            DB_DataObject::factory('modx_users')->load($this->investor_id)->sendComplianceRejectionEmail();
        }
    }
    
    function addComplianceLog($roo)
    {
        $e = $roo->addEvent('COMPLIANCE REJECTED', $this, 'Compliance officer rejected');
        
        $o = clone($e);
        $e->modx_users_id = $this->investor_id;
        $e->update($o);
        
    }
    
}
