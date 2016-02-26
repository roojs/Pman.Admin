<?php
require_once 'Pman.php';

class Pman_PressRelease_DistributionReport extends Pman {
    
    var $masterTemplate = 'mail/dashboardmaster.html';
    var $template = 'mail/dashboardmail.html';
    
    var $days = 10;
    var $email = false;
    var $direct_news_feed = false;
    var $from = false;
    var $subject = false;
    
    var $urlmap=  array(
            'https://release.media-outreach.com/' => 'http://localhost/'
        );

    
    function getAuth() 
    {
        
        $au = $this->getAuthUser();
        if (!$au) {
             $this->jerr("Not authenticated", array('authFailure' => true));
        }
        $this->authUser = $au;
        // check that it's a supplier!!!! 
        
        return true; 
    }
    function post()
    {
        $args = array('id','email','days');
        foreach($args as $a) {
            if (!empty($_REQUEST[$a])) {
                continue;
            }
            
            $this->jerr("missing : $a");
        }
        
        if(!empty($_REQUEST['name'])){
            $this->name = $_REQUEST['name'];
        }
        
        if(!empty($_REQUEST['subject'])){
            $this->subject = $_REQUEST['subject'];
        }
        
        $direct_news_feed = empty($_REQUEST['direct_news_feed']) ? false : true;
        
        $email = array_unique(array_filter(json_decode($_REQUEST['email'])));
        
        $m = $this->buildReport( $_REQUEST['id'], $_REQUEST['days'], $email, $direct_news_feed);
        $err = $m->send();
        if ($err !== true) {
            $this->jerr($err->toString());
        }
        $this->jok("SENT");
        
        
    }
    
    function get($id='')
    {
        if (empty($id)) {
            $this->jerr("no id!?");
        } // debuggin
        
        $days = empty($_REQUEST['days']) ? 10 : (int) $_REQUEST['days'];
        
        $direct_news_feed = empty($_REQUEST['direct_news_feed']) ? false : true;
        
        $this->buildReport($id, $days, false, $direct_news_feed);
        
    }
    function buildReport($id, $days, $email = false, $direct_news_feed = false)
    {   
        $this->days = $days;
        $this->email = $email;
        $this->direct_news_feed = $direct_news_feed;
        
        
        $ff = HTML_FlexyFramework::get();
        $http_host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : 'pman.HTTP_HOST.not.set';
        if (isset($ff->Pman['HTTP_HOST'])) {
            $http_host  = $ff->Pman['HTTP_HOST'];
        }
        $this->HTTP_HOST = $http_host;
        $this->fullBaseImageURL = 'https://'.$http_host . $this->baseURL . '/Images/Thumb';
       
        
        $this->release  = DB_DataObject::Factory('pressrelease_entry');
        $this->release->get($id);
        
        $this->overview();
        
        $pr = DB_DataObject::Factory('Projects');
        if (!$pr->get('pressrelease_id', $this->release->id)) {
            return;
        }
        $this->project = $pr;
        $pr = DB_DataObject::Factory('Projects');
        $pr->whereAddIn('pressrelease_id', array_keys($this->languages), 'int');
        
        $this->projects_ids = $pr->fetchAll('id');
        
        
        $this->searchEngines();
        
        $this->clippingSummary($this->release);
        $this->historical();
        
        if(empty($email)){
            return;
        }
        
        return $this->buildEmail();
       
    }
    
    function overview()
    {
        //DB_DataObject::debugLevel(1);
        $versions = $this->release->versionsAll();
        $this->languages_total = count($versions);
        $this->versions = $versions;
        
        
        
        require_once 'Pman/Core/I18n.php';
        $x = new Pman_Core_I18n();
        
        $langs=  array();
        
        $this->releases = array();
        $countries = array();
        $regions = array();
        
        foreach($versions as $v) {
            $langs[$v->id] = $x->translate('en', 'l', $v->language);
            $v->inlanguages = '';
            if (!$v->parent_id) {
                $this->releases[$v->id] = $v;
            }
            $ld = $v->distributionSummary();
             
            if (!empty($v->distribution_countries)) {
                $countries = array_unique(array_merge($countries, $ld['countries']));
            }
            if (!empty($ld['regions'])) {
                $regions = array_unique(array_merge($regions, $ld['regions']));
            }
            
        }
        ksort($this->releases);
        foreach($versions as $v) {
            $pid = empty($v->parent_id)  ? $v->id : $v->parent_id;
            $this->releases[$pid]->inlanguages .= strlen($this->releases[$pid]->inlanguages) ? ", " : '';
            $this->releases[$pid]->inlanguages .=  $x->translate('en', 'l', $v->language);
        }
        
        
        $this->languages = $langs;
        
        $this->releaseDistribution($this->release);
        
        
        $distribution = $this->release->distributionSummary();
         
        $this->beats_total = count($distribution['beats']);
         
        $this->countries_total = count($countries);
        $distribution['countries'] = $countries;
        $distribution['regions'] = $regions;
        
        // gen/internationl/regiona apac / hk/thailand
         $this->distribution = (object) $distribution;
        
        
    }
    function releaseDistribution($release)
    {
        $versions = $release->versionsAll();
        
        $ids = array();
        foreach($versions as $v) {
            $ids[] = $v->id;
        }
         
//        $langs = $this->languages;
        
        $pn = DB_DataObject::factory('pressrelease_notify');
        $pn->autoJoin();
        $pn->whereAdd("
            (
                (pressrelease_notify.msgid IS NOT NULL AND LENGTH(pressrelease_notify.msgid) > 0) AND
                pressrelease_notify.event_id > 0
            ) AND
                ( pressrelease_notify.onid IN (" . implode(',', $ids ) . ")) 
            AND
                ( pressrelease_notify.ontable = 'pressrelease_entry' )
            AND
                ( pressrelease_notify.evtype = 'MAIL' )
        ");
        $release->delivered_total = $pn->count();
        
    }
    
    
    function searchEngines()
    {
        
        $cl = DB_DataObject::Factory('Clipping');
        $cl->selectAdd();
        $cl->selectAdd('distinct(company_id) as company_id');
        $cl->whereAddIn('project_id',  $this->projects_ids , 'int');
        //$cl->project_id = $this->project->id;
        $cl->whereAdd('rejected = 0');
        $cl->whereAdd("published < '{$this->release->publish_dt}' + INTERVAL {$this->days} DAY");
        $cl->useIndex('lookup_company');
        $coids = $cl->fetchAll('company_id');
        
        $co = DB_DataObject::Factory('Companies');
        $co->whereAddIn('id', $coids , 'int');
        $this->suppliers = $co->fetchAll();
        
        
        
        
        
    }
    function clippingSummary($release)
    {
        $versions = $release->versionsAll();
        $ids = array();
        foreach($versions as $v) {
            $ids[] = $v->id;
        }
        $pr = DB_DataObject::Factory('Projects');
        $pr->whereAddIn('pressrelease_id', $ids, 'int');
        
        $projects_ids = $pr->fetchAll('id');
        
        //$pr = DB_DataObject::Factory('Projects');
        //if (!$pr->get('pressrelease_id', $release->id)) {
        //    return;
        //}
        
//        DB_DataObject::debugLevel(1);
        $cl = DB_DataObject::Factory('Clipping');
        $cl->selectAdd();
        $cl->whereAddIn('project_id',  $projects_ids , 'int');
        //$cl->project_id =$pr->id;
        $cl->whereAdd('rejected = 0');
        $cl->selectAdd("
            count(distinct media_name) as media_total,
            count(id) as clipping_total,
            sum(circulation) as reach_total
            "
        );
        $cl->whereAdd("published < '{$release->publish_dt}' + INTERVAL {$this->days} DAY");
        
        $cl->find(true);
        foreach(array('media', 'clipping', 'reach') as $k) {
            $release->{$k .'_total'} = number_format($cl->{$k .'_total'},0);
        }
        //DB_Dataobject::debugLevel(1);
        // now let's get the clippings..
        $cl = DB_DataObject::Factory('Clipping');
        $cl->selectAdd("
            i18n_translate('c', Clipping.country, 'en') as country_name,
            i18n_translate('l', language, 'en') as language_tr
        ");
        $cl->whereAddIn('project_id',  $projects_ids , 'int');
        //$cl->project_id = $this->project->id;
        $cl->whereAdd('rejected = 0');
        
        $cl->whereAdd("published < '{$release->publish_dt}' + INTERVAL {$this->days} DAY");
       // $cl->useIndex('lookup_company');
        $cl_dist = clone($cl);
        $cl_dist->orderBy('circulation DESC');
        
        $release->clippings_dist = array();
        $release->clippings_dist_feed = array();
        
        foreach ($cl_dist->fetchAll() as $c){
            if(!empty($c->release_is_feed) && !empty($this->direct_news_feed)){
                $release->clippings_dist_feed[] = $c;
                continue;
            }
            
            $release->clippings_dist[] = $c;
        }
        
        $cl->orderBy('country_name ASC, circulation DESC');
        
        $release->clippings = array();
        $release->clippings_feed = array();
        
        foreach ($cl->fetchAll() as $c){
            $advalue = empty($c->release_is_feed) ? 2000 : 1000;
            $c->advalue = number_format($advalue, 0);
            
            if(!empty($c->release_is_feed) && !empty($this->direct_news_feed)){
                $release->clippings_feed[] = $c;
                continue;
            }
            
            $release->clippings[] = $c;
        }
        
        $release->advalue_total = number_format(1000 * count($release->clippings_feed) + 2000 * count($release->clippings));
        
    }
    
    function historical()
    {
        // find all the main press releases done by this company.
        $pr = DB_DataObject::Factory('pressrelease_entry');
        $pr->client_id = $this->release->client_id;
        $pr->whereAdd('id != '. $this->release->id);
        $pr->whereAdd('id < '. $this->release->id); // do not show newer ones..
        $pr->whereAdd('parent_id = 0 AND same_as_id = 0');
        $pr->limit(10);
        $pr->whereAdd('publish_status > -1');
        $pr->whereAdd('publish_dt > NOW() - INTERVAL 1 YEAR'); // timezone!
        $pr->orderBy('id DESC');
        $this->history= $pr->fetchAll();
        
        foreach($this->history as $i=>$h) {
//            $this->releaseDistribution($h);
            $this->clippingSummary($h);
        }
        
        
    }
    
    function show_direct_news_feed()
    {
        return $this->direct_news_feed;
    }
     
    function days()
    {
        $ends = array('th','st','nd','rd','th','th','th','th','th','th');
        if (($this->days %100) >= 11 && ($this->days %100) <= 13) {
           return $this->days . 'th';
        }
        return $this->days .  $ends[$this->days % 10];
    }
    
    function daysHtml()
    {
        $ends = array('th','st','nd','rd','th','th','th','th','th','th');
        if (($this->days %100) >= 11 && ($this->days %100) <= 13) {
           return $this->days . 'th';
        }
        return $this->days .  '<sup>' . $ends[$this->days % 10] .'</sup>';;
    }
    
    function buildEmail()
    {
       
        
        /* output the body if no masterTemplate is set */
  
          
        $template_engine = new HTML_Template_Flexy();
        $template_engine->compile($this->masterTemplate);
        
        
        $html = $template_engine->bufferedOutputObject($this,$this->elements);
        
        require_once 'Pman/Core/Mailer.php';
        
      
        $m = new Pman_Core_Mailer(array(
            'template'=> 'dashboardmaster',
            'page' => $this,
            'cache_images' => false,  // force regeneration..
            'replaceImages' => true,
            'urlmap' => $this->urlmap,
            'css_embed' => true,
            'contents' => array(
                'sender' => (empty($this->name)) ? 'support@media-outreach.com' : ('"' . addslashes($this->name) . '" <support@media-outreach.com>'),
                'email' => is_array($this->email) ? implode(',', $this->email) : $this->email, //'alan@roojs.com',
                'subject' => (empty($this->subject)) ? "#{$this->release->id} - Media OutReach News Dashboard {$this->days()} Day Report - " . $this->release->headline : $this->subject,
            ),
            //'debug' => 1,
            
            
            
            
        ));
        //print_R($m);
        return $m;
        
        //$m->send();
        
        
        
    }
    
    function toWordUrl()
    {
        if(!empty($this->direct_news_feed)){
            return "https://{$_SERVER['HTTP_HOST']}{$this->baseURL}/PressRelease/DistributionReport/ExportWord/{$this->release->id}?days={$this->days}&direct_news_feed=1";
        }
        return "https://{$_SERVER['HTTP_HOST']}{$this->baseURL}/PressRelease/DistributionReport/ExportWord/{$this->release->id}?days={$this->days}";
    }
    
    function toExcelUrl()
    {
        if(!empty($this->direct_news_feed)){
            return "https://{$_SERVER['HTTP_HOST']}{$this->baseURL}/PressRelease/DistributionReport/ExportXLS/{$this->release->id}?days={$this->days}&direct_news_feed=1";
        }
        return "https://{$_SERVER['HTTP_HOST']}{$this->baseURL}/PressRelease/DistributionReport/ExportXLS/{$this->release->id}?days={$this->days}";
    }
    
    function releaseLogo()
    {
        $img = DB_DataObject::factory('Images');
        $c = DB_DataObject::Factory('Companies');
        $c->get($this->release->client_id);
        $img->imgtype = 'LOGO';
        $logo = $img->gather($c, 'image/%');
        
        if(empty($logo)){
            return '';
        }
        $logo = array_shift($logo);
        
        $width = 260;
        $height = $logo->height * ($width / $logo->width);
        
        if($height > 60){
            $height = 60;
            $width = $logo->width * ($height / $logo->height);
        }
        
        return $logo->toHTML("{$width}x{$height}", $this->fullBaseImageURL);
    }
    
    function hasClippingsDist()
    {
        return empty($this->release->clippings_dist) ? false : true;
    }
    
    function hasClippingsDistFeed()
    {
        return empty($this->release->clippings_dist_feed) ? false : true;
    }
    
    function hasClippings()
    {
        return empty($this->release->clippings) ? false : true;
    }
    
    function hasClippingsFeed()
    {
        return empty($this->release->clippings_feed) ? false : true;
    }
    
    function media_write_up_total()
    {
        return empty($this->release->clippings) ? 0 : count($this->release->clippings);
    }
    
    function news_online_posting_total()
    {
        return empty($this->release->clippings_feed) ? 0 : count($this->release->clippings_feed);
    }
    
    function release_is_feed()
    {
        return empty($this->direct_news_feed) ? false : true;
    }
    
    function advalue_total($type)
    {   
        $total = array(
            'media' => 0,
            'posting' => 0,
            'all' => 0,
        );
        
        if(!array_key_exists($type, $total)){
            return 0;
        }
        
        $all = array_merge($this->release->clippings, $this->release->clippings_feed);
        
        foreach ($all as $a){
            $total['media'] += (empty($a->release_is_feed)) ? 2000 : 0;
            $total['posting'] += (empty($a->release_is_feed)) ? 0 : 1000;
            $total['all'] += (empty($a->release_is_feed)) ? 2000 : 1000;
        }
        
        return number_format($total[$type], 0);
        
    }
    function mapurl($in)
    {
        
        foreach($this->urlmap as $o=>$n) {
            if (strpos($in,$o) === 0) {
                $ret =$n . substr($in,strlen($o));
              //  $this->log("mapURL in $in = $ret");
                return $ret;
            }
        }
        //$this->log("mapurl no change - $in");
        return $in;
         
        
    }
}
