<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Modx_site_content extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'modx_site_content';
    
    
    var $route =  array(
        1 => 'Coba',
        5 => 'Coba/TermsOfUse',
        7 => 'Coba/Disclaimer',
        8 => 'Coba/PrivacyPolicy',
        9 => 'Coba/ApplicationGuide',
        10 => 'Coba/TermsAndCondition',
        11 => 'Coba/Registration/FirstStep',
        14 => 'Coba/Registration/LandingPage',
        17 => 'Coba/Corporate/Declarations',
        24 => 'Coba/Corporate/Banking',
        25 => 'Coba/Corporate/Documents',
        29 => 'Coba/Corporate/Completion',
        30 => 'Coba/Corporate/Financial',
        32 => 'Coba/Corporate/Contact',
        38 => 'Coba/Corporate/SignForm',
        64 => 'Coba/Individual/Declarations',
        70 => 'Coba/Individual/SignForm',
        71 => 'Coba/Individual/Banking',
        73 => 'Coba/Individual/Documents',
        77 => 'Coba/Individual/Profile',
        78 => 'Coba/Individual/Completion',
        80 => 'Coba/Individual/Dashboard',
        81 => 'Coba/Individual/Contact',
        83 => 'Coba/Individual/Financial',
        110 => 'Coba/Joint/Declarations',
        115 => 'Coba/Joint/Financial',
        120 => 'Coba/Joint/Contact',
        122 => 'Coba/Joint/SignForm',
        124 => 'Coba/Joint/Banking',
        125 => 'Coba/Joint/Completion',
        130 => 'Coba/Joint/Documents',
        133 => 'Coba/LoginCheckSteps'
    );
    
    function getByMap($type, $class)
    {
        $map = implode('/', array_filter(array('Coba', $type, $class)));
        
        $id = 1; // default to index...
        
        $modx_site_content = DB_DataObject::factory('modx_site_content');
        
        $pg = HTML_FlexyFramework2::get()->page;
        
        if(array_search($map, $this->route) != false){
            $id = array_search($map, $this->route);
        } else {
            $modx_site_content->alias = $pg->baseURL . '/'. $type .'/'. $class; // use the class url..
            return $modx_site_content;
        }
        
        if (!$modx_site_content->get($id)) {
            $modx_site_content->alias = $pg->baseURL . '/'. $type .'/'. $class; // use the class url..
            return $modx_site_content;
        }
        $modx_site_content->alias = $pg->rootURL .'/'. $modx_site_content->alias ;
        return $modx_site_content;
    }
    
    function redirect()
    {
        $ff = HTML_FlexyFramework::get();
        
        if(empty($this->alias) || $this->alias == 'index'){
            header("Location:{$ff->baseURL}");
            exit;
        }
        
        header("Location:{$this->alias}.html");
        exit;
    }
    
}
