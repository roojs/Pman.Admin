<?php

// moved... - to 

require_once 'Pman/Roo.php';

class Pman_Admin_Import_Enum extends Pman_Roo
{
    
    function getAuth()
    {
        if (HTML_FlexyFramework::get()->cli) {
            return true;
        }
        return parent::getAuth();
    }
    
    
    function post()
    {   
        
        PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));

        $this->sessionState(0); // turn off the session..
        
        $img = DB_DataObject::Factory('images');
        $img->setFrom(array(
            'onid' => 0,
            'ontable' => 'ipshead'
        ));
        $img->onUpload(false);
        
        require_once 'File/Convert.php';
        $fc = new File_Convert($img->getStoreName(), $img->mimetype );
        $csv = $fc->convert('text/csv');
        
        $this->importCsv($csv);
    }
    
    
    function importCsv($csv)
    {
        
        ini_set('memory_limit', '1024M');
        
        ini_set("auto_detect_line_endings", true);

        if(empty($_REQUEST['etype'])){
            $this->jerr('Missing etype');
        }
        
        $enum = DB_DataObject::factory('core_enum');
        if(!$enum->get('name', $_REQUEST['etype'])){
            $this->jerr('Invalid etype');
        }
        
        $fh = fopen($csv, 'r');
        if (!$fh) {
            $this->jerr("invalid file");
        }
        
        $req = array('NAME','DISPLAY NAME');
        
        $cols = false;
        $rows = array();
        
        while(false !== ($n = fgetcsv($fh,10000, ',', '"'))) {
            if(!array_filter($n)){ // empty row
                continue;
            }
            if (!$cols) {
                
                $cols = array();
                foreach($n as $k) {
                    $cols[] = strtoupper(trim($k));
                }
                if (empty($cols)) {
                    continue;
                }
                foreach($req as $r) {
                    if (!in_array($r,$cols)) {
                        $cols = false;
                        break;
                    }
                }
                continue;
            }
            foreach($cols as $i=>$k) {
                $row[$k] = $n[$i];
            }
            $rows[] = $row;
        }
        
        if (empty($cols)) {
            $this->jerr("could not find a row with " . implode(' / ', $req));
        }
        
        fclose($fh);
        
        $count = 0;
        
        foreach ($rows as $row){
            $e = DB_DataObject::factory('core_enum');
            if($e->get('name', $row['NAME'])){
                continue;
            }
            
            $e = DB_DataObject::factory('core_enum');
            $e->setFrom(array(
                'name' => $row['NAME'],
                'display_name' => $row['DISPLAY NAME'],
                'etype' => $_REQUEST['etype'],
                'active' => 1,
            ));
            $e->insert();
            $e->onInsert(array());
            
            $count++;
        }
        
        $this->jok('data imported successfully! total : ' . $count);
    
    }
    
}
