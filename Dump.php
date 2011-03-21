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

class Pman_Admin_Dump extends Pman {
    
    function getAuth()
    {
        
        if (!HTML_FlexyFramework::get()->cli) {
            die("Access only permitted from cli");
        }
        
    }
    var $args = array();
    var $deps = array(); // list of dependants
    var $out = array(); // list of created sql/shell scripts.
    
    function get($path )
    {
        $argv = $_SERVER['argv'];
        array_shift($argv);
        array_shift($argv);
        
        $opts = explode(',', 'table==,where==,dump-dir==');
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
            if (empty($args[substr($req,0, -2)])) {
                $errs[] = "--".substr($req,0, -2) . ' is required';
            }
        }
        if (!empty($errs)) {
            die(print_R($errs,true));
        }
        
        $this->args = $args;
        $this->out = array();
        $this->discover($this->args['table'], $this->args['where'], true);
        
        print_r($this->dumps);
        exit;
        
        
        if (!file_exists($args['dump-dir'])) {
            mkdir($args['dump-dir'], 0777, true);
        }
         
        $this->generateInsert();
        $this->generateDelete();
        $this->generateShell();
           
        echo "GENERATED FILES:";
        print_r($out);
        exit;
        
      
         
    }
     
    var $deletes = array(); // TABLE => [key] => TRUE|FALSE
    var $dumps = array(); // TABLE => [key] => TRUE|FALSE - if it's been scanned..
    
    /**
     * scan table for
     * a) what depends on it (eg. child elements) - which will be deleted.
     * b) what it depends on it (eg. parent elements) - which will be dumped..
     */
        
    function discover($table, $where, $is_delete = false )
    {
        
        if (!isset($this->dumps[$table])) {
            $this->dumps[$table] = array();
        }
        if ($is_delete && !isset($this->deletes[$table])) {
            $this->deletes[$table] = array();
        }
        DB_DataObject::debugLevel(1);
        $x = DB_DataObject::factory($table);
          $keys = $x->keys();
          
        if (is_array( $where)) {
            $x->whereAddIn($keys[0] , $where, 'int');
        } else {
        
            $x->whereAdd($where);
        }
        // what we need
        // a) id's of elements in this table
        // b) columns which point to other tables..
        $links = $x->links();
        $cols = array_keys($links);
      
         array_push($cols, $keys[0]);
         
        
        $x->selectAdd();
        $x->selectAdd('`'.  implode('`,`', $cols) . '`');
        $x->find();
        DB_DataObject::debugLevel(0);
        while ($x->fetch()) {
            foreach($cols as $k) {
                if (empty($x->$k)) { // skip blanks.
                    continue;
                }
                if (isset($links[$k])) {
                    // it's a sublink..
                    $kv = explode(':', $links[$k]);
                    if (!isset($this->dumps[$kv[0]])) {
                        $this->dumps[$kv[0]] = array();
                    }
                    if (!isset($this->dumps[$kv[0]][$x->$k])) {
                        $this->dumps[$kv[0]][$x->$k] = false; // not checked yet..
                    }
                    continue;
                }
                // assume it's the key..
                if (empty($this->dumps[$table][$x->$k])) {
                    $this->dumps[$table][$x->$k] = true; // we have checked this one...
                }
                if ($is_delete) {
                    $this->deletes[$table][$x->$k] = false; // not checked yet..
                }
                
                
            }
            
        }
        print_R($this->dumps);exit;
        // itterate through dumps to find what needs discovering
        foreach($this->dumps as $k=>$v) {
            $ar = array();
            foreach($v as $id => $fetched) {
                if (!$fetched) {
                    $ar[] = $id;
                }
            }
            if (count($ar)) { 
                $this->discover($k, $ar,false);
            }
             
        }
        
        
        
        
      
        
        
        
        
    }
    function oldStuff() {
        
       
        
        $target = $args['dump-dir'] .'/'. date('Y-m-d').'.sql';
        $out[] = $target;
        $this->fh = fopen($target,'w');
        //print_r($args);
        //DB_DataObject::debugLevel(1);
        // since we are runnign in cli mode... we will be a bit wild and free with verification
        $x = DB_DataObject::factory($args['table']);
        $x->{$args['col']} = $args['val'];
        
        $x->find();
         
        while ($x->fetch()) {
        
            fwrite($this->fh, $this->toInsert($x));
            $this->dumpChildren($x);
            
        }
        
         
        foreach($this->deps as $s=>$status) {
            if (isset($this->dumped[$s])) {
                continue;
            }
            list($tbl, $key, $val) = explode(':', $s);
            $dd = DB_DataObject::factory($tbl);
            if ($dd->get($key,$val)) {
                fwrite($this->fh, $this->toInsert($dd));
            }
        }
        
        fclose($this->fh);
    }
    
    function generateDelete() {  
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.delete.sql';
        $this->out[] = $target;
        $fh = fopen($target, 'w');
        foreach($this->childscanned as $s=>$v) {
            list($tbl, $key, $val) = explode(':', $s);
            fwrite($fh, "DELETE FROM $tbl WHERE $key = $val;\n"); // we assume id's and nice column names...
             
        }
        fclose($fh);
    }
    function generateShell() {
        
        
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.copy.sh';
        $this->out[] = $target;
        $fh = fopen($target, 'w');
        
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.delete.sh';
        $this->out[] = $target;
        $fh2 = fopen($target, 'w');
        
        $target = $this->args['dump-dir'] .'/'. date('Y-m-d').'.restore.sh';
        $this->out[] = $target;
        $fh3 = fopen($target, 'w');
        
        
        foreach($this->childfiles as $s=>$v) {
            fwrite($fh,"mkdir -p " . escapeshellarg(dirname($args['dump-dir'] .'/'.$v[1])) ."\n" );
            fwrite($fh,"cp " . escapeshellarg($v[0].'/'.$v[1]) . ' ' . escapeshellarg($args['dump-dir'] .'/'.$v[1]) ."\n" );
            
            fwrite($fh3,"mkdir -p " . escapeshellarg(dirname($v[0].'/'.$v[1])) ."\n" );
            fwrite($fh3,"cp " .  escapeshellarg($args['dump-dir'] .'/'.$v[1]) . ' ' . escapeshellarg($v[0].'/'.$v[1]) . "\n" );
            
            fwrite($fh2,"rm " . escapeshellarg($v[0].'/'.$v[1]) ."\n" );
        }
        fclose($fh);
        fclose($fh3); // restore does not need to bother with thumbnails.
        
        
        
        foreach($this->childthumbs as $s=>$v) {
            foreach($v as $vv) { 
                fwrite($fh2,"rm " . escapeshellarg($vv). "\n");
            }
        }
        fclose($fh2);
    }
     
    
    
    var $children = array(); // map of search->checked
    var $childscanned = array();
    var $childfiles = array();
    var $childthumbs = array();
    function dumpChildren($do)
    {
        $kcol = array_shift($do->keys());
        $kid = $do->tableName() . ':' . $kcol . ':' . $do->{$kcol};
        if (isset($this->childscanned[$kid])) {
            return;
        }
        $this->childscanned[$kid] = true;
        
        if (method_exists($do,'archivePaths')) {
            $ct = $do->archivePaths();
            if ($ct) {
                $this->childfiles[$kid] = $ct;
            }
        }
        if (method_exists($do,'listThumbs')) {
            $ct = $do->listThumbs();
            if($ct) {
                $this->childthumbs[$kid] = $ct;
            }
        }
        
        global $_DB_DATAOBJECT;
        $do->links();; //force load
        $tn = $do->tableName();
        
        
        foreach($_DB_DATAOBJECT['LINKS'][$do->database()] as $tbl => $links) {
            // hack.. - we should get rid of this hack..
            if ($tbl == 'database__render') {
                continue;
            }
            //if ($tbl == $tn) { // skip same table 
            //    continue;
            //}
            foreach ($links as $tk => $kv) {
                
               // var_dump($tbl);
                list($k,$v) = explode(':', $kv);
                if ($k != $tn) {
                    continue;
                }
                $add = implode(':', array($tbl, $tk, $do->$v));
                //echo "ADD $tbl $tk=>$kv : $add\n";
                $this->children[$add] = 0;
                
            }
            
        }
       // print_r($this->children);exit;
        $ch = $this->children ;
        
        $todo = array();
        foreach($ch as $s=>$status) {
            if ($this->children[$s]) {
                continue;
            }
            // flag it as being done, so we do not recurse..
            $this->children[$s] = 1;
            
            list($tbl, $key, $val) = explode(':', $s);
            $dd = DB_DataObject::factory($tbl);
            $dd->$key = $val;
            $dd->find();
            
            while ($dd->fetch()) {
                $todo [] = clone($dd);
                // if we have dumped this already.. ignore it..
                
            }
            
            
        }
        foreach($todo as $dd) {
            fwrite($this->fh, $this->toInsert($dd));
            $this->dumpChildren($dd);
        }
        
        
        
    }
    
 
    var $dumped  = array();
    /**
     * toInsert - does not handle NULLS... 
     */
    function toInsert($do)
    {
         $kcol = array_shift($do->keys());
        $kid = $do->tableName() . ':' . $kcol . ':' . $do->{$kcol};
        if (isset($this->dumped[$kid])) {
            return;
        }
        //echo "DUMP: $kid\n";
        $this->dumped[$kid] = true;
        
        // for auto_inc column we need to use a 'set argument'...
        $items = $do->table();
        //print_R($items);
        $quoteIdentifiers  = !empty($_DB_DATAOBJECT['CONFIG']['quote_identifiers']);
        // for
        $leftq     = '';
        $rightq    = '';
        
        
        $deplinks = $do->links();
        
        foreach(  $items  as $k=>$v)
        {
            if ($leftq) {
                $leftq  .= ', ';
                $rightq .= ', ';
            }
            
            $leftq .= ($quoteIdentifiers ? ($DB->quoteIdentifier($k) . ' ')  : "$k ");
            
            // only handles numeric links..
            if (is_numeric($do->$k) && $do->$k && $deplinks && !empty($deplinks[$k])) {
               // die("got deplink" . $deplinks[$k]);
                $l = explode(':', $deplinks[$k]);
                $add = $deplinks[$k].':' . $do->$k;
                
                $this->deps[$add] = 0;
            }
            
            
            
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
        $table = ($quoteIdentifiers ? $DB->quoteIdentifier($do->__table)    : $do->__table);
        return "INSERT INTO {$table} ($leftq) VALUES ($rightq);\n";
        
    }
    
    
}
