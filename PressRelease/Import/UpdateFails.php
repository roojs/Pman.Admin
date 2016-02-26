<?php


require_once 'Pman.php';

class Pman_PressRelease_Import_UpdateFails extends Pman
{
    var $cli  = false;
    
    static $cli_desc = "Run through last months notifications, and update the fail data..";
    
    static $cli_opts = array(
    
    );
    
    function getAuth()
    {
        $cli = HTML_FlexyFramework::get()->cli;
        if ($cli) {
            $this->cli = true;
            return true;
        }
        $this->jerr("cli only");
        
    }
    
    function get()
    {
        echo "STARTING?\n";
        //DB_DataObject::debugLevel(1);
        $n = DB_DAtaObject::Factory('pressrelease_notify');
        $nn = clone($n);
        $n->whereAdd("act_when > NOW() - INTERVAL 3 MONTH AND sent > '1980-01-01 00:00:00'");
        $n->ontable = 'pressrelease_entry';
        $n->find();
        $res = array();
        while ($n->fetch()) {
            $key = "{$n->person_id}-{$n->field}";
            if ($n->msgid == '') {
                // fail
                if (!isset($res[$key])) {
                    $res[$key] = 0;
                }
                $res[$key]++;
                
                //$q = "UPDATE pressrelease_contact SET {$n->field}_fail = {$n->field}_fail  + 1 WHERE id = {$n->person_id}";
            } else {
                if (isset($res[$key])) {
                    $res[$key]  = 0;
                }
                // success.
                //$q = "UPDATE pressrelease_contact SET {$n->field}_fail = 0 WHERE id = {$n->person_id}";
            }
            
            
        }
         //DB_DataObject::debugLevel(1);
        foreach($res as $k=>$v) {
            if (!$v) {
                continue;
            }
            list($id,$field) = explode('-', $k);
            $nx = clone($nn);
            $nx->query( "UPDATE pressrelease_contact SET {$field}_fails = {$v} WHERE id = {$id}");
                
        }
        
        echo "DONE";
        
        //print_R($res);
        exit;
    }
    
    
}