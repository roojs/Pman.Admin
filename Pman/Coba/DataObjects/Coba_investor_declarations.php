<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_investor_declarations extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_investor_declarations';

    public $id;
    public $user_id;
    public $dec_id;
    public $is_agreed;
    public $agreed_dt;

    function applyFilters($q, $au, $roo)
    {
        
    }
    
    function getDocuments()
    {
        $images = DB_DataObject::factory('Images');
        $images->setFrom(array(
            'ontable' => $this->tableName(),
            'onid' => $this->id
        ));
        
        return $images->fetchAll(false, false, 'toArray');
    }
   

}
