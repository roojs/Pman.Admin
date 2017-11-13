<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Coba_address extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'coba_address';

    public $id;
    public $country;
    public $other_country;
    public $state;
    public $other_state;
    public $city;
    public $without_post_code;
    public $post_code;
    public $address_line_1;
    public $address_line_2;



}
