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
    
    
    function get()
    {
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
        
        
        $data = $this->loadOriginalStrings($lang,$module); // what needs translating..
        
        $translated_data = $this->loadTranslate($lang, $module); // the 'database!'
        
        
        
        // overlay translated..
        if (empty($translated_data)) {
            // try using old data!!!!
            $translated_data = $this->loadOld($lang,$data); // phase out???
                    
        }
        // covert data ready to send back..
        
        $ret = array();
        foreach($data as $k=>$ar) {
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
         
        $fm = HTML_FlexyFramework::get();
        $enable = explode(',',   $fm->enable);
        if (empty($_REQUEST['module']) || !in_array($_REQUEST['module'], $enable)) {
            $this->jerr("NO MODULE / INVALID MODULE");
        }
        
        //id	zh_HK/54e1d44609e3abed11f6e1eb6ae54988
        //txt	é …ç›®
        list($lang,$id) = explode('/', $_REQUEST['id']);
        
        
        $data = $this->loadTranslate($lang,$_REQUEST['module']);
        if (empty($data)) {
            // try using old data!!!!
            $data = $this->loadOld($lang,$data); // phase out???
                    
        }
        $data[$id] = $_REQUEST['txt'];
        
        
        $this->writeTransMod($lang,$_REQUEST['module'], $data);
        // write merged file..
        //$this->prefix = '_T["'.$lang .'"]=';
        //file_put_contents($this->fn, $this->prefix. $j->encode($this->data).';');
        $this->jok("OK");
    }
    
    /**
     * load strings that need translating..
     */
    
    function loadOriginalStrings($lang, $module)
    {
        // since this can handle errors better.!!?
        $info = $this->moduleJavascriptFilesInfo($module);
        //print_r($info);
        $tfile =$info->translation_base . $info->translation_data;
        
        if (empty($tfile) || !file_exists($tfile)) {
            return array();
        }
        
        
        require_once 'Services/JSON.php';
        $j = new Services_JSON();
        
        return (array) $j->decode('{'. file_get_contents($tfile).'}');
    }
    
     
    
    
    /**
     * 
     * Load the user translated strings.
     * 
     */
    function loadTranslate($lang, $module)
    {
         
        $fn = $this->getTransFilename($lang,$module);
        
         
        if (!file_exists($fn)) {
            return array();
        }
        
        return (array) json_decode(file_get_contents($fn));
        //$this->data = (array) $j->decode(substr(file_get_contents($this->fn), strlen($this->prefix), -1));
    }
    
    
    function loadTranslateDB($lang, $module)
    {
        $d = DB_DataObject('translations');
        $d->module = $module;
        $d->lang = $lang;
        $d->find();
        while ($d->fetch()) {
            if (!isset($ret[$d->tfile])) {
                $ret[$d->tfile] = array( $d->tkey => $d->tval );
                continue;
            }
            $ret[$d->tfile][$d->tkey] = $d->tval;
        }
        return $ret;
    }
    
    function saveTranslateDB($lang, $module, $tfile, $tkey, $tval)
    {
        $d = DB_DataObject('translations');
        $d->module = $module;
        $d->lang = $lang;
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
    
    
  
    function loadOld($lang,$data)
    {
        // need the old for hinting..
        
        // this is ok - as it's inside this module.
        $old = (array) json_decode(file_get_contents(dirname(__FILE__).'/data/oldeng.js'));
        //print_r($old);
        // contains key/value of data..
        $prefix = '_T["'.$lang .'"]=';
        $trans = (array) json_decode(substr(file_get_contents(
            dirname(__FILE__).'/data/lang.' . $lang . '.js'
        ), strlen($prefix), -1));
        
       // echo '<PRE>';print_r($trans);
        
        $hints = array();
        foreach($old as $k=>$v) {
            if (isset($trans[$k]) && empty($hints[$v])) {
                $hints[$v] = $trans[$k];
            }
        }
        $translated_data = array();
        foreach($data as $k=>$ar) {
                foreach($ar as $tr=>$trv) {
                $key = md5($k.'-'.$tr);
                if (isset($hints[$tr])) {
                    $translated_data[$key] = $hints[$tr];
                }
            }
        }
        // $this->writeTransMod($lang, $module, $translated_data);
        //echo '<PRE>';print_r($hints);
        return $translated_data;
        
    }
    
    function writeTransMod($lang, $module, $data)
    {
        $fn = $this->getTransFilename($lang, $module);
        file_put_contents($fn, json_encode($data));
         $ff = HTML_FlexyFramework::get();
        $base = $ff->rootDir.'/_translations_' ;
        $out = '';
        foreach(scandir($base) as $l) {
             
            if (!strlen($l) || $l[0] == '.' || !is_dir("$base/$l") || !file_exists("$base/$l/$module.json")) {
                continue;
            }
              
            $out .= "_T.$l= Roo.apply( _T.$l || { }, " . file_get_contents("$base/$l/$module.json") . ");\n";
        }
        //var_dump($out);
        if (strlen($out)) {
            file_put_contents("$base/$module.js", $out);
        }
        //$this->writeTrans($lang);
    }
     
    
    
}