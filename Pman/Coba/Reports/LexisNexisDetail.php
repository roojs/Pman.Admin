<?php

require_once 'Pman/Coba/Reports/LexisNexis.php';

class Pman_Coba_Reports_LexisNexisDetail extends Pman_Coba_Reports_LexisNexis
{
    var $template = "lexis-nexis-detail.html";

    function getAuth()
    {
        return true;
    }

    function get($id, $opts = array())
    {
        $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
        
        if(empty($id) || !$coba_investor_lexis_results->get($id)){
            return;
        }
        
        $this->modx_user = DB_DataObject::factory('modx_users');
        
        if(!$this->modx_user->get($coba_investor_lexis_results->investor_id)){
            return;
        }
        
        $ff = HTML_FlexyFramework::get();
        
        if(empty($ff->Coba) || empty($ff->Coba['LexisNexis'])){
            return;
        }
        
        $file = "{$ff->Pman['storedir']}/soap/responses/{$this->modx_user->id}.json";
        
        if(!file_exists($file)){
            return;
        }
        
        $response = json_decode(file_get_contents($file));
        
        if(
                empty($response->SearchResult) || 
                empty($response->SearchResult->Records) || 
                empty($response->SearchResult->Records->ResultRecord) || 
                empty($response->SearchResult->Records->ResultRecord->Watchlist) || 
                empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches) || 
                empty($response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch)
        ) {
            return;
        }
        
        $matches = $response->SearchResult->Records->ResultRecord->Watchlist->Matches->WLMatch;
        $matches = is_array($matches) ? $matches : array($matches);

        $this->detail = array();
        
        foreach ($matches as $k => $v){
            
            if(empty($v->EntityUniqueID) || $v->EntityUniqueID != $coba_investor_lexis_results->match_id){
                continue;
            }
            
            $this->detail = $v;
            
        }
        
    }
}
