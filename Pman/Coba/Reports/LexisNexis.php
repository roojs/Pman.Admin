<?php

require_once 'Pman.php';

class Pman_Coba_Reports_LexisNexis extends Pman
{
    var $masterTemplate = "lexis-nexis-master.html";
    
    var $template = "lexis-nexis.html";

    function getAuth()
    {
        return true;
    }

    function get($id, $opts = array())
    {
        $this->modx_user = DB_DataObject::factory('modx_users');
        
        $this->completed = false;
        
        if(empty($id) || !$this->modx_user->get($id)){
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
        
        $this->reportDate = date('F j, Y, h:i A', filemtime($file));
        
        $this->completed = true;
        
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

        $total = count($matches);
        
        $this->matches = array();
        
        if($total < 1){
            return;
        }
        
        $processed = array();
        
        foreach ($matches as $k => $v){
            
            if(in_array($v->EntityUniqueID, $processed)){
                continue;
            }
            
            $coba_investor_lexis_results = DB_DataObject::factory('coba_investor_lexis_results');
            $coba_investor_lexis_results->autoJoin();
            $coba_investor_lexis_results->setFrom(array(
                'investor_id' => $this->modx_user->id,
                'match_id' => $v->EntityUniqueID,
                'is_active' => 1
            ));
            
            if(!$coba_investor_lexis_results->find(true)){
                continue;
            }
            
            $processed[] = $v->EntityUniqueID;
            
            $v->coba_investor_lexis_result = clone ($coba_investor_lexis_results);
            
            $this->matches[] = $v;
            
        }
        
    }
    
    function formatDate($date, $format = 'Y-m-d')
    {
        return date($format, strtotime($date));
    }
    
    function comments($comments)
    {
        $c = array_map('trim', explode("\n", $comments));
        
        $c = implode("<br/>", array_filter($c));
        
        $c = array_map('trim', explode('||', $c));
        
        $c = implode("<br/>", array_filter($c));
        
        $c = array_map('trim', explode('|', $c));
        
        $c = array_map(function($str){
            $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
         
            if(preg_match($reg_exUrl, $str, $url)) {
                
                if(parse_url($str, PHP_URL_HOST) == 'members.worldcompliance.com'){
                    return '';
                }
                
                return preg_replace($reg_exUrl, '<a href="'.$url[0].'" target="_blank">'. wordwrap($url[0], 40, ' ', true).'</a>', $str);
            }

            return $str;
        }, $c);
        
        $c = implode("<br/>", array_filter($c));
        
        $c = array_map('trim', explode(';', $c));
        
        $c = implode("<br/>", array_filter($c));
        
        return $c;
        
    }
    
    function infoKey($info)
    {
        $key = $info->Type;
        
        if($info->Type == 'DOB'){
            $key = 'Date of Birth';
        }
        
        if($info->Type == 'Other'){
            $key = 'Other Information';
        }
        
        if($info->Type == 'PlaceOfBirth'){
            $key = 'Place of Birth';
        }
        
        return $key;
        
    }
    
    function is_pending($status)
    {
        return ($status == 0) ? true : false;
    }
    
    function is_accepted($status)
    {
        return ($status == 1) ? true : false;
    }
    
    function is_rejected($status)
    {
        return ($status == -1) ? true : false;
    }
    
}
