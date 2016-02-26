<?php
/**
 * Table Definition for pressrelease_auto_import
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_auto_import extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_auto_import';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $url;                             // blob(65535)  blob
    public $language;                        // string(6)  not_null
    public $local_search_url;
    public $use_local_search;
    public $is_active;
    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    
    function applyFilters($q, $au, $roo)
    {
        $this->selectAdd("
            (SELECT
                lval
            FROM
                i18n
            WHERE
                i18n.lkey = pressrelease_auto_import.language
                AND
                i18n.ltype = 'l'
                AND
                i18n.inlang = 'en'
            ) AS language_name
        ");
    }
    
    
    function beforeUpdate($old, $q,$roo)
    {
        if($this->checkURL($q['url']) && $old->url != $q['url']){
            $roo->jerr('URL already existing');
        }
    }
    
    function beforeInsert($q,$roo)
    {
        if($this->checkURL($q['url'])){
            $roo->jerr('URL already existing');
        }
    }
    
    /**
     * Check the url is already existing or not
     * 
     * the URL must be unique
     * 
     * 
     * @param string $url
     * @return boolean
     * 
     * 
     */
    function checkURL($url)
    {
        $x = DB_DataObject::factory($this->tableName());
        if($x->get('url', $url)){
            return true;
        }
        return false;
    }
    
}
