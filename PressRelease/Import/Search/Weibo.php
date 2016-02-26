<?php

/**
 * Description of Weibo
 *
 * @author chris
 */

require_once 'Pman/PressRelease/Import/Search/Base.php';
 
class Pman_PressRelease_Import_Search_Weibo extends Pman_PressRelease_Import_Search_Base {
  
   
    function getAuth()
    {
        return true;
    }
    
    function parseSearch($keyword, $lang = 'en', $country='')
    {
        //pl_weibo_direct main
        
        $l = array();
        $kw = json_decode($keyword);
        foreach($kw as $pp){
            $l[] = '"'.trim($pp).'"';
        }
        
//        $param = array(
//            'p' => implode(" OR ", $l), // keyword
//            'fr2' => 'time', //flag to time
//            'ei' => 'UTF-8', // encoding
//            'btf' => 'w', // day -- d / w / m / y
//            'n' => 100, //no. of results
//            'b' => 1, // page being // this number should a (n * b + 1)
//            'pstart' => 1, // paging
//            
//        );
        
        //FIXME should use the weibo APIs??
        
        // keyword must a first param http://s.weibo.com/wb/furla&xsort=hot
        // && || weibo is using this to get and or 
        foreach($l as $k){
            $url = 'http://s.weibo.com/wb/'.$k.'&xsort=hot';
//            $request = $url.
//                http_build_query($param);


            $context = stream_context_create(array(
                'http' => array(
                    'header'  => 'User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1'
                )
            ));
//            echo $url ."\n";

            $response = file_get_contents($url, 0, $context);
        
//            $response = file_get_contents(dirname(__FILE__).'/weibo.html');// for debug only

            $pageDom = new DomDocument('1.0', 'utf-8');    
            $pageDom->formatOutput = true;
            $searchPage = mb_convert_encoding($response, 'HTML-ENTITIES', "UTF-8"); 
            @$pageDom->loadHTML($searchPage);

            print_r($response);
            $ret = array();
            $added = 0;
            $xp = new DOMXPath($pageDom);
            $q = "//script";
            $lists = $xp->query($q);

            $html = '';
//            print_r(get_class($lists));
    //        print_r(mb_convert_encoding($pageDom->saveHTML($lists->item(0)), 'HTML-ENTITIES', "UTF-8"));
            foreach($lists as $node){
                if(!preg_match('/\"pid\"\:\"pl_wb_feedlist\"/', $node->nodeValue)){
                    continue;
                }


                $js = substr(str_replace('STK && STK.pageletM && STK.pageletM.view(', '', $node->nodeValue), 0, -1);

                $json = json_decode($js);
                $html = $this->getUTFStr($json->html, 'HTML-ENTITIES', "UTF-8");
    //            print_r(mb_convert_encoding($json->html, 'HTML-ENTITIES', "UTF-8"));


    //            print_r(mb_convert_encoding($html[1], 'HTML-ENTITIES', "UTF-8"));
            }

            $divDom = new DomDocument('1.0', 'utf-8');
            $divDom->formatOutput = true;
            @$divDom->loadHTML($html);

            $xp = new DOMXPath($divDom);
            $c = "feed_lists";
            $q = "//div[contains(concat(' ', normalize-space(@class), ' '), ' $c ')]/dl";
            $lists = $xp->query($q);

//            print_r($this->getUTFStr($divDom->saveHTML($lists->item(0))));
    //        "//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]"
            foreach($lists as $item){
                $t = array();
    //            print_r($item->childNodes->item(1)->nodeValue);

                $newDom = new DomDocument('1.0', 'utf-8');
                $newDom->formatOutput = true;
                $searchPage = $this->getUTFStr($divDom->saveHTML($item));
                @$newDom->loadHTML($searchPage);
    //            
                $xp = new DOMXPath($newDom);
                $q = "//dd[@class='content']/p/a[@node-type='feed_list_item_date']";
                $tag = $xp->query($q);
                $t['url'] = $this->getUTFStr($tag->item(0)->getAttribute('href'));


                $q = "//dd[@class='content']/p[@node-type='feed_list_content']/a";
                $tag = $xp->query($q);
                $t['headline'] = $this->getUTFStr(strip_tags($tag->item(0)->nodeValue));


                $q = "//dd[@class='content']/p[@node-type='feed_list_content']/em";
                $tag = $xp->query($q);
                $t['body'] = $this->getUTFStr(strip_tags($tag->item(0)->nodeValue));


                if(empty($t['headline']) || empty($t['body']) || empty($t['url'])){
                    continue;
                }
                $t['extid'] = md5($t['url']);
                $t['author'] = $t['headline'];
                $t['source'] = '';
//                print_r($t);
                $ret[] = $t;
            }
        }
        
        print_r($ret);
        
        return $ret;
    }
    
    function getUTFStr($s)
    {
        return mb_convert_encoding($s, 'HTML-ENTITIES', "UTF-8"); 
    }
    
}

//$a = new Pman_Reader_Parse_Weibo;
//$a->parseSearch('["嘉民与顺丰快递在天津北辰区的新发展项目签署第二份租约"]');
