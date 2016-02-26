<?php

require_once 'Pman/Core/Notify.php';

class Pman_PressRelease_Import_Search extends Pman_Core_Notify
{
    
    static $cli_desc = "Runs the Search for clippings code";
                    
    var $target = 'PressRelease/Import/SearchFetch';
    var $evtype = ''; // any notification...
    
    var $max_pool_size = 10;
    
    var $nice_level= 19;
   
    
    
    function get($feed_id='', $opts)
    {
        //DB_DAtaObject::debigLevel(1);
        // active campaigns.
        $c = DB_DAtaObject::factory('Projects');
        $c->whereAdd("
            ( Projects.close_date >= NOW() )
            AND
            ( Projects.type IN ('P','N','U') )
            AND
            ( Projects.active = 1 )
        ");
        
        $pids = $c->fetchAll('id');
        
        // assigns.
        $c = DB_DAtaObject::factory('CampaignAssign');
        
        $c->whereAddIn('project_id', $pids , 'int');
        $c->whereAdd('lastfetched < NOW() - INTERVAL 4 HOUR');
        $c->orderBy('CampaignAssign.project_id DESC');
        
        $ids = $c->fetchAll('id');
        
        
        //$this->target = 'Reader/Fetch/Feed';
        
        while (count($ids)) {
            $id = $ids[0];
            if (!$this->poolfree()) {
                sleep(1);
                continue;
            }
            $this->run(array_shift($ids),'');
            
        } 
        
        while(count($this->pool)) {
            $this->poolfree();
            sleep(3);
        }
        
    }
    
}