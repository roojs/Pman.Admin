<?php


/**
 * This should allow you to dump a series of data, so it could be restored later...
 * The format will be an SQL file...
 *
 * usage:
 *    php index.php Pman/Admin/Dump --table=Project --col=id --value=123 --delete=yes --dump-dir=...
 *
 *    Output??? Stdout..??
 *    
 *  Basically it has to output all the records and their dependants. (parent and children)
 *
 *  Then when deleting it deletes record + children..
 *
 *
 *  
 * 
 *
 * 
 */


function Pman_Admin_Dump extends Pman {
    
    function getAuth()
    {
        if (!$this->cli) {
            die("Access only permitted from cli");
        }
        
    }
    
    function get($path, $args=array())
    {
        // since we are runnign in cli mode... we will be a bit wild and free with verification
        $x = DB_DataObject::factory($args['table']);
        $x->get($args['col'], $args['id']);
        $this->out($x);
        
    }
    
    function out($do)
    {
        // for auto_inc column we need to use a 'set argument'...
        
        // for 
        
        
        
    }
    
    
}
