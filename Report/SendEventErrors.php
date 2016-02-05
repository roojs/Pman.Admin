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
    );
    
    function getAuth()
    {
        $ff = HTML_FlexyFramework::get();
        
        if (!$ff->cli) {
            die("cli only");
        }
        
        return true;
    }
    
    function get($args, $opts)
    {
        $this->opts = $opts;
        
        $this->transObj = DB_DataObject::Factory('core_enum');
        
        $this->transObj->query('BEGIN');
        
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));
        
        if(empty($this->opts['group'])){
            $this->jerr('Missing group - try add [-t {group name}]');
        }
        
        $rcpts = DB_DataObject::factory('groups')->lookupMembers("{$this->opts['group']}",'email');
        
        if(empty($rcpts)){
            $this->jerr("{$this->opts['group']} does not has any memeber");
        }
        
        $events = DB_DataObject::factory('Events');
        $events->selectAdd();
        $events->selectAdd("
            DISTINCT(Events.action) AS action,
            COUNT(Events.id) AS total
        ");
        
        $events->whereAdd("Events.event_when > NOW() - INTERVAL 1 DAY");
        
        if(!empty($this->opts['exclude'])){
            $exclude = array_unique(array_filter(array_map('trim', explode(',', $this->opts['exclude']))));
            
            if(!empty($exclude)){
                $events->whereAddIn('!Events.action', $exclude, 'string');
            }
        }
        
        $events->groupBy('Events.action');
        $events->orderBy('Events.action ASC');
        
        $totals = $events->fetchAll('action', 'total');
        
        if(empty($totals)){
            
        }
        
        print_r();exit;
        
        $this->jok("Done");
        
    }
    
    
}