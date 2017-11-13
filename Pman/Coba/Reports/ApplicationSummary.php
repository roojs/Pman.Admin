<?php

require_once 'ReportShare.php';

class Pman_Coba_Reports_ApplicationSummary extends Pman_Coba_ReportShare
{
    var $masterTemplate = "application-summary-master-simple.html";
    var $tempalte_prefix = "compliance-report-";
         
    function getAuth()
    {
        return true;
    }

    function get($userdata_id,$opts = Array())
    {        
        parent::get($userdata_id,$opts);             
    }

  
    
}
