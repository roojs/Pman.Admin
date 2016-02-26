<?php
/**
 * Table Definition for pressrelease_search
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_saved extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_saved';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $name;                            // string(255)  not_null multiple_key
    public $json;                            // blob(65535)  not_null blob

    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
     
    
}
