<?php
/**
 * Table Definition for pressrelease_search
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_search extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_search';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $person_id;                       // int(11)  not_null multiple_key
    public $title;                           // blob(65535)  not_null blob
    public $data;                            // blob(65535)  not_null blob

    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    function toRooArray() {
        if (empty($this->data)) {
            $this->title = 'Invalid search';
            return $this->toArray();
        }
        
        $cfg = (array) json_decode($this->data);
        
        //echo '<PRE>';print_r($cfg);
        
        require_once 'Pman/Core/I18n.php';
        $x = new Pman_Core_I18N();
        $au = HTML_FlexyFramework::get()->page->authUser;
         
        
        $title = array();
        foreach($cfg as $k=>$v) {
            
            if (empty($v)) {
                continue;
            }
            switch($k) {
                case 'query[search_name]':
                    $title[] = "Search: " . $v;
                    continue;
                
                case 'publication_name':
                    $title[] = "Publication: " . $v;
                    continue;
                 
                case 'publication_lang': // => en
                    $cfg['publication_lang_name'] = $x->translate($au, 'l', $v);
                    $title[] = "Language: " . $cfg['publication_lang_name'];
                    
                    continue;
                
                case 'country': //  CN
                    $cfg['country_name'] = $x->translate($au, 'c', $v);
                    $title[] = "Country: " . $cfg['country_name'] ;
                    continue;
                
                    
                case 'category_media_id': //  123
                    $cg = DB_DataObject::Factory('pressrelease_category');
                    $cg->get($v);
                    $cfg['category_media_id_name'] = $cg->toName();
                    $title[] = "Media Type: " . $cfg['category_media_id_name'];
                    continue;
                
                case 'query[category_id]': //  123
                    $cg = DB_DataObject::Factory('pressrelease_category');
                    $cg->get($v);
                    
                    //echo '<PRE>';print_r($cg);
                    $pars = $cg->parents();
                    $cgp = DB_DataObject::Factory('pressrelease_category');
                    $cgp->get($pars[0]);
                    
                    $cfg['category_id_parents'] = $pars;
                    $title[] = $cgp->name .": " . $cg->toName();
                    continue;
                
                
                case 'role':
                    $title[] = "Role: " . $v;
                    continue;
    
                    //[role] => Editorial Director
    
            }  
             
        }
        $this->data = json_encode($cfg);
        
         $ret = $this->toArray();
         $ret['title'] = implode(', ', $title);
        return $ret;
        
        
    }
    
}
