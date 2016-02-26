<?php

/*
 * 
 * fr2=time&btf=d - search day
 * 
 * n=100 - max query
 * 
 * p= Sony - keyword
 */

/**
 * Description of Yahoo
 *
 * @author chris
 */

require_once 'Pman/PressRelease/Import/Search/Base.php';
 
class Pman_PressRelease_Import_Search_Yahoo extends Pman_PressRelease_Import_Search_Base
{ 
  
  
    
    
    function parseSearch($keyword, $lang = 'en', $country='')
    {
        // get url.
        // parse dom
        // return an array that looks like the RSS feed..
        
        $l = array();
        $kw = json_decode($keyword);
        foreach($kw as $pp){
            $l[] = '"'.trim($pp).'"';
        }
        
        $param = array(
            'fr2' => 'time', //flag to time
            'ei' => 'UTF-8', // encoding
            'btf' => 'm', // day -- d / w / m / y
            'n' => 100, //no. of results
            'b' => 1, // page being // this number should a (n * b + 1)
            'pstart' => 1, // paging
            'p' => implode(" OR ", $l), // keyword
        );
        
        $url = (!empty($this->url)) ? $this->url : 'http://hk.search.yahoo.com/search?';
        $request = $url.
            http_build_query($param);
            
        
        $context = stream_context_create(array(
            'http' => array(
                'header'  => 'User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1'
            )
        ));
        echo $request ."\n";
        
        $response = file_get_contents($request, 0, $context);
        
//        $response = file_get_contents(dirname(__FILE__).'/yahho.html');// for debug only

//        exit;
        
        
        
        $html = tidy_repair_string(
                $response,
                array(
                  'indent' => TRUE,
                    'output-xhtml' => TRUE,
                    'wrap' => 120
                ),
                'UTF8'
        );
        
        //print_r($html);exit;
        $pageDom = new DomDocument('1.0', 'utf-8');    
        $pageDom->formatOutput = true;
        $searchPage = mb_convert_encoding($html, 'HTML-ENTITIES', "UTF-8");
//        print_r($searchPage);
        @$pageDom->loadHTML($searchPage);
        
        $ret = array();
        $count = 1;
        
        
        // this is the bit that changes....
        
        $xp = new DOMXPath($pageDom);
        //$q = "id('web')/ol/li/div"; 
        $q = "//div[@id='web']/ol/li/div";
        $lists = $xp->query($q);
        
//        print_r($lists->length);
//        print_r(get_class($lists));
//        print_r(mb_convert_encoding($pageDom->saveHTML($lists->item(0)), 'HTML-ENTITIES', "UTF-8"));
//        exit;
//        foreach($r as)
        foreach($lists as $node){
//            $div = $node->getElementsByTagName('div')->item(0);
            $t = array();
            $newDom = new DomDocument('1.0', 'utf-8');
            $newDom->formatOutput = true;
            $searchPage = mb_convert_encoding($pageDom->saveHTML($node), 'HTML-ENTITIES', "UTF-8");
            
            //echo $searchPage;exit;
            
            @$newDom->loadHTML($searchPage);
            
            $xp = new DOMXPath($newDom);
            $q = "//a";
            $tag = $xp->query($q);
             
            if(!$tag->item(0)->hasAttribute('class') || !$tag->item(0)->hasAttribute('href')) {
                continue;
            }
            $url = $tag->item(0)->getAttribute('href');
            
            
            $url = $this->headURL($url);
            if ($url == false) {
                continue;
            }
            
            
            $t['url']  = $url;
            $t['headline'] = preg_replace('/\s+/',' ', $tag->item(0)->textContent);
            
            $count++;
            
            if(empty($t['headline']) || empty($t['url'])){
                continue;
            }
            $t['extid'] = md5($t['url']);
            $t['author'] = '';
            $t['source'] = '';
            
//            print_r($t);
            
            $ret[] = $t;
        }
        //print_r($ret);        exit;
        return $ret;
        
    }
    
}
//
//
//// this is for debug only
//$a = new Pman_Reader_Parse_Yahoo;
//$a->parseSearch('["Asian Festival of Children\u2019s Content Reveals Shortlist for Scholastic Asian Book Award 2014","Unveiling of Programmes for the Festival Held at The National Library of Singapore from  30 May \u2013 4 June 2014"]');
//        
