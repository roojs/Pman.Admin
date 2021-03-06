<?php
 
require_once 'Pman/Roo.php';

class Pman_Admin_Report_SendEventErrors extends Pman_Roo
{
    static $cli_desc = "Send event errors occured in the last 24 hours";
    
    static $cli_opts = array(
        'group' => array(
            'desc' => 'group to send to',
            'short' => 't',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
        'exclude' => array(
            'desc' => 'list of actions to exclude from report',
            'short' => 'e',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
        'only' => array(
            'desc' => 'list of actions only to report',
            'short' => 'O',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
        'uid' => array(
            'desc' => 'Unique identifier - eg. FAILREPORT',
            'short' => 'U',
            'default' => 'STD',
            'min' => 1,
            'max' => 1,
        ),
        'subject' => array(
            'desc' => 'email subject',
            'short' => 's',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
        'helo' => array(
            'desc' => 'mail helo to use',
            'short' => 'l',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
        'host' => array(
            'desc' => 'mail host to use',
            'short' => 'o',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
     
        'list' => array(
            'desc' => 'list the current actions in the database',
            'short' => 'L',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
        'debug' => array(
            'desc' => 'Turn on database debugging',
            'short' => 'd',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ), 
    );
    
    function getAuth()
    {
        $ff = HTML_FlexyFramework::get();
        
        if (!$ff->cli) {
            die("cli only");
        }
        
        return true;
    }
    
    function get($args,   $opts = Array())
    {
        $this->opts = $opts;
        
        if (!empty($this->opts['debug'])) {
            DB_DataObject::debugLevel(1);
          
        }
        if(!empty($this->opts['list'])){
            $this->listTypes();
        }
        
        if(empty($this->opts['group'])){
            $this->jerr('Missing group - try add [-t {group name}]');
        }
        
        $min = 0;
         
        if ($this->opts['uid'] != 'STD') {
            $events = DB_DataObject::factory('Events');
            $events->action = 'ERROR-REPORT-' . $this->opts['uid'];
            $events->orderBy('id DESC');
            $events->limit(1);        
            if ($events->find(true)) {
                $min = $events->id;
            }
        }
        
        
        $events = DB_DataObject::factory('Events');
        $events->selectAdd();
        $events->selectAdd("
            DISTINCT(Events.action) AS action,
            COUNT(Events.id) AS total
        ");
        $events->whereAdd('Events.id > '. $min);
        $events->whereAdd("Events.action NOT LIKE 'ERROR-REPORT-%'");
        $events->whereAdd("Events.event_when > NOW() - INTERVAL 1 DAY");
        
        if(!empty($this->opts['exclude'])){
            $exclude = array_unique(array_filter(array_map('trim', explode(',', $this->opts['exclude']))));
            
            if(!empty($exclude)){
                $events->whereAddIn('!Events.action', $exclude, 'string');
            }
        }
        if(!empty($this->opts['only'])){
            $only= array_unique(array_filter(array_map('trim', explode(',', $this->opts['only']))));
            
            if(!empty($only)){
                $events->whereAddIn('Events.action', $only, 'string');
            }
        }
        
        
        $events->groupBy('Events.action');
        $events->orderBy('Events.action ASC');
        
        $summary = $events->fetchAll('action', 'total');
        
        if(empty($summary)){
            $this->jerror('ERROR-REPORT-' . $this->opts['uid'], 'Nothing to be sent');
        }
        
        $subject = array();
        
        foreach ($summary as $k => $v){
            $subject[] = "{$v} {$k}";
        }
        
        $subject = implode(', ', $subject);
        
        if(!empty($this->opts['subject'])){
            $subject = "{$this->opts['subject']} $subject";
        }
        
        
        $events = DB_DataObject::factory('Events');
        $events->autoJoin();
        
        $events->selectAdd();
        $events->selectAdd("
            Events.id AS id,
            Events.event_when AS event_when,
            Events.action AS action,
            Events.remarks AS remarks
            
        ");
        $events->selectAddPersonEmail();
        $events->whereAdd("Events.action NOT LIKE 'ERROR-REPORT-%'");
        $events->whereAdd('Events.id > '. $min);
        $events->whereAdd("Events.event_when > NOW() - INTERVAL 1 DAY");
        
        $exclude = array_unique(array_filter(array_map('trim', explode(',', $this->opts['exclude']))));
        
        if(!empty($exclude)){
            $events->whereAddIn('!Events.action', $exclude, 'string');
        }
        if(!empty($only)){
            $events->whereAddIn('Events.action', $only, 'string');
        }
        
        if(!$events->count()){  // this is the second count we are doing...
            $this->jerr('Nothing to be sent');
        }
        
        
        $this->addEvent('ERROR-REPORT-' . $this->opts['uid'], false, $subject);

        
        $errors = $events->fetchAll();
        
        if(!empty($this->opts['host'])){
            // reset the mail settings..
            HTML_FlexyFramework::get()->Mail = array(
                                        'host' => $this->opts['host']
            );
        }
        
        if(!empty($this->opts['helo'])){
            HTML_FlexyFramework::get()->Mail['helo'] = $this->opts['helo'];
        }
        
        
        
        $content = array(
            'template'      => 'FILE_REPORTING_EMAIL',
            'rcpts_group'   => $this->opts['group'],
            'errors'        => $errors,
            'subject'       => $subject
        );

        $sent = DB_DataObject::factory('core_email')->send($content);
        
        if(!is_object($sent)){
            $this->jok("Done");
        }
        
        $this->jerr($sent);
        
    }
    
    function listTypes()
    {
        $events = DB_DataObject::factory('Events');
        $events->selectAdd();
        $events->selectAdd("
            DISTINCT(Events.action) AS action
        ");
        $events->whereAdd("action != ''");
        $ar = $events->fetchAll('action');
        echo implode(",", $ar);
        echo "\n";
        exit;
        
    }
    
    static function test_EVENT_ERRORS_REPORT($pg, $to)
    {
        $this->jerr("Not implemented");
    }
    
    
}