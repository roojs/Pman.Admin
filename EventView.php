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
        $fn =  
        
        
        
        $ff  = HTML_FlexyFramework::get();
        if (empty($ff->Pman['event_log_dir'])) {
            echo "not available (not configured)";
            exit;
        }
        if (function_exists('posix_getpwuid')) {
            $uinfo = posix_getpwuid( posix_getuid () ); 
         
            $user = $uinfo['name'];
        } else {
            $user = getenv('USERNAME'); // windows.
        }
         
        
        $file = $ff->Pman['event_log_dir']. "/{$user}" . date('/Y/m/d/',strtotime($ev->event_when)). $ev->id . ".json"; 
        if (!file_exists($file)) {
            echo "not available (missing file) $file";
            exit;
        }
        echo '<PRE>' . htmlspecialchars(file_get_contents($file)) . '</PRE>';
        
        echo '<BR/><PRE>'. htmlspecialchars($ev->remarks) . '</PRE>';
        
        $filesJ = json_decode(file_get_contents($file));
        echo '<br /><PRE>Images Preview</PRE>';
        
        // should be change to event dir
        $path = $ff->baseURL. "/Images/Thumb/150/{$ev->on_id}";
        foreach($filesJ->FILES as $f){
            $ip = "/image/events/". $f->tmp_name;
            //$img = getimagesize($ip);
//            header("Content-type: image/jpeg");
            //readfile($ip);
//            addslashes($ip);
            //echo "<img src=\"{$this->readImage($ip)}\" />";
            //$path = $ff->baseURL. "Images/Thumb/150/$ff->Pman['event_log_dir']. "/{$user}" . date('/Y/m/d/',strtotime($ev->event_when)). $f->tmp_name;
            //echo '<img src="'.$path.'" />';
            print_r($ip);
        }
        
        
        
        exit;
        
    }
    
    function readImage($ip){
        $url= str_replace('.jpg','',$url);
        $bits = explode('/', $url);
        
        $opts = PEAR::getStaticProperty('Hebe','options');
         
        if ( $bits[0] != 'members') {
            $bits[1] = $bits[0] . '/'.$bits[1];
            $bits[0] = 'members';
        }
        
        if (!isset($opts[$bits[0].'_photo_dir'])) {
            echo "NO OPT SET?";
            exit;
        }
        $file = $ff->Pman['event_log_dir']. "/{$user}" . date('/Y/m/d/',strtotime($ev->event_when)). $f->tmp_name;
         
        if (!file_exists($ip)) {
            echo "NO FILE? $file";
            exit;
        }
        
        header ('Content-Type: image/jpeg');
        $fh = fopen($file,'r');
        echo fread($fh,filesize($file));
    }
    
    
}
