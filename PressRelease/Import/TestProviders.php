<?php

/**
 * Description of TestProviders
 *
 * @author chris
 */
require_once 'Pman.php';

class Pman_PressRelease_Import_TestProviders extends Pman
{
    //put your code here
    var $cli  = false;
    
    static $cli_desc = "Local Search Engine -- TestProviders";
    
    static $cli_opts = array(
         'mailto' => array(
            'desc' => 'mail to person',
            'short' => 'm',
            'default' => '',
            'min' => 1,
            'max' => 1,
        ),
    );
    
    function getAuth()
    {
        $cli = HTML_FlexyFramework::get()->cli;
        if ($cli) {
            $this->cli = true;
            return true;
        }
        parent::getAuth();
        $au = $this->getAuthUser();
        if (!$au) {
            $this->jerrAuth();
        }
        return true;
    }
    
    function get($q='', $opts)
    {
//        print_r('in?');
//        print_r($this->cli_args);
//        $arr = get_defined_functions();
//
//print_r($arr);
        $searchTarget = get_defined_functions();
        
        
        $this->opts = $opts;
        $parser = array(
            'Baidu',
            'Bing',
            'Google',
            'Weibo',
            'Yahoo'
        );
        
        $ret = array();
        
        foreach($parser as $p){
            require_once 'Pman/Reader/Parse/'. $p.'.php';
            $cls = 'Pman_Reader_Parse_'.$p;
            $x = new $cls;
            
            $st = rand(0,count($searchTarget['internal']));
            
            $str = '["'.$searchTarget['internal'][$st].'"]';
            
            if (!$x->parseSearch($str)) {
                $ret[] = $p;
                echo "No artices found when calling parser {$p} \n";
            }
        }
        
        if(!empty($ret)){
            $this->mailto($ret);
        }
    }
    
    function mailto($parser)
    {
        if(empty($this->opts['mailto'])){
            $admins = DB_DataObject::Factory('Groups')->lookup('name', 'system-email-from')->members('email');
            if (!$admins) {
                return $this->herr("email group has not bee set up");
            }
            $this->opts['mailto'] = implode(',', $admins);
            
        }
        $aa = $this->sendTemplate('test_providers', array(
            'email' => $this->opts['mailto'],
            'failed' => implode(',', $parser)
        ));
        
        echo "\n\nThe failed providers : " . implode(',', $parser) . " and email to ". $this->opts['mailto'] ."\n";
        exit;
    }
}
