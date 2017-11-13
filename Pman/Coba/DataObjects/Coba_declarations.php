<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_declarations extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_declarations';

    public $id;
    public $fund_id;
    public $dec_type;
    public $nickname;
    public $title;
    public $created_dt;
    public $created_by;
    public $is_active;
    public $used_by;
    public $seq_order;

    var $account_type_mapping = array(
        'individual' => 'I',
        'joint' => 'J',
        'corporate' => 'C'
   );
    
    function applyFilters($q, $au)
    {
        if(!empty($q['_user_id'])){
            
            $ext_data = DB_DataObject::factory('ext_data')->load('userdata_id', $q['_user_id']);
            
            $used_by = $this->account_type_mapping[$ext_data->account_type];

            if($ext_data->account_type == 'corporate' && $ext_data->is_listed_company == 'yes'){
                $used_by = 'CL';
            }
            
            $this->whereAdd("coba_declarations.used_by = '{$used_by}'");
            
            $this->whereAddUserFilter($ext_data);
            
        }
        
   }
   
   function postListFilter($data, $au, $q)
   {
       if(!empty($q['_user_id'])){
           
           foreach ($data as $k => $v){
               
               $coba_investor_declarations = DB_DataObject::factory('coba_investor_declarations');
               $coba_investor_declarations->setFrom(array(
                   'user_id' => $q['_user_id'],
                   'dec_id' => $v['id']
               ));
               
               if(!$coba_investor_declarations->find(true)){
                   $coba_investor_declarations->insert();
               }
               
               $data[$k]['coba_investor_declarations_id'] = $coba_investor_declarations->id;
               
               $data[$k]['coba_investor_declarations_documents'] = $coba_investor_declarations->getDocuments();
               
           }
           
           if(!empty($q['_with_others'])){
               
                $images = DB_DataObject::factory('Images');
                $images->setFrom(array(
                    'ontable' => 'modx_users',
                    'onid' => $q['_user_id'],
                    'imgtype' => 'other_documents'
                ));
                
                $data[] = array(
                    'id' => -1,
                    'title' => 'Others',
                    'coba_investor_declarations_id' => $q['_user_id'],
                    'coba_investor_declarations_documents' => $images->fetchAll(false, false, 'toArray')
                );
                
           }
           
       }
       
       return $data;
       
   }
   
   function whereAddUserFilter($ext_data)
   {
       if(empty($ext_data) || empty($ext_data->account_type)){
           return;
       }
       
       if($ext_data->in_professional_investor != 'yes' && $ext_data->professional_investor_second_ap != 'yes'){
            $this->whereAdd("coba_declarations.nickname != 'prof_inv'");
        }
       
       switch ($ext_data->account_type) {
            
            case 'individual' : 
                
                /*
                 * FormList
                 */
                
                if($ext_data->in_uscitizen == 'yes'){
                    $this->whereAdd("coba_declarations.nickname != 'w8ben'");
                }
                
                if($ext_data->in_uscitizen == 'no'){
                    $this->whereAdd("coba_declarations.nickname != 'w9'");
                }
                
                /*
                 * CheckList
                 */
                
                if(!empty($ext_data->not_have_passport)){
                    $this->whereAdd("coba_declarations.nickname != 'passport_copy'");
                }
                
                if(!empty($ext_data->not_have_id_card)){
                    $this->whereAdd("coba_declarations.nickname != 'id_copy'");
                }
                
                if($ext_data->in_uscitizen == 'yes'){
                    $this->whereAdd("coba_declarations.nickname != 'w8ben'");
                }
                
                if($ext_data->in_uscitizen == 'no'){
                    $this->whereAdd("coba_declarations.nickname != 'w9'");
                }
                
                break;
            case 'joint' :
                
                /*
                 * FormList
                 */
                
                if($ext_data->in_uscitizen == 'yes' && $ext_data->uscitizen_second_ap == 'yes'){
                    $this->whereAdd("coba_declarations.nickname != 'w8ben'");
                }
                
                if($ext_data->in_uscitizen == 'no' && $ext_data->uscitizen_second_ap == 'no'){
                    $this->whereAdd("coba_declarations.nickname != 'w9'");
                }
                
                /*
                 * CheckList
                 */
                
                if(!empty($ext_data->not_have_passport) && !empty($ext_data->not_have_passport_ap2)){
                    $this->whereAdd("coba_declarations.nickname != 'passport_copy'");
                }
                
                if(!empty($ext_data->not_have_id_card) && !empty($ext_data->not_have_id_card_ap2)){
                    $this->whereAdd("coba_declarations.nickname != 'id_copy'");
                }
                
                if($ext_data->in_uscitizen == 'yes' && $ext_data->uscitizen_second_ap == 'yes'){
                    $this->whereAdd("coba_declarations.nickname != 'w8ben'");
                }
                
                if($ext_data->in_uscitizen == 'no' && $ext_data->uscitizen_second_ap == 'no'){
                    $this->whereAdd("coba_declarations.nickname != 'w9'");
                }
                
                break;
            case 'corporate' :
                
                /*
                 * FormList
                 */
                
                if($ext_data->is_listed_company == 'yes' || $ext_data->in_uscitizen == 'yes'){
                    $this->whereAdd("coba_declarations.nickname != 'w8bene'");
                }
                
                /*
                 * CheckList
                 */
                
                if($ext_data->is_listed_company == 'yes' || $ext_data->in_uscitizen == 'yes'){
                    $this->whereAdd("coba_declarations.nickname != 'w8bene'");
                }
                
                break;
        }
   }

   

}
