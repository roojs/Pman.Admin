<?php

require_once 'Pman.php';
require_once 'Coba.php';

class Pman_Coba_ModxSession extends Pman 
{
   
    function getAuth()
    {
        //parent::getAuth(); // load company!
        $au = $this->getAuthUser();
        
        if (!$au || !$au->pid()) {
            
            $this->jerr("authenticated Users only");
        }
        
        
        $this->authUser = $au;
        return true;
    }
    
   
    function get()
    {
         if(empty($_GET['investor_id']) || empty($_GET['account_type'])) { 
            $this->jerror('ERROR','Missing user_id or account_type', $errors=array(), $content_type = false);
            return;
        }
        // investor ID
        $user_id = trim($_GET['investor_id']);	
        $account_type = trim($_GET['account_type']);	
            // creating the session data array
        
        $modx_token_array = array( 'modx.user.0.resourceGroups' => array('web'=>array()),
            'modx.user.0.attributes'=> array(
                'web'=> array(
                    'modAccessContext' =>  array(
                        'web'=>  array(
                            '0'=>  array(
                                'principal' => 0,
                                'authority' => 0, 
                                'policy' => array(
                                    'load' => 1
                                )
                            )
                         )
                    ), 
                    'modAccessResourceGroup' => array(),
                    'modAccessCategory' => array(),
                    'sources.modAccessResourceGroup' => array(),
                    'modAccessNamespace' => array()
                )
            ),
            
            'modx.user.contextTokens' => array(
                    'web'=>$user_id
            ),
            'modx.web.user.token' => array( 'modx56c40ae4272610.40167821_107659a4dff3c93758.93495480'),
            'modx.web.session.cookie.lifetime' => array(0),
            'modx.web.user.config' => array(),
                
            'modx.user.'.$user_id.'.resourceGroups' => array(
                'web'=>array()
            ),
            'modx.user.'.$user_id.'.attributes'  => array(
                'web'=> array(
                    'modAccessContext' => array(),
                    'modAccessResourceGroup' => array(),
                    'modAccessCategory' => array(),
                    'sources.modAccessResourceGroup' => array(),
                    'modAccessNamespace' => array()
                )
            ),         
            'modx.mgr.user.token' =>array('modx56c40ae4272610.40167821_159794824ebf884.45346569'),
            'modx.mgr.session.cookie.lifetime' => array(0),
            'modx.mgr.user.config' => array(),
            'newResourceTokens' => array()
        );
        $modx_token_str ='';				  	
        foreach($modx_token_array as $key => $value) {
            $_SESSION[$key] = $value;
        }
    
        $modx_site_content = DB_DataObject::factory('modx_site_content')->getByMap(ucfirst($account_type), 'Contact');
        
        $url = "{$modx_site_content->alias}.html";
        
        $this->jok($url);
        
    }
    
    
}
