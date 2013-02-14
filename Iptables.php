<?php


require_once 'Pman.php';

class Pman_Admin_Iptables extends Pman {
    
    static $cli_desc = "Read ip addresses that have been used to log in, and add them to the iptables list..";
    
   
    
    function getAuth()
    {
        if (!$this->bootLoader->cli) {
            die("cli only");
        }
     }
    function get()
    {
        // find IP's that have been used to log in.
        // dump them to the iptables file.
        // if it's different - apply it...
        //DB_DataObject::debugLevel(1);
        // need to get a list of users who have Admin.Iptables rights..
        $gr = DB_DataObject::factory('group_rights');
        $grps = $gr->groupsWithRights('Admin.Iptables', 'S');
        
        $gr = DB_DataObject::factory('groups');
        $gr->get('name', 'Administrators');
        $grps[] = $gr->id;
        
        $gm = DB_DataObject::factory('group_members');
        $gm->whereAddIn('group_id', $grps, 'int');
        $gm->selectAdd();
        $gm->selectAdd('distinct(user_id) as user_id');
        $peps = $gm->fetchAll('user_id');
        
        $e = DB_DataObject::factory('Events');
        $e->action = 'LOGIN';
        $e->selectAdd();
        $e->selectAdd('distinct(ipaddr) as ipaddr');
        $e->person_table = DB_DataObject::factory('person')->tableName();
        $e->whereAddIn('person_id', $peps, 'int');
        switch( $e->getDatabaseConnection()->phptype) {
            case 'mysql':
                $e->whereAdd("event_when > NOW() - INTERVAL 1 DAY");
                break;
            case 'pgsql':
                $e->whereAdd("event_when > NOW() - INTERVAL '1 DAY'");
                break;   
        }
        $ips = $e->fetchAll('ipaddr');
        print_r($ips);exit;
        
         

        
    }
    
}