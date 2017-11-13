<?php

require_once 'Pman.php';

class Pman_Coba_UploadDocument extends Pman
{
    
    /**
     *  get .. same as roo... 
     * 
     */
    
    function getAuth()
    {
        if (HTML_FlexyFramework::get()->cli) {
            return true;
        }
        return parent::getAuth();
    }
    
    
    function get()
    {
        // fixme...
        //PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));

        //DB_DataObject::DebugLevel(1);
        require_once 'File/Convert.php';
        $fc = new File_Convert('/tmp/clients.xls', 'application/vnd.ms-excel');
        //var_Dump($img->getStoreName());
        $csv = $fc->convert('text/csv');
        $this->importCsv($csv);
    }
    
    
    function post( )
    {
        //PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, array($this, 'onPearError'));

         
        $img = DB_DataObject::Factory('images');
        //$img->setFrom(array(
        //    'onid' => 0,
        //    'ontable' => 'ipshead'
        //));
	$img->filename = $_FILES['filename']['name'];
	$img->mime_type = $_FILES['filename']['type'];
	$img->filesize = $_FILES['filename']['size'];
	$img->ontable = 'coba_declarations';
	$img->created = date('Y-m-d H:i:s');
        $img->onUpload(false);
	$img->insert();
        
        //require_once 'File/Convert.php';
        //$fc = new File_Convert($img->getStoreName(), $img->mimetype );
        var_Dump($img->getStoreName());
        print_r($_FILES);
	//$csv = $fc->convert('text/csv');
     	//if (empty($_REQUEST['as'])) {
        //   $this->jerr("missing target type");
        //}
        //if (empty($_REQUEST['Content-Type'])) {
        //    $this->jerr("missing content-type");
        //}
        //if (empty($_REQUEST['data'])) {
        //    $this->jerr("missing data");
        //}
        
	
	$this->jok($img->id);

        
        //$img->as_mimetype = $_REQUEST['as'];
        //$img->mimetype = $_REQUEST['mimetype'];
        //require_once 'File/MimeType.php';
        //$y = new File_MimeType();
        //$src_ext = $y->toExt( $this->mimetype );
        
        
        //$tmp = $img->tempName($src_ext);
        //file_put_contents($tmp, $_REQUEST['data']);        
	


	//print_R($fc);exit;
        //var_dump($csv);exit;
        //$this->importCsv($csv);
    }
    function importCsv($csv)
    {
        
        $co = DB_DataObject::Factory('I18n');
        $co->buildDB();
        
        ini_set("auto_detect_line_endings", true);

         
        
        $fh = fopen($csv, 'r');
        if (!$fh) {
            $this->jerr("invalid file");
        }
        $bom = "\xEF\xBB\xBF";
        for ($i = 0; $i< 3;$i++) {
            if ($bom[$i] != fgetc($fh)) {
                fseek($fh,0);
                break;
            }
            
        }
        
        
        
        // we need to break this into cols..
        $cols = false;
        $rows = array();
        while(false !== ($n = fgetcsv($fh,10000, ',', '"'))) {
             
            if (!$cols) {
                
                $cols = array();
                foreach($n as $k) {
                    $cols[] = strtoupper(trim($k));
                }
                /*
                foreach($req as $r) {
                    if (!in_array($r,$cols)) {
                        $this->jerr('missing ' .  $r . ' : ' . implode(' , ' , $cols));
                    }
                }
                */
                continue;
            }
            foreach($cols as $i=>$k) {
                $row[$k] = $n[$i];
            }
            $rows[] = $row;
        }
         
        fclose($fh);
        // 
        
        
         
        foreach($rows as $i => $row) {
            
            $this->importRow($row);
             
        }
        $this->jok( "DONE " . count($rows)); 
        
        
    
    }
    
    function importRow($row)
    {
       // echo '<PRE>';print_R($row);
        //DB_DataObject::DebugLevel(1);
        $t = DB_DataObject::Factory('core_person');
        $map = array(
            
            // 'TYPE OF CLIENT'
            // company
            'NAME' => 'name',
            'SURNAME' => 'lastname',
            'TITLE' => 'role',
            'EMAIL' => 'email',
            'PHONE1--- DIRECT LINE' => 'phone',
            'MOBILE' => 'phone_mobile',
            'GENERAL LINE' => 'phone_direct',
         //   'ADDRESS1' => 'address',
         //   'ADDRESS2' => 'address',
         //   'ADDRESS3' => 'address',
         //   'COUNTRY' => 'address',
           // 'WEBSITE' => 'url',
            'COMMENTS' => 'remarks'
            
        );
        
        if (empty($row['EMAIL'])) {
            return;
        }
        if ($t->get('email', $row['EMAIL'])) {
            if ($t->company()->comptype == 'OWNER') {
                return;
            }
        }
        foreach($map as $k=>$v) {
            $t->{$v} = $row[$k];
        }
        $t->id ? $t->update() : $t->insert();
        
        
        
        $tt = DB_DataObject::Factory('core_person');
        $tt->get($t->id);
        // next company..
        if (empty($row['COMPANY'])) {
            return;
        }
        if ($row['TYPE OF CLIENT'] == 'OWNER') {
            return;
        }
        $c = DB_DAtaObject::Factory('Companies');
        if ($c->get('name', $row['COMPANY']) && $c->comptype == 'OWNER') {
            return;
        }
        $map = array(
            'COMPANY' => 'name',
            'ADDRESS1' => 'address1',
            'ADDRESS2' => 'address2',
            'ADDRESS3' => 'address3',
            'TYPE OF CLIENT' => 'comptype',
            //'COUNTRY' => 'country',
            'WEBSITE' => 'url',
        );
        $ce = DB_DataObject::Factory('core_enum');
        $ce->lookupObject('COMPTYPE', $row['TYPE OF CLIENT'] , true);
        
        $co = DB_DataObject::Factory('I18n');
        $co->ltype = 'c';
        $co->lval = $row['COUNTRY'];
        $co->inlang = 'en';
        if ($co->find(true)) {
            
            $c->country = $co->lkey;
        }
        
        foreach($map as $k=>$v) {
            $c->{$v} = $row[$k];
        }
        $c->id ? $c->update() : $c->insert();
        
        
        $t =clone($tt);
        $t->company_id = $c->id;
        $t->update($tt);
        //var_dump($t->company_id);exit;

        // create the crm record for this user..
        $crm = DB_DataObject::Factory('crm_person_relation');
        $crm->person_id = $t->id;
        $crm->staff_id = $this->authUser->id;
        if (!$crm->count()) {
            $crm->insert();
        }
        
        
        
        
    }
    
    
}

