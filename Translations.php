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

class Pman_Admin_Translations extends Pman
{
    
    var $prefix = '';
    var $fn = '';
    var $data = array();
    
    var $original = array() ; // filename => array( orig_string > orig_string)
    var $originalKeys = array() ; // md5(filename-orig_string) => filename
    
    function getAuth()
    {
        parent::getAuth();
        $au = $this->getAuthUser();
        if (!$au) {
            $this->jerr("Not authenticated", array('authFailure' => true));
        }
        $this->authUser = $au;
        return true;
    }
    
    
    function get($module)
    {
        
        if (!empty($module)) {
            $this->init();
            
            
            $d = DB_DataObject::factory('translations');
            $d->module = $module;
            $d->selectAdd();
            $d->selectAdd('distinct(tlang) as tlang');
            $langs= $d->fetchAll('tlang');
            foreach($langs as $lang) {
                // output the translations strings file..
                list($module, $lang) = explode('/',$path);
                    
                $this->loadOriginalStrings($module);
                
                $data = $this->loadTranslateDB($lang,$module);
                
                $j = new Services_JSON();
                echo "_T.{$lang}= Roo.apply( _T.{$lang} || { }, " .  $j->stringify($data, null, 4) . ");\n";
                
            }
            exit;
            
        }
        
        // load and parse json file containing all translations...
        if (isset($_REQUEST['id'])) {
            return $this->post();
        }
        if (empty($_REQUEST['lang']) || !preg_match('/^[A-Z_]+$/i', $_REQUEST['lang'])) {
            $this->jerr("NO LANG / INVALID LANG");
        }
         
        $enable = $this->modulesList();
        
        if (empty($_REQUEST['module']) || !in_array($_REQUEST['module'], $enable)) {
            $this->jerr("NO MODULE / INVALID MODULE");
        }
        
        
        $lang = $_REQUEST['lang'];
        $module = $_REQUEST['module'];
        
        
         $this->loadOriginalStrings($module); // what needs translating..
        
        $ff = $this->bootLoader;
        if (empty($ff->Pman['public_cache_dir'])) {
            $this->jerr("public_cache_dir has not been set up");
        }
        
        
        
        $translated_data = $this->loadTranslateDB($lang, $module); // the 'database!'
        
        
       // echo '<PRE>';print_R($data);exit;
        // covert data ready to send back..
        
        $ret = array();
        foreach($this->original as $k=>$ar) {
            foreach($ar as $tr=>$trv) {
                // $hint = isset($hints[$tr]) ? $hints[$tr] : '';
                $key = md5($k.'-'.$tr);
                $ret[] = array(
                    'id' => $lang.'/'.$key,
                    'msum' => $key,
                    'colname' => $k,
                    'origtxt' => $tr,
                    'txt' => isset($translated_data[$key]) ? $translated_data[$key] : '',
                   // 'suggest' => $hint
                );
                
            }
        }
        
        
        $this->jdata($ret);
        
        
        exit;
        
    }
    
    function post() 
    {
         
         
        
        if (empty($_REQUEST['module']) || !in_array($_REQUEST['module'], $this->modulesList())) {
            $this->jerr("NO MODULE / INVALID MODULE");
        }
        
        //id	zh_HK/54e1d44609e3abed11f6e1eb6ae54988
        //txt	é …ç›®
        list($lang,$id) = explode('/', $_REQUEST['id']);
        
        $this->loadOriginalStrings($_REQUEST['module']);
        
        $data = $this->loadTranslateDB($lang,$_REQUEST['module']);
        
        $data[$id] = $_REQUEST['txt'];
        
        if (!isset($this->originalKeys[$id])) {
            
            
            $this->jerr("invalid key ?");
        }
        
        $this->saveTranslateDB($lang,$_REQUEST['module'],$this->originalKeys[$id], $id, $_REQUEST['txt']);
        
        
        
        $this->writeTransMod($lang,$_REQUEST['module'], $data);
        // write merged file..
        //$this->prefix = '_T["'.$lang .'"]=';
        //file_put_contents($this->fn, $this->prefix. $j->encode($this->data).';');
        $this->jok("OK");
    }
    
    /**
     * load strings that need translating..
     */
    
    function loadOriginalStrings($module)
    {
        // since this can handle errors better.!!?
        $info = $this->moduleJavascriptFilesInfo($module);
        //print_r($info);
        $tfile =$info->basedir . '/'. $info->translation_data;
         //var_dump($tfile);
        if (empty($tfile) || !file_exists($tfile)) {
            return array();
        }
        
        
        require_once 'Services/JSON.php';
        $j = new Services_JSON();
        $this->original = (array) $j->decode('{'. file_get_contents($tfile).'}');
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
    
    function saveTranslateDB($lang, $module, $tfile, $tkey, $tval)
    {
        $d = DB_DataObject::factory('translations');
        $d->module = $module;
        $d->tlang = $lang;
        $d->tfile = $tfile;
        $d->tkey = $tkey;
        if ($d->find(true)) {
            $d->tval = $tval;
            $d->update();
        }
        $d->tval = $tval;
        $d->insert();
        
    }
    
    
    
    
    function getTransFilename($lang, $module)
    {
        
        $ff = HTML_FlexyFramework::get();
        $fn = $ff->rootDir .'/_translations_/'. $lang . '/'. $module.'.json';
        if (!file_exists(dirname($fn))) {
            
            /// create the direct
            $oldumask = umask(0);
            mkdir(dirname($fn), 0770, true);
            umask($oldumask);  
            clearstatcache();
            if (!file_exists(dirname($fn))) {
                $this->jerr("_translations_ directory does not exist in Pman folder - it needs to be editable");
            }
            
        }
        return $fn;
    }
    
     
    /**
     * Writes a file MODULE.js inside of _translations_
     *
     * this should contain all contents from all the language directroris for this
     * module
     *
     */
    
    function writeTransMod($lang, $module, $data)
    {
        //print_R($data);
        
        
        $fn = $this->getTransFilename($lang, $module);
        require_once 'Services/JSON.php';
        $j = new Services_JSON();
        
        file_put_contents($fn, $j->stringify($data, null, 4));
        
        $ff = HTML_FlexyFramework::get();
        $base = $ff->rootDir.'/_translations_' ;
        $out = '';
        foreach(scandir($base) as $l) {
             
            if (!strlen($l) || $l[0] == '.' || !is_dir("$base/$l") || !file_exists("$base/$l/$module.json")) {
                continue;
            }
            // decode as our temp files contain spaces..
            $jdata = json_decode(file_get_contents("$base/$l/$module.json") );
            $out .= "_T.$l= Roo.apply( _T.$l || { }, " . json_encode($jdata) . ");\n";
        }
        //var_dump($out);
        if (strlen($out)) {
            file_put_contents("$base/$module.js", $out);
        }
        //$this->writeTrans($lang);
    }
     
     
    
}