<?php
/**
 * 
 * Part of Core..
 * 
 */
require_once 'Pman.php';

class Pman_Admin_GroupRights extends Pman
{
    function getAuth() {
        parent::getAuth(); // load company!
        $au = $this->getAuthUser();
        if (!$au) {
            $this->jerr("Not authenticated", array('authFailure' => true));
        }
        
        if ($au->company()->comptype !='OWNER') {
            $this->jerr("Error", "only company owners can manage groups");
        }
        
        $this->authUser = $au;
        return true;
    }
    
    // perms - any table that can be modified by the user should be listed here..
    // without it, our perms manager should deny writing via the web interface...
    
    // FOR PERMS - SEE THE DATAOBJECT!
    
    function get()
    {
        // must recieve a group..
        if (!isset($_GET['group_id']) || (int)$_GET['group_id'] < 0) {
            $this->jerr("NO GROUP");
        }
        if (!$this->hasPerm( 'Core.Groups','S')) { // listing groups..
            $this->jerr("PERMISSION DENIED");
        }
        
        $g = DB_DataObject::Factory('core_group');
        if (!$g->get($_GET['group_id'])) {
            $this->jerr("group is invalid");
        }
        //print_r($g);
         //   DB_DataObject::debugLevel(1);
        $p = DB_DataObject::factory('core_group_right');
        $p->group_id = (int)$_GET['group_id'];
        $p->find();
        $cur = array();
    
        while ($p->fetch()) {
            $cur[$p->rightname] = clone($p);
        }
        print_R($cur);exit;
        $e = -1;
        $ar = array();
        // echo "<PRE>"; print_r($p->defaultPermData() );
        foreach($p->defaultPermData() as $k => $defdata) {
            
            if (empty($defdata[0])) { // no admin data available..
                continue;
            }
            if (!isset($cur[$k])) {
                // then there is no current access right for it..
                //DB_DataObject::debugLevel(1);
                $gr = DB_DataObject::factory('core_group_right');
                $gr->group_id = (int)$_GET['group_id'];
                $gr->rightname = $k;
                $gr->accessmask = $g->type == 2 ? '' : $defdata[1]; // set to defaults.. unless it's a contact group.
                $gr->insert();
                $cur[$k] = clone($gr);
            }
            
            
            $ar[] = array(
                'id' => $cur[$k]->id * 1, //
                'rightname' => $k,
                'descript' => isset($defdata[2]) ? $defdata[2] : '' ,
                'accessmask' => $cur[$k]->accessmask,
                'FullMask' => $defdata[0],
                'group_id' => (int)$_GET['group_id']
            );
                
        }
        $this->jdata($ar);
        
         
    }
    
    
    // post.. 
    function post()
    {
        if (!isset($_POST['group_id']) || (int)$_POST['group_id'] < 0) {
            $this->jerr("NO GROUP");
        }
        if (!$this->hasPerm( 'Core.Groups','E')) { // editing groups..
            $this->jerr("PERMISSION DENIED");
        }
        
        
            
        
        
        // add or update..
        if (!empty($_POST['dataUpdate'])) {
            foreach($_POST['dataUpdate'] as $id => $ac) {
                $id  = (int)$id;
                $p = DB_DataObject::factory('core_group_right');
                $p->group_id = (int)$_POST['group_id'];
                if (!$p->get($id)) {
                    $this->jerr("could not find gid:{$p->group_id} and $id");
                    continue; // errro cond.
                }
                $po = clone($p);
                $p->accessmask = $ac;
                $p->validate(); // ensure that the basic perms can not be removed
                $p->update($po);
            }
        }
        if (!empty($_POST['dataAdd'])) {
            foreach($_POST['dataAdd'] as $perm => $ac) {
                $p = DB_DataObject::factory('core_group_right');
                $p->group_id = (int)$_POST['group_id'];
                $p->rightname = $perm;
                $p->accessmask = $ac;
                $p->validate(); // ensure that the basic perms can not be removed
                $p->insert();
            }
        }
        $this->jok("done");
        
        
        
    }
     
    
    
    
    
}