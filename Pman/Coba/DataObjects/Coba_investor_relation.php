<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_investor_relation extends PDO_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_investor_relation';

    public $id;
    public $modx_user_id;
    public $coba_person_id;
    public $relation;
    public $parent_company_id;
    public $coba_company_id;
    
    function can_delete_by($au)
    {
        if(!empty($this->modx_user_id)){
            return ($this->modx_user_id == $au->id) ? true : false;
        }
        
        if(empty($this->parent_company_id)){
            return false;
        }
        
        $coba_investor_relation = DB_DataObject::factory('coba_investor_relation');
        $coba_investor_relation->setFrom(array(
            'modx_user_id' => $au->id,
            'coba_company_id' => $this->parent_company_id
        ));
        
        return $coba_investor_relation->count() ? true : false;
        
    }
    
    function beforeDelete($dependants, $roo)
    {
        if(!empty($this->coba_person_id)){
            
            $other = DB_DataObject::factory('coba_investor_relation');
            $other->setFrom(array(
                'coba_person_id' => $this->coba_person_id
            ));
            
            $other->whereAdd("coba_investor_relation.id != {$this->id}");
            
            if(!$other->count()){
                
                $coba_person = DB_DataObject::factory('coba_person');
        
                if($coba_person->get($this->coba_person_id)){
                    $coba_person->beforeDelete(array(), $roo);
                    $coba_person->delete();
                }
            }
        }
        
        if(!empty($this->coba_company_id)){
            
            $other = DB_DataObject::factory('coba_investor_relation');
            
            $other->setFrom(array(
                'coba_company_id' => $this->coba_company_id
            ));
            
            $other->whereAdd("coba_investor_relation.id != {$this->id}");
            
            if(!$other->count()){
                
                $coba_company = DB_DataObject::factory('coba_company');
        
                if($coba_company->get($this->coba_company_id)){
                    $coba_company->beforeDelete(array(), $roo);
                    $coba_company->delete();
                }
                
            }
        }
    }
    
    function autoJoinPersonAddr()
    {
       $this->_join .= "LEFT JOIN
                            coba_address AS coba_address_cir
                        ON
                            coba_address_cir.id = join_coba_person_id_id.coba_address_id";
    }
    
    function autoJoinComAddr()
    {
       $this->_join .= "LEFT JOIN
                             coba_address AS coba_address_cir
                        ON
                             coba_address_cir.id = join_coba_company_id_id.coba_address_id";
    }
    
    function selectAddCountryStates() 
    {
       $this->selectAdd("
            (SELECT coba_state.name FROM coba_state 
              WHERE coba_state.id = coba_address_cir.state) 
              AS state_name ,        

            (SELECT i18n_translate('c' , coba_address_cir.country, 'en')) 
              AS country_name ,

            (SELECT i18n_translate('c' , join_coba_person_id_id.nationality, 'en')) 
              AS nationality_name , 

            (SELECT i18n_translate('c' , join_coba_person_id_id.place_of_birth, 'en')) 
              AS place_of_birth_name,

            (SELECT i18n_translate('c' ,join_coba_company_id_id.domicile, 'en')) 
             AS domicile_name,                        

             coba_address_cir.country AS coba_address_id_country,

             coba_address_cir.other_country AS coba_address_id_other_country,

             coba_address_cir.state AS coba_address_id_state,

             coba_address_cir.other_state AS coba_address_id_other_state,

             coba_address_cir.city AS coba_address_id_city,

             coba_address_cir.without_post_code AS coba_address_id_without_post_code,

             coba_address_cir.post_code AS coba_address_id_post_code,

             coba_address_cir.address_line_1 AS coba_address_id_address_line_1,

             coba_address_cir.address_line_2 AS coba_address_id_address_line_2
        ");
    }
}