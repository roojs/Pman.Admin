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
        if (!$this->cli) {
            die("Access only permitted from cli");
        }
        
    }
    var $deps = array(); // list of dependants
    
    function get($path, $args=array())
    {
        print_r($_SERVER['argv']);exit;
        
        // since we are runnign in cli mode... we will be a bit wild and free with verification
        $x = DB_DataObject::factory($args['table']);
        $x->get($args['col'], $args['id']);
        $this->toInsert($x);
        $this->dumpChildren($x);
        $this->dumpDeps();
    }
    /**
     * toInsert - does not handle NULLS... 
     */
    function toInsert($do)
    {
        // for auto_inc column we need to use a 'set argument'...
        $items = $do->items();
        $quoteIdentifiers  = !empty($_DB_DATAOBJECT['CONFIG']['quote_identifiers']);
        // for
        $leftq     = '';
        $rightq    = '';
        
        
        $deplinks = $do->links();
        
        foreach($do-items() as $k=>$v)
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
        $ret = "INSERT INTO {$table} ($leftq) VALUES ($rightq);\n";
        
    }
    
    
}
