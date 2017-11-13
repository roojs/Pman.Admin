<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_application_signup extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_application_signup';
    
    function sendVerification($template, $roo)
    {   
        $content = array(
            'template'      => $template,
            'person'        => $this,
            'serverName'    => $_SERVER['SERVER_NAME'],
            'baseURL'       => $roo->baseURL
        );
        
        $sent = DB_DataObject::factory('core_email')->send($content);
        
        if(!is_object($sent)){
            return true;
        }
        
        print_r($sent->getMessage());exit;
        return false;
    }

}
