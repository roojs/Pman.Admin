<?php
/**
 * Table Definition for pressrelease_entry_related
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_entry_related extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_entry_related';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $entry_id;                        // int(11)  
    public $relationship;                    // string(128)  
    public $table_name;                      // string(128)  
    public $table_id;                        // int(11)  

    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
