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

require_once 'Pman.php';

class Pman_Admin_InterfaceTranslations extends Pman 
{
     var $prefix = '';
    var $fn = '';
    var $data = array();
    
    var $original = array() ; // filename => array( orig_string > orig_string)
    var $originalKeys = array() ; // md5(filename-orig_string) => filename
     
    function getAuth()
    {
        
        return true;
    }
    
    
    function get($module, $opts = Array())
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
    
    function post($v) 
    {
        $this->jerr("invalid url"); 
     
    }
    
     /**
     * load strings that need translating..
     */
    
    function loadOriginalStrings($module)
    {
        // since this can handle errors better.!!?
        $info = $this->moduleJavascriptFilesInfo($module);
        //print_r($info);
        
        
        
        $this->original  = array();
        $tfile = $info->basedir . '/'. $info->translation_data;
         //var_dump($tfile);
        //if (empty($tfile) || !file_exists($tfile)) {
            
            foreach($info->filesmtime as $f =>$mt) {
                $bjs = preg_replace('/\.js$/','.bjs', $f);
                if (!file_exists($bjs)) {
                    continue;
                }
                $jd = json_decode(file_get_contents($bjs));
                if (empty($jd->strings)) {
                    continue;
                }
                $this->original[str_replace('.bjs', '', basename($bjs)) ] = array_flip((array)$jd->strings);
            }
             
            file_put_contents($tfile, json_encode($this->original));
            
            
        //}
        
        
        print_R($this->original);exit;
        
        
        $this->original = (array) json_decode( file_get_contents($tfile) );
        ksort($this->original);

        $this->originalKeys = array();
        
        // 
        foreach($this->original as $k=>$ar) {
            foreach($ar as $tr=>$trv) {
                $key = md5($k.'-'.$tr);
                $this->originalKeys[$key] = $k;
            }
        }
        
    }
    
    /***
     *
     * loadTranslateDB -
     *
     *
     * @return key=>value list of translation_id=>tranlation.
     *
     *
     */
    
    function loadTranslateDB($lang, $module)
    {
        
        //DB_DataObject::debugLevel(1);
        $d = DB_DataObject::factory('translations');
        $d->module = $module;
        $d->tlang = $lang;
        $d->whereAdd('LENGTH(tval) > 0');
        $ret = array();
        
        if ($d->count()) {
            // since key includes file 
            $ret = $d->fetchAll('tkey','tval'); /// shoudl we include updates
        }
        // no data is contained in the database, we should initialize it, if we can
        $info  = $this->moduleJavascriptFilesInfo($module);
        $fn = $info->module_dir.'/_translations_/'.$lang.'.js';
        
       
        if (!file_exists($fn)) {
            ///Die($fn ." does not exist?");
            return $ret;
        }
        
        
        $default = (array) json_decode(file_get_contents($fn));
        //echo '<PRE>';print_r($default); print_r($this->originalKeys);exit;
        
        
        
        foreach($default as $k=>$v) {
            if (isset($ret[$k])) {
                continue; // skip database already holds a version of this translation.
            }
            // is it relivant anymore..
            if (!isset($this->originalKeys[$k])) {
                continue;
            }
            
            // it's current..
            $this->saveTranslateDB($lang, $module, $this->originalKeys[$k], $k, $v);
            $ret[$k] = $v;
            
            
        }
        return $ret;
        
         
    }
    
    
}