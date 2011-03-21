<?php


/**
 * This should allow you to dump a series of data, so it could be restored later...
 * The format will be an SQL file...
 *
 * usage:
 *    php index.php  Admin/Dump --table=Project --col=id --value=123 --dump-dir=/directory_to_put_sql+shell files
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
 */

require_once 'Pman.php';

class Pman_Admin_Dump extends Pman {
    
    function getAuth()
    {
        
        if (!HTML_FlexyFramework::get()->cli) {
            die("Access only permitted from cli");
        }
        
    }
    var $deps = array(); // list of dependants
    
    function get($path )
    {
        $argv = $_SERVER['argv'];
        array_shift($argv);
        array_shift($argv);
        
       
        require_once 'Console/Getopt.php';
        $go = Console_Getopt::getopt2($argv, '',  explode(',', 'table==,col==,val==,dump-dir=='));
        if (is_object($go)) {
            die($go->toString());
        }
        print_r($go);exit;
        $args = array();
        foreach($go[0] as $ar) {
            
            $args[substr($ar[0],2)] = $ar[1];
        }
        if (!file_exists($args['dump-dir'])) {
            mkdir($args['dump-dir'], 0777, true);
        }
        
        $out = array();
        
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
        
        $target = $args['dump-dir'] .'/'. date('Y-m-d').'.delete.sql';
        $out[] = $target;
        $this->fh = fopen($target, 'w');
        foreach($this->childscanned as $s=>$v) {
            list($tbl, $key, $val) = explode(':', $s);
            fwrite($this->fh, "DELETE FROM $tbl WHERE $key = $val;\n"); // we assume id's and nice column names...
             
        }
        fclose($this->fh);
        
        
        $target = $args['dump-dir'] .'/'. date('Y-m-d').'.copy.sh';
        $out[] = $target;
        $this->fh = fopen($target, 'w');
        
        $target = $args['dump-dir'] .'/'. date('Y-m-d').'.delete.sh';
        $out[] = $target;
        $this->fh2 = fopen($target, 'w');
        
        $target = $args['dump-dir'] .'/'. date('Y-m-d').'.restore.sh';
        $out[] = $target;
        $this->fh3 = fopen($target, 'w');
        
        
        foreach($this->childfiles as $s=>$v) {
            fwrite($this->fh,"mkdir -p " . escapeshellarg(dirname($args['dump-dir'] .'/'.$v[1])) ."\n" );
            fwrite($this->fh,"cp " . escapeshellarg($v[0].'/'.$v[1]) . ' ' . escapeshellarg($args['dump-dir'] .'/'.$v[1]) ."\n" );
            
            fwrite($this->fh3,"mkdir -p " . escapeshellarg(dirname($v[0].'/'.$v[1])) ."\n" );
            fwrite($this->fh3,"cp " .  escapeshellarg($args['dump-dir'] .'/'.$v[1]) . ' ' . escapeshellarg($v[0].'/'.$v[1]) . "\n" );
            
            fwrite($this->fh2,"rm " . escapeshellarg($v[0].'/'.$v[1]) ."\n" );
        }
        fclose($this->fh);
        fclose($this->fh3); // restore does not need to bother with thumbnails.
        
        
        
        foreach($this->childthumbs as $s=>$v) {
            foreach($v as $vv) { 
                fwrite($this->fh2,"rm " . escapeshellarg($vv). "\n");
            }
        }
        fclose($this->fh2);
        echo "GENERATED FILES:";
        print_r($out);
        exit;
        
        echo "FILES TO COPY AND DELETE:"; print_r($this->childfiles);
        echo "FILES TO DELETE:"; print_r($this->childthumbs);
        exit;
        echo "CHILDREN WILL BE DELETED:"; print_r($this->childscanned);
        echo "DEPS:";print_R($this->deps);
            
        exit;
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
