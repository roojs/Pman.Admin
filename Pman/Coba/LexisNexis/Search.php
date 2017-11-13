<?php

require_once 'Pman/Coba/LexisNexis/Base.php';

class Pman_Coba_LexisNexis_Search extends Pman_Coba_LexisNexis_Base
{
    var $modx_user = false;
    
    var $ext_data = false;
    
    function get($id, $opt = array())
    {
        $this->modx_user = DB_DataObject::factory('modx_users');
        
        if(empty($id) || !$this->modx_user->get($id)){
            $this->jerr('Invalid URL');
        }
        
        $this->modx_user->cleanLexisNexisResults();
        
        $params = $this->modx_user->toLexisNexisParams($this);
        
        $results = array();
        
        foreach ($params as $p){
            
            try{
            
                $response = $this->soapClient->Search($p);
                
                if(
                        empty($response) ||
                        empty($response->SearchResult) || 
                        empty($response->SearchResult->ClientReference) || 
                        $response->SearchResult->ClientReference != $p['context']['ClientReference']
                ) {
                    continue;
                }
                
                $results[$response->SearchResult->ClientReference] = $response;
                
                if(
                        empty($response->SearchResult->Records) || 
                        empty($response->SearchResult->Records->ResultRecord) || 
                        empty($response->SearchResult->Records->ResultRecord->Watchlist) || 
                        empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches) || 
                        empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch)
                ) {
                    continue;
                }
                
                $matches = $response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch;
                $matches = is_array($matches) ? $matches : array($matches);

                foreach ($matches as $m){
                    $this->modx_user->syncLexisNexisResult($m);
                }
                

            } catch(SoapFault $e) {

                $this->jerr($e->getMessage());
            }
            
        }
        
        print_R($results);exit;
        
        $fn = $this->modx_user->getLexisNexisStoreName();
        
        file_put_contents($fn, json_encode($results));
        
        exit;
        
        try{
            
            $response = $this->soapClient->Search($params);
            
            file_put_contents("{$this->responseDir}/{$this->modx_user->id}.json", json_encode($response));
            
            if(
                    !empty($response->SearchResult) && 
                    !empty($response->SearchResult->Records) && 
                    !empty($response->SearchResult->Records->ResultRecord) && 
                    !empty($response->SearchResult->Records->ResultRecord->Watchlist) && 
                    !empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches) && 
                    !empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch)
            ) {
                $results = $response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch;
                $results = is_array($results ) ? $results : array($results);
            }
            
            if(empty($results)){
                $this->modx_user->sendLexisNexisComplianceEmail();
            }
            
        } catch(SoapFault $e) {
            
            $this->jerr($e->getMessage());
        }
        
        $this->addActivityLog();
        
        $this->syncResults($results);
        
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
        $coba_investor_lexis_results->setFrom(array(
            'investor_id' => $this->modx_user->id,
            'is_active' => 1
        ));
        
        $total = $coba_investor_lexis_results->count();
        
        $this->jdata(array(
            'total' => $total
        ));
    }
    
    function addActivityLog()
    {
        $e = $this->addEvent('LEXIS NEXIS SEARCH', false, 'Lexis Nexis Fetched');
        
        $o = clone($e);
        $e->modx_users_id = $this->ext_data->userdata_id;
        $e->update($o);
    }
    
    function syncResults($results)
    {
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
        $coba_investor_lexis_results->setFrom(array(
            'investor_id' => $this->modx_user->id,
            'status' => 0
        ));
        
        foreach ($coba_investor_lexis_results->fetchAll() as $c){
            $c->delete();
        }
        
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
        $coba_investor_lexis_results->setFrom(array(
            'investor_id' => $this->modx_user->id
        ));
        
        foreach ($coba_investor_lexis_results->fetchAll() as $c){
            $o = clone ($c);
            $c->is_active = 0;
            $c->update($o);
        }
        
        if(empty($results)){
            return;
        }
        
        $processed = array();
        
        foreach ($results as $r){
            
            if(empty($r->EntityUniqueID) || in_array($r->EntityUniqueID, $processed)){
                continue;
            }
            
            $processed[] = $r->EntityUniqueID;
            
            $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
            $coba_investor_lexis_results->setFrom(array(
                'investor_id' => $this->modx_user->id,
                'match_id' => $r->EntityUniqueID
            ));
            
            if($coba_investor_lexis_results->find(true)){
                
                $o = clone ($coba_investor_lexis_results);
                
                $coba_investor_lexis_results->is_active = 1;
                $coba_investor_lexis_results->update($o);
                
                continue;
            }
            
            $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
            $coba_investor_lexis_results->setFrom(array(
                'investor_id' => $this->modx_user->id,
                'match_id' => $r->EntityUniqueID,
                'updated_by' => 0,
                'updated_dt' => date('Y-m-d'),
                'reason' => '',
                'is_active' => 1,
                'status' => 0
            ));
            
            $coba_investor_lexis_results->insert();
            
        }
        
    }
    
    
}
