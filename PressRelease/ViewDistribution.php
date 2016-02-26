<?php 
require_once 'Pman/PressRelease/View.php';

class Pman_PressRelease_ViewDistribution extends Pman_PressRelease_View
{
    var $masterTemplate = "distribution.html";
    
    
    // get - same as parent.
    
    
    function post($id)
    {
        
        die("BAD URL")   ;
        
        
        
    }
    function get($id) {
        
        $ret = parent::get($id);
        
        if (!empty($this->release->parent_id)) {
            die("This is is a translation of #{$this->release->parent_id},
                refer to that release to see where it will get distributed to");
                
            
            
        }
        
        return $ret;
    }
    
 }