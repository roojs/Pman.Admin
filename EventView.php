<?php


require_once 'Pman.php';

class Pman_Admin_EventView extends Pman
{
    
    function getAuth()
    {
        parent::getAuth();
        $au = $this->getAuthUser();
        if (!$au || $au->company()->comptype != 'OWNER') {
            $this->jerrAuth();
        }
        return true;
        
        
    }
    
    function get($id)
    {
        $ev = DB_DataObject::Factory('Events');
        if (!$ev->get((int)$id)) {
            $this->jerr("invalid id");
        }
        
        // verify if not admin, then they should 
        $g = DB_DataObject::Factory('Group_Members');
        $grps = $g->listGroupMembership($this->authUser);
       //var_dump($grps);
        $isAdmin = $g->inAdmin;
        
        if (!$isAdmin && $ev->person_id != $this->authUser->id) {
            $this->jerrAuth();
        }
        
        // we have 2 bits of data available at present:
        // core_event_audit
        // the event file..
        $d= DB_DataObject::factory('core_event_audit');
        if (is_a($d,'DB_DataObject')) {
            echo "<H2>Changed Data:</H2>";
            $d->event_id = $ev->id;
            foreach($d->fetchAll() as $d) {
                echo "{$d->name} SET TO: " . htmlspecialchars($d->newvalue) . "<br/>\n";
            }
        }
        $fn =  date('/Y/m/d/'). $ev->id . ".php";strtotime($ev->event_when);
        
        $eid = $e->insert();
        
        $wa = DB_DataObject::factory('core_watch');
        $wa->notifyEvent($e); // trigger any actions..
        
        
        $ff  = HTML_FlexyFramework::get();
        if (empty($ff->Pman['event_log_dir'])) {
            return $e;
        }
        $file = $ff->Pman['event_log_dir']. date('/Y/m/d/'). $eid . ".php";
        if (!file_exists(dirname($file))) {
            mkdir(dirname($file),0700,true);
        }
        file_put_contents($file, var_export(array(
            'REQUEST_URI' => empty($_SERVER['REQUEST_URI']) ? 'cli' : $_SERVER['REQUEST_URI'],
            'GET' => empty($_GET) ? array() : $_GET,
            'POST' => empty($_POST) ? array() : $_POST,
        ), true));
         
        
        if (file_exists())
        
        
    }
    
    
}
