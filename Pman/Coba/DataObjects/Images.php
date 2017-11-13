<?php

require_once 'Pman/Core/DataObjects/Images.php';

class Pman_Coba_DataObjects_Images extends Pman_Core_DataObjects_Images
{
    function addEvent($ar, $roo) 
    {
        parent::addEvent($ar, $roo);
        
        $this->addExtraLog($ar, $roo);
        
    }
    
    function addExtraLog($q, $roo)
    {
        if(empty($q['_coba_document'])){
            return;
        }
        
        if($this->ontable == 'coba_investor_declarations'){
            
            $coba_investor_declarations = DB_DataObject::factory('coba_investor_declarations');
            $coba_investor_declarations->get($this->onid);

            $coba_declarations = DB_DataObject::factory('coba_declarations');
            $coba_declarations->get($coba_investor_declarations->dec_id);

            $ext_data = DB_DataObject::factory('ext_data');
            $ext_data->get('userdata_id', $coba_investor_declarations->user_id);
            
            $title = $coba_declarations->title;
        }
        
        if($this->ontable == 'modx_users'){
            
            $ext_data = DB_DataObject::factory('ext_data');
            $ext_data->get('userdata_id', $this->onid);
            
            $title = 'Other Documents';
        }
        
        $remarks = "{$ext_data->getFullName()} has uploaded document for {$title}";
        
        if($q['_coba_document'] == 'remove'){
            $remarks = "{$ext_data->getFullName()} has removed document for {$title}";
        }
        
        $event = DB_DataObject::factory('Events');
        $event->setFrom(array(
            'event_when' => date('Y-m-d H:i:s'),
            'action' => ($q['_coba_document'] == 'remove') ? 'REMOVE DOCUMENT' : 'UPLOAD DOCUMENT',
            'person_table' => 'modx_users',
            'modx_users_id' => $ext_data->userdata_id,
            'remarks' => $remarks
        ));
        
        $event->insert();
        
    }
    
    function onDelete($q, $roo)
    {
        $this->addExtraLog($q, $roo);
    }
    
}
