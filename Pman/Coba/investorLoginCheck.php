<?php

require_once 'Pman.php';
require_once 'Coba.php';

class Pman_Coba_investorLoginCheck extends Pman 
{
    function get()
    {
        $p = DB_DataObject::factory('core_person');
		if($p->isAuth())
		{
	        $this->jok('Logged in');
        }
		$this->jerr('Not Logged in');
        
    }
    
    
}
