<?php

require_once 'Pman/Roo.php';

class Pman_PressRelease_Migration_PressRelease_is_feed extends Pman_Roo
{
    static $cli_desc = "Flag if the domain matches the auto-import domain";
    
    static $cli_opts = array(
        
    );
    
    function getAuth()
    {
        $ff = HTML_FlexyFramework::get();
        
        if (!$ff->cli) {
            die("cli only");
        }
        
        return true;
    }
    
    function get()
    {
        $this->transObj = DB_DataObject::Factory('core_enum');
        
        $this->transObj->query('BEGIN');
        
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));
        
        
        
        $this->jok("Done");
        
    }
    
    
}