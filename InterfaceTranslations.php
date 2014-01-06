<?php


/**
 * Pman_Admin_Translation:
 * - the latest version of this....
 *
 * Files:
 *   output / current state:    ROOT/_translations_/MODULE.js
 *   input:       Pman::moduleJavascriptFilesInfo($MODULE)->translation_data
 * 
 * 
 * see:
 * Pman->modulesList()
 *
 * Note: at present the front end does not query this to get a list of modules..
 * 
 */

require_once 'Pman/Admin/Translations.php';

class Pman_Admin_InterfaceTranslations extends Pman_Admin_Translations 
{
     
    function getAuth()
    {
        
        return true;
    }
    
    
    function get($module)
    {
        
        if (empty($module)) {
            $this->jerr("no module selected");
        }
        $this->init();
         //DB_DataObject::debugLevel(1);
        require_once 'Services/JSON.php';
        $d = DB_DataObject::factory('translations');
        $d->module = $module;
        $d->selectAdd();
        $d->selectAdd('distinct(tlang) as tlang');
        header('Content-type: text/javascript');
        $langs= $d->fetchAll('tlang');
        foreach($langs as $lang) {
            // output the translations strings file..
            
                
            $this->loadOriginalStrings($module);
            
            $data = $this->loadTranslateDB($lang,$module);
            
            $j = new Services_JSON();
            echo "_T = _T || {} ; _T.{$lang}= Roo.apply( _T.{$lang} || { }, " .  $j->stringify($data, null, 4) . ");\n";
            
        }
        exit;
               
    }
    
    function post() 
    {
        $this->jerr("invalid url"); 
     
    }
}