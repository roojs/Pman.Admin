<?php
/**
 * Table Definition for pressrelease_notify
 */
require_once 'Pman/Core/DataObjects/Core_notify.php';

class Pman_PressRelease_DataObjects_Pressrelease_notify extends Pman_Core_DataObjects_Core_notify
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_notify';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $act_start;
    public $act_when;                        // datetime(19)  not_null multiple_key binary
    public $onid;                            // int(11)  not_null
    public $ontable;                         // string(128)  not_null
    public $person_id;                       // int(11)  not_null
    public $msgid;                           // string(128)  not_null
    public $sent;                            // datetime(19)  not_null binary
    public $event_id;                        // int(11)
    public $evtype;
    public $field;
    public $to_email;
    public $fail_reviewed;
    public $is_open; 

    public $firstname;
    public $contact_language;
    
    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
    
    
    function applyFilters($q, $au, $roo)
    {
        $tn = $this->tableName();
        $this->setFrom($q);
        if (isset($q['vtype'])) {
            switch ($q['vtype']) {
                case 'FAILED':
                    $this->evtype = 'MAIL';
                    $this->whereAdd("
                        ({$tn}.msgid IS NULL OR LENGTH({$tn}.msgid) < 1) AND
                        {$tn}.event_id  > 0
                        ");
                     
                    
                    break;
                case 'DELIVERED':
                    $this->evtype = 'MAIL';
                    $this->whereAdd("
                        ({$tn}.msgid IS NOT NULL AND LENGTH({$tn}.msgid) > 0) AND
                        {$tn}.event_id  > 0
                        ");
                    break;
                    
                    
                case 'PENDING':
                    $this->evtype = 'MAIL';
                    $this->whereAdd("                        
                        {$tn}.event_id  < 1
                        ");
                    break;
                    
                case 'ONLINE':
                    $this->whereAdd("{$tn}.evtype != 'MAIL'");
                    
                    break;
                        
            }
        }
        
        if (!empty($q['search']['remarks'])) {
            $this->whereAdd("join_event_id_id.remarks like '%{$this->escape($q['search']['remarks'])}%'");
            
        }
        
        
        
        
    }
    
    
    /**
     * has a message been delivered.
     * basically if no event_id or msgid is empty.. NO..
     *
     */
    function delivered()
    {
        if (!$this->event_id) {
            return false;
        }
        
        if (strlen($this->msgid)) {
            return true;
        }
        return false;
         
    }
    
    function person($set=false)
    {
         
        if ($set !== false) {
            $this->person_id = is_object($set) ? $set->id : $set;
            return;
        }
        if ($this->evtype == 'REPORT') { // reports go to real users..
            return parent::person();
        }
        if ($this->person_id < 1){
            return false;
        }
        $c = DB_DataObject::Factory('Pressrelease_contact');
        $c->get($this->person_id);
        return $c;
        
    }
    
    
    
    function act_start($date, $force = false)
    {
        $d = strtotime($date);
        // minium send out time is now+15minutes..
        if (!$force && $d < strtotime('NOW + 15 MINUTES')) {
            $date = date('Y-m-d H:i:s',strtotime('NOW + 15 MINUTES'));
        }
        
        return parent::act_start($date);
        
        
        
    }
    
    
    /**
     * Distribution report...
     *
     */
    
    function toEmail( $person,$last, $notify, $force)
    {
        if (empty($person->id)) {
            return array('error' => 'person is not set');
        }
        
        //print_R($person);exit;
        //print_r($person);exit;
        if ($notify->evtype != 'REPORT')  {
            return false;
        }
        // for reports this dataobject contains nothing...
          
          
          
         $contents = "

Distirbution report For the last 24 hours since ".   date('d/M/Y H:i', strtotime($notify->act_when)) ." 
          
          ";
        
        
          
        // list press releases that have bee actioned on..
       // DB_DataObject::debugLevel(1);
        $pn = DB_DataObject::factory('pressrelease_notify');
        
       
        $pn->ontable = 'pressrelease_entry';
        $pn->evtype = 'MAIL';
        
        $prs = clone($pn);
        $prs->whereAdd("
            (sent > '{$notify->act_when}' - INTERVAL 1 DAY AND sent < '{$notify->act_when}' )
            OR
            (act_when> '{$notify->act_when}' - INTERVAL 1 DAY AND act_when < '{$notify->act_when} + INTERVAL 1 DAY' )
        ");
        
        $prs->selectAdd();
        $prs->selectAdd('distinct(onid) as release_id');
        
        $ids = $prs->fetchAll('release_id');
        if (empty($ids)) {
            
            return array('error' => 'Nothing was sent out in the last 24 hours');
        }
        
        sort($ids);
        
        // list total distribution, and how many got sent out..
        
        foreach($ids as $prid) {
            $pr = DB_DataObject::Factory('pressrelease_entry');
            $pr->get($prid);
            
            $contents .="
----------------------------------
#{$prid} - {$pr->headline}\n";
            
            // list pending next. = only in future in theory..
            $pend = clone($pn);
            $pend ->whereAdd('event_id = 0');
            $pend ->whereAdd("(act_when > '{$notify->act_when}')");
            $pend ->onid = $prid;
            $pending = $pend->count();
            
            if ($pending) {
                $contents .= "$pending emails are due to go out today\n";
            }
            $sent = clone($pn);
            $sent->whereAdd('event_id = -1');
            $sent->whereAdd("(sent > '{$notify->act_when}' - INTERVAL 1 DAY AND sent < '{$notify->act_when}') ");
            $sent->onid = $prid;
            $ysent= $sent->count();
            
            $sent = clone($pn);
            $sent->whereAdd('event_id = -1');
            $sent->whereAdd("sent < '{$notify->act_when}' ");
            $sent->onid = $prid;
            $asent= $sent->count();
            
            $contents .= "$ysent emails went out in the last 24 hours, totally $asent emails have been sent\n";
            
            
            // list errors first.
            $fails = clone($pn);
            $fails->whereAdd('event_id > 0');
            $fails->whereAdd("(sent > '{$notify->act_when}' - INTERVAL 1 DAY AND sent < '{$notify->act_when}' )");
            $fails->autoJoin();
            $fails->onid = $prid;
            $ar = $fails->fetchAll();
            if (!empty($ar)) {
                $contents .= "\nFailed to send to: \n";
                foreach($ar as $x) {
                    $contents .= "{$x->person_id_email}    {$x->event_id_remarks}\n";
                }
            } else {
                $contents .= "\nNo messages Failed: \n";
            }
            
             
            
        }
        
        // then list who got a copy.
        
        
        
        
          
          
          
        require_once 'Mail/mime.php';
        
        $m = new Mail_Mime(array(
                
            'head_charset' => 'utf8',
            'text_charset' => 'utf8',
            'html_charset' => 'utf8',
        ));
      
        $m->setTxtBody($contents);
        
        
        
        
        $ret = array();
        $ret['headers'] = $m->headers(array(
           'To'     =>     $person->email,
           'From'   => '"REPORT - Media Outreach Press Release Summary" <jennifer.kok@media-outreach.com>',
           'Subject'=> "Distribution Report . " . date('d/M/Y', strtotime($notify->act_when)),
           'Message-Id' => '<RELEASE-REPORT-'. $person->id . '-'.$notify->id.'@media-outreach.com>',
           'Date' => date('r'),
        ));
        $ret['recipients'] = 'alan@akbkhome.com';
      //   print_r($ret);exit;
        $ret['body'] = $m->get();
        
        
        return $ret;
        
    }
    
}
