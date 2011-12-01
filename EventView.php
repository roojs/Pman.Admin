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
        $ev->get($id);
        
        // verify if not admin, then they should 
        $g = DB_DataObject::Factory('Group_Members');
        $grps = $g->listGroupMembership($this->authUser);
       //var_dump($grps);
        $isAdmin = $g->inAdmin;
        
        if (!$isAdmin && $ev->person_id != $this->authUser->id) {
            $this->jerrAuth();
        }
        
        
        
        
        
    }
    
    
}
