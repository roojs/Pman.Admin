<?php
/**
 * Table Definition for pressrelease_entry
 */
require_once 'DB/DataObject.php';

class Pman_PressRelease_DataObjects_Pressrelease_entry extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'pressrelease_entry';    // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $client_id;                       // int(11)  not_null multiple_key
    public $language;                        // string(5)  not_null
    public $publish_dt;                      // datetime(19)  not_null binary
    public $publish_dt_tz;                   // real(6)  not_null
    public $headline;                        // string(254)  not_null
    public $content;                         // blob(4294967295)  not_null blob
    public $content_data;                    // blob(4294967295)  not_null blob
    public $content_links;                   // blob(4294967295)  not_null blob
    public $updated;                         // datetime(19)  not_null binary
    public $created;                         // datetime(19)  not_null binary
    public $created_by;                      // int(11)  not_null
    public $updated_by;                      // int(11)  not_null
    public $owner_id;                        // int(11)  not_null
    public $publish_status;                  // int(11)  not_null
    public $subheadline;                     // string(254)  not_null
    public $stockcode;                       // string(64)  not_null
    public $contact1_id;                     // int(11)  not_null
    public $contact2_id;                     // int(11)  not_null
    public $contact3_id;                     // int(11)  not_null
    public $content_about;                   // blob(4294967295)  not_null blob
    public $content_forward;                 // blob(4294967295)  not_null blob
    public $company_name_alt;                // string(254)  not_null
    public $country;                         // string(4)  not_null
    public $industry;                        // string(254)  not_null
    public $contact1_displaytype;            // int(4)  not_null
    public $contact2_displaytype;            // int(4)  not_null
    public $contact3_displaytype;            // int(4)  not_null
    public $contact_txt;                     // blob(65535)  not_null blob
    public $publish_sum;                     // string(64)  not_null
    public $published;                       // datetime(19)  not_null binary
    public $distribution_contacts;           // blob(4294967295)  not_null blob
    public $distribution_config;             // blob(65535)  not_null blob
    public $parent_id;                       // int(11)  not_null
    public $distribution_countries;          // blob(65535)  not_null blob
    public $industry_name;                   // string(128)  not_null
    public $best_contact_days;               // string(8)  not_null
    public $stock_exchange_id;               // int(11)  not_null
    public $source_name;                     // string(254)  not_null
    public $email;                          // string(254)  not_null
    public $email2;                          // string(254)  not_null
    public $email3;                          // string(254)  not_null
    public $word_count;                      // int(11)  not_null
    public $blacklist_ids;              // list of contact id's that are blacklisted for this release.
    public $revisions;


    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
   
     
    function applyFilters($q, $au,$roo)
    {
        if (!empty($q['query']['collapse_translation'])) {
            $this->whereAdd('pressrelease_entry.parent_id = 0');
            
        }
        if (!empty($q['query']['with_distr_summary'])) {
               $this->selectAddDistSummary(); 
            
        }
        if (!empty($q['_build_feed'])) {
            
            $p = DB_DataObject::Factory('Projects');
            $p->get((int)$q['_build_feed']);
            
            // delete exiting keywords..
            $key = DB_DataObject::factory('clipping_keywords');
            $key->project_id = $p->id;
            foreach($key->fetchAll() as $kk) {
                $kk->delete();
            }
            
            $this->get($p->pressrelease_id);
            
            $this->buildFeeds();
            $roo->jok("done");
            
        }
        $this->selectAdd("
            (SELECT
                id
            FROM
                Projects
            WHERE
                Projects.pressrelease_id = pressrelease_entry.id
            ) AS project_id
        ");
       
       
    }
    function children()
    {
        $x= DB_DataObject::Factory('pressrelease_entry');
        $x->parent_id = $this->id;
        return $x->fetchAll();
        
        
    }
    
    
    function content_data() // financial data.
    {
        // this used to be plain text formated, now it's rich text.
        return  $this->content_data;
    }
    /**
     * content_Data_emtpy:
     *
     * Used to check on emails if the financial data is empty..
     */
    function content_data_empty()
    {
        $d = trim(strip_tags($this->content_data));
        return strlen($d) ? 0 : 1;
    }
    
    function content_links()
    {
        
        $match = array();
        if (!preg_match_all('#^(.*)(http\S+)(.*)$#im', $this->content_links, $match)) {
            return '';
        }
        //echo '<PRE>';print_r($match);echo '</PRE>';
        $ret  = array();
        foreach($match[0] as $k=>$v)
        {
            $vv = strlen(trim($match[1][$k])) ? trim($match[1][$k]) : '';
            $vv = strlen(trim($match[3][$k])) ? trim($match[3][$k]) : $vv;
            $vv = strlen($vv) ? $vv : $v;
            
            $ret[] = '<a href="'. $match[2][$k]  .'">'. $vv . '</a>';
        }
            
        //
        return implode (' <br/>', $ret);
    
    }
    
    function content()
    {
        // swaps <div class="youtube" with <iframe...
        return preg_replace('/<div\s+class="youtube"([^<]+)<\/div>/','<iframe\1</iframe>', $this->content);
        
    }
    
    function contentShortPreview($len_want = 160){
        $string = strip_tags($this->content());
        $len_act = mb_strlen($this->content, 'utf-8');
         
        if($len_act > $len_want){
            return  $this->maxChars($string, $len_want) ;
        }
        return $string;
    }

    function maxChars($string, $length = 80, $etc = '...', $charset='UTF-8',
                                  $break_words = false, $middle = false) {
        
          if ($length == 0) {
            return '';
        }
        if (mb_strlen($string) <= $length) {
            return $string;
        }
           $length -= min($length, mb_strlen($etc));
        if (!$break_words && !$middle) {
            $string = preg_replace('/\s+?(\S+)?$/u', '', mb_substr($string, 0, $length+1, $charset));
        }
        if(!$middle) {
            return mb_substr($string, 0, $length, $charset) . $etc;
        } 
        return mb_substr($string, 0, $length/2, $charset) . $etc . mb_substr($string, -$length/2, (mb_strlen($string)-$length/2), $charset);
        
        
    }
    
    function content_about()
    {
        // return a richer version of the text..
        $data = htmlspecialchars($this->content_about);
        
        $data = nl2br( $data);
        $data=preg_replace("/(http:\/\/|www|[a-zA-Z0-9-]+\.|[a-zA-Z0-9\.-]+@)(([a-zA-Z0-9-][a-zA-Z0-9-]+\.)+[a-zA-Z0-9-\.\/\_\?\%\#\&\=\;\~\!\(\)]+)/",
                    "<a  href=\"http://\\1\\2\">\\1\\2</a>",$data);
                // aboive regex adds http twice..
        $data=preg_replace("/http:\/\/http:\/\//", "http://",$data);

        return $data;
        
        
    }
    
    
    function publish_dt($format)
    {
        return date($format, strtotime($this->publish_dt));
    }
    /**
     * use: release.language(authUser)
     */
    function language($to=false)
    {
        if ($to === false) {
            $to = $this->language;
        }
        return DB_DataObject::factory('i18n')->translate($to,'l',$this->language);
        
        //require_once 'Pman/Core/I18n.php';
        //$l = new Pman_Core_i18n;
        //return $l->translate($to, 'l', $this->language); 

    }
    
    function client()
    {
        $c = DB_DataObject::factory('Companies');
        $c->get($this->client_id);
        return $c;
    }
    
    function selectAddDistSummary()
    {
        //DB_DataObjecT::debugLevel(1);
         $this->selectAdd(" 
                    (SELECT count(pressrelease_notify.id) FROM   pressrelease_notify
                         WHERE
                            pressrelease_notify.onid = pressrelease_entry.id
                            AND
                            pressrelease_notify.ontable = 'pressrelease_entry'
                            AND
                            pressrelease_notify.evtype = 'MAIL'
                    ) AS dist_summary_all,
                    
                     (SELECT count(pressrelease_notify.id) FROM   pressrelease_notify
                         WHERE
                            pressrelease_notify.onid = pressrelease_entry.id
                            AND
                            pressrelease_notify.ontable = 'pressrelease_entry'
                            AND
                            pressrelease_notify.sent < NOW()
                            AND
                            pressrelease_notify.event_id > 0
                            AND
                            pressrelease_notify.evtype = 'MAIL'
                    ) AS dist_summary_complete,
                    
                     (SELECT count(pressrelease_notify.id) FROM   pressrelease_notify
                         WHERE
                            pressrelease_notify.onid = pressrelease_entry.id
                            AND
                            pressrelease_notify.ontable = 'pressrelease_entry'
                            AND
                            pressrelease_notify.event_id > 0
                            AND
                            pressrelease_notify.evtype = 'MAIL'
                            AND
                            pressrelease_notify.msgid = ''
                            
                            
                            
                    ) AS dist_summary_fail,
                    
                    (SELECT count(pressrelease_notify.id) FROM   pressrelease_notify
                            WHERE
                               pressrelease_notify.onid = pressrelease_entry.id
                               AND
                               pressrelease_notify.ontable = 'pressrelease_entry'
                               AND
                               pressrelease_notify.evtype = 'MAIL'
                               AND
                               is_open = 1

                       ) AS dist_open_summary
                ");
        
    }
    
    
    
    
    function toRooArray($q)
    {
        if(!empty($q['_pressrelease_clipping_review'])){
            return $this->clipping_review($q);
        }
        
        $ret = $this->toArray();
        
        if (empty($q['query']['collapse_translation'])) {
            return $ret;
        }
        //DB_DataObject::debugLevel(1);
        // just get the basic children..
        $x = DB_DataObject::factory('pressrelease_entry');
        $x->parent_id = $this->id;
        if (!empty($q['query']['with_distr_summary'])) {
            $x->selectAddDistSummary(); 
        }
        
        $x->find();
        $ar = array();
        while ($x->fetch()) {
            $ar[ ]  = $x->toArray();
        }
        $ret['children'] = $ar;
         
        return $ret;
    }
    
    
    function toRooSingleArray()
    {
        // called on single get..
        $ret = $this->toArray();
        $ret['publish_dt_hr'] = date('H:i', strtotime($this->publish_dt));
        $ret['publish_dt_day'] = date('Y-m-d', strtotime($this->publish_dt));
        if($this->parent_id > 0 && empty($this->project_id)){
            $p = DB_DataObject::factory('Projects');
            $p->get('pressrelease_id', $this->parent_id);
            $ret['parent_id_project_id'] = $p->id;
        }
        return $ret;
    }
    function setFromRoo($req)
    {
        $ret = $this->setFrom($req);
        if (isset($req['publish_dt_hr']) && isset($req['publish_dt_day'])) {
            $this->publish_dt = date('Y-m-d H:i:00', strtotime($req['publish_dt_day'] . ' '. $req['publish_dt_hr'] . ':00'));
        }
        return $ret;
    }
    
    function  beforeUpdate($old, $request,$roo) //- after update - jerr() will stop insert..
    {
        
//         DB_DataObject::debugLevel(1);
        // this has to be done to resize images..
        // it depends on Pman_Image['public_baseURL']
        if ($old->content != $this->content) {
            require_once 'Pman/Core/Images.php';
            
            $this->content = Pman_Core_Images::replaceImageURLS( $this->content );
        }
        
        $this->revisions = (empty($old->revisions)) ? 1 : ($old->revisions + 1);
        
        
    }
    function beforeDelete($dependants_array, $roo)
    {
        if ($this->publish_status > -1) {
            $roo->jerr("You can not delete published releases. - change the status to draft then delete them.");
        }
        $pe = $this->factory('pressrelease_entry');
        $pe->parent_id = $this->id;
        foreach($pe->fetchAll() as $pe) {
            $pe->beforeDelete(array(), $roo);
            $pe->delete();
            // $pe->onDelete();
        }
        
        
        
        
        $img = DB_DataObject::factory('Images');
        $img->ontable = $this->tableName();
        $img->onid = $this->id;
        if ($img->count()) {
            $roo->jerr("Delete all the images on  press release #{$this->id} first");
        }
         
        $pn = DB_DataObject::factory('pressrelease_notify');
        $img->ontable = $this->tableName();
        $img->onid = $this->id;
        if ($img->count()) {
            $roo->jerr("Delete all pending messages onpress release #{$this->id} first");
        }
        
        
        // ready to delete?!?
        return true;   
    }

    
    
    function onUpdate($old, $request,$roo) 
    {
        // when an release is change from draft (-1? to 0)
        // then update any notify events to match the correct time..
      
        if(
                $this->publish_status != -1 && 
                (
                    strtotime($this->publish_dt) != strtotime($old->publish_dt) ||
                    $this->publish_dt_tz != $old->publish_dt_tz
                )
        ){
            $this->buildDistributionStartNotification();
        
            $this->buildDistributionEndNotification();
        }
        
        if (($this->publish_status != 0)  || ($this->publish_status == $old->publish_status))  {
            return;
        }
        // change to publish..
        $no = $this->notifications();
        
        
        $tz_ar = explode('.',  $this->publish_dt_tz);
                    // hard code our default timezone (HKT!)
        $offset = 8 - (1 * $tz_ar[0]);
        // assume only 30 minute intervals...
        $ptime = date("Y-m-d H:i:s", strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES"));
    
        
        
        foreach($no as $n) {
            if ($n->delivered()) { // not likely..
                continue;
            }
            $new  = clone($n);
            $new->act_start($ptime);
            $new->update($n);
            
            
        }    
    }
    
    /**
     *
     * @param $dom DomDocument - to create elements
     * @param $parsent DomNode - parent to add to
     * @param $content_type String text/html or text/plan
     * @param $opts (really the REQUEST ..)
     *   valid modifiers.
     *   ?with_first_image = 1    = use the first non-logo image as the image tag.
     *   ?skip_no_images = 1  = only show entries with images..
     *   ?rfc = 1 (do not show images - and make it rfc complient...)
     *   
     */
   function toRSSXML($dom, $parent, $content_type='text/html', $opts = array())
   {
        $images = array();
        if (!empty($opts['with_first_image'])) {
            $db = DB_Dataobject::Factory('Images');
            $db->whereAdd("Images.imgtype != 'LOGO'");
            $db->orderBy('id ASC'); // first...
            $db->limit(1);
            $images = $db->gather($this, 'image/%');
        }
        if (!empty($opts['skip_no_images']) && empty($images)) {
            return;
        }
    
        $entry = $dom->createElement('entry');
        $parent->appendChild($entry);

        // published
        
        
        $tz_ar = explode('.',  $this->publish_dt_tz);
        $offset = 8 - (1 * $tz_ar[0]);
        //  strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES"))
                
        
        
        $pub = $dom->createElement('published');
        $pub->appendChild($dom->createTextNode(date("Y-m-d\TH:i:sP",strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES"))));
        $entry->appendChild($pub);

        // updated
        $updated = $dom->createElement('updated');
        $updated->appendChild($dom->createTextNode(date("Y-m-d\TH:i:sP",strtotime($this->updated))));
        $entry->appendChild($updated);

        // title
        $title = $dom->createElement('title');
        $title->appendChild($dom->createTextNode($this->headline));
        $entry->appendChild($title);

        
        $findata = ( strlen($this->content_forward)  ? ($this->content_forward . '<br/><br/>') : '') .
            (
                (strlen(trim($this->content_data)) && (substr(trim($this->content_data),0,1) != '<')) ?
                    ('<pre>' . $this->content_data  .'</pre>' ) : $this->content_data
            );
         
        if ($content_type != 'text/plain') {
            // content
            $content = $dom->createElement('content');
            $attr = $dom->createAttribute('type');
            $attr->value = 'html';
            $content->appendChild($attr);

            $cdata = $this->content();
            $cdata .= '<br /><br />'.$this->content_about;          
                          
            $roo = HTML_FlexyFramework::get()->page;
            
            $trackurl = "http://{$_SERVER['HTTP_HOST']}{$roo->baseURL}/FeedTrack/{$this->id}";
                                 
            $imagefeedtrack = '<img src="'. $trackurl . '" width="1" height="1">';
            
            $content->appendChild($dom->createTextNode(
                                $cdata .
                               (strlen($findata) ? ('<br/></br/>' . $findata ): '') .
                                $imagefeedtrack
                               ));
            $entry->appendChild($content );

        } else {
            // plain text 
            $content = $dom->createElement('content');
            $attr = $dom->createAttribute('type');
            $attr->value = 'plain';
            $content->appendChild($attr);
            
            $cdata = $this->content;
            $cdata .= '<br /><br />'.$this->content_about;
             
            require_once 'File/Convert.php';
            require_once 'System.php';
            $tmpdir  = System::mktemp("-d convert");
            $path = $tmpdir . '/' . $this->id . '.html';
            
            file_put_contents($path, $cdata);
            
            $fc = new File_Convert($path, 'text/html' );
            $plain = $fc->convert('text/plain');
            
            $content->appendChild($dom->createTextNode(file_get_contents($plain)));
            $entry->appendChild($content);
            
        }
        
        // link
        $link = $dom->createElement('link');
        $attr = $dom->createAttribute('type');
        $attr->value = 'text/html';
        $link->appendChild($attr);

        $attr = $dom->createAttribute('rel');
        $attr->value = 'alternate';
        $link->appendChild($attr);

        
        //$attr = $dom->createAttribute('releaseid');
        //$attr->value = $this->id;
        //$link->appendChild($attr);
        
        $attr = $dom->createAttribute('href');
        $attr->value = 'http://www.media-outreach.com/release.php/View/'.$this->id.'#Contact';
        $link->appendChild($attr);
        $entry->appendChild($link);

        // id
        $id = $dom->createElement('id');
        //$id->appendChild($dom->createTextNode('MEDIA-OUTREACH-'.$this->id));
        $id->appendChild($dom->createTextNode('http://www.media-outreach.com/release.php/View/'.$this->id.'#Contact'));
        $entry->appendChild($id);

        // author
        $name = $dom->createElement('name');
        $name->appendChild($dom->createTextNode($this->client()->name));

        $auth = $dom->createElement('author');
        $auth->appendChild($name);
        $entry->appendChild($auth);
        
        // default is to add the logo...
        if (empty($opts['rfc']) && empty($images)) {
            // image - logo
            $image = $dom->createElement('image');
    
            $db = DB_Dataobject::Factory('Images');
            $ar = $db->gather($this, 'image/%');
            foreach($ar as $img) {
                if($img->imgtype == 'LOGO') {
                    $imgUrl = $dom->createElement('url');
                    $imgUrl->appendChild($dom->createTextNode('http://'.$_SERVER['HTTP_HOST'].$img->URL("x100",'/Images/Thumb'))); 
                    $image->appendChild($imgUrl);
    
                    $imgTitle = $dom->createElement('title');
                    $imgTitle->appendChild($dom->createTextNode($img->title));
                    $image->appendChild($imgTitle);
    
                    $entry->appendChild($image);
                }
            }
            
        }
        
        if (!empty($images)) {
            $img = $images[0];
            
            $image = $dom->createElement('image');
            $imgUrl = $dom->createElement('url');
            $imgUrl->appendChild($dom->createTextNode('http://'.$_SERVER['HTTP_HOST'].$img->URL(-1,'/Images/Thumb'))); 
            $image->appendChild($imgUrl);

            $imgTitle = $dom->createElement('title');
            $imgTitle->appendChild($dom->createTextNode($img->title));
            $image->appendChild($imgTitle);

            $entry->appendChild($image);
        }
        
       
        
        
    } 
    
      
   function toRSS2XML($dom, $parent, $view="standard", $request) {
            
        $entry = $dom->createElement('item');
        $parent->appendChild($entry);
        
        //link
        $link = $dom->createElement('link');
        $link->appendChild($dom->createTextNode('http://www.media-outreach.com/release.php/View/'.$this->id.'#Contact'));
         $entry->appendChild($link);
         
        // title
        $title = $dom->createElement('title');
        $title->appendChild($dom->createTextNode($this->headline));
        $entry->appendChild($title);
        
        // author
        if ($view == "standard") {                       
            $name = $dom->createElement('author');
            $name->appendChild($dom->createTextNode($this->client()->name));
            $entry->appendChild($name);
        }
        
        // category
        $name = $dom->createElement('category');
        $name->appendChild($dom->createTextNode($this->industry_name));
        $entry->appendChild($name);
        
        
        $tz_ar = explode('.',  $this->publish_dt_tz);
        $offset = 8 - (1 * $tz_ar[0]);
        //  strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES")
       
        
        // published 
        $pub = $dom->createElement('pubDate');
        $pub->appendChild($dom->createTextNode(date('r', strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES"))));
        $entry->appendChild($pub);
        
        // id
        
        $id = $dom->createElement('guid');
        
        if ($view == "standard") {       
            $id->appendChild($dom->createTextNode(md5('MEDIA-OUTREACH-'.$this->id)));
        }
        if ($view == "rfc") {                    
            $id->appendChild($dom->createTextNode('http://www.media-outreach.com/release.php/View/'.$this->id.'#Contact'));
        }
        $entry->appendChild($id);
                  
        // content
         $cdata = $this->content();
        $cdata .= '<br /><br />'.$this->content_about;

        $findata = ( strlen($this->content_forward)  ? ($this->content_forward . '<br/><br/>') : '') .
                (
                    (strlen(trim($this->content_data)) && (substr(trim($this->content_data),0,1) != '<')) ?
                        ('<pre>' . $this->content_data  .'</pre>' ) : $this->content_data
                );
        $findata_contents = (strlen($findata) ? ('<br/></br/>' . $findata ): '');
        
        $roo = HTML_FlexyFramework::get()->page;
        
        $trackurl = "http://{$_SERVER['HTTP_HOST']}{$roo->baseURL}/FeedTrack.php?{$this->id}";
                                 
        $imagefeedtrack = '<img src="'. $trackurl . '" width="1" height="1">';
          
        
        
        
        $content = $dom->createElement('description');    
       
        if (!empty($request['content_type']) && $request['content_type'] == 'text/plain') {
            $cdata = strip_tags($cdata); // not sure if this is a great idea...
            if (!empty($request['clean_breaks'])) {
                $cdata  = preg_replace("/([^\n])\n([^\n])/", '$1 $2', $cdata);
            }
            
            
            $imagefeedtrack = '';
        }
        
        if ($view == "standard") {
            $content->appendChild($dom->createTextNode($cdata . $imagefeedtrack ));
        }
        if ($view == "rfc") {
             $content->appendChild($dom->createTextNode($cdata . $findata_contents . $imagefeedtrack));
        }
        $entry->appendChild($content);
                        
        // detail -- only for non rfc
        if($view == "standard") {
            $content = $dom->createElement('detail');
            $content->appendChild($dom->createTextNode($cdata . $findata_contents. $imagefeedtrack));
            $entry->appendChild($content);
        } 
        
                   
    }
    
    function toFeedXML($dom, $parent, $with_images = false, $striplf = false, $striphtml = false)  
    {
        $e = $dom->createElement('NewsItem');
        $parent->appendChild($e);
         
        $c = $this->client();
        
        $company = array(
            'Name' => $c->name,
            'ChineseName' => $this->company_name_alt,
            'Code' => $this->stockcode,
            'Country' => $this->country,
            'Industry' => $this->industry_name,
           
        );
        
        $cel  = $dom->createElement('Company');
        $e->appendChild($cel);
        foreach($company as $k=>$v) {
            
            $kk  = $dom->createElement($k);
            $kk->appendChild($dom->createCDATASection($v));
            $cel->appendChild($kk);
        }
        
        $ff = HTML_FlexyFramework::get();
        $host = empty($_SERVER['HTTP_HOST']) ? $ff->Factiva['HTTP_HOST'] : $_SERVER['HTTP_HOST'];
        $fbase = empty($ff->baseURL) ? $ff->Factiva['baseURL'] : $ff->baseURL;
        $baseURL = 'http://'. $host. $fbase;
        // Media..
        $im = DB_DataObject::factory('Images');
          
        $ar = $im->gather($this);
        
        $media = array();
       
        foreach($ar as $img)  {
            if (preg_match('#^image/#', $img->mimetype)) {
                $media[] = $img->title . ': <a href="'. $baseURL . '/Images/'. $img->id .'/'. $img->filename. '">'. 
                    $baseURL . '/Images/'. $img->id .'/'. $img->filename . '</a>';
                    
                continue;
            }
            $media[] = $img->title . ': <a href="' . $baseURL . '/Images/Download'. $img->id .'/'. $img->filename. '">'. 
                    $baseURL . '/Images/Download'. $img->id .'/'. $img->filename . '</a>';
            
        }
        
        $contact = '<br/><br/>' .
                    '<a href="http://www.media-outreach.com/release.php/View/'. $this->id .'#Contact"><h3>Contacts</h3></a>';
                    
        
        $content =  ($striplf ? $this->contentLFStrip() : $this->content());
                    //$this->plainToHtml($this->contact_txt);
        
        $findata = (strlen(trim($this->content_data)) && (substr(trim($this->content_data),0,1) != '<')) ?
                 ('<pre>' . $this->content_data  .'</pre>' ) : $this->content_data;
                 
        if ($striphtml) {
            $content =  strip_tags( $this->contentLFStrip("\n\n") ). "\n\n";
            $contact =  "\n\nContacts:\n".
                    "http://www.media-outreach.com/release.php/View/{$this->id}#Contact\n";
                    //$this->contact_txt;
            $findata = strip_tags($this->content_data);
            
            
        }
                 
        // add company data..
        
        $add = array(
            'ID' => 'MEDIA-OUTREACH-'. $this->id,
            //'Type' => 'Press Release',
            'Lang' => $this->language,
            'IssueDate' => date('Y-m-d', strtotime($this->publish_dt)),
            'Headline' => $this->headline,
            'SubHeadline' => $this->subheadline,
            'Content' => $content,
                           
            'AboutCompany' => ($striphtml ? $this->content_about : $this->plainToHtml($this->content_about)) .
                                $contact,
            'FinancialForward' => $striphtml ? $this->content_forward  : $this->plainToHtml($this->content_forward),
            'FinancialData' => $findata,
                
            'Media' =>  $striphtml ? $media  : implode('<br/>', $media),
        );
        
        
       
         
        $cel  = $dom->createElement('Release');
        $e->appendChild($cel);
        foreach($add as $k=>$v) {
            $kk  = $dom->createElement($k);
            if ($k == 'ID') {
                $kk->setAttribute('updated' , $this->updated);
                $kk->setAttribute('created' , $this->created);
            }
            $v = @iconv('UTF8','UTF8//IGNORE',$v);
            $kk->appendChild($dom->createCDATASection($v));
            $cel->appendChild($kk);
        }
        
        if ($with_images) {
            // grab the logo and the images relating to this relese.
            $ff = HTML_FlexyFramework::get();
            $imgs  = $cel->appendChild($dom->createElement('Images'));
            
            $havelogo = false;
            $i = DB_DataObject::Factory('Images');
            $ar = $i->gather($this,'image/%');
            //echo '<PRE>';print_r($ar);
            foreach($ar as $i) {
                if ($i->imgtype == 'LOGO') {
                    $havelogo = true;
                }
                $img = $imgs->appendChild($dom->createElement('Image'));
                $img->setAttribute('id', $i->id);
                $img->setAttribute('imgtype', $i->imgtype);
                $img->appendChild($dom->createCDATASection(
                        'http://'. $_SERVER['HTTP_HOST'] . 
                        $i->URL(-1,'/Images')));
            }
            
            if (!$havelogo) { 
                //DB_DataObject::DebugLevel(1);
                $c = DB_DataObject::factory('Companies');
                $c->id = $this->client_id;
                $i = DB_DataObject::Factory('Images');
                $i->imgtype='LOGO';
                $ar = $i->gather($c,'image/%');
                if (count($ar)) {
                    $img = $imgs->appendChild($dom->createElement('Image'));
                    $img->setAttribute('id', $ar[0]->id);
                    $img->setAttribute('imgtype', $ar[0]->imgtype);
                    $img->appendChild($dom->createCDATASection(
                            'http://'. $_SERVER['HTTP_HOST'] . 
                            $ar[0]->URL("x100",'/Images/Thumb')));
                }
                //DB_DataObject::debugLvel(1);
            }
            
        }
        
        
        
    }
    
    function contentLFStrip($lb = "\n")
    {
        $ret = $this->content;
        $ret = str_replace("\n", " ", $ret);
        $ret = preg_replace('#(<p[^>]*>)#i', "\\1".$lb, $ret);
        return $ret;
    
        
    }
    
    
    function plainToHtml($str)
    {
        $str = str_replace("\n", "<BR>\n", $str);
        $str = str_replace("<BR>\n<BR>\n", "\n<P>\n", $str);
        return $str;
    }
    
    
    
    function logoImageHTML($size, $provider = '/Images/Thumb') {
        //DB_DataObject::debugLevel(1);
        $i = DB_DataObject::Factory('Images');
        $i->imgtype == 'LOGO';
        $ar = $i->gather($this,'image/%');
        return $ar ? $ar[0]->toHTML($size, $provider) : '' ;
    }
    
    function logoImageURL($size, $provider = '/Images/Thumb') {
        //DB_DataObject::debugLevel(1);
        $i = DB_DataObject::Factory('Images');
        $i->imgtype == 'LOGO';
        $ar = $i->gather($this,'image/%');
        return $ar ? $ar[0]->URL($size, $provider) : '' ;
    }
    
    function logo() {
        $i = DB_DataObject::Factory('Images');
        $i->imgtype == 'LOGO';
        $ar = $i->gather($this,'image/%');
        return $ar ? $ar[0] : '' ;
    }
    
    function toEventString()
    {
        return '#' . $this->id . ' ' . $this->client()->name . ': ' . ($this->language) . ' ' . $this->headline;
    }
    
    function distributionList($what=false)
    {
        
        
        //DB_DataObject::debugLevel(1);
        $pg = HTML_Flexyframework::get()->page;
        
        $x = DB_DataObject::factory('pressrelease_contact');
        $x->autoJoin();
        $x->applyDistributionFilter(array(
            'beats' =>$this->distribution_config,
            'countries'=> $this->distribution_countries,
            'blacklist' => $this->blacklist_ids, // just flags them...
        ), $pg->authUser);
        
        
        return  $x->fetchAll($what);
        //print_r($this->distlist);
    }
    
    function buildNotification()
    {
       
//        $this->buildFeeds();
        
        
//        DB_DataObject::debugLevel(1);
        // This needs handling here, as we should not distribute translations
        // if they are not ready yet.
        $pe = DB_DataObject::factory('pressrelease_entry');
        $pe->parent_id = $this->id;
        $pe->whereAdd("language != ''");
        $pe->find();
        $versions = array();
        $version_obj = array();
        while ($pe->fetch()) {
            $versions[$pe->language] = $pe->id;
            $version_obj[$pe->id] = clone($pe);
        }
        $versions[$this->language] = $this->id;
        $version_obj[$this->id] = clone($this);
        
         // find who is already queued..
        $nc = DB_DataObject::factory('pressrelease_notify');
        $nc->ontable = 'pressrelease_entry';
        $nc->whereAddIn('onid', array_values($versions), 'int');
        $nc->evtype = 'MAIL';
        
        $ar = $nc->fetchAll();
        $queued  = array();
        foreach($ar as $q) {
            $queued[ $q->person_id . '-'.  $q->field ] = $q;
        }
        //DB_DataObject::DebugLevel(1);
        //echo '<PRE>';print_R($queued);exit;
        $ar = $this->distributionList();
        $added = 0;
        $nc = DB_DataObject::factory('pressrelease_notify');
        
        $done = array();
//        print_r($ar);
        foreach($ar as $c) {
           
            if ($c->blacklist_pos > 0) {
                continue;
            }
           
           
            // which version to send..
            $version = 0;
            if (!empty($versions[$c->contact_language])) {
                $version  = $versions[$c->contact_language];
            } elseif (!empty($versions[$c->contact_language_alt])) {
                $version  = $versions[$c->contact_language_alt];
            }
            
            // check if $version->?? what ever langue it is in...
             // matche eisth c->contact_lang or alt.... do not add if it is not in there.
            if(empty($version)){
                if(empty($versions['en'])){// if english version is not found  then skip that
                    continue;
                }
                $version = $versions['en'];// set to default send a english version
            }
            
            foreach(array('email','email2','email3') as $email_field) {
                if (empty($c->{$email_field}) || !strlen(trim($c->{$email_field}))) {
                    continue; // nothing in alternative email field.
                }
                // prevent dupes to same email..
                if (isset($done[$c->{$email_field}])) {
                    continue;
                }
                $done[$c->{$email_field}] = 1;
                
                if (isset($queued[$c->id .'-'.$email_field  ])) {
                    // we already have a reference to it..
                    // if it has been sent, we skip it!!!!
                    if ($queued[$c->id .'-'.$email_field  ]->delivered()) {
                        continue;
                    }
                    // = should we try failed??
                    //if ($queued[$c->id .'-'.$email_field  ]->delivered()) {
                    //    continue;
                    //}
                    // not delivered, we can alter it...
                    
                    $n = clone($queued[$c->id .'-'.$email_field  ]);
                    $nn = $queued[$c->id .'-'.$email_field  ];
                } else {
                    $nn = false;
                    $n = clone($nc);
                }
                
                
                
                $n->setFrom(array(
                    'person_id' => $c->id,
                    'ontable' => 'pressrelease_entry',
                    'onid' => $version,
                    'event_id' => 0,
                    'evtype' => 'MAIL',
                    'msgid' => '',
                    'field' => $email_field,
                    'bounced' => 0,
                ));
                //var_dump($this->publish_dt . ' GMT' . $off . $this->publish_dt_tz);
                $sv = $version_obj[$version];
                
                //if ($sv->publish_status != 0) {
                    // not ready...
                //    $n->act_start(date('Y-m-d H:i:s', strtotime("NOW + 30 DAYS"))); << this was causing issues.
            //                                                                it's here to prevent problems, but causes them instead..?
                //} else {
                    
                    
                    
                    $tz_ar = explode('.',  $sv->publish_dt_tz);
                    // hard code our default timezone (HKT!)
                    $offset = 8 - (1 * $tz_ar[0]);
                    // assume only 30 minute intervals...
                    $n->act_start(date("Y-m-d H:i:s", strtotime("{$sv->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES")));
                
                //}
                //print_r($n);exit;
                if ($n->id) { 
                    $n->update($nn);
                }else {
                    $n->insert();
                }
                $added++;
            }
           
        }
        
        return $added;
        
    }
    
    function notifications()
    {
        
        $n = DB_DataObject::factory('pressrelease_notify');
        $n->ontable = 'pressrelease_entry';
        $n->onid = $this->id;
        return $n->fetchAll();
        
    }
    
    function notifyDistributionReport($rcpt, $last_sent_date, $notify, $force)
    {
        
       // print_R($notify);
        $tz_ar = explode('.',  $this->publish_dt_tz);
                    // hard code our default timezone (HKT!)
        $offset = 8 - (1 * $tz_ar[0]);
        // calculate which report from the notify->act_start..
        $offdate =  strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES");
        $days = round( ( strtotime($notify->act_start) - $offdate) / (60*60*24));
        require_once 'Pman/PressRelease/DistributionReport.php';
        $dr = new Pman_PressRelease_DistributionReport();
        $dr->baseURL = '/index.php'; ///??? from where else?
        
        
        $em = $dr->buildReport($this->id,$days,$notify->to_email);
        $ret = $em->toData();
        $ret['send-to'] = $notify->to_email;
        //print_R($ret);
        return $ret;
        
        
    }
    
    /**
     * email distirbution
     *
     *
     *  @arg  $person - person object (could be authenticated user or a pressrelease_person...) -- or empty (manual send)
     *  @arg $lasttime - ignored?
     *  @arg $notify - the notification object.
     *  @arg $force - ignore the entries publish time.
     * 
     * 
     * calls $object->toEmail($person,$last_send) to generate an email struct with
 *  array (
 *      headers =>
 *      recipients =>
 *      body =>
 *  )
     */
    
   
    
    function toEmail($person, $lasttime, $notify, $force = false)
    {
         
        // check it's ok to send out..
        //var_dump($force);
        $tz_ar = explode('.',  $this->publish_dt_tz);
                    // hard code our default timezone (HKT!)
        $offset = 8 - (1 * $tz_ar[0]);
        // assume only 30 minute intervals...
        $when = date("Y-m-d H:i:s", strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES"));
    
        if ($notify->person_id < 0) {
            // it's a direct send.
            $force = true;
            
        }
    
        // not ready to go out..
        // this should not happen???
        // force can overrie delivery time.
        if (!$force && strtotime($when) > time()) {
            return array('later' => date('Y-m-d H:i:s', strtotime("NOW + 1 HOUR")) );
        }
        if (!$force && $this->publish_status != 0) {
            return array('later' => date('Y-m-d H:i:s', strtotime("NOW + 5 HOUR") ) );
        }
        
        // if the person wants different languages, and they are available
        // send them that verison..
        
        // check release time, and status..
        
        if (empty($notify)) {
            $this->email = $person->email;
        }
        
        
        // overwrite email, address if notify is using a different field.
        if ($notify) {
            
            if (!empty($notify->field)) {
                $this->email = $person->{$notify->field};
                $person->email = $person->{$notify->field};
            }
            if ($notify->person_id < 0) {
                // manual send... - create a  fake person
                $this->email = $notify->to_email;
                $person = DB_DataObject::Factory('pressrelease_contact');
                $person->setFrom(array(
                    'id' => -1,
                    'email' => $notify->to_email,
                    'firstname' => $notify->firstname,
                    'contact_language' => $notify->contact_language,
                ));
                
            }
        }
        
         
        
        
        $ff = HTML_FlexyFramework::get(); // used to work out url to show..
        
        
        $out = new StdClass;

        // images..
        $img = DB_DataObject::factory('Images');
        //$img->whereAdd("imgtype != 'LOGO'");
        $this->images = $img->gather($this); ///, 'image/%');
        
        // logo..
        $c = DB_DataObject::Factory('Companies');
        $c->get($this->client_id);
        $img = DB_DataObject::factory('Images');
        $img->imgtype = 'LOGO'; // Images from the main list page.
        // not upload any imgtypes.. at present?
        $logos = $img->gather($c, 'image/%');
        if ($logos) {
            $this->logo = $logos[0];
        }
        $img = DB_DataObject::factory('Images');
        $img->imgtype = 'LOGO';
        $logos = $img->gather($this, 'image/%');
        if (empty($this->logo) && $logos) {
            $this->logo = $logos[0];
        }
       // print_r($this->logo);
        
        // related.. not currently used..
        $p = DB_DataObject::factory('Pressrelease_entry');
        $p->language = $this->language;
        $p->client_id = $this->client_id;
        $p->whereAdd('id != '. $this->id);
        $p->whereAdd('publish_status = 0');
        $p->whereAdd('publish_dt < NOW()'); // timezone!
        $p->whereAdd('publish_dt > NOW() - INTERVAL 3 MONTH'); // timezone!
        $p->orderBy('id DESC');
        $p->limit(10);
        $related = $p->fetchAll();
        $out->related = array();
        foreach($related as $r) {
            $y = $r->publish_dt("Y");
            if (empty($this->related[$y])) {
                $out->related[$y] = array();
            }
            $out->related[$y][] = clone($r);
        }
        
        
        // different versions.. "langs"
        
        $p = DB_DataObject::factory('Pressrelease_entry');
        $pid = $this->parent_id ? $this->parent_id : $this->id;
        $p->whereAdd("id = $pid OR  parent_id = $pid");
        $p->whereAdd('id != '. $this->id);
        $p->whereAdd('publish_status = 0');
        $p->whereAdd('publish_dt < NOW() + INTERVAL 24 HOUR'); // timezone!
        $p->orderBy('id DESC');
        $p->selectAdd();
        $p->selectAdd('id,language,headline');
        $out->langs = $p->fetchAll();
        
        
        
        
        $out->release = clone($this);
         
        $out->HOST= empty($ff->HTTP_HOST) ? 'release.media-outreach.com' : $ff->HTTP_HOST;
        $out->rootURL = 'http://' . $out->HOST;
        $out->baseURL = $out->rootURL . '/release.php';
        $out->cls = 'Embed';
        $out->isEmbed = 1;
        $out->isMail =  1;
        $out->person =  $person;
        $out->imageURL = $out->baseURL . '/Images/Thumb';
        
        if ($notify && !empty($notify->id)) {
            $out->notify = $notify;
        }
        
        $out->bodyTemplate = 'view.html';
        // body language is dependant on desired language..
        
        
        $lang = isset($person->contact_language) ? $person->contact_language : 'en';
        if ($lang != 'en') {
            $test = 'view.'.$lang .'.html';
            //echo "checking for $test\n";
            if (file_exists(dirname(__FILE__).'/../templates/'.$test)) {
                $out->bodyTemplate = $test;
            }
        }
        
        
        
        
        /* use the regex compiler, as it doesnt parse <tags */
        require_once 'HTML/Template/Flexy.php';
        $template = new HTML_Template_Flexy( array(
                                                   
                                                   
                                ));
          
        $template->compile("view.plain.html");
        
        /* use variables from this object to ouput data. */
        $htmlbody = $template->bufferedOutputObject($out);
        
        
         
        //print_R($htmlbody);exit;
        
        
        require_once 'Mail/mime.php';
        
        $m = new Mail_Mime(array(
                
            'head_charset' => 'UTF-8',
            'text_charset' => 'UTF-8',
            'html_charset' => 'UTF-8',
            //'html_encoding' => '8bit'
        ));
        $m->setHTMLBody($htmlbody);
        $m->setTxtBody("This is a HTML email, please change your settings to view this email");
        $ret = array();
        $ret['headers'] = $m->headers(array(
           //'To'     =>     'jenniferkokmn@yahoo.com.hk',
           'To'   => $this->email,
           'From'   => '"Media OutReach Press Release" <jennifer.kok@release.media-outreach.com>',
           'Reply-To' => 'jennifer.kok@media-outreach.com',
           'Subject'=> $this->headline,
           'Message-Id' => '<RELEASE-'. $person->id . '-'.$this->id.'@media-outreach.com>',
           'Date' => date('r'),
        ));
        
        
        //$ret['recipients'] = 'jenniferkokmn@yahoo.com.hk';
        $ret['recipients'] = $this->email;
         //   print_r($ret);exit;
        $ret['body'] = $m->get();
        
        if ($notify) {
            $this->logSend($notify, $ret);
        }
        
        
        //print_r($ret);
        
        //file_put_contents('/tmp/pr.output.txt', print_R($ret,true));
        
        
        return $ret;
        // basically we have to use the 
        
        
    }
    /**
     *
     * write to log directory the file.
     */
    function logSend($notify, $ret)
    {
         
        $ff  = HTML_FlexyFramework::get();
        if (empty($ff->Pman['event_log_dir'])) {
            return false;
        }
        $file = $ff->Pman['event_log_dir']. '/Pressrelease_entry_nofify'. date('/Y/m/d/'). $notify->id. ".log";
        if (!file_exists(dirname($file))) {
            mkdir(dirname($file),0700,true);
        }
        file_put_contents($file, print_R($ret, true));
        
        
        
    }
    
    function watchedNewRSSArticle($event, $notify)
    {
        
        
        
        if ($event->on_table != 'reader_article') {
            return true;
        }
        $art = $event->object();
        if (!empty($art->campaign_id)) {
            echo "createFromReaderArticle\n";
            $this->createFromReaderArticle($art);
            return true;
        }
        print_R($art);exit;
        
        // we force creation of a real notification event..
        // this is so that when we run the fetch it's run as a seperte process.
        // with a new enviroment???
        
        $id = explode(':', $event->remarks);// strim out the :
        
        $notify->ontable    = $this->tableName();
        $notify->onid       = $id[1];
        $notify->evtype     = 'createFromRSSArticle';
        $notify->act_when   = date('Y-m-d H:i:s'); ///, strtotime('+1 HOUR')); -- why an hour?
        $notify->act_start  = date('Y-m-d H:i:s'); //, strtotime('+1 HOUR'));
//        print_r($event);
//        print_r($notify);
//        exit;
        
        
        return false;
    }
     
    
     function createFromReaderArticle($article)
    {
        echo "createFromReaderArticle::\n";
       // print_r($article);exit;
        $camp = DB_DataObject::factory('Projects');
        $camp->get($article->campaign_id);
        //print_r($camp);
       // print_r($camp);
        
        if (empty($article->src_id)) { // this is the auto-import - no assign..
            $companies = DB_DataObject::factory('companies');
            $enum = DB_DataObject::Factory('core_enum')->lookup('COMPTYPE', 'SUPPLIER');
            $companies->comptype_id = $enum;
            $companies->get('code', 'local_search_engine');
            
            $assign = false;
            
       
        } else {
            $assign = DB_DAtaObject::Factory('CampaignAssign');
            $assign->get($article->src_id);
            $companies = DB_DataObject::factory('companies');
            $companies->get($assign->supplier_id); // CHECK
        }
        $p = DB_DataObject::factory($this->tableName());
        $p->get($camp->pressrelease_id);
        
            //print_r(array($rfa, $rs, $p));exit;
        
        // fix any issue where press release is not parent..
        if (!empty($p->parent_id)) {
            $pChild = DB_DataObject::factory($this->tableName());
            $pChild->get($p->parent_id);
            $p = $pChild;
        }
        
            
            //check for child 
        $pChild = DB_DataObject::factory($this->tableName());
        $pChild->language = $article->language;
        $pChild->parent_id = $p->id;
        if($pChild->find(true)){
            $p = $pChild;
        }
        $pr_same_lang = $p;   
        // p == press release..
        
        // #2354
        //DB_DataObject::debugLevel(1);
        
        $prAll = DB_DataObject::factory($p->tableName());
        if($p->parent_id > 0){
            $prAll->whereAdd("parent_id = {$p->parent_id} OR id = {$p->parent_id} OR same_as_id = {$p->parent_id}");
        }else{
            $prAll->whereAdd("parent_id = {$p->id} OR id = {$p->id} OR same_as_id = {$p->id}");
        }
        $percent = 0;
        
        // find the best matched language..
        
        
        foreach($prAll->fetchAll() as $prItem){
            
            //all auto imports are assumed to be correct..
            if(empty($article->src_id) && ($prItem->language == $article->language)){
                //if($prItem->id != $reader->src_id){
                //    echo "SRC ID NOT MATCH SKIP Release: {$prItem->id} \n";
                //    continue;
                // }
                //if using our ID
                
                $p = $prItem;
                $percent = 100;
                echo  "Overriding MATCHING as src_id is set - {$article->real_url}\n";
        
                
                break;
            }
            
            $percent = $this->diffWords($article, $prItem);
            if($percent < 35){
                echo "Less then $percent% try the other language...\n";
               
                continue;
            }
            
            $p = $prItem;
            //more then 50% then quit 
//            $percent = $per;
            break;
        }
        
        $isRejected = false;
        
        echo "Article ID : $article->id \n";
        
        if($percent < 35){
            echo  "Similar by {$percent} = set is rejected\n";
            $pr_same_lang->relatedLinks($article);
            
            //if less then 5% then DO NOT insert the clippings
            if($percent < 5){
                echo  "Similar by {$percent} = ignoring .... \n";
                
                
                return true;
            }
            
            $isRejected = true;
//            return true;
        }
        echo  "Similar by {$percent} = FETCHING  - {$article->real_url}\n";
        
        
        // this is so wrong...
        $head = $article->headline;
        //$head = $this->fetchHeadline($reader->real_url);
        
        $country = $this->findCountry($article->real_url);
        
        
        //$pai = DB_DataObject::factory('pressrelease_auto_import');
        //if(!$pai->get('url', $reader->real_url)){
        //    echo 'this url is not existing :'. $reader->real_url;
       // }
         
        
        $pro = $camp;
        //if(!$pro->get('pressrelease_id', !empty($p->parent_id) ? $p->parent_id : $p->id)){
        //    echo "ERROR getting Project... ID={$p->id} : PARENT={$p->parent_id}\n";
        //    return true;
        //}
        
        echo "ReleaseID : {$p->id} \n";
        
        $rand = md5(rand(). date('Y-m-d h:i:s'));
        
        require_once 'Pman/Clipping/Import/FromRssReader.php';
        $rss = new Pman_Clipping_Import_FromRssReader();
        $rss->cli = 1;
        
        $remoteURL = trim($article->real_url);
        
        $dom = DB_DataObject::factory('clipping_domain')->lookupUrl($remoteURL);
        if ($dom && $dom->is_ignore) {
            echo "SKIP - ignored domain\n";
            return true;
        
        }
        // while dom may not be available .. - it should be the second time round.
        
        if ($dom->id > 0) {
            $checkURL = DB_DataObject::factory('Clipping');
            $checkURL->setFrom(array(
                    'project_id' => $pro->id,
                    'language' =>  $article->language ? $article->language : $p->language,
                    'domain_id' => $dom->id,
            ));
                                     
            
            if($checkURL->count()){
                echo  "SKIP - project({$pro->id}) /lang {$checkURL->language}) / domain ({$dom->id}) - already in database\n";
                return true;
            }
            
        }
        
        
        // #2521 == NOte this does not work --- as fetching is concurrent..
        //check for duplicate urls
        //DB_DataObject::debugLevel(1);
        $clipp = DB_DataObject::factory('Clipping');
        $clipp->pressrelease_id = $p->id;
        $clipp->remote_url = $remoteURL;
        if($clipp->count()){
            echo "SKIP - already in database\n";
            return true;
        }
        
        $isFeed = 0;
        
        $remoteUrlHost = parse_url($remoteURL);
        
        if(!empty($remoteUrlHost['host'])){
            $pressrelease_auto_import = DB_DataObject::factory('pressrelease_auto_import');
            $pressrelease_auto_import->is_active = 1;
            $pressrelease_auto_import->whereAdd("url LIKE '%{$remoteUrlHost['host']}%'");

            if($pressrelease_auto_import->count()){
                $isFeed = 1;
            }
        }
        
        $arg = array(
            'media_type' => 'ONLINE',
            
             
            'remote_url' => $remoteURL,
            
            'pressrelease_id' => $p->id,
            'headline' => $head,
            //for testing
//            'summary' => ($isRejected) ? "Rejected by system, is not similar the article (articleID: {$reader->id}) ReleaseID: ($p->id) (match less then $percent%)" : "Pickup form articleID: ({$reader->id}) ReleaseID: ($p->id) $percent% - ".$head['body'], // #2354,,
            'summary' => ($isRejected) ?
                    "Rejected by system, is not similar the article (articleID: {$article->id}) ReleaseID: ($p->id) (match less then $percent%)" :
                    (strlen($article->body) ? $article->body : strip_tags($p->content)), // #2354,,
            'project_id' => $pro->id,
            'language' =>   $article->language ? $article->language : $p->language, // using the pressrelease_auto_import language which are user fill in..
            'country' => ($country !== false) ? $country : $p->country,// using the pressrelease country
            'supplier_id' => (!empty($assign))? $assign->supplier_id : $companies->id,
//            'uploaded_by' => $ca->supplier_id,
            'rejected' => ($isRejected) ? 1 : 0, // #2354
            'rejected_reason' => ($isRejected) ? "Rejected by system, is not similar the article (match less then $percent%)" : '', // #2354
            'domain_id' => $dom->id,
            'release_is_feed' => $isFeed
        );
        
        
        
        //print_r($arg);
        //dont check duplicate url???
//        $cp = DB_DataObject::factory('Clipping');
//        if($cp->get('remote_url', $arg['remote_url'])){
//            return true;
//            continue; 
//        }
         echo "Attempting import\n";

        $res = $rss->createArticle($arg);
        
        //print_r($res);
//        exit;
        return true; // idicates success.
    }
    
    
    function relatedLinks($reader)
    {
        
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
            'string' =>  '<div>' . $this->headline .'</div>'
        ));
        // echo '<PRE>'; print_r($wd);
        $skip = array();
        
       
        
        foreach ($xpath->query('//a[@href]') as $a) {
            
            $contents = $a->ownerDocument->saveHTML($a);
            
            $url = $reader->relPath($reader->real_url , $a->getAttribute('href'));
            
             
            $ar = parse_url($url);
            if (!in_array(strtolower($ar['scheme']), array('http','https'))) {
                continue;
            }
            if ($ar['host'] != $host) {
                continue;
            }
            // should not really happen...
             $dom = DB_DataObject::factory('clipping_domain')->lookupUrl($url);
            if ($dom && $dom->is_ignore) {
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
        if (empty($links)) {
            return;
        }
        $skip = array();
        foreach($links as $url => $contents) {
            // create a reader article.. similar to the one we got...
            $ar = parse_url($url);
            if (isset($skip[$ar['host']])) {
                continue;
            }
            
            $ra = DB_DataObject::Factory('reader_article');
            $ra->url_md5 = md5($url);
            if ($ra->get('url', $url)) {
                continue;
            }
            $ra = DB_DataObject::Factory('reader_article');
            $ra->real_url_md5 = md5($url);
            if ($ra->get('real_url', $url)) {
                continue;
            }
            // if we have too many in the queue for this domain... - skip related...
            
            $ra = DB_DataObject::Factory('reader_article');
            $ra->fetched = 0;
            $ra->whereAdd("url LIKE '%/". $ra->escape($ar['host'])."/%'");
            if ($ra->count() > 50) {
                $skip[$ar['host']] = true;
                continue;
            }
            
            
            $ra = DB_DataObject::Factory('reader_article');
            $ra->setFrom(array(
                'feed_id' => 0,
                'src_id'=> $reader->src_id,
                'url'=> $url,
                'url_md5' => md5($url),
                'is_displayed'=> 0,
                'fetched'=> 0,
                'tries'=> 0,
                'act_when'=> date('Y:m:d H:i:s'),
                'language'=> $reader->language,
                'campaign_id'=> $reader->campaign_id,
                
            ));
            $ra->insert();
            
        }
        
        
        
    }
    
    
    
    
    
    function diffWords($reader, $p)
    {
        
        $fn = $reader->toFilenameUnsafe();
        if (file_exists($fn) && filesize($fn) > 2000000) {
            echo "SKIP - file to large to study";
            return 0;
        }
        
        // if using our API then return 100% 
        if(file_exists($fn)){
            $dom = file_get_contents($fn);
            if(preg_match('/release\.media\-outreach\.com\/Release\/Embed\_full\.js/i',$dom)
               &&
               preg_match('/style=full/i',$dom)) // only full page widgets will work.
            {
                return 100;
            }
        }
        
        require_once 'HTML/WordDiff.php';
        $fn = file_exists($fn) ? $fn : $reader->toFilename();
        
        if (!empty($this->debug_on)) {
            echo "<PRE>DIFF\n". $this->content."\nTO\n\n".file_get_contents($fn) ."\n\n";
            
        }
        
       //  var_dump($this->debug_on);
        $wd = new HTML_WordDiff(array(
            'lang' => $p->language,
            'debug_on' => !empty($this->debug_on) ? 1 : 0 ,
            'string' => implode('<br/>',array(
                
                        $p->content,
//                        $p->content_data,
//                        $p->headline,
//                        $p->subheadline,
//                        $p->content_about,
//                        $p->content_forward
                ))
        ));
        
        return $wd->compare($fn);
    }
    
    /*
     * move to clipping_domain
     */
    function findCountry($url)
    {
        $cdd = DB_DataObject::factory('clipping_domain');
        return $cdd->findCountry($url);
    }
    
    function fetchHeadline($url)
    {
        
        $context = stream_context_create(array(
            'http' => array(
                'header'  => 'User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1'
            )
        ));
        
        $response = file_get_contents($url, 0, $context);
        
        $ret = array();
        
        $pageDom = new DomDocument('1.0', 'utf-8');    
        $pageDom->formatOutput = true;
        $searchPage = mb_convert_encoding($response, 'HTML-ENTITIES', "UTF-8"); 
        
        @$pageDom->loadHTML($searchPage);
        $xp = new DOMXPath($pageDom);
        
        //get the headline
        $q = "//title";
        $lists = $xp->query($q);
        $ret['headline'] = $lists->item(0)->textContent;
//        print_r($lists->item(0)->textContent);

        //get the summary
        $q = "//meta[@name='description']";
        $lists = $xp->query($q);
//        print_r($lists->item(0)->getAttribute('content'));
//        exit;
        $lists = $lists && $lists->item(0) ? $lists : false;
        
        $ret['body'] = ($lists) ? $lists->item(0)->getAttribute('content') : $ret['headline'];
        
        return $ret;
    }
    
    function project()
    {
        $c = DB_DataObject::factory('Projects');
        if(!$c->get('pressrelease_id', !empty($this->parent_id) ? $this->parent_id : $this->id)){
            return false;
        }
        return $c;
            
        
    }
    
    function buildFeeds()
    {
        
        if ($this->parent_id) {
            return; // this should only be called on parent feeds.
        }
        //DB_DataObject::debugLevel(1);
        $c = $this->project();
        $key = DB_DataObject::factory('clipping_keywords');
        $key->keyword = substr($this->headline, 0, 128); // max length
        $key->alternatives = $this->headline . "\n" . $this->subheadline;
        $key->ignore_title = 1;
        $key->project_id = $c->id;
        $key->language = $this->language;

        if(!$key->find(true)){
            $key->insert();
        }  

        //# 2028 create the suppliers...

        $supp = DB_DataObject::factory('Companies');
        $supp->comptype_id = DB_DataObject::factory('core_enum')->lookup('COMPTYPE','SUPPLIER');
        $supp->whereAdd("Companies.code LIKE '%_RSS%'");

        $psub = $this->versionsAll();
        $multiLang = array($this->language);
        if(!empty($psub)){
            foreach($psub as $sub){
                $multiLang[] = $sub->language;
                $key = DB_DataObject::factory('clipping_keywords');
                $key->keyword = substr($sub->headline, 0, 128); // max length
                $key->alternatives = $sub->headline . "\n" . $sub->subheadline;
                $key->ignore_title = 1;
                $key->project_id = $c->id;
                $key->language = $sub->language;

                if(!$key->find(true)){
                    $key->insert();
                }
            }
            
        }

         
         
        foreach($supp->fetchAll() as $s){
            // #2411 add the Yam Search Engine
            // www.yam.com is using the google CSE,
            // so.... the result should same with our google search engine....
            
//            if($s->code == 'yam_search_RSS' && !in_array('zh_TW', $multiLang)){
//                continue;
//            }
            
            $ca = DB_DataObject::factory('CampaignAssign');
            $ca->project_id = $c->id;
            $ca->supplier_id = $s->id;

            $update = false;
            if($ca->find(true)){
                $update = true;
            }

            $fn = explode(' ', $s->name);
            array_pop($fn);// remove the last word..
            $ca->description = implode(' ', $fn);
            $ca->assigntype = 'SUMMARY';
            $ca->languages = implode(',', $multiLang);
            $ca->countries = $c->countries;
            $ca->sourcelanguages = implode(',', $multiLang);//mssing source language???

            if($update){
                $ca->update();
            }else{
                $ca->insert();
            }
            
           // $ca->createSearchFeed();// search ffeds are not done now..
        }

          
//        $this->jok('Done?');
    }
    
    function versions()
    {
        
        $p = DB_DataObject::factory('Pressrelease_entry');
        $pid = $this->parent_id ? $this->parent_id : $this->id;
        $p->whereAdd("id = $pid OR  parent_id = $pid");
        //$p->whereAdd('id != '. $id);
        $p->whereAdd('publish_status > -1');
        $p->whereAdd('publish_dt < NOW()'); // timezone!
        $p->orderBy('id DESC');
       
        return $p->fetchAll();
        
    }
    function versionsAll()
    {
        
        $p = DB_DataObject::factory('Pressrelease_entry');
        $pid = $this->parent_id ? $this->parent_id : $this->id;
        $p->whereAdd("id = $pid OR  parent_id = $pid OR same_as_id = $pid");
        //$p->whereAdd('id != '. $id);
        $p->whereAdd('publish_status > -1');
        $p->whereAdd('publish_dt < NOW()'); // timezone!
        $p->orderBy('id DESC');
       
        return $p->fetchAll();
        
    }
    function distributionSummary()
    {
        
        $ret = array(
            'general' => false,
            'international' => false,
            'regions' => array(),
            'countries' => array(),
            'beats' => array(),
        );
        
        
        //DB_DataObject::DebugLevel(1);
            // this is more complex now..
        require_once 'Pman/Core/I18n.php';
        $x = new Pman_Core_I18n();
        
        foreach(explode(',',  $this->distribution_countries ) as $k)
        {
            
            switch (true) {
                case ($k == '_international'):
                    $ret['international'] = true;
                    break;
                
                case ($k == '_generalnews'):
                    $ret['general']  = true;
                    break;
                
                case (strlen($k) > 2 && $k[1] == '-'): // regional.
                    $cg = DB_DataObject::factory('pressrelease_category');
                    $cg->get(array_pop(explode('-', $k)));
                    
                    $ret['regions'][] = $cg->name;
                    break;
                
                default:
                    $ret['countries'][] = $x->translate('en', 'c', $k);
                
            }
         
        }
        // this part is to summarize the selections. 
        
        //print_r($this->distlist);
        
        
        $d = DB_DataObject::factory('pressrelease_category');
        $d->whereAddIn('id', explode(',',  $this->distribution_config), 'int');
        $d->selectAdd();
        $d->selectAdd("IF(LENGTH(hgroup), CONCAT(hgroup , ': ', name), name ) as name");
        $d->orderBy('name');
        $ret['beats']  = $d->fetchAll('name' );
        return $ret;
    }
    
    function headlineDash()
    {
        return str_replace(array(" ", "%"), "-",  $this->headline);
    }
    
    function clipping_review($q)
    {
        $ret = $this->toArray();
        
        $p = DB_DataObject::factory('pressrelease_entry');
        $pid = $this->parent_id ? $this->parent_id : $this->id;
        $p->whereAdd("id = $pid OR  parent_id = $pid");
        $p->whereAdd('id != '. $this->id);
        $p->whereAdd('publish_status > -1');
        $p->whereAdd('publish_dt < NOW()  + INTERVAL 24 HOUR'); // timezone!
        $p->orderBy('id DESC');
        $p->selectAdd();
        $p->selectAdd('id,language,headline');
        
        $ret['languages'] = array();
        
        foreach ($p->fetchAll() as $lang){
            $ret['languages'][] = array(
                'id' => $lang->id,
                'language' => $lang->language,
                'language_translate' => $lang->language()
            );
        }
        
        $ret['content_formated'] = $this->content();
        
        $ret['content_data_empty'] = $this->content_data_empty();
        
        $ret['content_about_formated'] = $this->content_about();
        
        return $ret;
    }
    
    function buildDistributionStartNotification()
    {
        $tz_ar = explode('.',  $this->publish_dt_tz);
        
        $offset = 8 - (1 * $tz_ar[0]);
        
        $ptime = date("Y-m-d H:i:s", strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES"));
            
        $nc = DB_DataObject::factory('pressrelease_notify');
        $nc->setFrom(array(
            'ontable' => 'pressrelease_entry',
            'onid' => $this->id,
            'person_id' => 0,
            'field' => 'email',
            'evtype' => 'START'
        ));
        
        if(!$nc->find(true)){
            $nc->setFrom(array(
                'act_when' => $ptime,
                'act_start' => $ptime
            ));
            
            $nc->insert();
            return;
        }
        
        if($nc->delivered()){
            return;
        }
        
        $o = clone ($nc);
        
        $nc->setFrom(array(
            'act_when' => $ptime,
            'act_start' => $ptime
        ));
        
        $nc->update($o);
        
    }
    
    function buildDistributionEndNotification()
    {
        $tz_ar = explode('.',  $this->publish_dt_tz);
        
        $offset = 8 - (1 * $tz_ar[0]) + 1;
        
        $ptime = date("Y-m-d H:i:s", strtotime("{$this->publish_dt}  +  {$offset} HOURS - {$tz_ar[1]} MINUTES"));
            
        $nc = DB_DataObject::factory('pressrelease_notify');
        $nc->setFrom(array(
            'ontable' => 'pressrelease_entry',
            'onid' => $this->id,
            'person_id' => 0,
            'field' => 'email',
            'evtype' => 'END'
        ));
        
        if(!$nc->find(true)){
            $nc->setFrom(array(
                'act_when' => $ptime,
                'act_start' => $ptime
            ));
            
            $nc->insert();
            return;
        }
        
        if($nc->delivered()){
            return;
        }
        
        $o = clone ($nc);
        
        $nc->setFrom(array(
            'act_when' => $ptime,
            'act_start' => $ptime
        ));
        
        $nc->update($o);
    }
    
    function notifySTART($person, $last, $notify, $force)
    {   
        $bcc = $this->distribution_bcc();
        
        $person = DB_DataObject::factory('Person');
        
        if(!$person->get($this->created_by)){
            return false;
        }
        
        $distlistN = count($this->distributionList());
        
        $content = array(
            'template'      => 'DISTRIBUTION_START',
            'person'        => $person,
            'distlistN'     => $distlistN,
            'subject'       => "[PressRelease] Distribution started for #{$this->id} - {$this->headline}.",
        );
        
        if(!empty($bcc)){
            $content['bcc'] = $bcc;
        }
        
        $ret = DB_DataObject::factory('core_email')->send($content, false, false);
        
        $ret['send-to'] = $person->email;
        
        return $ret;
    }

    function notifyEND($person, $last, $notify, $force)
    {
        if(strtotime("NOW") - strtotime($notify->act_when) < 86400){
            $nc = DB_DataObject::factory('pressrelease_notify');
            $nc->evtype = 'MAIL';
            $nc->whereAdd("                        
                pressrelease_notify.event_id  < 1
            ");

            if($nc->count()){
                $next = date('Y-m-d H:i:s', strtotime("+ 1 HOURS"));
                return array('later' => $next);
            }
        }
        
        $bcc = $this->distribution_bcc();
        
        $person = DB_DataObject::factory('Person');
        
        if(!$person->get($this->created_by)){
            return false;
        }
        
        $distlistN = count($this->distributionList());
        
        $delivered = DB_DataObject::factory('pressrelease_notify');
        $delivered->setFrom(array(
            'evtype' => 'MAIL',
            'ontable' => 'pressrelease_entry',
            'onid' => $this->id
        ));
        $delivered->whereAdd("                        
            ( pressrelease_notify.msgid IS NOT NULL AND LENGTH(pressrelease_notify.msgid) > 0) AND pressrelease_notify.event_id  > 0
        ");
        
        $failed = DB_DataObject::factory('pressrelease_notify');
        $failed->setFrom(array(
            'evtype' => 'MAIL',
            'ontable' => 'pressrelease_entry',
            'onid' => $this->id
        ));
        $failed->whereAdd("                        
            (pressrelease_notify.msgid IS NULL OR LENGTH(pressrelease_notify.msgid) < 1) AND pressrelease_notify.event_id  > 0
        ");
            
        $pending = DB_DataObject::factory('pressrelease_notify');
        $pending->setFrom(array(
            'evtype' => 'MAIL',
            'ontable' => 'pressrelease_entry',
            'onid' => $this->id
        ));
        $pending->whereAdd("                        
            pressrelease_notify.event_id  < 1
        ");
        
        $content = array(
            'template'      => 'DISTRIBUTION_END',
            'person'        => $person,
            'distlistN'     => $distlistN,
            'delivered'     => $delivered->count(),
            'failed'        => $failed->count(),
            'pending'       => $pending->count(),
            'subject'       => "[PressRelease] Distribution complete for #{$this->id} - {$this->headline}.",
        );
        
        if(!empty($bcc)){
            $content['bcc'] = $bcc;
        }
        
        $ret = DB_DataObject::factory('core_email')->send($content, false, false);
        
        $ret['send-to'] = $person->email;
        
        return $ret;
        
        
        
    }
    
    function distribution_bcc()
    {
        $bcc = array();
        
        $group = DB_DataObject::factory('groups');
        if($group->get('name', 'pressrelease-bcc-distribution')){
            $member = DB_DataObject::factory('group_members');
            $member->group_id = $group->id;
            $mids = $member->fetchAll('user_id');

            $p = DB_DataObject::factory('Person');
            $p->whereAddIn('id', $mids, 'int');
            $p->active = 1;
            $bcc = $p->fetchAll('email');
        }
        
        return $bcc;
    }
}
