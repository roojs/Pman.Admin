<?php
/*
 *
 * FIXME - needs to handle rate limiting..
 *
 */
require_once 'Pman/Core/NotifySend.php';

class Pman_PressRelease_Import_SearchFetch extends Pman_Core_NotifySend
{
    var $masterTemplate = 'fetchable.html';
    
    
    static $cli_desc = "Fetch a campaignassign";
    
    static $cli_opts = array(
        'force-fetch' => array(
            'desc' => 'Force fetch',
            'default' => 0,
            'short' => 'F',
            'min' => 1,
            'max' => 1,
            
        ),
        
    );
    
    var $evtype = ''; // any notification...
    
    function getAuth()
    {
        if ($this->bootLoader->cli) {
            return true;
        }
        
        
        Pman::getAuth();
        $this->getAuthUser();
        
        if (!$this->authUser ) {
            $this->jerr("access denied");
        }
        $c= $this->authUser->company();
        if ($c->comptype !='OWNER') {
            $this->jerr("access denied");
        }
        header('Content-type: text/plain; charset=utf-8');
        
        
        return true;
    }
    
    
    function get($feed_id='', $opts = array())
    {
        //DB_DAtaObject::debugLevel(1);
        
        $feed_id = (int)$feed_id;
        if (!$feed_id) {
            die("No feed?");
        }
        //DB_DataObject::debugLevel(1);
         
        $assign = DB_DataObject::factory('CampaignAssign');
        $assign->autoJoin();
        if (!$assign->get($feed_id)) {
            $this->jerr("invalid id");
        }
        // at this point we have the campaign assign which includes 'lastfetched'
        
        $lastfetch = $assign->lastfetched;
        
        // in the first (2 days) 48 hours, we can query once every 4 hours.
        // in the first (7 days) 168 hours we can query once every 12 hours
         // in the first (14 days) 336 hours we can query once every 24 hours
        // after that we only query every 48 hours...
        
        $pr = DB_DAtaObject::Factory('pressrelease_entry');
        $pr->get($assign->project_id_pressrelease_id);
        
        $since_published = (time()- strtotime($pr->publish_dt)) / (60 * 60);
        
        var_dump($since_published);
        var_dump($lastfetch);
        
        print_r($opts);
        if (!empty($opts['force-fetch'])) {
            $since_published = 1;
            $lastfetch = '1970-01-01 01:01:01';
        }
        if ($since_published > (20 * 24)) {
                echo "article too old skipppng fetch";
                print_R($pr);
                die("\n");
        }
            
        
        
        if ($since_published < 48) {
            
            if (time() < strtotime($lastfetch . ' + 4 HOURS')) {
                echo "too soon - next fetch in " . date("Y-m-d H:i:s", strtotime($lastfetch . ' + 4 HOURS'));
                die("\n");
            }
        } else if ($since_published < 168) {
            if (time() < strtotime($lastfetch . ' + 12 HOURS')) {
                echo "too soon - next fetch in " . date("Y-m-d H:i:s", strtotime($lastfetch . ' + 12 HOURS'));
                die("\n");
            }
        } else if ($since_published < 336) {
            if (time() < strtotime($lastfetch . ' + 24 HOURS')) {
                echo "too soon - next fetch in " . date("Y-m-d H:i:s", strtotime($lastfetch . ' + 24 HOURS'));
                die("\n");
            }
         } else {
            if (time() < strtotime($lastfetch . ' + 48 HOURS')) {
                echo "too soon - next fetch in " . date("Y-m-d H:i:s", strtotime($lastfetch . ' + 48 HOURS'));
                die("\n");
            }
        }
        
        
        
        
         
        
        $languages = explode(",", $assign->languages);
        //print_r($languages);
        foreach($languages as $lang) {
            //print_r($assign);
            
                
            $feed  = $assign->createSearchFeed(false, false, $lang) ;
            $feed->id = 0; // fake feed..
            $feed->assign  = $assign;
            $feed->country = $assign->countries; //?? not multiple?
            $feed->language = $lang;
            //print_r($feed);
        
            
            if (empty($feed->parser)) {
                // create a fake reader_feed. and call download on it?
                
                $feed->id = 0; // fake feed..
                $feed->country = $assign->countries; //?? not multiple?
                $feed->language = $lang;
                
                $feed->download($this, false,array('campaign_id' => $assign->project_id, 'src_id' => $assign->id) );
                continue;
                
            }
            // next for - search based..
            
            
            $feed->id = 0; // fake feed..
            //echo "Using {$this->parser}\n";
            $country = empty($assign->country) ? 'HK' : $assign->country;
            
            
            require_once 'Pman/PressRelease/Import/Search/'. $feed->parser.'.php';
            $cls = 'Pman_PressRelease_Import_Search_'.$feed->parser;
            $x = new $cls;
            echo "RUNNING:$cls\n";
            // online searches should only be done every 12 hours..
            // otherwise we get blocked...
           
            $ret = $x->run($feed);
            //$ret = $x->parseSearch($this->params, strtolower($this->language), strtolower($this->country));
            
            if (!$ret) {
                continue;
                //return "No artices found when calling parser {$feed->parser}";
            }
            
            foreach($ret as $r) {
                
                $dom = DB_DataObject::factory('clipping_domain')->lookupUrl($r['url']);
                if ($dom && $dom->is_ignore) {
                    continue;
                }
                
                // make sure domain is not black listed..
                
                
                $feed->generateArticle($r,
                    array('campaign_id' => $assign->project_id, 'src_id' => $assign->id));
            }
            continue;
            
             
        }
        
        $oa = clone ($assign);
        $assign->lastfetched = $assign->sqlValue("NOW()");
        $assign->update($oa);
          
            
        die("done rss fetch");
        
    }
     
    
    function output() {
        if ($this->bootLoader->cli) {
            return parent::output();
        }
        die("FETCH DONE");
        return Pman::output();
        
        
    }
}