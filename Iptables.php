<?php


require_once 'Pman.php';

class Pman_Admin_Iptables extends Pman {
    
    static $cli_desc = "Read ip addresses that have been used to log in, and add them to the iptables list..";
    
   
    
    function getAuth()
    {
        print_r($this);exit;
    }
    function get()
    {
        // find IP's that have been used to log in.
        // dump them to the iptables file.
        // if it's different - apply it...
        
        
        
    }
    
}