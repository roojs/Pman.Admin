<?php

/**
 * Description of Baidu
 * 
 * http://www.baidu.com/s?
 * 
 * tn=baiduadv // search method..
 * ie=utf-8 //encoding
 * wd=Sony // Keyword...
 * pn=0 // paging...
 * rn=100 // result count (relate to paging)
 * lm=1
 * 
 * @author chris
 */
 
 
class Pman_PressRelease_Import_Search_Base
{
    //put your code here
    
    function run($feed)
    {
       if (!empty($feed->lastfetch_dt) && strtotime($feed->lastfetch_dt . ' + 12 HOURS' ) > time()) {
            if (HTML_FlexyFramework::get()->cli) {
                return array();
            }
        }
        $this->feed = $feed;
        $ret = $this->parseSearch($feed->params, strtolower($feed->language), strtolower($feed->country));
        $old = clone($feed);
        $feed->lastfetch_dt = $feed->sqlValue('NOW()');
        $feed->update($old);
        
        return $ret;
            
    }
    
    var $redirectHosts = array(
        'ri.search.yahoo.com',  // add more here or add them to the extended class..
    );
    
    
    function headURL($url)
    {
        if (!extension_loaded('http')) {
            die("no http extension");
        }
          // sleep so we do not flood the line..
        $r = false;
        //if (class_exists('HttpRequest')) {
        //    $r = new HttpRequest($url , HttpRequest::METH_GET);
        //} else {
            $hcr = new http\Client\Request("HEAD", $url);
            
        //}
        
        try {
            for ($i= 0; $i< 10; $i++ ) {
               // echo "GET $url\n";
                $uar = parse_url($url);
               // var_dump($uar['host']);
                if (!in_array($uar['host'], $this->redirectHosts)) {
                    return $url;
                }
                
                
                $hc = new http\Client;
                $hc->enqueue($hcr)->send();
                $resp = $hc->getResponse();
                $rc = $resp->getResponseCode();
            
                if ($rc == 200) {
                    break;
                }
                if ($rc == 301 || $rc == 302)  {
                  //   if ($r) {
                  //      $r->setUrl($r->getResponseHeader("Location"));
                  //  } else {
                    $url = $resp->getHeader("Location");
                    $hcr = new http\Client\Request("HEAD",$url );
                  //  }
                    continue;
                }
                
                return false;
            }
            return $url;
        } catch(Exception $e) {
            return "ERROR FETCHING {$url}";
        }
        return true; // should not get here.
    }
    
}
    