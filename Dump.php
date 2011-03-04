<?php


/**
 * This should allow you to dump a series of data, so it could be restored later...
 * The format will be an SQL file...
 *
 * usage:
 *    php index.php  Admin/Dump --table=Project --col=id --value=123 --delete=yes --dump-dir=...
 *
 *    Output??? Stdout..??
 *    
 *  Basically it has to output all the records and their dependants. (parent and children)
 *
 *  Then when deleting it deletes record + children..
 *
 *
 *  Each ouput is simple insert statement..
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
    var $deps = array(); // list of dependants
    
    function get($path )
    {
        $argv = $_SERVER['argv'];
        array_shift($argv);
        array_shift($argv);
        
        $required = explode(',', 'table=,col=,val=');
        $arg_names = array_merge($required,  explode(',', 'delete==,dump-dir=='));
        print_r($arg_names);
        require_once 'Console/Getopt.php';
        $go = Console_Getopt::getopt($argv, '', $arg_names);
        $args = array();
        foreach($go[0] as $ar) {
            $args[substr($ar[0],2)] = $ar[1];
        }
        print_r($args);
        DB_DataObject::debugLevel(1);
        // since we are runnign in cli mode... we will be a bit wild and free with verification
        $x = DB_DataObject::factory($args['table']);
        $x->get($args['col'], $args['val']);
        echo $this->toInsert($x);
        $this->dumpChildren($x);
        $this->dumpDeps();
    }
    /**
     * toInsert - does not handle NULLS... 
     */
    function toInsert($do)
    {
        // for auto_inc column we need to use a 'set argument'...
        $items = $do->keys();
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
            
            if ($deplinks && !empty($deplinks[$k])) {
                die("got deplink" . $deplinks[$k]);
                
            }
            
            
            
            if ($v & DB_DATAOBJECT_STR) {
                $rightq .= $this->_quote((string) (
                        ($v & DB_DATAOBJECT_BOOL) ? 
                            // this is thanks to the braindead idea of postgres to 
                            // use t/f for boolean.
                            (($this->$k === 'f') ? 0 : (int)(bool) $this->$k) :  
                            $this->$k
                    )) . " ";
                continue;
            }
            if (is_numeric($this->$k)) {
                $rightq .=" {$this->$k} ";
                continue;
            }
            $rightq .= ' ' . intval($this->$k) . ' ';
        }
        $table = ($quoteIdentifiers ? $DB->quoteIdentifier($this->__table)    : $this->__table);
        return "INSERT INTO {$table} ($leftq) VALUES ($rightq);\n";
        
    }
    
    
}
