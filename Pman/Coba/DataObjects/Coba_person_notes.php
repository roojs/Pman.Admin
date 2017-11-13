<?php
/**
 * Table Definition for Coba_person_notes
 *
 * objects can implement relatedWhere(), which should return
 *    'tablename' => array of ids
 *
 * 
 */

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_person_notes extends PDO_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_person_notes';                          // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $coba_person_id;                  // int(11)  
    public $date_created;                     // date
    public $notes;                           // longtext

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    
    
    
    //  ------------ROO HOOKS------------------------------------
    function applyFilters($q, $au ,$roo)
    {
        $tn = $this->tableName();
        // if not empty on_table
                
        if (!empty($q['query']['from'])) {
            $dt = date('Y-m-d' , strtotime($q['query']['from']));
            $this->whereAdd(" {$tn}.date_created >=  '$dt' ");
        }
        if (!empty($q['query']['to'])) {
            $dt = date('Y-m-d' , strtotime($q['query']['to']));
            $this->whereAdd(" {$tn}.date_created <=  '$dt' ");
        }
 
        
       if (!empty($q['coba_person_id'])) {
 	    $coba_person_id = $this->escape($q['coba_person_id']);		
            //$dt = date('Y-m-d' , strtotime($q['query']['to']));
            $this->whereAdd(" {$tn}.coba_person_id <=  '$coba_person_id' ");
        }
         
 	if (!empty($q['_order_by'])) {
 	    $_order_by = $this->escape($q['_order_by']);
	    $this->orderBy($_order_by);		            
        }

	
                
    }
      
    
    
    /**
     * object :
     * return the object that this relates to.
     * 
     * @return {DB_DataObject} related object
     */
    function object()
    {
        $o = DB_DataObject::factory($this->on_table);
        $o->get($this->on_id);
        return $o;
        
    }
    
       
    function beforeInsert($request,$roo)
    {
        if(empty($this->date_created)){
            $this->date_created = $this->sqlValue("NOW()");
        }        
    }
    
}
