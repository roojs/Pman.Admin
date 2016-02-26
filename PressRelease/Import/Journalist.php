<?php

/**
 * generic import routine..
 *
 * - upload a file..
 *
 * - preview the result. / edit?
 *
 * - import..
 * 
 *
 */


require_once 'Pman.php';
class Pman_PressRelease_Import_Journalist extends Pman
{
    var $cli  = false;
    
    var $map = array(
        // in excell.      =.  database name
        'name'	=>	   'firstname'       		,
        'first name' => 'firstname'       		,
        'family name'	=>	        'lastname'        		,
        'mobile'	=>	        'phone_mobile'    		,
        'extension'	=>	        'phone_direct'    		,
        'general line'	=>	        'phone'           		,
        'office telephone' => 'phone',
         'private cellphone no' => 'phone_mobile'   ,
        'fax'	=>	        'fax'             		,
        'job title'	=>	        'role'            		,
        'email'	=>	        'email'           		,
        'email address' =>   'email'           		,
        'website'	=>	        'url'             		,
        //'notes'	=>	        'remarks'         		,
         'publication'	=>	        'publication_name' 		,
         'publication name'	=>	        'publication_name' 		,
           'country'	=>	        'country'          		,
        'language'	=>	        'language'           		,
        'scope'	=>	        'publication_scope' 		,
        'publication scope'	=>	        'publication_scope' 		,
         'media type'	=>	        'media_type'      		,
        'publication type' => 'media_type',

        'news beat'	=>	        'news_beat'       		,
        'address' 	=>	        'remarks'            		,
        'comments' 	=>	        'remarks'            		,
        'publication language' => 'publication_lang',
        
       
        
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
    
    function post()
    {
        
           // should handle uploaded file..
        if (empty($_FILES['imageUpload']['tmp_name']) || 
            empty($_FILES['imageUpload']['name']) || 
            empty($_FILES['imageUpload']['type'])
        ) {
            $this->jerr ("Missing file details");
            exit;
        }
        
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));
    
          
        $this->transObj = DB_DataObject::factory('core_enum');
        
        $this->transObj->query('BEGIN');
        
        // first convert the file to a readable format..
        //$rows = $this->readXLS("/home/alan/Downloads/oll_example.xls") ;
        $rows = $this->readXLS($_FILES['imageUpload']['tmp_name']) ;
        $ret = $this->processRows($rows);
 
        $this->jdata($this->flat($ret));
        
    }
    
    
    function get()
    {
        $rows = $this->readXLS("/home/alan/Downloads/singapore journalists 2011v1.xls") ;
        $ret = $this->processRows($rows);
        if ($this->cli) { 
            print_r($this->flat($ret));
        }
        $this->jdata($this->flat($ret));
        exit;
        
    }
    function processRows($rows)
    { 
        $ret = array();
        foreach($rows as $r) {
            $ret[] = $this->createJ($r);
            
        }
        return $ret;
    }        
    
    function flat($ar) {
        
        foreach($ar as $i=>$o) {
            $add = array();
            foreach($o as $k=>$v) {
                if (is_object($v) || is_array($v) || $k[0] == '_') {
                    continue;
                }
                $add[$k] = $v;
            }
            $ar[$i] = $add;
        }
        return $ar;
    }
    var $seq = 1;
    function createJ($r)
    {
        
        $j = DB_DataObject::Factory('pressrelease_contact');
        
        
        // map is avail. colums, right is required..
        
        $req = array();
        $got = array();
        foreach($this->map as $v=>$k) {
            $req[$k] = 1;
            if (!isset($r[$v])) {
                continue;
            }
            $got[$k] = 1;
            if (!empty($j->{$k})) {
                $j->{$k} .= ", " . $r[$v];
                continue;
            }
            $j->{$k} = $r[$v];
            
        }
        foreach(array_keys($got) as $v) {
            if (isset($req[$v])) {
                unset($req[$v]);
            }
        }
        if (!empty($req)) {
                $this->jerr("Missing columns for '". implode ("', '", array_keys($req)). "'");
        }
         
        // language...
        $l = $j->language;
        $j->contact_language = strtolower(substr($l,0,2));
        $bits = explode('/', $l);
        if (count($bits) > 1) {
            $j->contact_language_alt =  strtolower(substr($bits[1],0,2));
        }
        if ($j->contact_language == 'bi') {
            $j->contact_language = 'zh_HK';
            $j->contact_language = 'en';
        }
        if ($j->contact_language == 'ch') {
            $j->contact_language = 'zh_HK';
        }
        if ($j->contact_language_alt == 'ch') {
            $j->contact_language_alt = 'zh_HK';
        }
        $j->publication_lang = $j->contact_language;
        
        
        $j->category_type_id = $this->catId('Type of Database', 'Journalist'); // journalist..
        //$j->country = 'HK'; ... they have to put this in..
        
        $j->category_scope_id = $this->catId('Publication Scope', $j->publication_scope);
        $j->category_scope_id_name = $j->publication_scope;
        
        
        $j->category_media_id = $this->catId('Type of Media', $j->media_type);
        $j->category_media_id_name = $j->media_type;
        
        
        $j->news_beat_id =  $this->catId('News Beat', $j->news_beat);
        //$j->news_beat = $j->news_beat;
        
        
        $jj = clone($j);
        if ($jj->find(true)) {
            $j->id = $jj->id;
            return $j;
        }
        if (empty($_REQUEST['confirmed'])) {
            $j->id = ($this->seq++) * -1;
            return $j;
        }
        
        // we have a confirmed line..
        $j->insert();
        
        // add the item to the news beat..
        
        $b = DB_DataObject::factory('pressrelease_beats');
        $b->category_id =  $this->catId('News Beat', $j->news_beat);
        $b->contact_id = $j->id;
        if ($b->count()) {
            return $j;
        }
        $b->insert();
        return $j;
         
    }
    function catId($top, $sub)
    {
        static $tops = array();
        static $subs = array();
        if (!isset($tops[$top])) {
            $c = DB_DataObject::Factory('pressrelease_category');
            $c->get('name' , $top);
            $tops[$top] = $c->id;
            $subs[$top] = array();
        }
        
        if (isset($subs[$top][$sub])) {
            return $subs[$top][$sub];
        }
        
        $c = DB_DataObject::Factory('pressrelease_category');
        $c->parent_id = $tops[$top];
        $c->name = $sub;
        if ($c->find(true)) {
            $subs[$top][$sub] = $c->id;
            return $c->id;
        }
        $c->insert();
        $subs[$top][$sub] = $c->id;
        return $c->id;
        
        
    }
    
    
    
    function readXLS($file) {
        
        require_once 'System.php';
        $ssconvert = System::which('ssconvert');
        if (!$ssconvert) die("ssconvert not installed");
        $csv = $this->tempName('csv');
        $cmd = "$ssconvert  -T Gnumeric_stf:stf_csv ". escapeshellarg($file) . ' '.$csv;
        
        //echo $cmd;
        $data= `$cmd`;
        if (!file_exists($csv)) {
            $this->jerr("Failed to make file . \n".
                        $cmd . "\n" .
                        $data
                        );
            
            
        }
        //echo $data;
        $fh = fopen($csv, 'r');
        if (!$fh) {
            $this->jerr("file invalid");
        }
        $rows = array();
        $head = false;
        $blank = 0;
        while (false !== ($row = fgetcsv($fh))) {
             
            if ($head === false) {
                
                $h = $row;
                // skip header lines.
                array_shift($h);
                if (!strlen(implode('', $h))) {
                    continue;
                }
                // how many empty rows..
                if (count(explode(',',(rtrim(implode(',', $h), " ,")))) < 3) {
                    continue;
                }
                
                $head = array();
                foreach($row as $i=>$c) {
                   $c = preg_replace('/[\t \n]+/', ' ', $c);
                   $head[$i] = strtolower(trim($c));
                }
                continue;
            }
            
            if (!strlen(trim(implode('', $h)))) {
                $blank++;
                if ($blank > 3) { 
                    break;
                }
                continue;
            }
            
            $blank = 0;
            $rrow = array();
            foreach($row as $i=>$c) {
                $c = preg_replace('/[\t \n]+/', ' ', $c);
                $rrow[$head[$i]] = trim($c);
            }
           // var_dump($row);
          //  print_r($max);
            $rows[] = $rrow;
        }
        unlink($csv);
        return $rows;
        
        
    }
    
}