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
    
    function get($id, $opts = Array())
    {   
        $ev = DB_DataObject::Factory('Events');
        if (!$ev->get((int)$id)) {
            $this->jerr("invalid id");
        }
        
        // verify if not admin, then they should 
        $g = DB_DataObject::Factory('core_group_member');
        if (is_a($g, 'DB_DataObject')) {
            $grps = $g->listGroupMembership($this->authUser);
           //var_dump($grps);
            $isAdmin = $g->inAdmin;
            
            if (!$isAdmin && $ev->person_id != $this->authUser->id) {
                $this->jerrAuth();
            }
        }
        
        
        echo '<PRE>'.htmlspecialchars(print_r($ev->toArray(),true))."</PRE>";
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
        
        $logdir = DB_DAtaObject::Factory('Events')->logDir();
        
        if (!$logdir) {
            echo "not available (Pman[storedir] not configured)";
            exit;
        }
         
        $file = $logdir. date('/Y/m/d/',strtotime($ev->event_when)). $ev->id . ".php"; 
        if (file_exists($file)) {
            echo '<PRE>' . htmlspecialchars(file_get_contents($file)). '</PRE>';
            
        } 
          
        $file = $logdir. date('/Y/m/d/',strtotime($ev->event_when)). $ev->id . ".json"; 
        if (!file_exists($file)) {
            echo "not available (missing file) $file";
            exit;
        }
        echo '<PRE>' . htmlspecialchars(print_r(json_decode(file_get_contents($file)), true)) . '</PRE>';
        
//        echo '<BR/><PRE>'. htmlspecialchars($ev->remarks) . '</PRE>';
        
        $json = json_decode($ev->remarks, JSON_PRETTY_PRINT);
        
        if(json_last_error() == JSON_ERROR_NONE){
            echo "<HR><H2>JSON DECODE Data:</H2>";
            echo '<PRE>' . print_r($json, true) . '</PRE>';
        }
        
        $filesJ = json_decode(file_get_contents($file));
        echo '<br /><PRE>Download files</PRE>';
        
        
        foreach($filesJ->FILES as $k=>$f){
            $ip = $this->baseURL."/Images/events/". $ev->id . '/'. $f->tmp_name;
            echo '<a href="'.$ip.'/download">' . htmlspecialchars( $k . ' - ' . $f->name ) . '</a><br/>';
        }
        
        
        
        exit;
        
    }
    
    
}
