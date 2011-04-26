<?php


/**
 * This should allow you to dump a series of data, so it could be restored later...
 * The format will be an SQL file...
 *
 * usage:
 *    php index.php  Admin/Dump --table=Project --where="id=123"
 *              --dump-dir=/directory_to_put_sql+shell files
 *
 *    outputs list of generated files.
 *    
 *     RESTORE FILES:
 *      {DATE}.sql - the recreate sql including all dependancies, run with mysql DB -f  < ....
 *      {DATE}.restore.sh - shell script to recreate files that where removed (excluding thumgs)
 *      
 *     BACKUP
 *      {DATE}.copy.sh - shell script that backs up all the related files.
 *      
 *     DESTROY
 *      {DATE}.delete.sql - the delete data sql.
 *      {DATE}.delete.sh - shell script to delete the files related to these records
 
 *    
 *  Basically it has to output all the records and their dependants. (parent and children)
 *
 *  Then when deleting it deletes record + children..
 *
 *
 *  Each ouput is simple insert statement..
 *
 *
 *  TODO - handle Images table (or similar) where we use tablename=XXXX, tid=.... etc..
 *
 *
 *  INTERFACES :
 *
 *      DataObjects->archivePaths() - returns array ( sourcedirectory, remainder of path to dependant file )
 *      DataObjects->listThumbs() - returns array ( list of full path to thumbnail urls. )
 *
 *
 *  DISCOVERY
 *    
 *
 * 
 */

require_once 'Pman.php';

class Pman_Admin_Export extends Pman_Admin_Dump {
    
    function getAuth()
    {
        
        if (!HTML_FlexyFramework::get()->cli) {
            die("Access only permitted from cli");
        }
        
    }
    var $args = array();
    var $deps = array(); // list of dependants
    var $out = array(); // list of created sql/shell scripts.
    
    var $uid = array();
    
    function get($path )
    {
        ini_set('memory_limit', '256M'); // we need alot of memory
        set_time_limit(0);
        
        $argv = $_SERVER['argv'];
        array_shift($argv);
        array_shift($argv);
        
        $opts = explode(',', 'table==,where==,dump-dir==,debug=');
        require_once 'Console/Getopt.php';
        $go = Console_Getopt::getopt2($argv, '', $opts );
        if (is_object($go)) {
            die($go->toString());
        }
         
        foreach($go[0] as $ar) {
            $args[substr($ar[0],2)] = $ar[1];
        }
        $errs = array();
        foreach($opts as $req) {
            if (substr($req,-2, 2) != '==') { // skip optional arguments
                continue;
            }
            if (empty($args[substr($req,0, -2)])) {
                $errs[] = "--".substr($req,0, -2) . ' is required';
            }
        }
        if (!empty($errs)) {
            die(print_R($errs,true));
        }
        if (!empty($args['debug'])) {
            DB_DataObject::debugLevel($args['debug']);
        }
        $this->args = $args;
        $this->out = array();
        
        
        
        
        
        
        
        
        
        $this->discoverChildren($this->args['table'], $this->args['where'], true);
        //print_R($this->deletes);
        //print_r($this->dumps);
        //exit;
        
        $this->discover($this->args['table'], $this->args['where'], true);
         
        
        if (!file_exists($args['dump-dir'])) {
            mkdir($args['dump-dir'], 0777, true);
        }
          
          
          // create uid's
        
        // dump items..
        
        
          
        echo "GENERATED FILES:\n";
        // summary
        echo "    ". implode("\n    ", $this->out). "\n";
        
        
        exit;
        
      
         
    }
     
    var $deletes = array(); // TABLE => [key] => TRUE|FALSE
    var $dumps = array(); // TABLE => [key] => TRUE|FALSE - if it's been scanned..
    var $dscan = array(); // TABLE:COL => [value => TRUE|FALSE] - if its been scanned..
    var $childfiles = array(); // array of [ 'sourcedirectory' , 'subdirectory(s) and filename' ]
    var $childthumbs = array(); // array of [ 'filename', 'filename' ,......]
    var $filesize = 0; // size of files to be saved. (not total deletd..)
    var $filetotal = 0; // number of distinct files to be saved (not total deleted)
    /**
     * scan table for
     * a) what depends on it (eg. child elements) - which will be deleted.
     * b) what it depends on it (eg. parent elements) - which will be dumped..
     */
      
    
    
    function generateDelete() {  
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.delete.sql';
        $this->out[] = $target;
        $fh = fopen($target, 'w');
        
        
        
        foreach($this->deletes as $tbl=>$ar) {
            
            $do = DB_DataObject::factory($tbl);
            $tbl = $do->tableName();
            $keys = $do->keys();
            $key = $keys[0];
            $do->whereAddIn($keys[0] , array_keys($ar), 'int');
            $do->find();
            $archivePaths = method_exists($do,'archivePaths');
            $listThumbs = method_exists($do,'listThumbs');
            while ($do->fetch()) {
                
                if ($archivePaths) {
                    $ct = $do->archivePaths();
                    if ($ct) {
                        $this->childfiles[] = $ct;
                    }
                }
                if ($listThumbs) {
                    $ct = $do->listThumbs();
                    if($ct) {
                        $this->childthumbs[] = $ct;
                    }
                }
                $id = $do->$key;
                
                fwrite($fh, "DELETE FROM `$tbl` WHERE `$key` = $id;\n"); // we assume id's and nice column names...
            }
            $do->free();
        }
        fclose($fh);
    }
    function generateShell() {
        
        if (empty($this->childfiles) && empty($this->childthumbs)) {
            return;
        }
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.copy.sh';
        $this->out[] = $target;
        $fh = fopen($target, 'w');
        
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.delete.sh';
        $this->out[] = $target;
        $fh2 = fopen($target, 'w');
        
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.restore.sh';
        $this->out[] = $target;
        $fh3 = fopen($target, 'w');
        
      
        $done = array();
        $donedir  = array();
        foreach($this->childfiles as  $v) {
            
            if (isset($done[$v[1]])) {
                continue;
            }
            
            $done[$v[1]] = true;
            
            $this->filesize += filesize($v[0].'/'.$v[1]);
            $this->filetotal++;
            $fdir = dirname($this->args['dump-dir'] .'/'.$v[1]);
            if (!isset($donedir[$fdir])) { 
                fwrite($fh,"mkdir -p " . escapeshellarg(dirname($this->args['dump-dir'] .'/'.$v[1])) ."\n" );
            }
            fwrite($fh,"cp " . escapeshellarg($v[0].'/'.$v[1]) . ' ' . escapeshellarg($this->args['dump-dir'] .'/'.$v[1]) ."\n" );
            if (!isset($donedir[$fdir])) { 
                fwrite($fh3,"mkdir -p " . escapeshellarg(dirname($v[0].'/'.$v[1])) ."\n" );
            }
            $donedir[$fdir] = true;
            
            fwrite($fh3,"cp " .  escapeshellarg($this->args['dump-dir'] .'/'.$v[1]) . ' ' . escapeshellarg($v[0].'/'.$v[1]) . "\n" );
            fwrite($fh2,"rm " . escapeshellarg($v[0].'/'.$v[1]) ."\n" );
        }
        fclose($fh);
        fclose($fh3); // restore does not need to bother with thumbnails.
         
        
        
        foreach($this->childthumbs as  $v) {
            foreach($v as $vv) { 
                fwrite($fh2,"rm " . escapeshellarg($vv). "\n");
            }
        }
        fclose($fh2);
    }
     
    function generateInsert()
    {
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.sql';
        $this->out[] = $target;
        $fh = fopen($target,'w');
         
         
        
        foreach($this->dumps as $tbl => $ar) {
            if (empty($ar)) {
                continue;
            }
            $do = DB_DataObject::factory($tbl);
             
            $keys = $do->keys();
         
            $do->whereAddIn($keys[0] , array_keys($ar), 'int');
            $do->find();
            while ($do->fetch()) {
                fwrite($fh,$this->toInsert($do));
            }
             $do->free();
            
        }
        fclose($fh);
        
        
    }

    
      
    /**
     * toInsert - does not handle NULLS... 
     */
    function toInsert($do)
    {
        $kcol = array_shift($do->keys());
         
        // for auto_inc column we need to use a 'set argument'...
        $items = $do->table();
        //print_R($items);
        
        // for
        $leftq     = '';
        $rightq    = '';
        
        $table = $do->tableName();
        
         
        foreach(  $items  as $k=>$v)
        {
            if ($leftq) {
                $leftq  .= ', ';
                $rightq .= ', ';
            }
            
            $leftq .= '`' . $k . '`';
            
             
            
            
            if ($v & DB_DATAOBJECT_STR) {
                $rightq .= $do->_quote((string) (
                        ($v & DB_DATAOBJECT_BOOL) ? 
                            // this is thanks to the braindead idea of postgres to 
                            // use t/f for boolean.
                            (($do->$k === 'f') ? 0 : (int)(bool) $do->$k) :  
                            $do->$k
                    )) . " ";
                continue;
            }
            if (is_numeric($do->$k)) {
                $rightq .=" {$do->$k} ";
                continue;
            }
            $rightq .= ' ' . intval($do->$k) . ' ';
        }
        
        return "INSERT INTO `{$table}` ($leftq) VALUES ($rightq);\n";
        
    }
    
    
}
