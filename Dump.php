<?php


/**
 * This should allow you to dump a series of data, so it could be restored later...
 * The format will be an SQL file...
 *
 * usage:
 *    php index.php Pman/Admin/Dump --table=Project --col=id --value=123 --delete=yes
 *
 *    Output??? Stdout..??
 *    
 * 
 *
 * It should handle the following
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
    
    
}
