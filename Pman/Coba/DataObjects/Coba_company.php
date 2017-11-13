<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_company extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_company';

    public $id;
    public $name;
    public $domicile;
    public $other_domicile;
    public $registration_number;
    public $date_of_incorporation;
    public $not_domociled_usa;
    public $giin_number;

    function beforeDelete($dependants, $roo)
    {
        $coba_investor_relation = DB_DataObject::factory('coba_investor_relation');
        $coba_investor_relation->setFrom(array(
            'parent_company_id' => $this->id
        ));

        foreach($coba_investor_relation->fetchAll() as $c){
            $c->beforeDelete(array(), $roo);
            $c->delete();
        }

        $coba_address = DB_DataObject::factory('coba_address');
        $coba_address->get($this->coba_address_id);
        $coba_address->delete();
    }

    function getShareholders()
    {
        $coba_investor_relation = DB_DataObject::factory('coba_investor_relation');
        $coba_investor_relation->autoJoin();
        $coba_investor_relation->setFrom(array(
            'relation' => 'SHAREHOLDER',
        ));
        $coba_investor_relation->whereAdd("coba_investor_relation.coba_company_id != 0");

        return $coba_investor_relation->fetchAll();
    }

}
