<?php
/***
 * how this might work..
 *
 * a) login - if it's a new IP not seen that day
 * --> touch /tmp/run_pman_admin_iptables
 *
 * cron every minute... ?? << could do some kind of IPC?!?
 *
 * if file exists -> run this code.
 *
 * This code finds all the IP's used in the last 24 hours.
 * and opens the firew all for them.
 *
 *
 *
 */

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
        /*$gr = DB_DataObject::factory('group_rights');
        $grps = $gr->groupsWithRights('Admin.Iptables', 'S');
        
        $gr = DB_DataObject::factory('groups');
        $gr->get('name', 'Administrators');
        $grps[] = $gr->id;
        
        $gm = DB_DataObject::factory('group_members');
        $gm->whereAddIn('group_id', $grps, 'int');
        $gm->selectAdd();
        $gm->selectAdd('distinct(user_id) as user_id');
        $peps = $gm->fetchAll('user_id');
        
        
        */
        
        
        $p = DB_DataObject::Factory('Person');
        $p->autoJoin();
        $p->whereAdd("join_company_id_id.comptype = 'OWNER'");
        $p->selectAdd();
        $p->selectAdd("{$p->tableName()}.id as  id");
        
        $peps = $p->fetchAll('id');
        
        
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

        //inet addr:202.67.151.28  Bcast:202.67.151.255  Mask:255.255.255.0


        // local ips..
        $if = `/sbin/ifconfig`;
        
        foreach(explode("\n", $if) as $l) {
            //var_dump($l);
            if (!preg_match('/inet addr/', $l)) {
                continue;
            }
            $match = array();
            preg_match('/\s*inet addr:([0-9.]+)\s+/', $l, $match);
             $ips[] = $match[1];
            
        }
        $this->ips = $ips;
        $fn = tempnam(ini_get('session.save-path'), 'firewallconf');
        file_put_contents($fn, $this->output());
        echo file_get_contents($fn);
        //`/sbin/iptables-restore < $fn`;

        exit;

    }
    function output()
    {
      // this should have been set up already..
      //-A INPUT -p udp -m udp --dport 5432 -j postgres
    //-A INPUT -p tcp -m tcp --dport 5432 -j postgres
      
      
        $out = "
 iptables -F postgres;       

";

        foreach($this->ips as $ip) {
            $out .= "-A postgres -s {$ip}/32 -j ACCEPT\n";
        }
        $out .= '
-A postgres -m limit --limit 2/min -j LOG --log-prefix "IPTables-Dropped: " --log-level 4
-A postgres -j DROP
COMMIT
';
        

        return $out;

        
    }
    
}