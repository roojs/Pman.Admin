<?php

/**
 * Description of Yam
 *
 * @author chris
 */
require_once 'Pman/PressRelease/Import/Search/Base.php';
 
class Pman_PressRelease_Import_Search_Yam extends Pman_PressRelease_Import_Search_Base
{
    //put your code here
    
    function parseSearch($keyword, $lang = 'en', $country='')
    {
        // get url.
        // parse dom
        // return an array that looks like the RSS feed..
        $l = array();
        $kw = json_decode($keyword);
        
        usort($kw,function ($a,$b){
            return strlen($a)-strlen($b);
        });
        //print_R($kw);exit;
//        $l = array();
        foreach($kw as $pp){
            $l[] = '"'.trim($pp).'"';
            if (strlen(implode('  ', $l)) > 50) {
                break;
            }
        }

//        print_r('(' . implode(" | ", $l).' )');
        
        
        $param = array(
            'tn' => 'baiduadv', //use the baidu advance search method
            'ie' => 'UTF-8', // encoding
            'lm' => 1, // search times... day=1, week=7, month=30, year=360, all = 0
            'rn' => 100, //no. of results
            'pn' => 0, // paging / this number should relate to number of results... (page * rn) the first page are 0
            'wd' => '(' . implode(" | ", $l).' )', // keywords // encode ("Xperia" | "me" | "Sony PlayStation")
        );
        
        $WebSearchURL = 'http://www.baidu.com/s?'.
            http_build_query($param);
        
        print_r($WebSearchURL);
        
        $context = stream_context_create(array(
            'http' => array(
                'header'  => ''
            )
        ));

        print_r($WebSearchURL);
        $response = file_get_contents($WebSearchURL, 0, $context);
        
//        $response = file_get_contents('Pman/Reader/Parse/baidu.html');
        
//        print_r($response);
        
        $pageDom = new DomDocument('1.0', 'utf-8');    
        $pageDom->formatOutput = true;
        $searchPage = mb_convert_encoding($response, 'HTML-ENTITIES', "UTF-8"); 
        @$pageDom->loadHTML($searchPage);
        
        
        $ret = array();
        $added = 0;
        $xp = new DOMXPath($pageDom);
        $q = "//div[@id='container']/div[@id='content_left']/div";
//        $q = "//body";
        $lists = $xp->query($q);
        
        
//        print_r(get_class($lists));
//        print_r($pageDom->getElementById('content_left')->tagName);
//        print_r(mb_convert_encoding($pageDom->saveHTML($lists->item(0)), 'HTML-ENTITIES', "UTF-8"));
//        exit;
//        foreach($r as)
        foreach($lists as $node){
//            $div = $node->getElementsByTagName('div')->item(0);
            $t = array();
            $newDom = new DomDocument('1.0', 'utf-8');
            $newDom->formatOutput = true;
            $searchPage = mb_convert_encoding($pageDom->saveHTML($node), 'HTML-ENTITIES', "UTF-8"); 
            @$newDom->loadHTML($searchPage);
            
            $xp = new DOMXPath($newDom);
            $q = "//div";
            $tag = $xp->query($q);
//            print_r(mb_convert_encoding($newDom->saveHTML($tag->item(0)), 'HTML-ENTITIES', "UTF-8"));
//            print_r($tag->item(0)->getAttribute('tpl'));
//            exit;
//            continue;
            
            //skip all is not a normal search result. etc. baidu zhidao....
            if($tag->item(0)->getAttribute('tpl') != 'se_com_default'){// skip
                
                continue;
            }
            
            $q = "//div/h3/a";
            $hl = $xp->query($q); 

            // at this point the url is baidu.. we need to fetch the redirect location to find out the real url..
            
//            $heads = get_headers($hl->item(0)->getAttribute('href'),1);
//            print_r(strip_tags($hl->item(0)->nodeValue));
//            exit;
//            if (empty($heads['Location'])) {
//                continue;
//            }
            // why 2 heads?
            $t['url'] = $hl->item(0)->getAttribute('href');
            
            $t['headline'] = strip_tags($hl->item(0)->nodeValue);

            
            $q = "//div/div[@class='c-abstract']";
            $body = $xp->query($q);
            
            if(empty($body->item(0)->nodeValue)){
                $q = "//div/div[@class='c-span18 c-span-last']/div[@class='c-abstract']";
                $body = $xp->query($q);
            }
            
            // skip the unsafe content??? WTF search engine....
            $t['body'] = (empty($body->item(0)->nodeValue)) ? '' : $body->item(0)->nodeValue; 
            
            if(empty($t['headline']) || empty($t['body']) || empty($t['url'])){
                continue;
            }
            $t['extid'] = md5($t['url']);
            $t['author'] = '';
            $t['source'] = '';
            $ret[] = $t;
            
        }
        
        print_r($ret);
        return $ret;
        
        
        
        
    }
}
