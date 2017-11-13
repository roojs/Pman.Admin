<?php

require_once 'PDO/DataObject.php';

class Pman_Coba_DataObjects_Modx_users extends PDO_DataObject
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'modx_users';

    function beforeInsert($request,$roo) {
        
        $u = DB_DataObject::Factory('modx_users');
        $u->username = $request['username'];
        
        if($u->find(true)) {
            $roo->jerr("Username already exists");
        }

        $x = DB_DataObject::Factory('ext_data');
        $x->in_email = $request['email'];
        
        if($x->find(true)) {
            $roo->jerr("Emaiil already exists");
        }

        //DB_DataObject::DebugLevel(1);
        if (   empty($request['type'])
            || empty($request['fund_name'])
            || empty($request['email'])
            || $request['pw_enter']!=$request['pw_reenter']
            || !filter_var($request['email'], FILTER_VALIDATE_EMAIL)
        ) {
            $roo->jerr("Missing Data");
        }
        
        $this->hash_class = 'hashing.modMD5';
        $this->password = md5($request['new_password']);
        
    }

    function beforeUpdate($old, $request,$roo)
    {
        if(!empty($request['new_password'])){
            $this->hash_class = 'hashing.modMD5';
            $this->password = md5($request['new_password']); 
        }
    }

    function onInsert($q,$roo)
    {
        /*
         * Checking the modx_accountmgmts
         */
        $modx_accountmgmts = DB_DataObject::Factory('modx_accountmgmts');
        $modx_accountmgmts->name = $q['fund_name'];
        
        if(!$modx_accountmgmts->find(true)) {
            $roo->jerr("invalid fund name '" . $q['fund_name'] ."'");
        }
        
        /*
         * Create ext_data
         */
        $ext_data = PDO_DataObject::factory ('ext_data');
        
        $ext_data->setFrom($q);
        
        $ext_data->setFrom(array(
            'userdata_id' => $this->id,
            'isin_code' => $modx_accountmgmts->isin_code,
            'fund_name' => $modx_accountmgmts->name ,
            'in_email' => $q['email'] ,
            'account_type' => strtolower($q['type']),
            'in_firstname' => (empty($q['firstname'])) ? '' : $q['firstname'],
            'in_middlename' => (empty($q['middlename'])) ? '' : $q['middlename'],
            'in_lastname' => (empty($q['lastname'])) ? '' : $q['lastname'],
            'firstname_second_ap' => (empty($q['firstname_sec_ap'])) ? '' : $q['firstname_sec_ap'],
            'middlename_second_ap' => (empty($q['middlename_sec_ap'])) ? '' : $q['middlename_sec_ap'],
            'lastname_second_ap' => (empty($q['lastname_sec_ap'])) ? '' : $q['lastname_sec_ap'],
            'in_username' => (empty($q['username'])) ? '' : $q['username'],
            'investment_advisor_id' => (empty($q['investment_advisor_id'])) ? 0 : $q['investment_advisor_id']
        ));
        
        $ext_data->insert();
        
        $fullname = array();
        
        foreach(array('in_firstname', 'in_middlename', 'in_lastname') as $k) {
            if (empty($ext_data->{$k})) {
                continue;
            }
            $fullname[] = $ext_data->{$k};
        }
        
        $fullname = implode(' ', $fullname);
        
        /*
         * Create modx_account
         */
        $modx_accounts = PDO_DataObject::factory ('modx_accounts');
        
        $modx_accounts->setFrom(array(
            'user_id' => $this->id,
            'isin_code' => $ext_data->isin_code,
            'isin_original_code' => $ext_data->isin_code,
            'name' => $ext_data->fund_name,
            'user_fullname' => $fullname,
            'user_account_type' => $ext_data->account_type
        ));
        
        $modx_accounts->insert();
 
        /*
         * Create modx_user_attributes
         */
        $modx_user_attributes = PDO_DataObject::factory ('modx_user_attributes');
        $modx_user_attributes->setFrom(array(
            'internalKey' => $this->id,
            'fullname' => $fullname,
            'email' => $ext_data->in_email
        ));
        
        $modx_user_attributes->insert();
        
        /*
         * Create Event Log
         */
        
        $event = DB_DataObject::factory('Events');
        $event->setFrom(array(
            'event_when' => date('Y-m-d H:i:s'),
            'action' => 'REGISTER',
            'person_table' => 'modx_users',
            'modx_users_id' => $this->id,
            'remarks' => "{$this->username} has been created"
        ));
        
        $event->insert();
            
    }
    
    function ext_data()
    {
        return PDO_DataObject::factory('ext_data')->load('userdata_id', $this->id);
    }
    
    
    function beforeDelete($dependants, $roo)
    {
    	  return $roo->jerr('ERROR', 'Record delete is not allowed');
    	               
        //if(!empty($this->id)){            
        //    $ext_data = PDO_DataObject::factory('ext_data');            
        //    $ext_data->get('userdata_id',$this->id);                       
        //    $ext_data->delete();

        //    $cid = PDO_DataObject::factory('coba_investor_declarations');
        //    $cid->user_id = $this->id;
        //    foreach ($cid->fetchAll() as $c){                        
        //        $c->delete();
        //    }				
				
        //    $cir = PDO_DataObject::factory('coba_investor_relation');        
        //    $cir->modx_user_id = $this->id;                                        
        //    foreach ($cir->fetchAll() as $c){
        //        $c->beforeDelete(array(), $roo);                        
        //        $c->delete();
        //    }
            
        //    $cp = PDO_DataObject::factory('coba_person');        
        //    $cp->investor_id = $this->id;                                        
        //    foreach ($cp->fetchAll() as $c){                                        
        //        $c->delete();
        //    }
            
        //    $e = PDO_DataObject::Factory('Events');
        //    $e->whereAdd('person_id = ' . $this->id);
        //    $e->delete(true); 
            
              
        //}
                
    }    
    
    function relatedEventsWhere($q, $roo)
    {
    	  if($q['_related_on_table'] == '' && $q['_related_on_id'] == '')
    	  {
    	      return;
    	  }
    	  
        return  "(
                  on_table = '{$q['_related_on_table']}' 
                  AND
                  on_id = {$q['_related_on_id']}     
                 )
                 OR
                 (
                  on_table = 'coba_investor_relation'
                  AND
                  on_id in (SELECT id from coba_investor_relation where modx_user_id = {$q['_related_on_id']})
                 )
                 OR
                 (
                  on_table = 'coba_person'
                  AND
                  on_id in (SELECT id from coba_person where investor_id = {$q['_related_on_id']})
                 )
                 OR
                 ( 
                  on_table = 'ext_data'
                  AND
                  on_id in (SELECT id from ext_data where userdata_id = {$q['_related_on_id']})
                 )
                 OR
                 ( 
                  on_table = 'coba_investor_declarations'
                  AND
                  on_id in (SELECT id from coba_investor_declarations where user_id = {$q['_related_on_id']})
                 )
                 OR
                 ( 
                  on_table = 'coba_person_investor_profile'
                  AND
                  on_id in (SELECT id from coba_person_investor_profile where modx_user_id = {$q['_related_on_id']})
                 )
                 OR
                 ( 
                  on_table = 'coba_investor_lexis_results'
                  AND
                  on_id in (SELECT id from coba_investor_lexis_results where investor_id = {$q['_related_on_id']})
                 )
                 ";                       
    }
    
    function authUserName($name)
    {
        $this->whereAdd('LENGTH(password) > 1'); 
        $this->username = $name;
    }
    
    function getFullName()
    {
        $ext_data = $this->ext_data();
        
        return $ext_data->getFullName();
        
    }
    
    function getEmailFrom()
    {
        $name = $this->getFullName();
        
        if (empty($name)) {
            return $this->in_email;
        }
        return '"' . addslashes($name) . '" <' . $this->in_email . '>';
    }
    
    function active()
    { 
        return $this->active;
    }
    
    function checkPassword($val)
    {
        return md5($val) == $this->password;
    }
    
    function genPassKey ($t) 
    {
        return md5($this->username . $t . $this->password);
    }
    
    function setPassword($value)
    {
        $this->password = md5($value);
    }
    
    function login() 
    {
        @session_start();
        
        if (empty($this->id)) {
            return false;
        }

        $ext_data = $this->ext_data();

        if (empty($ext_data->id)) {
            return false;
        }

        $modx_token_array = array(
            'modx.user.0.resourceGroups' => array(
                'web' => array()
            ),
            'modx.user.0.attributes' => array(
                'web' => array(
                    'modAccessContext' => array(
                        'web' => array(
                            '0' => array(
                                'principal' => 0,
                                'authority' => 0,
                                'policy' => array(
                                    'load' => 1
                                )
                            )
                        )
                    ),
                    'modAccessResourceGroup' => array(),
                    'modAccessCategory' => array(),
                    'sources.modAccessResourceGroup' => array(),
                    'modAccessNamespace' => array()
                )
            ),
            'modx.user.contextTokens' => array(
                'web' => $this->id
            ),
            'modx.web.user.token' => array('modx56c40ae4272610.40167821_107659a4dff3c93758.93495480'),
            'modx.web.session.cookie.lifetime' => array(0),
            'modx.web.user.config' => array(),
            'modx.user.' . $this->id . '.resourceGroups' => array(
                'web' => array()
            ),
            'modx.user.' . $this->id . '.attributes' => array(
                'web' => array(
                    'modAccessContext' => array(),
                    'modAccessResourceGroup' => array(),
                    'modAccessCategory' => array(),
                    'sources.modAccessResourceGroup' => array(),
                    'modAccessNamespace' => array()
                )
            ),
            'modx.mgr.user.token' => array('modx56c40ae4272610.40167821_159794824ebf884.45346569'),
            'modx.mgr.session.cookie.lifetime' => array(0),
            'modx.mgr.user.config' => array(),
            'newResourceTokens' => array()
        );
        
        foreach ($modx_token_array as $key => $value) {
            $_SESSION[$key] = $value;
        }
        
        return true;
        
    }
    
    function sendPasswordResetEmail()
    {
        $ff = HTML_FlexyFramework::get();
        
        $templateDir = $this->clientFilePath('/mail/investor_password_reset_request.txt', true);
        
        if(empty($templateDir)){
            return false;
        }
        
        $ts = time();
        
        $ext_data = $this->ext_data();
        
        $contents = array(
            'subject' => "[Coba] {$ext_data->getFullName()} as requested password reset",
            'fromEmail' => 'admin@capital-company.coba-kyc.com',
            'person' => $this,
            'authFrom' => $ts,
            'authKey' => $this->genPassKey($ts)
        );

        $cfg = array(
            'template'=> 'investor_password_reset_request',
            'templateDir' => $templateDir,
            'page' => $ff,
            'contents' => $contents,
            'css_embed' => true
        );

        require_once 'Pman/Core/Mailer.php';
        
        $r = new Pman_Core_Mailer($cfg);

        return $r->send();
    }
    
    function sendLexisNexisComplianceEmail()
    {
        $event = DB_DataObject::factory('Events');
        $event->setFrom(array(
            'action' => 'LEXIS NEXIS COMPLIANCE EMAIL',
            'person_table' => 'modx_users',
            'modx_users_id' => $this->id
        ));
        
        if($event->find(true)){
            return true;
        }
        
        $ff = HTML_FlexyFramework::get();
        
        if(empty($ff->Coba['client_dir'])) {
            return false;
        }
        
        require_once 'Pman/Core/Mailer.php';
        
        $templateDir = $this->clientFilePath('/mail/lexis_nexis_notice_compliance_officers.txt', true);
        
        if(empty($templateDir)){
            return false;
        }
        
        $rcpts = DB_DataObject::factory('core_group')->lookupMembers('Compliance Officers','email');
        
        if (empty($rcpts)) {
            return false;
        }
        
        $contents = array(
            'subject' => "[Coba] Application needs review",
            'fromEmail' => 'admin@capital-company.coba-kyc.com',
            'rcpts' => implode(',', $rcpts),
            'investor' => $this
        );

        $cfg = array(
            'template'=> 'lexis_nexis_notice_compliance_officers',
            'templateDir' => $templateDir,
            'page' => $ff,
            'contents' => $contents,
            'css_embed' => true
        );

        $r = new Pman_Core_Mailer($cfg);
        
        $sent = $r->send();
        
        $event = DB_DataObject::factory('Events');
        $event->setFrom(array(
            'event_when' => date('Y-m-d H:i:s'),
            'action' => 'LEXIS NEXIS COMPLIANCE EMAIL',
            'person_table' => 'modx_users',
            'modx_users_id' => $this->id,    
            'remarks' => 'Send Lexis Nexis Compliance Officers Email'
        ));
        
        $event->insert();
        
        return $sent;
        
    }
    
    function sendComplianceRejectionEmail()
    {
        $ff = HTML_FlexyFramework::get();
        
        $ext_data = $this->ext_data();
        
        $core_person = DB_DataObject::factory('core_person');
        
        if(
                empty($ff->Coba['client_dir']) ||
                empty($ext_data->investment_advisor_id) ||
                !$core_person->get($ext_data->investment_advisor_id) ||
                empty($core_person->email)
        ) {
            return false;
        }
        
        require_once 'Pman/Core/Mailer.php';
        
        $templateDir = $this->clientFilePath('/mail/investor_compliance_rejection.txt', true);
        
        if(empty($templateDir)){
            return false;
        }
        
        $contents = array(
            'subject' => "[Coba] Compliance office rejection",
            'fromEmail' => 'admin@capital-company.coba-kyc.com',
            'person' => $core_person,
            'investor' => $ext_data
        );

        $cfg = array(
            'template'=> 'investor_compliance_rejection',
            'templateDir' => $templateDir,
            'page' => $ff,
            'contents' => $contents,
            'css_embed' => true
        );
        
        $r = new Pman_Core_Mailer($cfg);
        
        return $r->send();
        
    }
    
    function sendCompletionEmail($checklist)
    {
        $ff = HTML_FlexyFramework::get();
        
        $ext_data = $this->ext_data();
        
        $core_person = DB_DataObject::factory('core_person');
        
        if(
                empty($ff->Coba['client_dir']) ||
                empty($ext_data->investment_advisor_id) ||
                !$core_person->get($ext_data->investment_advisor_id) ||
                empty($core_person->email)
        ) {
            return false;
        }
        
        require_once 'Pman/Core/Mailer.php';
        
        $templateDir = $this->clientFilePath('/mail/investor_submitted.txt', true);
        
        if(empty($templateDir)){
            return false;
        }
        
        $contents = array(
            'subject' => "[Coba] {$ext_data->getFullName()} as submitted the Coba application",
            'fromEmail' => 'admin@capital-company.coba-kyc.com',
            'person' => $core_person,
            'investor' => $ext_data,
            'CheckList' => $checklist
        );

        $cfg = array(
            'template'=> 'investor_submitted',
            'templateDir' => $templateDir,
            'page' => $ff,
            'contents' => $contents,
            'css_embed' => true
        );
        
        $r = new Pman_Core_Mailer($cfg);
        
        return $r->send();
    }
    
    static function clientFilePath($file, $isDir = false)
    {
        $ff = HTML_FlexyFramework::get();
        
        if(empty($ff->Coba['client_dir'])){
            return false;
        }
        
        $defaultDir = $ff->rootDir . "/Coba/Clients/default";
        $specificDir = $ff->rootDir . "/Coba/Clients/{$ff->Coba['client_dir']}";
        
        $defaultFile = $ff->rootDir . "/Coba/Clients/default/{$file}";
        $specificFile = $ff->rootDir . "/Coba/Clients/{$ff->Coba['client_dir']}/{$file}";
        
        if(file_exists($specificFile)) {
            return (empty($isDir)) ? $specificFile : $specificDir;
        }

        if (file_exists($defaultFile)) {
            return (empty($isDir)) ? $defaultFile : $defaultDir;
        }

        return false;

    }
    
    function getLexisNexisStoreName()
    {
        $opts = HTML_FlexyFramework::get()->Pman;
        
        return implode( '/', array(
            $opts['storedir'], 'soap', 'responses', $this->id . '.json'
        ));
    }
    
    function cleanLexisNexisResults()
    {
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
        $coba_investor_lexis_results->setFrom(array(
            'investor_id' => $this->id,
            'status' => 0
        ));
        
        foreach ($coba_investor_lexis_results->fetchAll() as $c){
            $c->delete();
        }
        
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
        $coba_investor_lexis_results->setFrom(array(
            'investor_id' => $this->id
        ));
        
        foreach ($coba_investor_lexis_results->fetchAll() as $c){
            $o = clone ($c);
            $c->is_active = 0;
            $c->update($o);
        }
        
        $fn = $this->getLexisNexisStoreName();
        
        $dest = dirname($fn);
        
        if (!file_exists($dest)) {
            $oldumask = umask(0);
            mkdir($dest, 0775, true);
            umask($oldumask);  
        }
        
        if(!file_exists($fn)){
            return;
        }
        
        unlink($fn);
        
    }
    
    static $entityID = array();
    
    function syncLexisNexisResult($data)
    {
        if(empty($data->EntityUniqueID) || in_array($data->EntityUniqueID, self::$entityID)){
            return;
        }
        
        self::$entityID[] = $data->EntityUniqueID;
        
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
        $coba_investor_lexis_results->setFrom(array(
            'investor_id' => $this->id,
            'match_id' => $data->EntityUniqueID
        ));
        
        if($coba_investor_lexis_results->find(true)){
                
            $o = clone ($coba_investor_lexis_results);

            $coba_investor_lexis_results->setFrom(array(
                'json_detail' => json_encode($data),
                'updated_dt' => date('Y-m-d'),
                'is_active' => 1
            ));
            
            $coba_investor_lexis_results->update($o);

            return;
        }

        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');

        $coba_investor_lexis_results->setFrom(array(
            'json_detail' => json_encode($data),
            'investor_id' => $this->id,
            'match_id' => $data->EntityUniqueID,
            'updated_by' => 0,
            'updated_dt' => date('Y-m-d'),
            'reason' => '',
            'is_active' => 1,
            'status' => 0
        ));

        $coba_investor_lexis_results->insert();
        
    }
    
    function toLexisNexisParams($roo)
    {
        $params = array();
        
        $clientReference = md5("{$this->id}-" . date('Y-m-d H:i:s'));
        
        $ff = HTML_FlexyFramework::get();
        
        if(empty($ff->Coba) || empty($ff->Coba['LexisNexis'])){
            $roo->jerr('Missing Coba[LexisNexis] Settings');
        }
        
        $ret = array(
            'context' => array(
                'ClientID' => 'VeridateHK',
                'ClientReference' => $clientReference,
                'Password' => $ff->Coba['LexisNexis']['password'],
                'UserID' => $ff->Coba['LexisNexis']['username']
            ),
            'config' => array(
                'AssignResultTo' => array(
                    'EmailNotification' => true,
                    'RolesOrUsers' => array(
                        'string' => 'Administrator'
                    ),
                    'Type' => 'Role'
                ),
                'PredefinedSearchName' => 'List Screening',
                'WriteResultsToDatabase' => true
            ),
            'input' => array(
                'Records' => array(
                    'InputRecord' => array(
                        'Entity' => array()
                    )
                )
            )
        );
        
        $this->ext_data = $this->ext_data();
        
        switch ($this->ext_data->account_type) {
            
            case 'individual' :
                
                $ret['input']['Records']['InputRecord']['Entity'] = $this->toPersonalLexisNexisEntiry(false, $roo);
                
                $params[] = $ret;
                
                break;
            case 'joint' :
                
                $clientReference = md5("{$this->id}-Joint-First-Applicant-" . date('Y-m-d H:i:s'));
                
                $ret['context']['ClientReference'] = $clientReference;
                
                $ret['input']['Records']['InputRecord']['Entity'] = $this->toPersonalLexisNexisEntiry(false, $roo);
                
                $params[] = $ret;
                
                $clientReference = md5("{$this->id}-Joint-Second-Applicant" . date('Y-m-d H:i:s'));
                
                $ret['context']['ClientReference'] = $clientReference;
                
                $ret['input']['Records']['InputRecord']['Entity'] = $this->toPersonalLexisNexisEntiry(true, $roo);
                
                $params[] = $ret;
                
                break;
            case 'corporate' :
                break;
            default :
                break;
        }
        
        return $params;
    }
    
    function toPersonalLexisNexisEntiry($is_second, $roo)
    {
        $entity = array(
            'EntityType' => 'Individual'
        );
        
        $in_title = (empty($is_second)) ? $this->ext_data->in_title : $this->ext_data->title_second_ap;
        
        if(!empty($in_title)){
            $entity['Gender'] = ($in_title == 'Mr') ? 'Male' : 'Female';
        }
        
        $name = array();
        
        $in_firstname = (empty($is_second)) ? $this->ext_data->in_firstname : $this->ext_data->firstname_second_ap;
        
        if(!empty($in_firstname)){
            $name['First'] = $in_firstname;
        }
        
        $in_lastname = (empty($is_second)) ? $this->ext_data->in_lastname : $this->ext_data->lastname_second_ap;
        
        if(!empty($in_lastname)){
            $name['Last'] = $in_lastname;
        }
        
        $in_middlename = (empty($is_second)) ? $this->ext_data->in_middlename : $this->ext_data->middlename_second_ap;
        
        if(!empty($in_middlename)){
            $name['Middle'] = $in_middlename;
        }
        
        if(!empty($name)){
            $entity['Name'] = $name;
        }
        
        $InputAdditionalInfo = array();
        
        $in_dob = (empty($is_second)) ? $this->ext_data->in_dob : $this->ext_data->sec_dob;
        
        if(!empty($in_dob) && $in_dob != '0000-00-00') {
            $day = date('j', strtotime($in_dob));
            $month = date('n', strtotime($in_dob));
            $year = date('Y', strtotime($in_dob));
            
            if(checkdate($month, $day, $year)){
                $InputAdditionalInfo[] = array(
                    'Date' => array(
                        'Day' => $day,
                        'Month' => $month,
                        'Year' => $year
                    ),
                    'Type' => 'DOB'
                );
            }
        }
        
        $in_nationality = (empty($is_second)) ? $this->ext_data->in_nationality : $this->ext_data->nationality_second_ap;
        $in_other_nationality = (empty($is_second)) ? $this->ext_data->in_other_nationality : $this->ext_data->other_nationality_second_ap;
        
        if(!empty($in_nationality) || !empty($in_other_nationality)){
            
            $InputAdditionalInfo[] = array(
                'Type' => 'Nationality',
                'Value' => empty($in_nationality) ? $in_other_nationality : $in_nationality
            );
            
            $InputAdditionalInfo[] = array(
                'Type' => 'Citizenship',
                'Value' => empty($in_nationality) ? $in_other_nationality : $in_nationality
            );
            
        }
        
        if(!empty($InputAdditionalInfo)){
            $entity['AdditionalInfo'] = array(
                'InputAdditionalInfo' => $InputAdditionalInfo
            );
        }
        
        $InputID = array();
        
        $not_have_passport = (empty($is_second)) ? $this->ext_data->not_have_passport : $this->ext_data->not_have_passport_ap2;
        $in_id_passport_number = (empty($is_second)) ? $this->ext_data->in_id_passport_number : $this->ext_data->id_passport_number_second_ap;
        
        if(empty($not_have_passport) && !empty($in_id_passport_number)){
            
            $passport = array(
                'Number' => $in_id_passport_number,
                'Type' => 'Passport'
            );
            
            $date_of_issue = (empty($is_second)) ? $this->ext_data->date_of_issue : $this->ext_data->date_of_issue_partner;
            
            if(!empty($date_of_issue) && $date_of_issue != '0000-00-00') {
                $day = date('j', strtotime($date_of_issue));
                $month = date('n', strtotime($date_of_issue));
                $year = date('Y', strtotime($date_of_issue));

                if(checkdate($month, $day, $year)){
                    $passport['DateIssued'] = array(
                        'Day' => $day,
                        'Month' => $month,
                        'Year' => $year
                    );
                }
            }
            
            $date_of_expiry = (empty($is_second)) ? $this->ext_data->date_of_expiry : $this->ext_data->date_of_expiry_partner;
            
            if(!empty($date_of_expiry) && $date_of_expiry != '0000-00-00') {
                $day = date('j', strtotime($date_of_expiry));
                $month = date('n', strtotime($date_of_expiry));
                $year = date('Y', strtotime($date_of_expiry));

                if(checkdate($month, $day, $year)){
                    $passport['DateExpires'] = array(
                        'Day' => $day,
                        'Month' => $month,
                        'Year' => $year
                    );
                }
            }
            
            $InputID[] = $passport;
            
        }
        
        $not_have_id_card = (empty($is_second)) ? $this->ext_data->not_have_id_card : $this->ext_data->not_have_id_card_ap2;
        $id_card_number = (empty($is_second)) ? $this->ext_data->id_card_number : $this->ext_data->id_card_number_ap2;
        
        if(empty($not_have_id_card) && !empty($id_card_number)){
            
            $id_card = array(
                'Number' => $id_card_number,
                'Type' => 'ProprietaryUID'
            );
            
            $id_card_date_of_issue = (empty($is_second)) ? $this->ext_data->id_card_date_of_issue : $this->ext_data->id_card_date_of_issue_ap2;
            
            $day = date('j', strtotime($id_card_date_of_issue));
            $month = date('n', strtotime($id_card_date_of_issue));
            $year = date('Y', strtotime($id_card_date_of_issue));

            if(checkdate($month, $day, $year)){
                $id_card['DateIssued'] = array(
                    'Day' => $day,
                    'Month' => $month,
                    'Year' => $year
                );
            }
            
            $InputID[] = $id_card;
            
        }
        
        if(!empty($InputID)){
            $entity['IDs'] = array(
                'InputID' => $InputID
            );
        }
        
        $address = array();
        
        $in_city = (empty($is_second)) ? $this->ext_data->in_city : $this->ext_data->city_second_ap;
        
        if(!empty($in_city)){
            $address['City'] = $in_city;
        }
        
        $in_country = (empty($is_second)) ? $this->ext_data->in_country : $this->ext_data->country_second_ap;
        $in_country_lkey = false;
        
        if(!empty($in_country)){
            $i18n = DB_DataObject::factory('i18n');
            $i18n->setFrom(array(
                'ltype' => 'c',
                'inlang' => 'en',
                'lval' => $in_country,
                'is_active' => 1
            ));
            
            if($i18n->find(true)){
                $in_country_lkey = $i18n->lkey;
            }
        }
        
        if(!empty($in_country_lkey)){
            $address['Country'] = $in_country_lkey;
        }
        
        $in_postalcode = (empty($is_second)) ? $this->ext_data->in_postalcode : $this->ext_data->postalcode_second_ap;
        
        if(!empty($in_postalcode)){
            $address['PostalCode'] = $in_postalcode;
        }
        
        $in_addressline1 = (empty($is_second)) ? $this->ext_data->in_addressline1 : $this->ext_data->address_line1_second_ap;
        
        if(!empty($in_addressline1)){
            $address['Street1'] = $in_addressline1;
        }
        
        $in_addressline2 = (empty($is_second)) ? $this->ext_data->in_addressline2 : $this->ext_data->address_line2_second_ap;
        
        if(!empty($in_addressline2)){
            $address['Street2'] = $in_addressline2;
        }
        
        if(!empty($address)){
            $address['Type'] = 'Current';
            
            $entity['Addresses'] = array(
                'InputAddress' => $address
            );
        }
        
        return $entity;
    }
    
    
}
