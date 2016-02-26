<?php
/**
 * Table Definition for builder
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_contact extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_contact';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $category_type_id;                // int(11)  not_null
    public $honor;                           // string(8)  
    public $name;                            // string(255)  not_null
    public $name_alt;                        // string(255)  not_null
    public $company_id_name;                 // string(255)  not_null
    public $role;                            // string(255)  not_null
    public $email;                           // string(255)  not_null
    public $email2;                           // string(255)  not_null
    public $email3;                           // string(255)  not_null
    public $email_personal;                  // string(255)  not_null
    public $phone;                           // string(255)  not_null
    public $fax;                             // string(128)  not_null
    public $address;                         // blob(65535)  blob
    public $category_media_id;               // int(11)  not_null
    public $submission_time;                 // string(64)  not_null
    public $contact_language;                // string(8)  not_null
    public $url;                             // string(255)  not_null
    public $remarks;                         // blob(65535)  blob
    public $phone_mobile;                    // string(255)  not_null
    public $phone_direct;                    // string(255)  not_null
    public $firstname;                       // string(255)  not_null
    public $lastname;                        // string(255)  not_null
    public $firstname_alt;                   // string(255)  not_null
    public $lastname_alt;                    // string(255)  not_null
    public $publication_name;                // string(255)  not_null
    public $publication_name_alt;            // string(255)  not_null
    public $publication_lang;                // string(8)  not_null
    public $category_scope_id;               // int(11)  not_null
    public $contact_language_alt;            // string(8)  not_null
    public $country;                         // string(8)  not_null
    public $best_contact_method;             // string(32)  not_null
    public $best_contact_from;               // string(8)  not_null
    public $best_contact_to;                 // string(8)  not_null
    public $best_contact_days;               // string(8)  not_null
    public $publication_lang_alt;            // string(8)  not_null
    public $city;                            // string(255)  not_null

    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    function applyFilters($q, $au,$roo)
    {
        $tn = $this->tableName();
        // DB_Dataobject::debugLevel(1);
        
        $this->selectAdd("i18n_translate('c' , pressrelease_contact.country, 'en') as country_name"); 
        
        $this->_extra_cols = array( 'country_name' );
        
        $c = DB_DataObject::factory('pressrelease_category');
            
        if (!empty($q['query']['category_id']) &&
            $c->get((int)$q['query']['category_id']) &&
            $c->parent_id
            )  {
            $cp = DB_DataObject::factory('pressrelease_category');
            $cp->get($c->parent_id);
            switch(strtolower($cp->name)) {
                case 'news beat':
                    $this->whereAdd('
                        pressrelease_contact.id in ( SELECT DISTINCT(contact_id) FROM pressrelease_beats WHERE category_id = '. $c->id .')
                    ');
                    break;
                    
                case 'type of database':
                    $this->category_type_id = $c->id;
                    break;
                    
                case 'type of media':
                    $this->category_media_id = $c->id;
                    break;
                case 'publication scope':
                    $this->category_scope_id = $c->id;
                    break;
                
            }
        }
        if (!empty($q['query']['countries']) ) {
            $this->whereAddIn('country', explode(',', $q['query']['countries']), 'string');
        }
        
        
        if (!empty($q['query']['search_name']) ) {
            $v= $this->escape($q['query']['search_name']);
            
            // find matching beats.
            $cp = DB_DataObject::factory('pressrelease_category');
            $cp->whereAdd(" hgroup like '%$v%' OR name like '%$v%' ");
            $gq = '';
            if ($cp->count()) {
                $grps = implode(',', $cp->fetchAll('id'));
                $gq = " OR
                    pressrelease_contact.id IN (
                        SELECT distinct(contact_id)
                            FROM pressrelease_beats
                            WHERE category_id IN ($grps)
                    )
                ";
            }
            
            
            $this->whereAdd("
                pressrelease_contact.firstname like '%$v%'
                OR
                pressrelease_contact.lastname like '%$v%'
                OR
                pressrelease_contact.firstname_alt like '%$v%'
                OR
                pressrelease_contact.lastname_alt like '%$v%'
                OR
                pressrelease_contact.email like '%$v%'
                OR
                pressrelease_contact.email2 like '%$v%'
                OR
                pressrelease_contact.email3 like '%$v%'
                OR
                pressrelease_contact.publication_name  like '%$v%'
                  OR 
                pressrelease_contact.company_id_name  like '%$v%'
                  OR
                i18n_translate('c' , pressrelease_contact.country, 'en')  like '%$v%'
                $gq
                
                
            ");
            
            
            
            //DB_DATaObject::debugLevel(1);
       
        }
        
        
        // OLD distribution filter
        
        if (!empty($q['query']['members']) && is_array($q['query']['members'])) {
           // DB_DATaObject::debugLevel(1);
            $ids = array();
            $maps = DB_DataObject::factory('pressrelease_category');
            $maps->whereAdd("parent_id = 0 OR name='Regional'");
            
            $map = $maps->fetchAll('id', 'name');
            
            
            foreach($q['query']['members'] as $k=>$v) {
                // clean it..
                $x = explode(',',$v);
                $v = array();
                foreach($x as $xx) {
                    $v[] = (int) $xx;
                }
                switch (strtolower($map[$k])) {
                     case 'news beat':
               
                        $this->whereAdd('
                            pressrelease_contact.id in (
                                SELECT DISTINCT(contact_id)
                                    FROM pressrelease_beats WHERE
                                        category_id IN( '. implode(',', $v) .')
                            )
                        ');
                        break;
                    case 'type of database':
                        $this->whereAddIn('pressrelease_contact.category_type_id', $v, 'int');
                        break;
                        
                    case 'type of media':
                        $this->whereAddIn('pressrelease_contact.category_media_id', $v, 'int');
                        break;
                    case 'publication scope':
                        $this->whereAddIn('pressrelease_contact.category_scope_id', $v, 'int');
                        break;
                    case 'regional':
                        $this->category_scope_id = $k;
                        
                        $r = DB_DAtaObject::Factory('pressrelease_regionmap');
                        $r->whereAddIn('category_id', $v ,'int');
                        $regions = $r->fetchAll('country');
                        
                        // get the region category.
                        $this->whereAdd( "
                        
                            pressrelease_contact.country in ('". implode("','", $regions) . "')
                        ");
                        
                        
                        //$q['search']['country'] = $
                        break;
                        
                    
                        
                }
                
                
                 
            }
            
        }
        
        
        
        if (!empty($q['query']['country_pick'])) {
            $this->whereAdd("country != ''");
            $this->selectAdd();
            $this->selectAdd('
                    DISTINCT( pressrelease_contact.country) as country,
                    count(pressrelease_contact.id) as country_num,
                    0 as country_match,

                    0 as member' );
             
            
            $this->groupBy('pressrelease_contact.country');
            
        }
        
        if (isset($q['_with_country_name'])) {
             $lang = $this->escape($au->lang); 
            $this->selectAdd("i18n_translate('c', pressrelease_contact.country, '$lang') as country_name");
             $this->orderBy('country_name ASC');
        }
        
        if (isset($q['search']['country'])) {
            //DB_DataObject::debugLevel(1);
            $lang = $this->escape($au->lang); // just in case..
            //DB_DATAOBJECT::debugLevel(1);
            $this->selectAdd("i18n_translate('c', pressrelease_contact.country, '$lang') as country_name");
            if (!empty($q['search']['country'])) { 
                $pn = $this->escape($q['search']['country']); // just in case..
                $this->having("country_name like '$pn%'");
            }
            // manually add sort
            if (!empty($q['sort']) && $q['sort'] == 'country_name') {
                $this->orderBy('country_name ASC');
            }
            
        }
        if (isset($q['search']['role'])) {
            $ar = json_decode($q['search']['role']);
           // DB_DataObject::debugLevel(1);
            if (!empty($ar)) { 
                $this->whereAddIn('pressrelease_contact.role', $ar, 'string');
            }
            
        }
         if (isset($q['search']['category_media_id'])) {
            $ar = json_decode($q['search']['category_media_id']);
           // DB_DataObject::debugLevel(1);
            if (!empty($ar)) { 
                $this->whereAddIn('pressrelease_contact.category_media_id', $ar, 'int');
            }
            
        }
        if (isset($q['search']['country_ar'])) {
            $ar = json_decode($q['search']['country_ar']);
           // DB_DataObject::debugLevel(1);
            if (!empty($ar)) { 
                $this->whereAddIn('pressrelease_contact.country', $ar, 'string');
            }
            
        }
        
        // role based permissions.
        
        if (!empty($au->role)) {
            
            $this->whereAddIn('pressrelease_contact.country', explode(',', $au->role), 'string');
            
        }
         
        
        if (isset($q['search']['publication_lang'])) {
             //DB_DataObject::debugLevel(1);
            $lang = $this->escape($au->lang); // just in case..
            $this->selectAdd("
                            i18n_translate('l', pressrelease_contact.publication_lang, '$lang') as publication_lang_name,
                            i18n_translate('l', pressrelease_contact.publication_lang_alt, '$lang') as publication_lang_alt_name
                            ");
            if (!empty($q['search']['publication_lang'])) {
                if ($q['search']['publication_lang'] == '??') {
                    $this->whereAdd("pressrelease_contact.publication_lang = ''");
                    
                } else {
                    // this is a bit strange why are we searching by country name???
                    $pn = $this->escape($q['search']['publication_lang']); // just in case..
                    /*
                    $this->having("
                            publication_lang_name like '$pn%'
                            OR
                            publication_lang_alt_name like '$pn%'
                            ");
                    */
                    $this->whereAdd("publication_lang = '$pn' OR publication_lang_alt = '$pn'" );
                    
                }
            }  
        }
        if (!empty($q['search']['publication_name'])) {
            //DB_DataObject::debugLevel(1);
            $pn = $this->escape($q['search']['publication_name']); // just in case..
            $this->whereAdd("pressrelease_contact.publication_name like '$pn%'");
        }
        /*if (!empty($q['search']['role'])) {
            //DB_DataObject::debugLevel(1);
            $pn = $this->escape($q['search']['role']); // just in case..
            $this->whereAdd("pressrelease_contact.role like '$pn%'");
        }
        */
        if (!empty($q['search']['category_media_id_name'])) {
            //DB_DataObject::debugLevel(1);
            $pn = $this->escape($q['search']['category_media_id_name']); // just in case..
            $this->whereAdd("join_category_media_id_id.name like '$pn%'");
        }
        
        
        // approvals...
        if (!empty($q['query']['for_approval'])) {
           
            
            
            // this should really be a query on the core_notify table with
            // information available from this table.
            
            // to do this we need to really implement a method on the core_notify table
            // that can join the source table, 
            
            // search for approvals.
            //DB_DataObject::debugLevel(1);
            $n = DB_DataObject::factory('core_notify');
            $n->autoJoin();
            $n->person_id = $au->id;
            $n->ontable = $this->tableName();
            $n->whereAdd('sent < act_when'); // not issued yet..
            $n->whereAdd("join_watch_id_id.medium = 'APPROVAL'");
            $tp  = '';
            if (!empty($q['query']['_edited_by'])) {
                $n->trigger_person_id = $q['query']['_edited_by'];
               $tp = "AND
                    join_core_notify.trigger_person_id = " . (int) $q['query']['_edited_by'];
            }
            $nn = clone($n);
            $ids = $n->fetchAll('onid');
           // print_R($ids);exit;
            $this->whereAddIn('pressrelease_contact.id', $ids , 'int');
            //$this->selectAdd('')
            if (empty($ids)) {
                $this->whereAdd('1=0');
                return;
            }
            
            $this->_join .= "
                INNER JOIN core_notify join_core_notify
                        ON
                            join_core_notify.onid = {$tn}.id
                        AND
                            join_core_notify.ontable = '{$tn}'
                        AND
                            join_core_notify.sent < join_core_notify.act_when
                        AND
                            join_core_notify.person_id = {$au->id}
                        AND
                            join_core_notify.id IN (". implode(',', $nn->fetchAll('id')) . ") 
                        $tp
                          
                LEFT JOIN core_watch join_watch_id_id
                    ON
                        join_watch_id_id.id = join_core_notify.watch_id
                    AND
                        join_watch_id_id.medium = 'APPROVAL'
                    
                
                LEFT JOIN Person join_core_notify_trigger_person_id_id
                    ON
                        join_core_notify_trigger_person_id_id.id = join_core_notify.trigger_person_id
            ";
            
            //$this->_extra_cols = isset($this->_extra_cols ) ? $this->_extra_cols  : array();
            
            $cn = DB_DataObject::Factory('core_notify');
            $this->selectAs($cn, 'core_notify_%s', 'join_core_notify');
            
            
            // this should be supoorted by dataobject..
            foreach($cn->table() as $k=>$t) {
                //$this->_extra_cols[sprintf("core_notify_%s", $k)] = 'join_core_notify.' . $k;
                $this->_extra_cols[] = sprintf("core_notify_%s", $k);
                
            }
            
            
            $cn = DB_DataObject::Factory('Person');
            $this->selectAs($cn, 'core_notify_trigger_person_id_%s', 'join_core_notify_trigger_person_id_id');
            
            
            // this should be supoorted by dataobject..
            foreach($cn->table() as $k=>$t) {
                
                //$this->_extra_cols[sprintf("core_notify_%s", $k)] = 'join_core_notify.' . $k;
                $this->_extra_cols[] = sprintf("join_core_notify_trigger_person_id_%s", $k);
                
            }
           // echo '<PRE>';print_r($this->_extra_cols);exit;
            
            
            /*
             $n = DB_DataObject::factory('core_notify');
            $n->autoJoin();
            $n->person_id = $au->id;
            $n->ontable = $this->tableName();
            $n->whereAddIn('core_notify.onid', $ids, 'int');
            $n->whereAdd('sent < act_when'); // not issued yet..
            $n->whereAdd("join_watch_id_id.medium = 'APPROVAL'");
            $n->orderBy('act_when ASC'); // so latest deletes oldest
            $n->find();
            while ($n->fetch()) {
                $ret[$map[$n->onid]] = array_merge(
                    $ret[$map[$n->onid]] ,
                    $n->toArray('core_notify_%s')
                );
            }
            */
            
            
        } 
        
        if (!$au->hasPerm('PressRelease.JournalistAll','S')) {
            // they can only view their own entries.
            
            $e = DB_DataObject::Factory('Events');
            $e->on_table = 'pressrelease_contact';
            $e->person_id = $au->id;
            $e->selectAdd();
            $e->selectAdd('distinct(on_id) as on_id');
            $ar = $e->fetchAll('on_id');
            if ($ar) { 
                $this->whereAddIn('pressrelease_contact.id', $ar, 'int');
            }
            
        }
        if (isset($q['distfilter'])) {
            $this->applyDistributionFilter($q['distfilter']);
        }
        
        if (isset($q['query']['failed']) || isset($q['query']['with_failed_flag'])) {
            // need to find address that have failed, and are still stored on our system..
            
            // if we are looking for failed, and not revieweed yet..
            // then we can claim that if something was delivered to that person,
            // after the failure then we can update the fail-reviewed = 1
            $pn = DB_DataObject::factory('pressrelease_notify');
            $pnt = $pn->tableName(); 
            
            // does not handle the review stuff..
            
            // failed_reviewed is part of notify.. - or stored proc might need to check that..
            
            $this->selectAdd("
                CASE WHEN
                        email_fails > 0 OR email2_fails > 0 OR email3_fails > 0
                    THEN 1
                  ELSE 0
                  END
                as is_failed
            ");
            
            if (!empty($q['query']['bad_only'])) {
                $this->whereAdd("(email_fails > 0 OR email2_fails > 0 OR email3_fails > 0)");
            }
            
            
            if (!isset($q['query']['with_failed_flag'])) {
                // we are only looking for failures..
                 
                $this->whereAdd("
                    email_fails > 0 OR email2_fails > 0 OR email3_fails > 0
                ");
                 
                 
               // $this->having("is_failed = 1");
            }
            /*
            //DB_DataObject::debugLevel(1);
            $pn = DB_DataObject::factory('pressrelease_notify');
            $pn->setFrom(array(
                'ontable' => 'pressrelease_entry',
                
            ));
            $args = array(
                    'vtype' => 'FAILED'
                );
            if (!empty($q['query']['unreviewed']) || isset($q['query']['with_failed_flag'])) {
                $args['fail_reviewed'] = 0;
            }
            $pn->applyFilters( $args, $au, $roo);
            $pn->selectAdd();
            $pn->selectAdd('DISTINCT(person_id) as person_id' );
            $ids = $pn->fetchAll('person_id');
            
            if (isset($q['query']['with_failed_flag'])) {
                $this->selectAdd(" 
                    ( {$tn}.id IN (". implode(',', $ids) .")  ) as is_failed
                " );
            } else {
            
                $this->whereAddIn("{$tn}.id", $ids , 'int');
            }
            */
            
        }
         
        
    }
    
    /**
     * tree filtered :
     * countries : - HK,CN,XX,_international,_general..
     * beats
     * ignores general ... in coutnreis unless beats is set.. 
     */
    function applyDistributionFilter($cfg)
    {
         $general = false;
        $international = false;
        $regions = array();
        
        //DB_DataObject::DebugLevel(1);
            // this is more complex now..
        $cn = array();
        $ar = explode(',', $cfg['countries']);
        foreach($ar as $k) {
            switch ($k) {
                case '_international':
                    $international = true;
                    break;
                
                case '_generalnews':
                    $general = true;
                    break;
                
                case (!empty($k) && ($k[1] == '-')): // regional.
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
        if (!empty($match) ) {
         
            $this->whereAdd(  "(" . implode(') OR (' ,$match) . ")");
        }
        // ontop of that...
        // apply beats..
        $v = strlen($cfg['beats']) ? explode(',' , $cfg['beats']) : array();
        if ($general) {
          
            $pc = DB_DAtaObject::Factory('pressrelease_category');
            
            // always hide the 'general data...
            
            $pc->hgroup  = 'General News';
            $vv = $pc->fetchAll('id');
            if ($vv) { 
                $v = array_merge($v, $vv);
            }
        }
        
           
        if (empty($v)) {
            $this->whereAdd('1=0');
            return;
        }
        $this->whereAdd('
                pressrelease_contact.id in (
                    SELECT DISTINCT(contact_id)
                        FROM pressrelease_beats WHERE
                            category_id IN( '. implode(',', $v) .')
                )
            ');
        //echo '<PRE>';print_r($cfg);
        if (isset($cfg['blacklist'])) {
            $blacklist = $this->escape($cfg['blacklist']);
            $this->selectAdd("
                  LOCATE( CONCAT(',', pressrelease_contact.id, ','), ',{$blacklist},') AS blacklist_pos
            ");
        }
        
        
    }
    
    
    function onUpdate($old, $req)
    {
        $this->updateBeats($req);
        
        $this->updateFailReview($old);
        
    }
    
    
    function onInsert($req)
    {
        $this->updateBeats($req);
        
    }   
    function updateBeats($req) 
    {
        
        if (!isset($req['beats'])) {
            return;
        }
       
        $cur = $this->beats();
        
        $new = explode(',', $req['beats']);
        $nochange = array();
        foreach($cur as $c) {
            if (!in_array($c->category_id, $new)) {
                // removed..
                $c->delete();
                continue;
            }
            // it's in there,, we can ignore
            $nochange[] = $c->category_id;
        }
        
        // what to add..
        
        foreach($new as $n) {
            if (in_array($n, $nochange)) {
                continue;
            }
            $c = DB_DataObject::factory('pressrelease_beats');
            $c->contact_id = $this->id;
            $c->category_id = $n;
            $c->insert();
        }
        
         
        
    }
    
    
    function beforeDelete(&$ar)
    {
        
        // permissions have already be checked...
        
        foreach($ar as $do)
        {
            $deps = $do->fetchAll();
            foreach($deps as $d) {
                $d->delete(); // we do not log this!!!
            }
            
        }
        $ar = array();
        
        
        
    }
    
    
    
    function beats()
    {
        $c = DB_DataObject::factory('pressrelease_beats');
       //  DB_DataObject::debugLevel(1);
        $c->autoJoin();
        $c->contact_id = $this->id;
        $c->orderBy('category_id_name ASC');
        return  $c->fetchAll();
    }
    
    function toRooArray($request)
    {
        $ret = $this->toArray();
        if (!empty($request['query']['count_members'])) {
            $x = DB_DataObject::Factory('pressrelease_contact');
            $x->country = $this->country;
            $ret['country_match'] = $x->numberMatch($request);
             
        }
        
        
        if (!empty($request['query']['_with_beats'])) {
                
            $beats = array();
            $ar = $this->beats() ;
            if (count($ar) > 10) {
                $ret['beats'] = 'More than 10 news beats';
            } else { 
                foreach( $this->beats() as $b) {
                    $beats[] = ($b->category_id_hgroup ?  $b->category_id_hgroup . ' : ' : '') . $b->category_id_name;
                }
                $ret['beats'] = implode(', ', $beats);
            }
        }
        return $ret;
    }
    function postListFilter($ret, $au, $request)
    { 
        
        if (!empty($request['query']['for_approval'])) {
            //DB_DataObject::debugLevel(1);
            /*
            $ids = array();
            foreach($ret as $n=>$c) {
                $ids[] = $c['id'];
                $map[$c['id']] = $n;
            }
            
            // need to fill in who and when they where edited last.
            // this is actually available from notify.
            $n = DB_DataObject::factory('core_notify');
            $n->autoJoin();
            $n->person_id = $au->id;
            $n->ontable = $this->tableName();
            $n->whereAddIn('core_notify.onid', $ids, 'int');
            $n->whereAdd('sent < act_when'); // not issued yet..
            $n->whereAdd("join_watch_id_id.medium = 'APPROVAL'");
            $n->orderBy('act_when ASC'); // so latest deletes oldest
            $n->find();
            while ($n->fetch()) {
                $ret[$map[$n->onid]] = array_merge(
                    $ret[$map[$n->onid]] ,
                    $n->toArray('core_notify_%s')
                );
            }
            */
           
        }
        
        return $ret;
        
        
    }
    
    function numberMatch($q)
    {
        static $map = false;
        
        if ($map === false) { 
            //DB_DATaObject::debugLevel(1); print_R($q);
            $ids = array();
            $maps = DB_DataObject::factory('pressrelease_category');
            $maps->parent_id = 0;
            $map = $maps->fetchAll('id', 'name');
        }
        //DB_DATaObject::debugLevel(1); 
       //echo '<PRE>';print_r($q);
       //print_R($map);
        
        foreach($q['query']['count_members'] as $k=>$vv) {
            // clean it..
            $x = explode(',',$vv);
            $v = array();
            foreach($x as $xx) {
                $v[] = (int) $xx;
            }
            //var_Dump(strtolower($map[$k]));
            switch (strtolower($map[$k])) {
                 case 'news beat':
           
                    $this->whereAdd('
                        pressrelease_contact.id in (
                            SELECT DISTINCT(contact_id)
                                FROM pressrelease_beats WHERE
                                    category_id IN( '. implode(',', $v) .')
                        )
                    ');
                    break;
                case 'type of database':
                    $this->whereAddIn('pressrelease_contact.category_type_id', $v, 'int');
                    break;
                    
                case 'type of media':
                    $this->whereAddIn('pressrelease_contact.category_media_id', $v, 'int');
                    break;
                
                case 'publication scope':
                    $this->whereAddIn('pressrelease_contact.category_scope_id', $v, 'int');
                    break;
                    
            }
            
            
             
        }
        return $this->count();
    
        
        
        
    }
    
    function updateFailReview($old)
    {
        // when a contact has been edited, if the email addresses have been changed, then we can
        // flag 'fail_reveiewd' in the notify list for email
        // to_email != "" AND to_email IS NOT NULL and to_email NOT IN (... list of valid email)
        //DB_DataObject::debugLevel(1);
        $changed  = false;
         foreach (array(
                'email','email2', 'email3', 'email_personal'
            ) as $e) {
            
            if ($old->$e != $this->$e) {
                $changed = true;
            }
            
        }
        if (!$changed) {
            return;
        }
        
        
        
        // make this considerably simpler...
        
        $n = DB_DataObject::factory('pressrelease_notify');
        $n->query("
            UPDATE
                pressrelease_notify
            SET
                fail_reviewed = 1
            WHERE
                person_id = {$this->pid()}
                  
        ");
        return;
        
        // ----------------- old more complex version...
        
        
        $n = DB_DataObject::factory('pressrelease_notify');
        
        $addrs = array();
        foreach (array(
                $this->email,
                $this->email2,
                $this->email3,
                $this->email_personal,
            ) as $e) {
            if (empty($e) || !strlen(Trim($e))) {
                continue;
            }
            $addrs[] = $n->escape($e);
        }
        
        
        
        $n->setFrom(array(
            'ontable' => 'pressrelease_entry',
            //'vtype' => 'FAILED', // ???
            'fail_reviewed' => 0,
            'person_id' => $this->id,
        ));
        // FAILED.
        $n->whereAdd("
                   (pressrelease_notify.msgid IS NULL OR LENGTH(pressrelease_notify.msgid) < 1) AND
                   pressrelease_notify.event_id  > 0
                   ");
        
       
        $n->whereAdd("
                        to_email != ''
                        AND
                        to_email IS NOT NULL
        ");
        if (count($addrs)) { 
            $n->whereAdd( " 
                        to_email NOT IN ('" . implode("','", $addrs) ."')
            ");
            
            
            
        }
        
        $n->find();
        while ($n->fetch()) {
            $nn = clone($n);
            $nn->fail_reviewed = 1;
            $nn->update($n);
        }
        
        // now if we are updating and not changing the name..
        
        if (!count($addrs)) {
            return;
        }
        
        $n = DB_DataObject::factory('pressrelease_notify');
        $n->setFrom(array(
            'ontable' => 'pressrelease_entry',
            //'vtype' => 'FAILED', // ???
            'fail_reviewed' => 0,
            'person_id' => $this->id,
        ));
        
        $n->autoJoin();
        $n->orderBy('join_event_id_id.event_when DESC');
        
        // FAILED.
        $failed = clone($n);
        $tn = $n->tableName();
        $failed->whereAdd("
               ({$tn}.msgid IS NULL OR LENGTH({$tn}.msgid) < 1) AND
               {$tn}.event_id  > 0
               ");
        
        $delivered= clone($n);
        $delivered->whereAdd("
                ({$tn}.msgid IS NOT NULL AND LENGTH({$tn}.msgid) > 0) AND
                {$tn}.event_id  > 0
                ");
        
        foreach($addrs as $email) {
            $ff = clone($failed);
            $ff->limit(1);
            $ff->to_email = $email;
            $dd = clone($delivered);
            $dd->to_email = $email;
            $dd->limit(1);
            if (!$dd->find(true)) {
                continue;
            }
            if (!$ff->find(true)) {
                continue;
            }
            if (strtotime($ff->event_id_event_when) > strtotime($dd->event_id_event_when) ) {
                continue; // failed is after delivered.
            }
            // update all the failed to say reviewed..
            $ff = clone($failed);
            $ff->to_email = $email;
            $ff->find();
            while ($ff->fetch()) {
                $ffnn = clone($ff);
                $ff->fail_reviewed = 1;
                $ff->update($n);
            }
        
            
        }
        
        
        
        
        
    }
    function toEventString()
    {
        return implode(' ', array($this->email , $this->firstname, $this->lastname));
    }
    
}