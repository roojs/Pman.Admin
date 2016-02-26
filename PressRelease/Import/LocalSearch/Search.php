<?php

/**
 * Description of LocalSearch
 * FIXME --- This is not in used????
 * @author chris
 */
require_once 'Pman.php';

class Pman_PressRelease_Import_LocalSearch_Search extends Pman 
{
    //put your code here
    
    var $cli  = false;
    
    static $cli_desc = "Local Search Engine -- Search\n
                        Run the Search:
                        PressRelease/Import/LocalSearch/Search
                ";
    
    static $cli_opts = array(
         
    ); 
    
    var $addCount = 0;
    var $newline = "\n";
    
    function getAuth()
    {
        $cli = HTML_FlexyFramework::get()->cli;
        if ($cli) {
            $this->cli = true;
            return true;
        }
        parent::getAuth();
        $au = $this->getAuthUser();
        if (!$au) {
            $this->jerrAuth();
        }
        return true;
    }
    
    function get($id)
    {
        if(!$this->cli){
             $this->newline = "<br />";
        }
//        $params = explode('/', $args);
        
//        if(empty($params[0])){
//            echo "Keyword is empty..\n";
//            exit;
//        }
//        if(empty($id)){
//            echo "Auto import id is empty..\n";
//            exit;
//        }
        
        $press = DB_DataObject::factory('pressrelease_entry');
        $press->whereAdd("publish_dt > (NOW() - INTERVAL 60 DAY) AND publish_dt < NOW()");
        $pr = $press->fetchAll();
        
        if(empty($pr)){
            echo "No any new release.  $this->newline";
            exit;
        }
        
        $autoImport = DB_DataObject::factory('pressrelease_auto_import');
        $autoImport->use_local_search = 1;
        $aiByLang = array();
        
        foreach($autoImport->fetchAll() as $import){
            $aiByLang[$import->language][] = $import;
        }
        
//        print_r($aiByLang);
//        exit;
        foreach($pr as $release){
            
            //no import then ignore it
            if(empty($aiByLang[$release->language])){
                echo "No any Local search engine by ({$release->language}) language -- release ({$release->id}) skipping  $this->newline";
                continue;
            }
//            print_r($release);
            foreach($aiByLang[$release->language] as $ai){
                if($this->search($release, $ai)){
                    echo "release ({$release->id}) created $this->newline";
                }
            }
        }
        
        echo "All Done... New Added to Article ({$this->addCount})..  $this->newline";
        
        exit;
        
        // should include this class and run search method
    }
    
    /**
     * 
     * @param object $release
     * @param object $autoImport
     * @return boolean
     * 
     * 
     */
    
    function search($release, $autoImport)
    {
//        return true;
        /*
         * chinese search format must add " and space bar
         * '"適 合 任 何 場 合"'
         */
//        $str = '"適 合 任 何 場 合"';
//        $str = '"Philip"';
        
        $signleWordMode = array('zh_TW', 'zh_HK', 'zh_CN', 'ja');
        
        $str = '"'. $release->headline . '"';
        
        if(in_array($release->language, $signleWordMode)){
//            preg_match_all('/./u', $release->headline, $rrrr);
//            print_r($rrrr);
            preg_match_all('/./u', $release->headline, $words);// split the single word
//            print_r($words[0]);
            
            
            $str = '"';
            $str.= ''.implode(' ', $words[0]).'"';
        }
        
        $storedir = HTML_FlexyFramework::get()->Pman['storedir'];
        $u = parse_url($autoImport->url);
        $loc = 'sqlite3://'.$storedir.'/mnogosearch/db/'.$u['host'].'_'.$autoImport->language.'.sqlite3/';
//        print_r($str);
//        print_r($loc);
//        exit;
        $udm_agent = udm_alloc_agent($loc);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_CHARSET, "utf-8");
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_BROWSER_CHARSET, "utf-8");
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_SEARCH_MODE, UDM_MODE_ALL);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_PHRASE_MODE, UDM_PHRASE_ENABLED);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_PAGE_SIZE, 100);
        
        $res = udm_find($udm_agent, $str);
        $totalMatches = udm_get_res_param($res,UDM_PARAM_FOUND);
        $pageSize = udm_get_res_param($res,UDM_PARAM_NUM_ROWS);
        $firstRow = udm_get_res_param($res,UDM_PARAM_FIRST_DOC);
        $lastRow = udm_get_res_param($res,UDM_PARAM_LAST_DOC);
        
        if($totalMatches < 1){
            echo "Release ({$release->id}) not matches found -- skipping {$str} $this->newline";
            return false;
        }
        
        $ret = array();
        if($totalMatches > 0){
            $row=0;
            echo "Match $totalMatches:  $this->newline";
            for ($i=$firstRow-1;$i<$lastRow;$i++) {
                $row++;
                echo 'Url: ';
                $url = udm_get_res_field($res,$i,UDM_FIELD_URL);
                $ret[$i]['url'] = $url;
                echo "$url  $this->newline";
                
                $ret[$i]['title'] = udm_get_res_field($res, $i,UDM_FIELD_TITLE);
                $ret[$i]['meta'] = udm_get_res_field($res, $i,UDM_FIELD_DESC);
                $ret[$i]['text'] = udm_get_res_field($res, $i,UDM_FIELD_TEXT);
            }
        }
        
//        print_r($ret);
//        return true;
        
        if(!$this->createReader($ret, $release)){
            echo "creating reader error on release ({$release->id})  $this->newline";
            return false;
        }
        
        return true;
    }
    
    function createReader($result, $release)
    {
        
        die("this code will not work");
        foreach($result as $ret){
            $ra = DB_DataObject::factory('reader_article');
            $ra->real_url = $ret['url'];
            $ra->real_url_md5 = md5($ret['url']);

            if($ra->find(true)){
                echo "release ({$release->id}) already existing in reader article. skipping  $this->newline";
                return true;
            }

            $ra->act_when = date('Y-m-d', strtotime('1 HOUR'));// set to now + 1 hour
            $ra->published_dt = date('Y-m-d', strtotime('1 HOUR'));
            $ra->language = $release->language;
            $ra->insert();
            $this->addEvent('PRESSRELEASED', $ra, $release->id);
            $this->addCount++;
            echo "Article ({$ra->id}) created...  $this->newline";
        }
        return true;
    }
}