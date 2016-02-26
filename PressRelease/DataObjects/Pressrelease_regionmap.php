<?php
/**
 * Table Definition for pressrelease_regionmap
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_regionmap extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_regionmap';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $category_id;                     // int(11)  not_null multiple_key
    public $country;                         // string(8)  

    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    function applyFilters($q, $au)
    {
        $x= DB_DataObject::factory('pressrelease_regionmap');
        if (!$x->count()) {
            $this->initData();
        }
        $this->selectAdd(" i18n_translate('c' , country, 'en') as country_name");
        $this->orderBy('country_name ASC');
        if (!empty($q['_tree'])) {
            return $this->outputTree($q);
        }
    }
    
    function outputTree($q)
    {
        $r = DB_DataObject::Factory('pressrelease_category');
        $r->get('name', 'Publication Scope');
        $pid = $r->id;
        
        $regions = array();
        
        if ($q['node'] == '_root') {
            $r = DB_DataObject::Factory('pressrelease_category');
            $r->parent_id = $pid;
            $r->get('name', 'International');
            $rid = $r->id;
            
            $r = DB_DataObject::Factory('pressrelease_contact');
            $r->category_scope_id = $rid;
            $n  = $r->count();
            $regions= array(
                 array(
                    'text' => 'General News ',
                    'name' => 'General News',
                    'id' => '_generalnews',
                    'leaf' => true
                ),
                array(
                    'text' => 'International (' . $n . ')',
                    'name' => 'International',
                    'id' => '_international',
                    'leaf' => false
                )
               
            );
            $pg = HTML_FlexyFramework::get()->page;
            $pg->jdata( $regions );
            return; // dies technically..
            
        }
        
        
        if ($q['node'] == '_international') { 
            // first output all the regions.
            //DB_DataObject::debugLevel(1);
            $r = DB_DataObject::Factory('pressrelease_category');
            $r->parent_id = $pid;
            $r->get('name', 'Regional');
            
            $rid = $r->id;
            $r = DB_DataObject::Factory('pressrelease_category');
            $r->parent_id = $rid;
            $r->orderBy('name ASC');
            $r->selectAdd();
            $r->selectAdd("
                id, name,
                (SELECT COUNT(id)
                        FROM pressrelease_contact
                        WHERE
                            pressrelease_contact.country IN (
                                SELECT country
                                    FROM pressrelease_regionmap
                                    WHERE
                                        pressrelease_regionmap.category_id = pressrelease_category.id
                            )
                        AND
                            category_scope_id = $rid
                    ) as members
            ");
            
            
            
            $r->find();
            while ($r->fetch()) { 
                $regions[] = array(
                        'text' => 'Region: ' . $r->name . ' ('.$r->members .')',
                        'name' => 'Region: ' . $r->name,
                        'id' => 'r-' . $r->id,
                        'leaf' => false
                );
            }
            
            $regions[] = array(
                'text' => 'Other',
                'id' => 'r-0',
                'leaf' => false
            );
            $pg = HTML_FlexyFramework::get()->page;
            $pg->jdata( $regions );
            return; // dies technically..
        }
        
        $id = (int) substr($q['node'],2);
        $r = DB_DataObject::Factory('pressrelease_category');
        $r->parent_id = $pid;
        $r->get('name', 'Local');
        $rid = $r->id;
        //DB_DataObject::debugLevel(1);
        // fetch all the countries on bulk.
        $rm = DB_DataObject::Factory('pressrelease_regionmap');
        $rm->selectAdd();
        $rm->category_id = $id;
        $rm->selectAdd("id, category_id, country, 
                    i18n_translate('c' , country, 'en') as name,
                    (SELECT COUNT(id)
                        FROM pressrelease_contact
                        WHERE
                            pressrelease_contact.country = pressrelease_regionmap.country
                        AND
                            category_scope_id = $rid
                    ) as members
            ");
        $rm->orderBy('name ASC');
        
        $rm->having('members > 0');
        
        $rm->find();
        while ($rm->fetch()) {
            $regions[]  = array(
                    'text' => $rm->name .' ('. $rm->members.')',
                    'name' => $rm->name,
                    'id' => $rm->country,
                    'country' => $rm->country,
                    'leaf' => true,
            );           
        }
        
        // now convert this into data that we can give to the tree..
        
          $pg = HTML_FlexyFramework::get()->page;
            $pg->jdata( $regions );
        
    }
    
    
    function initData()
    {
        $x = DB_DataObject::factory('i18n');
        $x->ltype = 'c';
        $x->inlang = 'en';
        $a = $x->fetchAll('lkey');
        foreach($a as $c) {
            $x= DB_DataObject::factory('pressrelease_regionmap');
            $x->country = $c;
            
            if (!$x->count()) {
                $x->category_id = 0;
                $x->insert();
            }
        }
        
        
    }
    
    
    
    
    
}
