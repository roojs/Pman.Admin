<?php
/**
 * Table Definition for pressrelease_beats
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_beats extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_beats';    // table name
    public $id;                              // int(11)  not_null primary_key
    public $contact_id;                      // int(11)  not_null multiple_key
    public $category_id;                     // int(11)  not_null

    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    
}
