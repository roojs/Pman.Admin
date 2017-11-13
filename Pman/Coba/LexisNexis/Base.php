<?php

require_once 'Pman.php';

class Pman_Coba_LexisNexis_Base extends Pman
{
    var $soapClient = false;
    
    var $settings = array();
    
    var $wsdl = false;
    
    var $storeDir = false;
    
    var $responseDir = false;
    
    function getAuth()
    {
        if(!extension_loaded('soap')) {
            $this->jerr('Please install php-soap');
        }

        $ff = HTML_FlexyFramework::get();
        
        if(empty($ff->Coba) || empty($ff->Coba['LexisNexis'])){
            $this->jerr('Missing Coba[LexisNexis] Settings');
        }
        
        $this->settings = $ff->Coba['LexisNexis'];
        
        $this->storeDir = "{$ff->Pman['storedir']}/soap";
        
        if(!file_exists("{$ff->Pman['storedir']}/soap")){
            
            $oldumask = umask(0);
            mkdir($this->storeDir, 0775, true);
            umask($oldumask);
        }
        
        $this->wsdl = "{$ff->Pman['storedir']}/soap/LexisNexis.xml";
        
        if(!file_exists($this->wsdl)){
            file_put_contents($this->wsdl, file_get_contents($this->settings['wsdl']));
        }
        
        $this->responseDir = "{$this->storeDir}/responses";
        
        if (!file_exists($this->responseDir)) {
            $oldumask = umask(0);
            mkdir($this->responseDir, 0775, true);
            umask($oldumask);  
        }
        
        try{
            
            $this->soapClient = new SoapClient($this->wsdl, array("trace"=>1));
            
        } catch(SoapFault $e) {
            $this->jerr($e->getMessage());
        }
        
        return true;
    }
    
}
