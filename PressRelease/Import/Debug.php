<?php

/**
 * Description of Debug
 *
 * @author chris
 */
require_once 'Pman.php';
class Pman_PressRelease_Import_Debug extends Pman {
    //put your code here
    
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
    
    function get()
    {
        if(!empty($_REQUEST['tt'])){
            $pai = DB_DataObject::factory('pressrelease_auto_import');
//            $ppppp = parse_url('http://www.businesses.com.au/business-updates/mediaoutreachcom ');
//            print_r($ppppp);exit;
            foreach($pai->fetchAll() as $ai){

                $pu = parse_url(trim($ai->url));
                print_r($ai);
                print_r($pu);
                
                $dom = preg_replace('/^www\./', '' ,$pu['host']);
                print_r("============== new line ========================");
                
//                if($arg['media_name'] == $dom){
//                    $isSeed = true;
//                    break;
//                }
            }
            exit;
        }
        
        
        switch($_REQUEST['action']){
            case '_download':
                $this->downloadArticle();
                break;
            case '_rebuild':
                $this->rebuildArticle();
                break;
            case '_diff':
                $this->diffArticle();
                break;
            case '_linkcheck':
                $this->linkCheck();
                break;
        }
        
    }
    
    function rebuildArticle()
    {
        $reader = DB_DataObject::factory('reader_article');
        if(!$reader->get($_REQUEST['reader_id'])){
            $this->jerr('wrong press release id.');
        }
        
        $reader->debug_on = true;
//        $strs = file_get_contents('/home/press/rss/2014/05/05/60449.unsafe.html');
//        var_dump($strs);
//        var_dump(mb_detect_encoding($strs));
//        exit;
        header("Content-type: text/html");
        $reader->download($this);
        
        echo "rebuilt";
        
        
        exit;
//        $this->downloadArticle();
        
    }
    
    function diffArticle()
    {
        $pr = DB_DataObject::Factory('Projects');
        if (!$pr->get($_REQUEST['project_id'])) {
            $this->jerr("could not get project");
        }
        
        
        $release = DB_DataObject::factory('pressrelease_entry');
        if(!$release->get($pr->pressrelease_id)){
            $this->jerr('wrong press release id.');
        }
        
        $reader = DB_DataObject::factory('reader_article');
        if(!$reader->get($_REQUEST['reader_id'])){
            $this->jerr('wrong reader article id.');
        }
        if ($reader->language != $release->language) {
            $pid= $release->id;
            $release = DB_DataObject::factory('pressrelease_entry');
            $release->parent_id = $pid;
            $release->language = $reader->language;
            if (!$release->find(true)) {
                $this->jerr("could not find release that matches with language ". $reader->language);
            }
        }
        //var_dump($_REQUEST['_debug']);
        //print_r(array($reader,$release));
        if (!empty($_REQUEST['_debug'])) {
            
            $release->debug_on = 1;
            
            
            
        }
        $percent = $release->diffWords($reader, $release);
        
        $this->jok($percent);
    }
    
    function linkCheck()
    {
        $pr = DB_DataObject::Factory('Projects');
        if (!$pr->get($_REQUEST['project_id'])) {
            $this->jerr("could not get project");
        }
        
        
        $release = DB_DataObject::factory('pressrelease_entry');
        if(!$release->get($pr->pressrelease_id)){
            $this->jerr('wrong press release id.');
        }
        
        $reader = DB_DataObject::factory('reader_article');
        if(!$reader->get($_REQUEST['reader_id'])){
            $this->jerr('wrong reader article id.');
        }
        if ($reader->language != $release->language) {
            $pid= $release->id;
            $release = DB_DataObject::factory('pressrelease_entry');
            $release->parent_id = $pid;
            $release->language = $reader->language;
            if (!$release->find(true)) {
                $this->jerr("could not find release that matches with language ". $reader->language);
            }
        }
        
        
        $data = file_get_contents( $reader->toFilenameUnsafe() );
        
        libxml_use_internal_errors (true);
        $doc = new DOMDocument();
        $doc->loadHTML($data);
//        $doc->loadHTML($data);
        $xpath = new DOMXpath($doc);
        $links = array();
        
        $ar = parse_url($reader->real_url);
        $host  = $ar['host'];
        
          require_once 'HTML/WordDiff.php';
         
        $wd = new HTML_WordDiff(array(
            'lang' => $reader->language,
            'string' =>  '<div>' . $release->headline .'</div>'
        ));
        // echo '<PRE>'; print_r($wd);
        $skip = array();
        
        foreach ($xpath->query('//a[@href]') as $a) {
            
            $contents = $a->ownerDocument->saveHTML($a);
            
            //var_dump($a->getAttribute('href'));
            $url = $reader->relPath($reader->real_url , $a->getAttribute('href'));
            
            $ar = parse_url($url);
            if (!in_array(strtolower($ar['scheme']), array('http','https'))) {
                continue;
            }
            
            
            if ($ar['host'] != $host) {
                continue;
            }
            if (strlen($contents) < 10) {
                continue;
            }
            // check contents against release headline..
            
            $score = $wd->compare(array('string'=>$contents));
            
            if ($score < 20) {
                $skip[$url] =  "$score : $contents";
                continue;
            }
            //echo '<PRE>';print_R($wd);
            
            
            $links[$url ] = "$score : $contents";
        }
        
        //echo '<PRE>'.htmlspecialchars(print_R(array('links' => $links,'skip'=>$skip),true)).'</PRE>';exit;
         
        $this->jok('<PRE>'.htmlspecialchars(print_R(array('links' => $links,'skip'=>$skip),true)).'</PRE>');
    }
    
    
    
    
    function downloadArticle()
    {
        $reader = DB_DataObject::factory('reader_article');
        if(!$reader->get($_REQUEST['reader_id'])){
            $this->jerr('wrong reader article id.');
        }
        
        require_once 'File/Convert.php';
        $fc = new File_Convert($reader->toFilenameUnsafe(), 'text/html');
        $fc->convert('text/html');
        $fc->serve();
        exit;
    }
}
