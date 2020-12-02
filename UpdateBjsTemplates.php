<?php

/**
 *
 
 *
 */

require_once 'Pman.php';
class Pman_Admin_UpdateBjsTemplates extends Pman
{
    
    static $cli_desc = "Update BJS Templates";
 
    static $cli_opts = array();
    
    var $cli = false;
    
    var $opts;
    
    function getAuth() {
        
        
        $ff = HTML_FlexyFramework::get();
        if (!empty($ff->cli)) {
            $this->cli = true;
            return true;
        }
        
        return true;
    }
     
    function get($tbl, $opts=array())
    {
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));
        $this->opts = $opts;
        $this->updateData();
    }
    
    function updateData()
    {   
        $this->scanProjectBJS();
        $this->scanPmanBJS();
        $this->scanPmanTemplates();

        $this->scanTables();
        $this->syncLanguage();
        
        $this->jok('OK');
        
    }
    
    function scanProjectBJS()
    {
        $ff = HTML_FlexyFramework::get();
        
        if (empty($ff->Pman_Core)) {
            $this->jerr("config[Pman_Core] is not set");
        }
        if (!empty($ff->Pman_Core['project_name'])) {
            $base  = $ff->Pman_Core['project_name'];
            
            $dh = opendir($base);
            
            $ret = array();
            
            if(!$dh){
                $this->jerr("could not open dir: config[Pman_Core] = " . $base);
                return $ret; // something went wrong!?
            }
             
            while (($fn = readdir($dh)) !== false) {
                
                if(empty($fn) || $fn[0] == '.' || !preg_match('/\.bjs$/', $fn)){
                    continue;
                }
                
                if($this->cli){
                    echo "Processing {$fn} \n";
                }
                
                $template = DB_DataObject::factory('core_template');
                $template->setFrom(array(
                    'template' => $fn,
                    'lang' => 'en',
                    'view_name' => $base
                ));
                
                $o = false;
                
                if($template->find(true)){
                    $o = clone ($template);
                }
                
                $template->updated = $template->sqlValue("NOW()");
                
                (empty($o)) ? $template->insert() : $template->update($o);
                
                $data = json_decode(file_get_contents($base . '/' . $fn), true);
                
                $template->words = empty($data['strings']) ? array() : $data['strings'];
                
                $x = DB_DataObject::Factory('core_templatestr');
                $x->syncTemplateWords($template, false);
            }
        }
         
    }
    
    function scanPmanBJS()
    {
        foreach ($this->modules() as $m){
            $view_name = "Pman.$m";
            
            $dh = opendir("Pman/$m");
        
            $ret = array();

            if(!$dh){
                continue;
            }
            
            while (($fn = readdir($dh)) !== false) {
            
                if(empty($fn) || $fn[0] == '.' || !preg_match('/\.bjs$/', $fn)){
                    continue;
                }

                if($this->cli){
                    echo "Processing {$fn} \n";
                }

                $template = DB_DataObject::factory('core_template');
                $template->setFrom(array(
                    'template' => $fn,
                    'lang' => 'en',
                    'view_name' => $view_name
                ));

                $o = false;

                if($template->find(true)){
                    $o = clone ($template);
                }

                $template->updated = $template->sqlValue("NOW()");

                (empty($o)) ? $template->insert() : $template->update($o);

                $data = json_decode(file_get_contents('Pman' . '/' . $m . '/' . $fn), true);

                $template->words = empty($data['strings']) ? array() : $data['strings'];

                $x = DB_DataObject::Factory('core_templatestr');
                $x->syncTemplateWords($template, false);
            }
        }
        
    }
    
    function scanTables()
    {
        $ff = HTML_FlexyFramework::get();
        
        if (empty($ff->Pman_Core)) {
            $this->jerr("config[Pman_Core] is not set");
        }
        
        if(isset($ff->Pman_Core['DataObjects_Core_templatestr']['tables'])){
            $cts = DB_DataObject::factory('core_templatestr');
            
            if($this->cli){
                echo "Sync tables.....\n";
            }
            
            foreach($ff->Pman_Core['DataObjects_Core_templatestr']['tables'] as $table=>$cols){
                $t = DB_DataObject::factory($table);
                foreach($t->fetchAll() as $d) {
                    $cts->onTableChange($this, $d, 'update');
                }
            }
        }
    }
    
    function syncLanguage()
    {
        $ff = HTML_FlexyFramework::get();
        
        if (empty($ff->Pman_Core)) {
            $this->jerr("config[Pman_Core] is not set");
        }
        
        $opt_lang = empty($ff->Pman_Core_I18n) ? array( 'l' => array()) : $ff->Pman_Core_I18n;
        
        if($this->cli){
            echo "Sync the Languages template.....\n";
        }
        
        foreach($opt_lang['l'] as $l) {
            if($this->cli){
                echo "Sync $l Language.....\n";
            }

            $tps = DB_DataObject::factory('core_templatestr');
            $tps->syncLang($l); /// this should be configured somewhere..
        }
    }
    
    function scanPmanTemplates()
    {
        // the CMS stuff scanned the PHP code looking for references to templates..
        $tp = DB_DAtaObject::Factory('core_template');
       
        foreach ($this->modules() as $m){
            
            $ar = $this->scanTemplateDir(array(
                'view' => 'Pman.'.$m,
                'tdir' => "Pman/$m/templates",
                'subdir' => '',
                'match' => '/\.(html|txt|abw)$/',
                'skipdir' => array('images','css','js'),
                
            ));
            
            
            foreach($ar as $pg) {
                $tp->syncTemplatePage($pg);
            }
            // should clean up old templates..
            
            
            
            //$tp->syncTemplatePage($pg);
        }
        
         
    }
    
    
    
    function scanTemplateDir($cfg) //$view, $tdir , $subdir='', $match)
    {
        //echo "TSCAN base= $base subdir =$subdir\n ";
        $ff = HTML_FlexyFramework::get();
         
         $subdir = $cfg['subdir'];
        $scandir = $cfg['tdir']. (empty($subdir) ? '' : '/') . $subdir;
       
        if (in_array($subdir, $cfg['skipdir'])) {
            return array();
        }
        // skip dom_templates
          
        if (!file_exists($scandir)) {
            return array();
        }
        $dh = opendir($scandir);
        if(!$dh){
            return array(); // something went wrong!?
        }
        $ret = array();
            
        while (($fn = readdir($dh)) !== false) {
            // do we care that it will try and parse the template directory??? - not really..
            // as we are only looking for php files..
            if(empty($fn) || $fn[0] == '.'){
                continue;
            }
            
            $fullpath = $scandir.(empty($scandir) ? '' : "/").$fn;
            // echo "filename:  $fullpath \n";
           
            if (is_link($fullpath)) {
                continue;
            }
            
            if(is_dir($fullpath)){
                // then recursively call self...
                $cfg['subdir'] = $subdir . (empty($subdir) ? '' : '/') . $fn;
                $children = $this->scanTemplateDir($cfg);
                if (count($children)) {
                    $ret =array_merge($ret, $children);
                    
                }
                continue;
                 
            }
            
            if (!preg_match($cfg['match'], $fn) || !is_file($fullpath)) {
                continue;
            }
            
          
            
            $ret[] = array(
                'base' => $cfg['view'],
                'template_dir' => $cfg['tdir'] ,
                'template' =>  $subdir . (empty($subdir) ? '' : '/').  $fn  /// this used to be strtolower?? why???
            );
            
            
        }
//        print_r($ret);
        
        return $ret;
            
        
        
         
    }
    
}
