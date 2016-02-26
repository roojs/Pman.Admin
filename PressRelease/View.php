<?php 
require_once 'Pman.php';

class Pman_PressRelease_View extends Pman
{
    var $masterTemplate = 'view.plain.html';
    var $template = 'view.html';
    var $cls = 'Embed';
    var $isEmbed = 1;
    
    var $imageURL =  '/Images/Thumb';
    function getAuth() 
    {
        $ff = HTML_Flexyframework::get();
        if ($ff->cli) {
            return true;
        }
        $au = $this->getAuthUser();
        if (!$au) {
             $this->jerr("Not authenticated", array('authFailure' => true));
        }
        $this->authUser = $au;
        // check that it's a supplier!!!! 
        
        return true; 
    } 
     
    
    function get($id)
    {
        //removed to Pman_PressRelease_Import_LocalSearch_Run
//        $this->pruneReaders();
        
        // most of this is a dupe of what is in Pressreleas_Entry::toEmail 
        if (!empty($_GET['_send'])) {
            $this->sendEmail($id);
            $this->jok("SENT");
        }
        if (!empty($_GET['send_test'])) {
            $this->sendEmail($id);
            $this->jok("SENT");
        }
        
        if (!empty($_REQUEST['_debug'])) {
            DB_DataObject::debuglevel(1);
        }
        $this->HOST = $_SERVER['HTTP_HOST'];
        //$this->rootURL = 'http://'. $this->HOST ;
        $this->baseURL = $this->rootURL . '/release.php';
        
        $id = (int) array_shift(explode('/', $id));
         //echo $id; exit;
        // DB_DataObject::debuglevel(1);
        $p = DB_DataObject::factory('Pressrelease_entry');
        $p->autoJoin();
        if (empty($id) || !$p->get($id)) {
            die("invalid url");
            return HTML_FlexyFramework::run('');
        }
        
        // use the language template
        $lt = "view.{$p->language}.html";
        if ($p->language != 'en' &&
                file_exists(dirname(__FILE__) . "/templates/{$lt}")) {
            $this->template = $lt;
        }
        
        
        $img = DB_DataObject::factory('Images');
        //$img->whereAdd("imgtype != 'LOGO'");
        $p->images = $img->gather($p); //, 'image/%');
        $p->children = $p->children();
        $this->release = $p;
        
        
        // logo..
        $c = DB_DataObject::Factory('Companies');
        $c->get($p->client_id);
        $img = DB_DataObject::factory('Images');
        $img->imgtype = 'LOGO';
        $logos = $img->gather($c, 'image/%');
        if ($logos) {
            $p->logo = $logos[0];
        }
        
        $img = DB_DataObject::factory('Images');
        $img->imgtype = 'LOGO';
        $logos = $img->gather($p, 'image/%');
        if ($logos && empty($p->logo)) {
            $p->logo = $logos[0];
        }
        
        
        $this->release = clone($p);
        
        // related..
        //DB_DataObject::debugLevel(1);
        
        
        
        // related releases..
        $p = DB_DataObject::factory('Pressrelease_entry');
        $p->language = $this->release->language;
        $p->client_id = $this->release->client_id;
        $p->whereAdd('id != '. $id);
        $p->whereAdd('publish_status > -1');
        $p->whereAdd('publish_dt < NOW()'); // timezone!
        $p->orderBy('id DESC');
        $p->limit(10);
        $related = $p->fetchAll();
        $this->related = array();
        foreach($related as $r) {
            $y = $r->publish_dt("Y");
            if (empty($this->related[$y])) {
                $this->related[$y] = array();
            }
            $this->related[$y][] = clone($r);
        }
        
         
        // different versions..
        
        $p = DB_DataObject::factory('Pressrelease_entry');
        $pid = $this->release->parent_id ? $this->release->parent_id : $this->release->id;
        $p->whereAdd("id = $pid OR  parent_id = $pid");
        $p->whereAdd('id != '. $id);
        $p->whereAdd('publish_status > -1');
        $p->whereAdd('publish_dt < NOW()'); // timezone!
        $p->orderBy('id DESC');
        $p->selectAdd();
        $p->selectAdd('id,language,headline');
        $this->langs = $p->fetchAll();
        
        
        // work out what the distribution is..
        //var_dump($this->release->distribution_config);
        
        if (!empty($this->release->parent_id)) {
            // do not work out distribution.
            return;
        }
        
       
        //print_r($ar);
        $this->distlist = $this->release->distributionList();
        $this->distlistN = count($this->distlist);
         
         
        
         

        $this->general = false;
        $this->international = false;
        $regions = array();
        
        //DB_DataObject::DebugLevel(1);
            // this is more complex now..
        $cn = array();
        
        foreach(explode(',',  $this->release->distribution_countries ) as $k)
        {
            
            switch (true) {
                case ($k == '_international'):
                    $this->international = true;
                    break;
                
                case ($k == '_generalnews'):
                     $this->general  = true;
                    break;
                
                case (strlen($k) > 2 && $k[1] == '-'): // regional.
                    $regions[] = array_pop(explode('-', $k));
                    break;
                
                default:
                    $cn[] = $k;
                
            }
         
        }
        // this part is to summarize the selections. 
        
        //print_r($this->distlist);
        
        
        $d = DB_DataObject::factory('pressrelease_category');
        $d->whereAddIn('id', explode(',',  $this->release->distribution_config), 'int');
        $d->selectAdd();
        $d->selectAdd("IF(LENGTH(hgroup), CONCAT(hgroup , ': ', name), name ) as name");
        $d->orderBy('name');
        $this->beats = implode(", ", $d->fetchAll('name' ));
        
        // convert distlist into description.
        //echo '<PRE>';print_R($this->release);
        
         
         $dcl = array();
        require_once 'Pman/Core/I18n.php';
        $x = new Pman_Core_I18n();
        foreach($cn as $d) {
               $dcl[] = $x->translate('en', 'c', $d);
        }
         
        $this->countries = implode(', ' , $dcl);
        $this->regions = array(); 
        // regions.
        if ($regions) { 
            $d = DB_DataObject::factory('pressrelease_category');
            $d->whereAddIn('id', $regions, 'int');
            $this->regions = implode(", ", $d->fetchAll('name' ));
        }
         
 
    }
    
    function sendEmail($id)
    {
        
        // we should use the pressrelease_notify send the press release...
        
        
        $n = DB_DAtaObject::factory('pressrelease_notify');
    
        $n->setFrom(array(
            'person_id' => -1,
            'ontable' => 'pressrelease_entry',
            'onid' => $id,
            'event_id' => 0,
            'evtype' => 'MAIL',
            'msgid' => '',
            'field' => '',
            'bounced' => 0,
            'to_email' => $this->authUser->email,
            'firstname'=> $this->authUser->firstname
        ));
    
        if (!empty($_GET['rcpt'])) {
            $n->to_email = $_GET['rcpt'];
        }
        if (!empty($_REQUEST['firstname'])) {
            $n->firstname = $_REQUEST['firstname'];
        }
        if (!empty($_REQUEST['contact_language'])) {
            $n->contact_language = $_REQUEST['contact_language'];   
        }
        $n->act_start(date("Y-m-d H:i:s"),true);
    
        $n->insert();
          
        return true;  
          
/*        
        $p = DB_DataObject::factory('Pressrelease_entry');
        $p->autoJoin();
        if (empty($id) || !$p->get($id)) {
            $this->jerr("invalid press release");
        }
        if (!empty($this->authUser->lang)) {
            $this->authUser->contact_language = $this->authUser->lang;
        }
        
        if (!empty($_REQUEST['contact_language'])) {
            $this->authUser->contact_language = $_REQUEST['contact_language'];   
        }
        
        $this->authUser->firstname = isset($_REQUEST['firstname']) ? $_REQUEST['firstname'] : $this->authUser->firstname;
        
        $ar = $p->toEmail($this->authUser, 0, false, true);
        
        $ff = HTML_FlexyFramework::get();
        require_once 'Mail.php';
        
        $mail = Mail::factory("SMTP", isset($ff->Mail) ? $ff->Mail : array());
        ///print_R($mail);exit;
        if (is_a($mail, 'PEAR_Error')) {
            $this->jerr("CTOR:". $mail->toString());
        } 
        $oe = error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT);
        $rcpt =$ar['recipients'] ;
        if (!empty($_GET['rcpt'])) {
            $rcpt = $_GET['rcpt'];
        }
        
        
        $ret = $mail->send( $rcpt , $ar['headers'],$ar['body']);
        error_reporting($oe);
        if (is_a($ret, 'PEAR_Error')) {
            $this->jerr($ret->toString());
        }
        return true;
        */
    } 
    
    var $transObj = false;
    
    function post($id)
    {
        $this->transObj = DB_DataObject::Factory('core_enum');
        
        $this->transObj->query('BEGIN');
        
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));
        
        if(!empty($_REQUEST['_rebuild'])){
            $p = DB_DataObject::factory('Pressrelease_entry');
            if(!$p->get($_REQUEST['pid'])){
                $this->jerr('get releaes error.');
            }
            
            $c = DB_DataObject::factory('Projects');
            if(!$c->get('pressrelease_id', $p->id)){
                $this->jerr('Error', 'This release is not publish yet, please publish it first.');
            }
            
            if(strtotime($c->close_date) < strtotime("now")){
                $this->jerr('Error', 'This Campaign is already expired.');
            }
            
            $this->buildSearch($p, $c);
            return;
        }
        
        // the distribution action...
        $id = (int) array_shift(explode('/', $id));
         //echo $id; exit;
        // DB_DataObject::debuglevel(1);
        $p = DB_DataObject::factory('Pressrelease_entry');
        if (empty($id) || !$p->get($id)) {
            
            $this->jerr("invalid id");
        }
        
        if (!empty($_REQUEST['reset'])) {
            $ar = $p->notifications();
            // see how many we can remove..
            
            foreach($ar as $o) {
                if ($o->delivered()) {
                    continue;
                }
                $o->delete();
                
            }
            
            
            // remove undelivered...
            $this->jok("OK");
            
            
            
        }
        
        if (!empty($_REQUEST['redeliver'])) {
            $p = DB_DataObject::Factory('pressrelease_notify');
            $p->on_id = $id;
            if (!$p->get($_REQUEST['redeliver'])) {
                $this->jerr("invalid id");
            }
            
            $pp = clone($p);
            $p->event_id = 0;
            $p->msgid = '';
            $p->sent = '1970-01-01 01:00:00';
            $p->insert();
            $this->jok("OK"); 
            
            
        }
        
        if ($p->parent_id) {
            $this->jerr("You must approve the english lanugage version, not this one");
        }
        
        // for test word diff
        /*
        $f = '/home/press/rss/2014/03/31/752_en.html';
        $f2 = '/home/press/rss/2014/03/31/3850.html';
        
        $init = array(
            'lang' => 'en',
            'file' => $f
        );
        require_once 'HTML/WordDiff.php';
        $wd = new HTML_WordDiff($init);
        $percent = $wd->compare($f2);
        
        print_r($percent);
        exit;
        */
        $res = $p->buildNotification();
        
//        $psub = DB_DataObject::factory('Pressrelease_entry');
//        $psub->parent_id = $p->id;
//        
//        print_r($p->children());exit;
//        print_r($res);exit;
        if (!$res){// when finish approved
            $this->jerr("Problem occured building notifcation list (It may have already been generated)");
        }
        
        $p->buildDistributionStartNotification();
        
        
        $p->buildDistributionEndNotification();
            
        $old = clone($p);
        $p->publish_status = 0;
        $p->update($old);

        $isUpdate = true;
        
        // if this
        if ($p->same_as_id > 0) {
            $this->jok($res);
        }
        
        $c = DB_DataObject::factory('Projects');
        $c->pressrelease_id = $p->id;

        if(!$c->find(true)){
            $isUpdate = false;
        }

        $c->client_id = $p->client_id;
        $c->name = $p->headline;
        $c->open_date = date('Y-m-d', strtotime($p->publish_dt));
        $c->close_date = date('Y-m-d', strtotime($p->publish_dt. '+ 1 MONTH'));
        $c->updated_dt = date('Y-m-d H:i:s');
        $c->languages = $p->language;       
        $c->countries = $p->country;
        $c->open_by = $this->authUser->id;

        if($isUpdate){
            $c->update();
        }else{
            $c->insert();
        }
        
        $p->buildFeeds();
        
        if(strtotime($c->close_date) < strtotime("now")){
            $this->jok(  $res );
        }
//            $this->buildSearch($p, $c);
        
        $this->jok(  $res );
         

        
        
        
    }
    
   
     function jok($str)
    {
        // note that commit will only work if an insert/update was done,
        // so some stored proc calls may not have flagged this.
        
        if ($this->transObj ) {
            $this->transObj->query( connection_aborted() ? 'ROLLBACK' :  'COMMIT');
        }
        return parent::jok($str);
    }

    
 }