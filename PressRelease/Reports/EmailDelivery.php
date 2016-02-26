<?php

require_once 'Pman.php';

class Pman_PressRelease_Reports_EmailDelivery extends Pman
{
    static $cli_desc = "Send out summary of email delivery issues for the day.";
    
    static $cli_opts = array(
    
    );
    
    function getAuth()
    {
         
        if (!$this->bootLoader->cli) {
            return false;
        }
        // got cli.
        return true;
    
    }
    
    function get()
    {
    
         DB_DataObject::debugLevel(1);
        $n = DB_DataObject::factory('pressrelease_notify');
        $n->autoJoin();
        $n->whereAdd("
            join_event_id_id.id > 0
            AND
            join_event_id_id.action = 'NOTIFY'
            AND
            pressrelease_notify.msgid = ''
            AND
            pressrelease_notify.sent IS NOT NULL
            AND
            join_event_id_id.event_when > DATE_FORMAT(NOW()- INTERVAL 1 DAY, '%Y-%m-%d 00:00:00')
            AND
            join_event_id_id.event_when < DATE_FORMAT(NOW() , '%Y-%m-%d 00:00:00')
        ");
        $badu = clone($n);
        // bad users = 550 or 505 (suspended??)
        $badu->whereAdd("
                join_event_id_id.remarks like 'FAILED - 550:%'
                OR
                join_event_id_id.remarks like 'FAILED - 505:%'
                OR
                join_event_id_id.remarks like 'INVALID ADDRESS%'
                OR
                join_event_id_id.remarks like 'BAD ADDRESS%'
                ");
        
        // 552 - mailbox full - ignore totally...
        $n->whereAdd("
                join_event_id_id.remarks not like 'FAILED - 550:%'
                and
                join_event_id_id.remarks not like 'FAILED - 505:%'
                AND
                join_event_id_id.remarks not like 'FAILED - 552:%'
                AND
                join_event_id_id.remarks not like 'INVALID ADDRESS%'
                AND
                join_event_id_id.remarks not like 'BAD ADDRESS%'
        ");
        
        $n->selectAdd();
        $n->selectAdd("
            
                REPLACE(join_event_id_id.remarks,
                    IF (pressrelease_notify.to_email = '', join_person_id_id.email , pressrelease_notify.to_email),
                '')
                as remark, count(*) as nrem");
        $n->groupBy('remark');
        $n->orderBy('nrem DESC');
        $n->limit(50);
        $this->blacklists = $n->fetchAll('remark','nrem');
        //exit;
        $this->blacktotal = $n;
        
        foreach($this->blacklists as $rem=>$n) {
            $this->blacktotal += $n;
        }
        
        
        // for the others, we just list the email address and the message.
        $badu->selectAdd();
        $badu->selectAdd("
                    IF (pressrelease_notify.to_email = '', join_person_id_id.email , pressrelease_notify.to_email) as email,
                    join_event_id_id.remarks  as remark
            " );
        
        $this->bademails = $badu->fetchAll('email','remark');
        $this->badtotal = count($this->bademails);
        
        //print_R($ar);exit;
        
        //$n->find(); $n->fetch();print_R($n); exit;
        require_once 'Pman/Core/Mailer.php';
        
        $x= new Pman_Core_Mailer(array(
            'page' => $this,
                     // if bcc is property of this, then it will be used (BAD DESIGN)
            'rcpts' => array('mailinglist@roojs.com', 'jenny.chu@media-outreach.com'),   // override recipients..
            'template' => 'email_delivery',
             
        ));
        //print_r($x->toData());exit;
        
        $x->send();
        
        exit;
        //
    
    }
    
    function formatDesc($desc) {
        
        $desc = preg_replace('/^FAILED - /', '', $desc);
        $ar = explode(':', $desc, 2);
        return '<B>'.htmlspecialchars($ar[1]).'</B> <i>'.htmlspecialchars($ar[0]). '</i> ';
        
        
    }
        
    function emails($desc) {
        return '';
    }
    
    
    
 
}
