<?php

/*
 * 
 *  &tbs=qdr:s - results of the previous second
 *  &tbs=qdr:n - results of the previous minute
 *  &tbs=qdr:h - results of the previous hour
 *  &tbs=qdr:d - results of the previous day
 *  &tbs=qdr:w -results of the previous week
 *  &tbs=qdr:m - results of the previous month
 *  &tbs=qdr:y - results of the previous year
 * 
 * &count=50  -- MAX are 50
 * first=51  -- one page 50, so the second page should a 51
 * 
 * 
 */

/**
 * Description of Bing
 *
 * @author chris
 */
require_once 'Pman/PressRelease/Import/Search/Base.php';
 
class Pman_PressRelease_Import_Search_Bing extends Pman_PressRelease_Import_Search_Base {
  
  
//    function getAuth()
//    {
//        return true;
//    }
    
    var $xpath = array(
        array(
            'main' => "//div[@id='results']/ul/li",
            'head' => "//div/div/div[@class='sb_tlst']/h3/a",
            'body' => "//div/div/p"
        ),
        array(
            'main' => "//div[@id='b_content']/ol/li",
            'head' => "//h2/a",
            'body' => "//div/p"
        )
    );
    
    var $ret = array();
    //put your code here
    function parseSearch($keyword, $lang = 'en', $country='')
    {
        
        $l = array();
        $kw = json_decode($keyword);
        foreach($kw as $pp){
            $l[] = trim($pp);
        }
        
        foreach($l as $ll){
            $page = 1;
            while($page < 100){
            
                $param = array(
                    'tbs' => urlencode('qdr:d'), //date
                    'count' => 50, //no. of results
                    'first' => $page, // paging
    //                'FORM' => 'PERE', // ??
                    'q' => urlencode($ll), // keyword
                );
    //            print_r(http_build_query($param));
                $WebSearchURL = 'http://www.bing.com/search?'.
                    http_build_query($param);
    //            $WebSearchURL = 'http://www.bing.com/search?'.
    //                    implode("&", $param);
                $context = stream_context_create(array(
                    'http' => array(
                        'header'  => 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.63 Safari/537.31'
                    )
                ));

    //        $request = $WebSearchURL;
                echo $WebSearchURL . "\n";
                $response = file_get_contents($WebSearchURL, 0, $context);
                echo "Response : " . strlen($response) . "bytes \n";
    //          file_put_contents('/tmp/bing.html', $response);
    //          $response = file_get_contents('Pman/Reader/Parse/bing.html');

    //          $nn = $this->getTextFromHTML($response);
    //          print_r($nn);
    //          exit;
                foreach($this->xpath as $xp){
                    if($this->getResult($response, $xp) > 0){
                        break;
                    }
                }
                $page += 50;
            }
        }
//        print_r(count($this->ret));
        return $this->ret;
    }
    
    function getResult($response, $xpath)
    {   
        $pageDom = new DomDocument('1.0', 'utf-8');    
        $pageDom->preserveWhiteSpace = false;

        $searchPage = mb_convert_encoding($response, 'HTML-ENTITIES', "UTF-8"); 
        @$pageDom->loadHTML($searchPage);
        //$pageDom->loadHTML($response);

        $pageDom->formatOutput = true;

        $added = 0;
        $xp = new DOMXPath($pageDom);

        $lists = $xp->query($xpath['main']);
        
//        print_r(mb_convert_encoding($pageDom->saveHTML($lists->item(0)), 'HTML-ENTITIES', "UTF-8"));
        
        foreach($lists as $node){
//            $div = $node->getElementsByTagName('div')->item(0);

            echo "got article\n";


            $t = array();
            $newDom = new DomDocument('1.0', 'utf-8');
            $newDom->formatOutput = true;
            $searchPage = mb_convert_encoding($pageDom->saveHTML($node), 'HTML-ENTITIES', "UTF-8"); 
            @$newDom->loadHTML($searchPage);

            $xp = new DOMXPath($newDom);

            $q = $xpath['head'];
            $hl = $xp->query($q);

            if(!$hl->item(0)){
                continue;
            }

            $t['url'] = $hl->item(0)->getAttribute('href');
            $t['headline'] = strip_tags($hl->item(0)->nodeValue);


            $q = $xpath['body'];
            $body = $xp->query($q);

            $t['body'] = $body->item(0)->nodeValue;

            if(empty($t['headline']) || empty($t['body']) || empty($t['url'])){
                continue;
            }
            $t['extid'] = md5($t['url']);
            $t['author'] = '';
            $t['source'] = '';
            
            $this->ret[] = $t;
            $added++;

        }
//        print_r($ret);
        return $added;
    }
    
}
//
//$a = new Pman_Reader_Parse_Bing;
//$a->parseSearch('["Real Madrid Star Cristiano Ronaldo to Kick off the World Cup in Hong Kong"]');