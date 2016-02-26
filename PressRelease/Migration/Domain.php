<?php

require_once 'Pman/Roo.php';

class Pman_PressRelease_Migration_Domain extends Pman_Roo
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
        
        $clippings = DB_DataObject::factory('clipping');
        $clippings->media_type = 'ONLINE';
        
        $clippings->find();
        while ($clippings->fetch()) { 
            $c = clone($clippings);
        
            if(empty($c->remote_url)){
                continue;
            }
            
            $remote_url = parse_url($c->remote_url);
            
            if(empty($remote_url['host'])){
                continue;
            }
            
            $isFeed = 0;
            
            $pressrelease_auto_import = DB_DataObject::factory('pressrelease_auto_import');
            $pressrelease_auto_import->is_active = 1;
            $pressrelease_auto_import->whereAdd("url LIKE '%{$remote_url['host']}%'");

            if($pressrelease_auto_import->count()){
                $isFeed = 1;
            }
            
            $o = clone ($c);
            $c->release_is_feed = $isFeed;
            
            $c->update($o);
        }
        
        $this->jok("Done");
        
    }
    
    
}