<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Google
 *
 * @author chris
 */
require_once 'Pman/PressRelease/Import/Search/Base.php';


class Pman_PressRelease_Import_Search_Google extends Pman_PressRelease_Import_Search_Base {
  
  
    
    
    
    /**
     *
     * This is for the Google Search Feed 
     * 
     * 
     * @param type $reader_feed
     * @return type 
     */
    
    function parseSearch($keyword, $lang = 'en', $country='hk')
    {
        //var_dump(array($lang,$country));
        require_once 'google.api/src/Google_Client.php';
        require_once 'google.api/src/contrib/Google_CustomsearchService.php';
//        session_start();
        
        $l = array();
        $kw = json_decode($keyword);
        $raw = array();
        foreach($kw as $pp){
            $l[] = '"'.trim($pp).'"';
            $raw[] = trim($pp);
        }
        
        
        $key = HTML_FlexyFramework::get()->Pman_Reader['googlekey'];
        $client = new Google_Client();
        $client->setApplicationName('Google CustomSearch PHP Starter Application');
        // Docs: http://code.google.com/apis/customsearch/v1/using_rest.html
        // Visit https://code.google.com/apis/console?api=customsearch to generate
        // your developer key (simple api key).
        $client->setDeveloperKey($key);//
        $this->search = new Google_CustomsearchService($client);
        
        

        $cfg = array(
            'cx' => '010353084809800240754:jsoaxolbobw', // The custom search engine ID to scope this search query.
            'num' => 10,
            //'gl' => $country,
            'hl' => $lang,
            'start' => 1,
            'googlehost' => 'google.com',
        );
        
        $hosts = array('google.com');
        
       
        
        
        switch(strtolower($lang)) {
            case 'en': $hosts[] = 'google.com.hk'; break;
            case 'zh_hk': $hosts[] = 'google.com.hk'; break;
            case 'zh_tw': $hosts[] = 'google.com.tw'; break;
            //case 'zh_CN': $cfg['googlehost'] = 'google.com.tw'; break;
            //case 'cn': $cfg['googlehost'] = 'google.com.tw'; break; ?? google.com?
            case 'ja': $hosts[] = 'google.jp'; break;
            case 'ko': $hosts[] = 'google.co.kr'; break;
            case 'vi': $hosts[] = 'google.com.vn'; break;
            case 'id': $hosts[] = 'google.co.id'; break;
                
            default:
                echo "-- ?? unknown language ?? $lang\n";
                break;
            
            
        }
        
        switch(strtoupper($country)) {
            
            case 'AU': $hosts[] = 'google.com.au'; break;
            //case 'SO': $hosts[] = 'google.com.hk'; break;
            
            case 'MY': $hosts[] = 'google.com.my'; break;
            case 'TW':
            case 'SG':
            case 'CN':
                $hosts[] = 'google.com.tw';
                $hosts[] = 'google.com.sg';
                $hosts[] = 'google.com.hk';
                break;
             
            //case 'US': $hosts[] = 'google.com.hk'; break;
            case 'KR': $hosts[] = 'google.co.kr'; break;
            case 'TH': $hosts[] = 'google.co.th'; break;
            case 'PH': $hosts[] = 'google.com.ph'; break;
            case 'GB': $hosts[] = 'google.com.uk'; break;
            case 'JP': $hosts[] = 'google.jp'; break;
            case 'MN': $hosts[] = 'google.mn'; break;
            case 'ID': $hosts[] = 'google.co.id'; break;
        
  
                
            default:
            //    echo "-- ?? unknown language ?? $lang\n";
                break;
            
        }   
        
                
        $hosts = array_unique($hosts);
        print_r($hosts);
        foreach($hosts as $h) {
            $cfg['googlehost'] = $h;
            $this->runSearch($cfg, $l);
            // run the search without quotes as well..
            //if (strtolower($lang) !='en') {
               $this->runSearch($cfg, $raw);
            //}
        }
        
        
        
        
        
        return array_values($this->ret);
        
    }
    var $search;
    var $ret = array();
    
    function runSearch($cfg,$words)
    {
        
        $start = 1;
        while ($start < 100) {
            $cfg['start'] = $start;
            
           
            $log = "ASSIGNMENT : #{$this->feed->assign->project_id_pressrelease_id} {$this->feed->assign->project_id_name} : {$this->feed->language} / {$this->feed->country}  ($start)";
            $this->glog($log);
            
            try { 
                $result = $this->search->cse->listCse(implode(" OR ", $words), $cfg);
        
            } catch ( Exception $e) {
                $this->glog($log . " - FAILED - exception " . print_r($e,true));
                echo "exception\n";
                return;
            }
            
            
            
            
            if (empty($result['searchInformation']['totalResults'])) {
                 
                echo "no results\n";
                return;
             
            }
            if (!HTML_FlexyFramework::get()->cli) {
                print_r($result);
            }
            $this->glog($log . " : SUCCESS  : ". count($result['items']));
             
            foreach($result['items'] as $s){
                
                $t = array();
                
                $t['extid'] = md5($s['link']);
    
                $t['headline'] = $s['title'];
                $t['body'] = $s['snippet'];
                $t['url'] = $s['link'];
                $t['author'] = '';
                $t['source'] = '';
                
                
                $this->ret[$t['extid'] ] = $t;
                
            }
            if (empty($result['queries']['nextPage'][0]['startIndex'])) {
                break;
            }
            $start = $result['queries']['nextPage'][0]['startIndex'];
            
        }
        
        
        
        
    }
    function glog($str)
    {
        static $fh = false;
        if ($fh === false) {
            $fh = fopen('/tmp/google_search_log', 'a');
        }
        fwrite($fh, date("Y-m-d H:i:s") . " "  . $str . "\n");
        
    }
    
}
    
//$a = new Pman_Reader_Parse_Google;
//$a->parseSearch('["Asian Festival of Children\'s Content Reveals Shortlist for Scholastic Asian Book Award 2014"]');
