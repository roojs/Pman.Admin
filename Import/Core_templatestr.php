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
class Pman_Admin_Import_Core_templatestr extends Pman
{
    var $cli  = false;
     
     
     
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
    
    function post($base = '' )
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
        
         
        $this->jok("DONE", false, array('extra'=> $ret));
        
    }
    
    /*
    function get($base = '',  $opts = array())
    {
        $rows = $this->readXLS("/var/lib/php/sessions/pressrelease-translations.xls") ;
        
       
        
        $ret = $this->processRows($rows);
         
        $this->jdata($ret);
        exit;
        
    }
    */
    function processRows($rows)
    { 
        $ret = array();
        foreach($rows as $r) {
            if (isset($r['table id'])) {
                $ret[] = $this->updateTableTranslation($r);
                continue;
            }
            
            $ret[] = $this->updateTranslation($r);
            
        }
        return $ret;
    }        
    function updateTranslation($r)
    {
        // determine the type of file:
        
        if (empty($r['template']) || empty($r['module']) || empty($r['code'])) {
            $this->jerr("missing template / module or code column");
        }

        if (!isset($r['language'])) {
            $this->jerr("missing language");
        }

        // table translation
        if($r['module'] == 'database') {
            $arr = explode(':', $r['template']);
            $r['table'] = $arr[0];
            $r['column'] = $arr[1];
            $this->updateTableTranslation($r);
        }
        // template translation
        else {
            $this->updateTranslationRow($r);
        }
        return;
    }
    
    var $seq = 1;
    function updateTranslationRow($r)
    {
        //print_R($r); DB_DataObject::DebugLevel(1);
        $tr = DB_DataObject::Factory('core_templatestr');
        $tr->autoJoin();

       
        $tr->whereAdd("join_template_id_id.template='{$tr->escape($r['template'])}'");
        $tr->whereAdd("join_template_id_id.view_name='{$tr->escape($r['module'])}'");
        $tr->whereAdd("join_src_id_id.mdsum='{$tr->escape($r['code'])}'");
        $tr->lang = $r['language'];
        if ($tr->find(true)) {
            $tt = DB_DataObject::Factory('core_templatestr');
            $tt->get($tr->id);
            $tr= clone($tt);
            $tt->txt = $r['translation'];
            $tt->updated = date('Y-m-d H:i:s');
            $tt->update($tr);
            return 1;
        }
        return 0;
    }
    
    
    
    function updateTableTranslation($r)
    {
      //   print_R($r); DB_DataObject::DebugLevel(1);
        $tr = DB_DataObject::Factory('core_templatestr');
        $tr->autoJoin();


        // update duplicate with same on_table, on_col, mdsum and lang
        // $tr->whereAdd("core_templatestr.on_id='{$tr->escape($r['table id'])}'");
        $tr->whereAdd("core_templatestr.on_table='{$tr->escape($r['table'])}'");
        $tr->whereAdd("core_templatestr.on_col='{$tr->escape($r['column'])}'");
        $tr->whereAdd("join_src_id_id.mdsum='{$tr->escape($r['code'])}'");
        $tr->lang = $r['language'];

        $duplicate = $tr->fetchAll('id');

        if(!empty($duplicate)) {

            $t = DB_DataObject::factory('core_templatestr');
            $t->query(
            "UPDATE 
                core_templatestr
            SET 
                txt = '" . $r['translation'] . "',
                updated = '" . date('Y-m-d H:i:s') . "' 
            WHERE 
                id IN (" . implode(',', $duplicate) . ")"
            );
            return 1;
        }

        return 0;
    }
    
    
    function readXLS($file) {
        
        require_once 'System.php';
        $ssconvert = System::which('ssconvert');
        if (!$ssconvert) die("ssconvert not installed");
        $csv = $this->tempName('csv');
        $cmd = "$ssconvert  -T Gnumeric_stf:stf_csv ". escapeshellarg($file) . ' '.$csv;
        
         $data= `$cmd`;
        
        clearstatcache();
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
                    var_dump($c);
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
        die('test');
        return $rows;
        
        
    }
    
}