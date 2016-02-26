<?php

/**
 * Description of LocalFetch
 *
 * @author chris
 */
require_once 'Pman/PressRelease/Import/LocalSearch/Init.php';

class Pman_PressRelease_Import_LocalSearch_Fetch extends Pman_PressRelease_Import_LocalSearch_Init
{
    //put your code here
    
    var $cli  = false;
    
    static $cli_desc = "Local Search Engine -- Fetch  requires search id as argument";
    
    static $cli_opts = array(
         
    );
    var $addCount = 0;
    
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
        $this->sessionState(0);
        if(!$this->cli){
            header("Content-type: text/plain");
        }
        
        $autoImport = DB_DataObject::factory('pressrelease_auto_import');
        
        if(!$autoImport->get($id)){
            echo "The auto import ID is wrong. \n";
            exit;
        }
        $this->autoImport = $autoImport;
//        $this->search(';;;;');exit;
        require_once 'System.php';
        
        $this->createConfig();
        
        if ($this->is_updated) {
            $this->resetDatabase();
        }
        
        $this->cacheIndex();// for test only
//        exit;
        $this->searchForArticles();
        
        
        exit;
        // should include this class and run checkindex method
    }
    
    function createConfig()
    {
        // generate the config file data.
        // if config has changed or did not exist before.. return true
        // if no change return false
        if(!$this->initSetting()){
            echo "Init Setting error.. \n";
            exit;
        }
        
        if(!$this->buildConfiguration()){
            exit;
        }
        
        
        
    }
    function resetDatabase()
    {
        $indexer = System::which('/usr/sbin/indexer');
        
        if (empty($indexer)) {
            echo "The indexer not found, please install it. \n";
            return false;
        }
        
        $storedir = HTML_FlexyFramework::get()->Pman['storedir'];
        $u = parse_url($this->autoImport->local_search_url);
        $conf = $storedir.'/mnogosearch/conf/'.$this->autoImport->id.'_'.$this->autoImport->language.'.conf';
        
        if(!file_exists($conf)){
            echo "Config file not existing...  \n Please enable local Search and run Init  \n";
            return false;
        }
        
        $cmd = "$indexer -Cw ". escapeshellarg($conf);
        echo "Database $conf reset ... \n";
//        $ret = `$cmd`;
        if($this->cli){ 
            $ret = `$cmd`;
        }else{
            passthru($cmd);
        }
        
    }
    
    
    function searchForArticles()
    {
        
        // loop through recent press releaese in the same language as this
        
        $press = DB_DataObject::factory('pressrelease_entry');
        $press->whereAdd("publish_dt > (NOW() - INTERVAL {$this->limitDay} DAY) AND publish_dt < NOW()");
        $pr = $press->fetchAll();
        
        if(empty($pr)){
            echo "No any new release. \n";
            exit;
        }
        
        foreach($pr as $release){
            
            //no import then ignore it
            if($this->autoImport->language != $release->language){
                
                $r_lang = ($release->language == 'zh_HK' || $release->language == 'zh_TW' ) ? 'tc' : false;
                $ai_lang = ($this->autoImport->language == 'zh_HK' || $this->autoImport->language == 'zh_TW' ) ? 'tc' : false;
                
                if(!$r_lang || !$ai_lang){
                    echo "No any Local search engine by ({$release->language}) language -- release ({$release->id}) skipping \n";
                    continue;
                }
            }
            
            if($this->search($release)){
                echo "release ({$release->id}) created -- {$release->headline}  \n";
            }
            
        }
        
        echo "All Done... New Added to Article ({$this->addCount}).. \n";
        
        exit;
        
        // if we find one
//           $this->addReaderArticle($pressrelease, $data);
        
        
    }
    
    function search($release)
    {
//        $release = DB_DataObject::factory('pressrelease_entry');
//        $release->get(892);
//        return true;
        /*
         * chinese search format must add " and space bar
         * '"適 合 任 何 場 合"'
         */
//        $str = '"適 合 任 何 場 合"';
//        $str = '"Philip"';
        
        $signleWordMode = array('tc', 'zh_TW', 'zh_HK', 'zh_CN', 'ja');
        require_once 'HTML/WordDiff.php';
               
        $str = '"'. $release->headline . '"';
        
        if(in_array($release->language, $signleWordMode)){
//            preg_match_all('/./u', $release->headline, $words);
            
            $ddd = new HTML_WordDiff;
            
            $str = preg_replace_callback('/'.$ddd->cjkpreg().'/u', array($this, 'addUTF8Word')  , $release->headline);
            
//            print_r($str);
//            preg_match_all('/./u', $testStr, $words);// split the single word
//            print_r($words[0]);
//            雅特生科技的全新ATCA系統管理軟件可讓廠商輕易整合複雜的系統，將開發時間縮短達40%
//            $str = "雅|特|生|科|技|的|全|新|ATCA|系|統|管|理|軟|體|可|讓|廠|商|輕|易|整|合|複|雜|的|系|統|，|將|開|發|時|間|縮|短|達|40%";
//            $str = '"';
//            $str.= ''.implode(' ', $words[0]).'"';
        }
        
        $storedir = HTML_FlexyFramework::get()->Pman['storedir'];
        $u = parse_url($this->autoImport->url);
        $loc = 'sqlite3://'.$storedir.'/mnogosearch/db/'.$this->autoImport->id.'_'.$this->autoImport->language.'.sqlite3/';
//        print_r($str);
//        print_r($loc);
//        exit;
        $udm_agent = udm_alloc_agent($loc);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_CHARSET, "utf-8");
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_BROWSER_CHARSET, "utf-8");
//        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_SEARCH_MODE, UDM_MODE_ANY);
//        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_PHRASE_MODE, UDM_PHRASE_DISABLED);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_PAGE_SIZE, 100);
        
        echo "Searching... $str \n";
        $res = udm_find($udm_agent, $str);
        
        $totalMatches = udm_get_res_param($res,UDM_PARAM_FOUND);
        $pageSize = udm_get_res_param($res,UDM_PARAM_NUM_ROWS);
        $firstRow = udm_get_res_param($res,UDM_PARAM_FIRST_DOC);
        $lastRow = udm_get_res_param($res,UDM_PARAM_LAST_DOC);
        
//        udm_get_res_field(UDM_FIELD_TEXT)
        
        if($totalMatches < 1){
            echo "Not Match with space, trying with |.... \n";
            $str = preg_replace('/\s+/', '|', trim($str));
            
            $res = udm_find($udm_agent, $str);
            $totalMatches = udm_get_res_param($res,UDM_PARAM_FOUND);
            $pageSize = udm_get_res_param($res,UDM_PARAM_NUM_ROWS);
            $firstRow = udm_get_res_param($res,UDM_PARAM_FIRST_DOC);
            $lastRow = udm_get_res_param($res,UDM_PARAM_LAST_DOC);
            
            if($totalMatches < 1){
                echo "Release ({$release->id}) not matches found -- skipping {$str} \n";
                return false;
            }
        }
        
        
        
        
        
        $ret = array();
        if($totalMatches > 0){
            $row=0;
            echo "Match $totalMatches:  \n";
            for ($i=$firstRow-1;$i<$lastRow;$i++) {
                $row++;
                
                $url = udm_get_res_field($res,$i,UDM_FIELD_URL);
                $ret[$i]['url'] = $url;
                echo "Url: $url  \n";
                
                $ret[$i]['title'] = udm_get_res_field($res, $i,UDM_FIELD_TITLE);
                $ret[$i]['meta'] = udm_get_res_field($res, $i,UDM_FIELD_DESC);
                $ret[$i]['text'] = udm_get_res_field($res, $i,UDM_FIELD_TEXT);
                
                $uid = udm_get_res_field($res, $i, UDM_FIELD_URLID);
                $handle = new SQLite3($storedir.'/mnogosearch/db/'.$this->autoImport->id.'_'.$this->autoImport->language.'.sqlite3'); 
                $results = $handle->query('select * from urlinfo where url_id = '.$uid);
        
                $tmp = '';
                while ($row = $results->fetchArray()) {
                    if($row['sname'] != 'CachedCopy'){
                        continue;
                    }

                    if(!empty($row['sval'])){
                        $tmp = $row['sval'];
                    }

                }
                // if the page is the 'start' page - then ignore it...
                if ($this->autoImport->local_search_url == $url) {
                    unset($ret[$i]);
                    echo "ignore !!! matches the base for that search\n\n";
                    continue;
                    
                }
                
                
                //if this does not work 
                //please change php.ini 
                //zlib.output_com pression = On
                
                $a = gzuncompress(base64_decode($tmp));
                
                if (empty($a)) {
                    
                    $fn = "/tmp/search-engine-cache-" . md5($url) . 'gz';
                    echo "Stored data failed. - using url and cache $fn\n";
                    
                    if (file_exists($fn)) {
                        $a =  gzuncompress(file_get_contents($fn));
                    } else {
                        $a = file_get_contents($url);
                        file_put_contents($fn,gzcompress($a));
                    }
                    
                }
                
                $init = array(
                    'lang' => $release->language,
                    'string' => implode('<br/>',array(

                                $release->content,
//                                $release->content_data,
//                                $release->headline,
//                                $release->subheadline,
//                                $release->content_about,
//                                $release->content_forward
                        ))
                );
//                print_r($a);
//                print_r($release->content);exit;
                $wd = new HTML_WordDiff($init);
                $percent = $wd->compare(array('string' => $a));
                
                if($percent < 35){
                    unset($ret[$i]);
                    echo "ignore !!! $percent% \n\n";
                    continue;
                }
                echo "Add $url \n";
//                echo "ended compare!!! $percent \n\n";
            }
        }
        
//        print_r($ret);
//        return true;
        
        if(!$this->addReaderArticle($ret, $release)){
            echo "creating reader error on release ({$release->id}) \n";
            return false;
        }
        
        return true;
    }
    
//    var $tmpWords = false;
    function addUTF8Word($s) {
//        $this->tmpWords[] = $s[0];
        return ' '.$s[0].' ';
    }
    
    function addReaderArticle($result, $pressrelease)
    {
        // check to see if we have an article already - if so skip.
        $prid = $pressrelease->parent_id > 0 ? $pressrelease->parent_id : $pressrelease->id;
        if ($pressrelease->same_as_id > 0) {
            $prid  = $pressrelease->same_as_id ;
        }
        
        $c = DB_DataObject::Factory('Projects');
        $c->get('pressrelease_id', $prid);
        
        
        // create an article (not fetched..)
        foreach($result as $ret){
            $ra = DB_DataObject::factory('reader_article');
            $ra->url_md5 = md5($ret['url']);
            $ra->url = $ret['url'];
            $ra->language = $pressrelease->language;;
            $ra->campaign_id = $c->id;
            
            // src_id can be 0 or filled, as we do not care... if it was found here or by google etc..
            if($ra->count()){
                continue;
            }
            $ra->headline = $pressrelease->headline;
            $ra->act_when = date('Y-m-d', strtotime($pressrelease->publish_dt. '+1 HOUR'));// set to now + 1 hour
            $ra->published_dt = date('Y-m-d', strtotime($pressrelease->publish_dt. '+1 HOUR'));
            $ra->language = $pressrelease->language;
            
            $ra->src_id = 0; // flag for auto search..
            $ra->insert();
            
            //$this->addEvent('PRESSRELEASED', $ra, $pressrelease->id);
            //$this->addCount++;
            echo "Article ({$ra->id}) created... {$ra->url} \n";
        }
        return true;
        
    }
    
    
    function cacheIndex()
    {
        
        $indexer = System::which('/usr/sbin/indexer');
        
        if (empty($indexer)) {
            echo "The indexer not found, please install it. \n";
            return false;
        }
        
        $storedir = HTML_FlexyFramework::get()->Pman['storedir'];
        $u = parse_url($this->autoImport->local_search_url);
        $conf = $storedir.'/mnogosearch/conf/'.$this->autoImport->id.'_'.$this->autoImport->language.'.conf';
        
        if(!file_exists($conf)){
            echo "Config file not existing...  \n Please enable local Search and run Init  \n";
            return false;
        }
//        $conf = 
        
        /**
         * indexer -Ecreate // create the sqlite3 table
         * 
         * indexer -m // get the site
         * 
         * indexer --index  // cache and insert to db
         * 
         */
        $timeout = System::which('timeout');
        $isWeb = "$timeout 10m "; // the outer one will finish in 30mins...
        if(!$this->cli){ 
            $isWeb = "$timeout 2m ";
        }
        
        $args = "-am";
        
        if($this->is_updated){
            $args = "-am";
        }
        
        $clear_cmd = "$indexer -Cw ". escapeshellarg($conf) . " 2>&1";
        echo "clearing $clear_cmd ...\n";
        `$clear_cmd`;
        
        $cmd = "$isWeb $indexer $args ". escapeshellarg($conf) . " 2>&1";
        echo "indexing $cmd ...\n";
        if($this->cli){ 
            $ret = `$cmd`;
        }else{
            passthru($cmd);
        }
//        print_r($ret);
        
        echo "indexed ...... \n";
        
        $cmd = "$isWeb $indexer --index $conf 2>&1";
        
        // if in web.. do pasthru($cmd);
        if($this->cli){ 
            $ret = `$cmd`;
        }else{
            passthru($cmd);
        }
        
        echo "Fetch Done..  \n";
//        'indexer --index'
//        print_r($ret);
        return true;
    }
}