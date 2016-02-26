<?php

require_once 'Pman/Core/Notify.php';

class Pman_PressRelease_Import_LocalSearch_Run extends Pman_Core_Notify {
     static $cli_desc = "Runs the Search on all active localsearches
                        
                        /etc/cron.d/pman-pressrelease-localsearch-run
                        * *  * * *     www-data     /usr/bin/php /home/...../admin.php  PressRelease/Import/LocalSearch/Run > /dev/null
    
";
    
    
    static $cli_opts = array(
        'debug' => array(
            'desc' => 'Turn on debugging (see DataObjects debugLevel )',
            'default' => 0,
            'short' => 'v',
            'min' => 1,
            'max' => 1,
            
        ),
        
    );
    var $target = 'PressRelease/Import/LocalSearch/Fetch';
    
    var $max_pool_size = 10; // not too paralell...
    
    var $maxruntime = 1800; // 30minutes...
    
    var $limitDay = 31; // do this for a whole month... - as it appears some sites are changing alot...
    
    function get($r,$opts)    
    {
        if ($opts['debug']) {
            DB_DataObject::debugLevel($opts['debug']);
            print_r($opts);
        }
        
        #2544 Prune Reader....
        $this->pruneReaders();
        
        $this->opts = $opts;
        
        $this->buildSearch();
        
        $w = DB_DataObject::factory('pressrelease_auto_import');
        $w->use_local_search = 1;
        $w->is_active = 1; //check if active #2476
        
        $ar = $w->fetchAll();
        
        
        //echo "BATCH SIZE: ".  count($ar) . "\n";
        $pushed = array();
        $requeue = array();
        while (true) {
            
            
            $this->logecho("BATCH SIZE: ".  count($ar) );
            
            if (empty($ar)) {
                $this->logecho("COMPLETED MAIN QUEUE - running pushed");
                
                if (empty($pushed)) {
                    break;
                }
                $ar = $pushed;
                $pushed = false;
                continue;
            }
            
            
            $p = array_shift($ar);
            if (!$this->poolfree()) {
                array_unshift($ar,$p); /// put it back on..
                sleep(3);
                continue;
            }
            
            
            $this->run($p->id,false);
            
            
            
        }
        $this->logecho("COMPLETED MAIN QUEUE - waiting for everything to end.");
        
        // we should have a time limit here...
        while(count($this->pool)) {
            $this->poolfree();
             sleep(3);
        }
          
        
        $this->logecho("DONE");
        exit;
    }
    
    function buildSearch()
    {
        
        $releases = DB_DataObject::factory('Pressrelease_entry');
        $releases->whereAdd("publish_dt > (NOW() - INTERVAL 60 DAY) AND publish_dt < NOW()");
        $releases->orderBy('id DESC');
        foreach($releases->fetchAll() as $p){
            $c = DB_DataObject::factory('Projects');
            if(!$c->get('pressrelease_id', !empty($p->parent_id) ? $p->parent_id : $p->id)){
                echo "Project Not Found at release: {$p->id} skipping...\n";
                continue;
            }
            
            if (empty($p->parent_id)) {
                echo "ADD feed for #{$p->id} {$p->headline}\n";
                $p->buildFeeds();
            }
            $this->buildAutoImport($p);
        }
        //die("STOP\n");
    }
     
    // fixme --> move to pressrelease_entry..
    
    function buildAutoImport($p)
    {
        
        $camp = DB_DAtaObject::Factory('Projects');
        if (!$camp->get('pressrelease_id',   $p->parent_id ? $p->parent_id : $p->id)) {
            die("missing project for ". print_R($p,true));
        }
        
        
        // #2162
        $x = DB_DataObject::factory('Pressrelease_auto_import');
        $x->use_local_search = 0;
        $x->is_active = 1;// check if active #2476
        
        $releaseIsTC = ($p->language == 'zh_HK' || $p->language == 'zh_TW' ) ? 'tc' : false;
        $importIsTC = false;
        
        $ff = HTML_Flexyframework::get();
        
        foreach($x->fetchAll() as $u){
            $rr = DB_DataObject::factory('Reader_article');
            
            $importIsTC = ($u->language == 'zh_HK' || $u->language == 'zh_TW' ) ? 'tc' : false;
            
            if(!empty($u->language)){// if  empty language should check all
                if($u->language != $p->language){
                    if(!$releaseIsTC || !$importIsTC){
                        if($ff->cli){
                            echo "Not Match Language SKIP Release: {$p->id} \n";
                        }
                        continue;
                    }
                }
            }
            
            
            $url = str_replace('{id}', $p->id, $u->url);
            
            $rr->url = $url;// replace the id to press releases id
            $rr->url_md5 = md5($url);
            $rr->src_id = 0;
            $rr->campaign_id = $camp->id;
            $rr->language = empty($u->language) ? $p->language : $u->language; // use the press release language if the import is not set..
            if(!$rr->find(true)){
                $rr->real_url = $url;
                $rr->real_url_md5 = md5($url);
                $rr->headline = $p->headline; // kludge...
//                $rr->src_id = $p->id;
                $rr->act_when = date('Y-m-d', strtotime($p->publish_dt. '+1 HOUR'));// set to the publish date + 1 hour
                $rr->published_dt = date('Y-m-d', strtotime($p->publish_dt. '+1 HOUR'));
               // print_r($rr);exit;
                $rr->insert();
                if($ff->cli){
                    echo "ADD reader_article: {$rr->id} $url\n";
                }
                //$this->addEvent('PRESSRELEASED', $rr, $p->id);
            } else {
                if($ff->cli){
                    echo "SKIP reader_article: {$rr->id}  $url\n";
                }
            }
        }
    }
    
    function pruneReaders()
    {
         return; // not needed..
         //DB_DataObject::debugLevel(1);
        $d = DB_DataObject::Factory('reader_sub');
        $d->selectAdd();
        $d->selectAdd('reader_sub.id as id');
        $d->_join  = "
            left join
                CampaignAssign
            on
                reader_sub.campaign_assign_id = CampaignAssign.id
            LEFT JOIN
                Projects
            ON
                Projects.id = CampaignAssign.project_id
        ";
        $d->whereAdd('Projects.close_date < NOW()');
        $ar = $d->fetchAll();
        foreach($ar as $a) {
            $a->delete();
        }
        
        // now remove all the feeds that do not have any subscriptions
        
        $d = DB_DataObject::Factory('reader_feed');
        $d->selectAdd();
        $d->selectAdd('id , (select count(id) from reader_sub where feed_id = reader_feed.id) as subs');
        $d->having('subs < 1');
        $ar = $d->fetchAll('id', 'subs');
        //print_R($ar);
        $d = DB_DataObject::Factory('reader_feed');
        $d->whereAddIn('id', array_keys($ar), 'int');
        $ar = $d->fetchAll();
        foreach($ar as $a) {
            $a->delete();
        }
    }
}
