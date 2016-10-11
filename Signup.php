<?php

require_once 'Pman.php';

class Pman_Admin_Signup extends Pman 
{
    function getAuth() {
        parent::getAuth(); // load company!
        $au = $this->getAuthUser();
        if (!$au) {
            $this->jerr("Not authenticated", array('authFailure' => true));
        }
        $this->authUser = $au;
        if ($au->company()->comptype != 'OWNER') {
             $this->jerr("Permission Denied - not owner company" );
        }
        return true;
    }
    
    function post()
    {
        
        $si = DB_DataObject::factory('Signup');
        if (empty($_REQUEST['id']) || ! $si->get($_REQUEST['id'])) {
            $this->jerr("invalid request");
        }
        if ($si->person_id != 0 ){
            $si->jerr("Account already processed");
        }
        // rejected..
        if ($_REQUEST['person_id'] < 0) {
            $si->setFrom($_REQUEST);
            $si->update();
            $this->jok("OK");
        }
        
        $p = DB_DataObject::factory("core_person");
        $p->setFrom($_REQUEST);
        $p->insert();
        
        
        $si->setFrom($_REQUEST);
        $si->person_id = $p->id;
        $si->update();
        
        // generate a password
        // and send welcome message.
        
        
        
        $this->jok($p->toArray());
    }
}