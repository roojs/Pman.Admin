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
        $g = DB_DataObject::Factory('group_members');
        if (is_a($g, 'DB_DataObject')) {
            $grps = $g->listGroupMembership($this->authUser);
           //var_dump($grps);
            $isAdmin = $g->inAdmin;
            
            if (!$isAdmin && $ev->person_id != $this->authUser->id) {
                $this->jerrAuth();
            }
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
        echo "<HR><H2>Posted Data:</H2>";
        //$fn =  
        
        exit;
        
    }
    
    
}
