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
        
        print_R($rows);exit;
        //$ret = $this->processRows($rows);
        
         
        $this->jok("DONE", false, array('extra'=> array()));
        
    }
    
    
    function get($base = '',  $opts = array())
    {
        $rows = $this->readXLS("/tmp/pressrelease-translations.xls") ;
        
        print_R($rows);exit;
        
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
    
    
    var $seq = 1;
    function createJ($r)
    {
       
         
    }
    
    
    function readXLS($file) {
        
        require_once 'System.php';
        $ssconvert = System::which('ssconvert');
        if (!$ssconvert) die("ssconvert not installed");
        $csv = $this->tempName('csv');
        $cmd = "$ssconvert  -T Gnumeric_stf:stf_csv ". escapeshellarg($file) . ' '.$csv;
        
        echo $cmd;
        $data= `$cmd`;
        var_dump($data);
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