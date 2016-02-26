<?php
/**
 * Table Definition for Category
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_category extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_category';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $parent_id;                       // int(11)  not_null multiple_key
    public $name;                            // string(128)  not_null
    public $display_order;                   // int(11)  not_null
    public $visible;                         // int(1)  not_null
    public $hgroup;                          // string(128)  not_null
    public $clist;                           // blob(65535)  not_null blob

    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    
     
    function applyFilters($q, $au, $roo)
    {
       // DB_Dataobject::debugLevel(1);
        if (!empty($q['for_beat'])) {
            if (empty($q['contact_id'])) {
                $this->selectAdd('0 as member');
            } else {
                $uid = (int) $q['contact_id'];
                $this->selectAdd('IFNULL( (SELECT id
                        FROM pressrelease_beats
                        WHERE 
                            category_id=pressrelease_category.id  AND 
                            contact_id='. $uid.'), 0) as member');
            }
            
        }
        
        
        if (!empty($q['query']['with_empty_member'])) {
            //DB_DataObject::debugLevel(1);
            $this->selectAdd('0 as member');
        }
        if (!empty($q['query']['hide_empty_member'])) {
            // only list beats with members in them...
             $this->whereAdd('
                    pressrelease_category.id IN (
                        SELECT distinct(category_id) as cid FROM pressrelease_beats
                    )');
             
            
        }
        
        
        
        /// possibly deprecated...
        if (isset($q['query']['only_countries'])) { /// show countries..
            if (empty($q['query']['only_countries'])) {
                $this->whereAdd('1=0');
                return;
            }
            
            // this is more complex now..
            
            // get all the scope types.
            
            $pc = DB_DataObject::factory('pressrelease_category');
            $pc->get('name', 'Publication Scope');
            $pcid = $pc->id;
            $pc = DB_DataObject::factory('pressrelease_category');
            $pc->parent_id = $pcid;
            $smap = $pc->fetchAll('name','id');
            foreach($smap as $n=>$id) {
                $smap[strtolower($n)] = $id;
            }
            
            // DB_Dataobject::debugLevel(1);
            $b = DB_DataObject::factory('pressrelease_beats');
            $b->autoJoin(array('joinType'=>'INNER'));
            
            $b->selectAdd();
            $b->selectAdd('distinct(pressrelease_beats.category_id) as distinct_cats');
            
            $wq = array();
            foreach(explode(",",$q['query']['only_countries']) as $c) {
                if (empty($c)) {
                    continue;
                }
                list($ct,$scope) = explode('_', $c); //
                $ct = $this->escape($ct);
                $wq[] =  "
                        (
                            join_contact_id_id.country = '$ct'
                             AND 
                            join_contact_id_id.category_scope_id = {$smap[$scope]}
                        )
                        ";
            }
            $ar = array();
            if (!empty($wq)) {
                // no countries specified.
                $b->whereAdd(implode(' OR ', $wq));
                $ar = $b->fetchAll('distinct_cats');
            }
            if (empty($ar)) {
                $this->whereAddIn('pressrelease_category.id', $ar, 'int');
            } else {
                $this->whereAdd( '1= 0');
            }
            
        }
        // this is the type list..
        // we only want to list pub scope and type of db if matches are found.
        $this->applyFilterCountryTree($q,$au);
        
        if (isset($q['_tree']) && $q['parent_id'] == 'REGIONS') {
            
            
            
            $roo->jdata(array());
            exit;
            
            
            
            
        }
        
        
    }
    
    function applyFilterCountryTree($q,$au)
    {
         
        $general = false;
        $international = false;
        $regions = array();
        
        /// possibly deprecated...
        if (!isset($q['query']['only_countries_tree'])) {
            return;
        }
        //DB_DataObject::DebugLevel(1);
            /// show countries..
        if (empty($q['query']['only_countries_tree'])) {
            $this->whereAdd('1=0');
            return;
        }
            
            // this is more complex now..
        $cn = array();
        $ar = explode(',', $q['query']['only_countries_tree']);
        foreach($ar as $k) {
            switch ($k) {
                case '_international':
                    $international = true;
                    break;
                
                case '_generalnews':
                    $general = true;
                    break;
                
                case ($k[1] == '-'): // regional.
                    $regions[] = array_pop(explode('-', $k));
                    break;
                
                default:
                    $cn[] = $k;
                
            }
        }
        
        $pscope = DB_DAtaObject::Factory('pressrelease_category');
        $pscope->parent_id = 0;
        $pscope->get('name', 'Publication Scope');
        
        // always hide the 'general data...
        
        $this->whereAdd("pressrelease_category.hgroup  != 'General News'");
        
        // build the countries for the regions..
        
        
        // look through contacts with matching data..
        // and use that with _beats to determine what to show..
        $match  = array();
        if ($international) {
            $international = $pscope->childCalled('International');
            $match[] = "pressrelease_contact.category_scope_id =  {$international->id}";
        }
        
        
        if ($regions) {
            $r = DB_DAtaObject::Factory('pressrelease_regionmap');
            $r->whereAddIn('category_id', $regions,'int');
            $regions = $r->fetchAll('country');
            $region = $pscope->childCalled('Regional');
            // get the region category.
            $match[] = "
                pressrelease_contact.category_scope_id =  {$region->id}
                AND
                pressrelease_contact.country in ('". implode("','", $regions) . "')
            ";
        }
        if ($cn) {
            
            $local = $pscope->childCalled('Local');
            // get the region category.
            $match[] = "
                pressrelease_contact.category_scope_id =  {$local->id}
                AND
                pressrelease_contact.country in ('". implode("','", $cn) . "')
            ";
        }
        
        // mysql is stupidly slow on inner joins..
        $b = DB_DAtaObject::Factory('pressrelease_beats');
        
        $b->whereAdd( !empty($match) ? "
                    pressrelease_beats.contact_id IN (
                        SELECT DISTINCT(pressrelease_contact.id) FROM pressrelease_contact WHERE
                            (" . implode(') OR (' ,$match) . ") 
                            
                    ) 
            " : " 1 = 0 "
        );
        
        $b->selectAdd();
        $b->selectAdd('DISTINCT(pressrelease_beats.category_id) as category_id');
        $ids = $b->fetchAll('category_id');
                     
        
        $this->whereAddIn("pressrelease_category.id", $ids, 'int'); 
        
        
        
        return;
             
    }
    
     

    
    function childCalled($name)
    {
        $d = DB_DataObject::factory('Pressrelease_category');
        $d->parent_id = $this->id;
        $d->visible = 1;
        $d->get('name', $name);
        return $d;
        
    }
    function children($opts = array())
    {
        //DB_DataObject::debugLevel(1);
        $d = DB_DataObject::factory('Pressrelease_category');
//        $dc = DB_DataObject::factory('cms_category_type');
//        $d->joinAdd( $dc,'LEFT');
        $d->selectAs();
        
  //      $d->selectAs($dc, 'category_type_id_%s');
        $d->parent_id = $this->id;
        $d->orderBy('display_order ASC, name ASC');
        $d->visible = 1;
        return $d->fetchAll();
    }
    
    function parents() {
        
        if (!$this->parent_id) {
            return false;
        }
        $ret = $this->parent()->parents();
        $ret = $ret || array();
        
        $ret[] = $this->parent_id;
        return $ret;
        
    }
    
    
    function parent() {
        if (!$this->parent_id) {
            return false;
        }
        $d = DB_DataObject::factory('Pressrelease_category');
        //$dc = DB_DataObject::factory('cms_category_type');
        //$d->joinAdd( $dc,'LEFT');
        $d->selectAs();
        //$d->selectAs($dc, 'category_type_id_%s');
        $d->id = $this->parent_id;
        $d->limit(1);
        $d->find(true);
        
        return $d;
    }
 
    
    
    
    function toName() {
        if (!$this->parent_id) {
            return '';
        }
        $pn = $this->parent()->toName();
        
        $ret = strlen($pn) ? $pn .': ' : '';
        return $ret . (strlen($this->hgroup ) ? ($this->hgroup . ' - ' ) : '') . $this->name;
    }
    
    function onUpdate($old, $r,$roo) 
    {
        if (!empty($r['_update_regionmap'])) {
            // trusting?
            $ar = implode( "','", explode(',',$r['_update_regionmap']));
           // DB_DataObject::DebugLevel(1);
            $q= DB_DataObject::Factory('pressrelease_regionmap');
            $q->query("UPDATE
                        pressrelease_regionmap
                        SET category_id = {$this->id}
                        WHERE
                        country IN ('{$ar}')
                      ");
            
            
            
            
        }
        
        
        
    }
    
}
