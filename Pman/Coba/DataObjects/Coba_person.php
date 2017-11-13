<?php

require_once 'Pman/Core/DataObjects/Core_person.php';

class Pman_Coba_DataObjects_Coba_person extends Pman_Core_DataObjects_Core_person 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_person';
    
    function beforeDelete($dependants, $roo)
    {
        $coba_address = DB_DataObject::factory('coba_address');
        $coba_address->get($this->coba_address_id);
        $coba_address->delete();
        
    }
    
}
