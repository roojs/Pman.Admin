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
        
        if(empty($this->opts->group)){
            $this->jerr('Missing group - try add [-t {group name}]');
        }
        
        
        
        
        $this->jok("Done");
        
    }
    
    
}