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
     
    function get($step, $opts=array())
    {
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));
        $this->opts = $opts;
        
        switch($step) {
            case 'scanProjectBJS':
            case 'scanPmanBJS':
            case 'scanPmanTemplates':
            case 'scanTables':
            case 'syncLanguage':
                  $this->{$step}();
                  $this->jok("DONE - " . $step);
            default:
                $this->jerr("invalid step");
        }
        
         
    }
    
    function updateData() // this does everything?? not used?
    
    {   
        $this->scanProjectBJS();
        $this->scanPmanBJS();
        $this->scanPmanTemplates();

        $this->scanTables();
        $this->syncLanguage();
        
        DB_DataObject::factory('core_template')->query(
            "update core_template set is_deleted =  1 where filetype = ''"
        );
        
        $this->jok('OK');
        
    }
    
    function scanProjectBJS()  // this is probably not used (replace by the CMS scanner)
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
                $template->filetype = 'bjs';
                
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
        
        $ids = array();
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
                    'view_name' => $view_name,
                    
                ));
                
                

                $o = false;

                if($template->find(true)){
                    $o = clone ($template);
                }
                $updated = empty($template->updated) ? '1970-01-01' : $template->updated ;
                
                $template->is_deleted = 0;

                $template->filetype = 'bjs';
                $template->updated = $template->sqlValue("NOW()");

                (empty($o)) ? $template->insert() : $template->update($o);
                
                if (strtotime($updated) >= filemtime('Pman' . '/' . $m . '/' . $fn)) {
                    continue;
                }
                
                $ids[] = $template->id;
                $data = json_decode(file_get_contents('Pman' . '/' . $m . '/' . $fn), true);

                $template->words = empty($data['strings']) ? array() : $data['strings'];

                $x = DB_DataObject::Factory('core_templatestr');
                $x->syncTemplateWords($template, false);
            }
        }
        
        $del = DB_DataObject::factory('core_template');
        $del->whereAddIn('!id', $ids, 'int');
        $del->whereAddIn('view_name', $this->modules(), 'string');
        $del->filetype = 'bjs';
        $delids = $del->fetchAll('id');
        if ($delids) {
            DB_DataObject::factory('core_template')->query(
                'update core_template set is_deleted =  1 where id in('. implode(',', $delids). ')'
            );
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

            // deactivate all table translation
            $t = DB_DataObject::factory('core_templatestr');
            $t->query(
                "UPDATE core_templatestr
                SET active = 0 
                WHERE on_table != ''"
            );
            
            // activate the used table translation
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
         $ff = HTML_FlexyFramework::get();
     
        $opt_lang = empty($ff->Pman_Admin['languages']) ? array( 'l' => array()) : $ff->Pman_Admin['languages'];
        
        if($this->cli){
            echo "Sync the Languages template.....\n";
        }
        
        foreach($opt_lang as $l) {
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
            //var_dump($m);
            // templates...
            $ar = $this->scanDir(array(
                 'tdir' => "Pman/$m/templates",
                'subdir' => '',
                'match' => '/\.(html|txt|abw)$/',
                'skipdir' => array('images','css','js'),
                
            ));
           //  print_r($ar);
            
            foreach($ar as $pg) {
                 
                $temp = $tp->syncTemplatePage(array(
                    'base' =>'Pman.'.$m, 
                    'template_dir' =>  "Pman/$m/templates",
                    'template' => $pg
                ));
                if ($temp) {
                    $ids[] = $temp->id;
                }
            }
            // should clean up old templates..
            // php files..
            $ar = $this->scanDir(array(
                'tdir' => "Pman/$m",
                'subdir' => '',
                'match' => '/\.(php)$/',
                'skipdir' => array('templates'),
                
            ));
            
            
            foreach($ar as $pg) {
                
                $temp = $tp->syncPhpGetText(array(
                    'base' =>'Pman.'.$m, 
                    'template_dir' =>  "Pman/$m",
                    'template' => $pg
                ));
                if ($temp) {
                    $ids[] = $temp->id;
                }
                
            }
            
            
            
            
            
            //$tp->syncTemplatePage($pg);
        }
        $del = DB_DataObject::factory('core_template');
        $del->whereAddIn('!id', $ids, 'int');
        $del->whereAddIn('view_name', $this->modules(), 'string');
        $del->whereAddIn('filetype' , array( 'php', 'html' ), 'string');
        $delids = $del->fetchAll('id');
        if ($delids) {
            DB_DataObject::factory('core_template')->query(
                'update core_template set is_deleted =  1 where id in('. implode(',', $delids). ')'
            );
        }
         
    }
    
    
    
    function scanDir($cfg) //$view, $tdir , $subdir='', $match)
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
                $children = $this->scanDir($cfg);
                if (count($children)) {
                    $ret = array_merge($ret, $children);
                    
                }
                continue;
                 
            }
            
            if (!preg_match($cfg['match'], $fn) || !is_file($fullpath)) {
                continue;
            }
            
          
            
            $ret[] =  $subdir . (empty($subdir) ? '' : '/').  $fn;  /// this used to be strtolower?? why???

            
            
        }
//        print_r($ret);
        
        return $ret;
            
        
        
         
    }
    
}
