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
 *
 *
 
 
 *
 *
 */

require_once 'Pman.php';

class Pman_Admin_Iptables extends Pman {
    
    static $cli_desc = "Read ip addresses that have been used to log in, and add them to the iptables list..";
    
   
    
    function getAuth()
    {
        // add locking here..
        
        if (!$this->bootLoader->cli) {
            die("cli only");
        }
    }
    
    function monitorFile()
    {
        $ev = DB_DataObject::Factory('Events');
        $db = $ev->database();
        
        return '/tmp/run_pman_admin_iptables-'.$db;
    }
    
    function get($opt = '', $opts = Array())
    {
        
        // monitor file
        
        $mf = $this->monitorFile();
        
        $fe = file_exists($mf);
        if (empty($opt)) {
            if (!$fe) {
                exit;
            }
        }
        if ($fe) {
            unlink($mf);
        }
        
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
        //DB_DataObject::debugLevel(1);
        
        $p = DB_DataObject::Factory('core_person');
        $p->autoJoin();
        $p->whereAdd("join_company_id_id.comptype = 'OWNER'");
        $p->selectAdd();
        $p->selectAdd("{$p->tableName()}.id as  id");
        
        $peps = $p->fetchAll('id');
        
        
        switch( $p->getDatabaseConnection()->phptype) {
            case 'mysql':
                $interval = "INTERVAL 1 DAY";
                break;
            case 'pgsql':
                $interval = " INTERVAL '1 DAY'";
                break;
            default:
                die("database NOT SUPPORTED?!");
        }
        
        $e = DB_DataObject::factory('Events');
        $e->action = 'LOGIN';
        $e->selectAdd();
        $e->selectAdd(" 
            distinct(ipaddr) as ipaddr,
            max(event_when) + $interval as expires
                     
        ");
        $e->person_table = DB_DataObject::factory('core_person')->tableName();
        $e->whereAddIn('person_id', $peps, 'int');
        $e->groupBy('ipaddr');
        $e->whereAdd("event_when > NOW() - $interval");
                
       
        $ips = $e->fetchAll('ipaddr','expires');

        require_once 'System.php';
        //inet addr:202.67.151.28  Bcast:202.67.151.255  Mask:255.255.255.0
        $ifconfig = System::which('ifconfig','/sbin/ifconfig');
        
        if (!$ifconfig || !file_exists($ifconfig)) {
            $this->jerr("ifconfig could not be found.");
        }

        $if = $this->exec($ifconfig);
        
         
        foreach(explode("\n", $if) as $l) {
            //var_dump($l);
            if (!preg_match('/inet addr/', $l)) {
                continue;
            }
            $match = array();
            preg_match('/\s*inet addr:([0-9.]+)\s+/', $l, $match);
            $ips[$match[1]] = ''; // no expiry...
            
        }
        $this->ips = $ips;
        $cache = ini_get('session.save-path') . '/pman_admin_iptables.cache';
        
        $this->updateTables();
        
         
        exit;

    }
    
    function readChain($chain)
    {
        
        static $iptables;
        
        if (!$iptables) {
            require_once 'System.php';
            
            $iptables = System::which('iptables', '/sbin/iptables');
            
            if (!$iptables || !file_exists($iptables)) {
                $this->jerr("iptables could not be found.");
            }
        }
        // this should have been set up already..
        // in the base firewall code.
       
        $res = $this->exec("{$iptables} -L {$chain} -v -n --line-numbers");   
        
        
        
        $lastrulenum = 1;
       
        $remove = array();
        $cur = array();
        $head = false;
        
        foreach(explode("\n", $res) as $i => $line) {
            if ($i == 1) {
                $head = preg_split('/\s+/', $line);
                $head[10] = 'comments';
            }
            if ($i < 2) {
                continue;
            }
            
            $ar = preg_split('/\s+/', $line);
            if (count($ar) < 3) {
                continue;
            }
            $ar[10] = implode(' ',array_slice($ar, 10));
            $row = array();
            foreach($head as $k=>$v) {
                $row[$v] = $ar[$k];
            }
           // print_r($row);
            //var_dump($row['target']);
             
            
            // got input rules now..
            if (!empty($row['comments'])) {
                
                $row['comments'] = preg_replace('#^/\*#', '', trim($row['comments']) );
                $row['comments'] = preg_replace('#\*/$#', '', $row['comments'] );
                foreach((array)json_decode($row['comments']) as $k=>$v) {
                    $row[$k] = $v;
                }
            }
            $rows[] = $row;
                          
             
        }
        if (empty($head)) {
            return false;
        }
        
        return  $rows;
    
    }
    
    
    
    function updateTables()
    {
        static $iptables;
        
        if (!$iptables) {
            require_once 'System.php';
            
            $iptables = System::which('iptables', '/sbin/iptables');
            
            if (!$iptables || !file_exists($iptables)) {
                $this->jerr("iptables could not be found.");
            }
        }
        // this should have been set up already..
        // in the base firewall code.
       
       
        $rows = $this->readChain('INPUT');
        $gotpg = false;
        foreach($rows as $r) {
            if ($r['target'] == 'postgres') {
                $gotpg = true;
            }
        }
        if (!$gotpg) {
            $this->exec("{$iptables} -A INPUT -p udp -m udp --dport 5432 -j postgres");
            $this->exec("{$iptables} -A INPUT -p tcp -m udp --dport 5432 -j postgres");
        }
        
        
        $rows = $this->readChain('postgres');
        if ($rows === false) {
            $this->createBase();
            $rows = array();
        }
         
        $lastrulenum = 1;
       
        $remove = array();
        $cur = array();
         
        foreach($rows as $row) {
             
           // print_r($row);
            //var_dump($row['target']);
            if ($row['target'] != 'ACCEPT') {
                continue;
            }
            
             
            if (!empty($row['expires'])) {
                if (strtotime($row['expires']) < time()) {
                    $remove[ $row['source'] ] = $row;
                }
            }
            
            $cur[ $row['source'] ] = $row;
            
            $lastrulenum = $row['num'];
            
        }
         
        
        //print_r($cur);
        //--comment
        
          
         
        foreach($this->ips as $ip=>$expires) {
            $comment = strlen($expires) ?
                    ('-m comment --comment ' . escapeshellarg(json_encode(array('expires'=>$expires))) ) :
                    '';

            
            $old = isset($cur[$ip]) ? $cur[$ip] : false;
            if ($old) {
                if (empty($old['expires'])) {
                    continue;
                }
                if (strtotime($expires) <= strtotime($old['expires'])) {
                    // expires time is the same..
                    //?? make sure it's not flagged for removal..
                    
                    continue;
                }
            }
            
            if ($old) {
                $this->exec("{$iptables} -R postgres {$old['num']} -s {$ip}/32 -j ACCEPT   $comment");
                
                if (isset($remove[$ip])) {
                    unset($remove[$ip]);
                }
                continue;
            }
            
            $this->exec("{$iptables} -I postgres {$lastrulenum} -s {$ip}/32 -j ACCEPT  $comment");
                    
            
                                   
        }
        
        // remove rules that need deleting..
        foreach($remove as $ip => $r) {
            
            $this->removeIp($ip);
             
            
        }
        
        $this->exec("{$iptables} -L postgres -v -n --line-numbers");   
       
  
        
    }
    
    function removeIp($ip)
    {
        static $iptables;
        
        if (!$iptables) {
            require_once 'System.php';
            
            $iptables = System::which('iptables', '/sbin/iptables');
            
            if (!$iptables || !file_exists($iptables)) {
                $this->jerr("iptables could not be found.");
            }
        }    
        // we need to scan the list each time, as the order get's renumbered when we remove wone...
        $ar = $this->readChain('postgres');
        foreach($ar as $row) {
            if ($row['target'] != 'ACCEPT') {
                continue;
            }
            
            if ($row['source'] != $ip) {
                continue;
            }
            $this->exec("{$iptables} -D postgres {$row['num']} ");
            break;
        }
    }
    
    
    
    function createBase()
    {
        
         require_once 'System.php';
        
        $iptables = System::which('iptables', '/sbin/iptables');
        
         if (!$iptables || !file_exists($iptables)) {
            $this->jerr("iptables could not be found.");
        }
        
        
        
        //$this->exec("{$iptables} -F postgres"); // flush old
        $this->exec("{$iptables} -X postgres"); // flush old
        
        $this->exec("{$iptables} -N postgres");  // create new..
        
        $this->exec($iptables. ' -A postgres -m limit --limit 2/min -j LOG '.
                        '--log-prefix "IPTables-Dropped: " --log-level 4');
        $this->exec("$iptables -A postgres -j DROP");  

        
        
        
        
    }
    
    function exec($cmd)
    {
        echo "$cmd\n";
        $ret =  `$cmd`;
        echo $ret."\n";
        return $ret;
    }
    
}