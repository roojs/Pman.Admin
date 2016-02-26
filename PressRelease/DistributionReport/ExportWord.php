<?php
require_once 'Pman/PressRelease/DistributionReport.php';

class Pman_PressRelease_DistributionReport_ExportWord extends Pman_PressRelease_DistributionReport {
    
    var $masterTemplate = 'mail/exportmaster.html';
    
    var $lastTask = 'task_create_file';
    
    var $docType = 'Word';
    
    
    function getAuth()
    {
        
        $au = $this->getAuthUser();
        
        $this->authUser = $au;
        return true; // everyone is allowed in.. as it's a public link on the mails..
    }
    
    function post($id = '')
    {
        set_time_limit(0);
        
        if(empty($_REQUEST['release_id'])){
            $this->jerr("no id!?");
        }
        
        $this->release_id = $_REQUEST['release_id'];
        $this->days = empty($_REQUEST['days']) ? $this->days : (int) $_REQUEST['days'];
        $this->direct_news_feed = empty($_REQUEST['direct_news_feed']) ? 0 : 1;
        
        if (isset($_REQUEST['task'])) {
            return $this->nextTask();
        }
        
        $this->buildReport($this->release_id, $this->days, false, $this->direct_news_feed);
        
        if (!empty($_REQUEST['file'])) {
            $this->serveFile($_REQUEST['file']);
        }
        
        $this->createTaskList();
        
    }
    
    function get($id = '')
    {
        if (empty($id)) {
            $this->jerr("no id!?");
        }
        
        $this->release_id = $id;
        $this->days = empty($_REQUEST['days']) ? $this->days : (int) $_REQUEST['days'];
        $this->direct_news_feed = empty($_REQUEST['direct_news_feed']) ? 0 : 1;
        
        return;
    }
    
    function createTaskList()
    {
        $tasks = array();
        
        $types = array(
            'release-logo',
            'volume-over-time',
            'breakdown-language',
            'breakdown-country'
        );
        
        if(!empty($this->direct_news_feed)){
            $types[] = 'breakdown-news-coverage';
        }
        
        $tot = count($this->release->clippings) + count($this->release->clippings_feed) + count($types);
        
        $i = 0;
        
        foreach ($types as $t){
            $i++;
            $tasks[] = array(
                'm' => 'task_create_image',
                't' => $t,
                'id' => $this->release->id,
                'r' => false,
                'desc' => 'Processing image  ' . $i .'/' . $tot
            );
        }
        
        foreach($this->release->clippings as $n => $c){
            $i++;
            $tasks[] = array(
                'm' => 'task_create_image',
                'target' => $c->getStoreName(),
                'mimetype' => $c->mimetype,
                'id' => $c->id,
                'r' => false, // resulting filename.
                'desc' => 'Processing image  ' . $i .'/' . $tot
            );
            
        }
        
        foreach($this->release->clippings_feed as $n => $c){
            $i++;
            $tasks[] = array(
                'm' => 'task_create_image',
                'target' => $c->getStoreName(),
                'mimetype' => $c->mimetype,
                'id' => $c->id,
                'r' => false, // resulting filename.
                'desc' => 'Processing image  ' . $i .'/' . $tot
            );
            
        }
        
        $tasks[] = array(
            'm' => 'task_create_file', 
            'r' => false, //resulting 
            'desc' => 'Creating file',
        );
         
        $this->taskid = md5(time());
        
        $this->tasks = $tasks;
        
        $this->base64Images = (empty($this->base64Images)) ? array() : $this->base64Images;
        
        $this->saveTask(0);
        
    }
    
    function saveTask($n)
    {   
        $_SESSION[get_class($this)][$this->taskid] = array(
            'tasks' => $this->tasks,
            'taskid' => $this->taskid,
            'base64Images' => $this->base64Images
        );
        
        $this->jok(array(
            'total' => count($this->tasks),
            'done' =>  $n,
            'result' => $this->tasks[$n],
            'task' => $this->taskid,
            'desc' => isset($this->tasks[$n])  ? $this->tasks[$n]['desc']: '?'
        ));
    }
    
    function nextTask()
    {   
        $this->taskid = empty($_REQUEST['task']) ?  '' : $_REQUEST['task'];
        
        if (empty($this->taskid) || empty($_SESSION[get_class($this)][$this->taskid])) {
            $this->jerr('invalid task id sent');
        }
        
        foreach($_SESSION[get_class($this)][$this->taskid] as $k=>$v) {
            $this->$k = $v;
        }
        
        foreach($this->tasks as $n=> $t) {
            
            if ($t['r'] !== false) {
                continue;
            }
            
            $m = $t['m'];
            $this->task = $t;
            $this->$m();
            $this->tasks[$n] = $this->task;
            
            if ($m == $this->lastTask) {
                $_SESSION[get_class($this)][$this->taskid] = $this->task['r'];
                $this->jok(array(
                    'file' => basename( $this->task['r'])
                ));
            }
            
            $this->saveTask($n);
        }
        // we must have finished.. = send the resutl of the last task as the return value..
         $this->jerr("no more tasks?");
    }
    
    function task_create_image()
    {
        $this->task['r'] = '';
        
        if(empty($this->task['t']) && !empty($this->task['target']) && !empty($this->task['mimetype'])){
            
            if (preg_match('/^video/i', $this->task['mimetype'])) {
                $this->task['err'] = "Video thumbs not allowed";
                return;

            }
            
            clearstatcache();
            
            if(!file_exists($this->task['target'])){
                $this->task['err'] = "Image does not exist";
                return;
            }
            
            /*
             * more faster then request the image from url
             */
            require_once 'File/Convert.php';
            
            $fc = new File_Convert($this->task['target'], $this->task['mimetype']);
            $img = $fc->convert('image/jpeg', 200,0);
            
            if (!$img) {
                $this->task['err'] = "Could not convert image";
                return;
            }
//            $img = "http://{$this->HTTP_HOST}{$this->baseURL}/Clipping/View/thumb/{$v->id}.jpg?authkey=";
            
            $this->base64Images['clipping-detail-' . $this->task['id']] = array(
                'dataid' => 'clipping-detail-' . $this->task['id'],
                'ext' => 'image/jpeg',
                'data' => base64_encode(file_get_contents($img))
            );
            
            return;
        }
        
        $ff = HTML_FlexyFramework::get();
        $http_host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : 'pman.HTTP_HOST.not.set';
        if (isset($ff->Pman['HTTP_HOST'])) {
            $http_host  = $ff->Pman['HTTP_HOST'];
        }
        $this->HTTP_HOST = $http_host;
        $this->fullBaseImageURL = 'https://'.$http_host . $this->baseURL . '/Images/Thumb';
        
        if($this->task['t'] == 'release-logo'){
            
            $release  = DB_DataObject::Factory('pressrelease_entry');
            $release->get($this->task['id']);
        
            $img = DB_DataObject::factory('Images');
            $c = DB_DataObject::Factory('Companies');
            $c->get($release->client_id);
            $img->imgtype = 'LOGO';
            $logo = $img->gather($c, 'image/%');

            if(!empty($logo)){

                $logo = array_shift($logo);
                
                $url = $logo->getStoreName();
                
                // why is this not using file convert to resize the image?
                
                $imageInfo = getimagesize($url);

                $width = 1.33; // inch

                $height = $logo->height * ($width / $logo->width);

                if($height > 1.33){
                    $height = 1.33;
                    $width = $logo->width * ($height / $logo->height);
                }

                $this->base64Images['release-logo'] = array(
                    'dataid' => 'release-logo-' . $this->task['id'],
                    'ext' => $imageInfo['mime'],
                    'width' => $width,
                    'height' => $height, 
                    'data' => base64_encode(file_get_contents($url))
                );

            }
            
            return;
        }
        
        if($this->task['t'] == 'volume-over-time'){
            $volume = $this->mapurl(
                "https://{$this->HTTP_HOST}{$this->baseURL}/PressRelease/DistributionReport/VolumeOverTime/image?release_id={$this->task['id']}&days={$this->days}"
            );
            $imageInfo = getimagesize($volume);

            $this->base64Images['volume-over-time'] = array(
                'dataid' => 'volume-over-time' . $this->task['id'],
                'ext' => $imageInfo['mime'],
                'data' => base64_encode(file_get_contents($volume))
            );
        }
        
        if($this->task['t'] == 'breakdown-language'){
            
            $breakdownLanguage = $this->mapurl(
                "https://{$this->HTTP_HOST}{$this->baseURL}/PressRelease/DistributionReport/BreakdownByLanguage/image?release_id={$this->task['id']}&days={$this->days}"
            );
            
            $imageInfo = getimagesize($breakdownLanguage);

            $this->base64Images['breakdown-language'] = array(
                'dataid' => 'breakdown-language-' . $this->task['id'],
                'ext' => $imageInfo['mime'],
                'data' => base64_encode(file_get_contents($breakdownLanguage))
            );
            return;
        }
        
        if($this->task['t'] == 'breakdown-country'){
            $breakdownCountry = $this->mapurl(
                "https://{$this->HTTP_HOST}{$this->baseURL}/PressRelease/DistributionReport/BreakdownByCountry/image?release_id={$this->task['id']}&days={$this->days}"
            );
            $imageInfo = getimagesize($breakdownCountry);

            $this->base64Images['breakdown-country'] = array(
                'dataid' => 'breakdown-country-' . $this->task['id'],
                'ext' => $imageInfo['mime'],
                'data' => base64_encode(file_get_contents($breakdownCountry))
            );
            return;
        }
        
        if($this->task['t'] == 'breakdown-news-coverage'){
            $breakdownNewsCoverage = $this->mapurl(
                    "https://{$this->HTTP_HOST}{$this->baseURL}/PressRelease/DistributionReport/BreakdownByNewsCoverage/image?release_id={$this->task['id']}&days={$this->days}"
            );
            $imageInfo = getimagesize($breakdownNewsCoverage);

            $this->base64Images['breakdown-news-coverage'] = array(
                'dataid' => 'breakdown-news-coverage-' . $this->task['id'],
                'ext' => $imageInfo['mime'],
                'data' => base64_encode(file_get_contents($breakdownNewsCoverage))
            );
            return;
        }
        
    }
    
    function task_create_file()
    {
        $this->buildReport($this->release_id, $this->days, false, $this->direct_news_feed);
        
        require_once 'HTML/Template/Flexy.php';
        $template = new HTML_Template_Flexy(array(
            'locale' => !empty($this->authUser) ? $this->authUser->lang :'en'
        ));

        /* compile a text file (email template) */
        $template->compile('mail/dashboard.report.word.html');

        /* use variables from this object to ouput data. */
        $abw = $template->bufferedOutputObject($this);

        $abw = iconv("UTF-8", "UTF-8//IGNORE", $abw);

        // write it to a file..
        $fn = $this->tempName('abw');
        
        file_put_contents($fn, $abw);
        
        $this->task['r'] = $fn;

    }
    
    function serveFile($file)
    {
        $found = false;
        
        foreach($_SESSION[get_class($this)] as $k=>$v) {
            if (!is_string($v)) {
                continue;
            }
            if ($file  == basename($v)) {
                $found = $k;
            }
        }
        if ($found === false) {
            $this->jerr('file not found');
        }
        
        $outfile2 = ini_get('session.save_path') .'/'. $file;
        
        $fn = $this->tempName('docx');
        
        require_once 'File/Convert/AbiToDocx.php';
        $fc=  new File_Convert_AbiToDocx($outfile2);
        $fc->save($fn);
        
        require_once 'File/Convert.php';
            
        $fc = new File_Convert($fn, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        $fn = $fc->convert('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        
        $fc->serve('attachment'); 
        
        exit;
    }
    
    function direct_news_feed_total()
    {
        $rows = array();
        
        if(!empty($this->direct_news_feed)){
            
            $media_total = $this->advalue_total('media');
            $posting_total = $this->advalue_total('posting');
            
            $rows[] = <<<EOF
<p style="Normal" props="font-family:Times New Roman; margin-top:0.0000in; font-style:normal; margin-left:0.1181in; dom-dir:ltr; color:505050; text-indent:0.0000in; text-position:normal; line-height:1.000000; lang:en-US; margin-right:0.0000in; font-size:8pt; text-decoration:none; margin-bottom:0.0000in; font-weight:normal; text-align:left"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Media Write Up Advalue: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">US\$ {$media_total}</c></p>
<p style="Normal" props="font-family:Times New Roman; margin-top:0.0000in; font-style:normal; margin-left:0.1181in; dom-dir:ltr; color:505050; text-indent:0.0000in; text-position:normal; line-height:1.000000; lang:en-US; margin-right:0.0000in; font-size:8pt; text-decoration:none; margin-bottom:0.0000in; font-weight:normal; text-align:left"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Online News Posting Advalue: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">US\$ {$posting_total}</c></p>
EOF;
                         
        }
        
        $advalue_total = $this->advalue_total('all');
                
        $rows[] = <<<EOF
<p style="Normal" props="font-family:Times New Roman; margin-top:0.0000in; font-style:normal; margin-left:0.1181in; dom-dir:ltr; color:505050; text-indent:0.0000in; text-position:normal; line-height:1.000000; lang:en-US; margin-right:0.0000in; font-size:8pt; text-decoration:none; margin-bottom:0.0000in; font-weight:normal; text-align:left"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Total Advalue: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">US\$ {$advalue_total}</c></p>
EOF;

        if(empty($this->direct_news_feed)){
            return implode("\n", $rows);
        }
        
        $media_write_up_total = $this->media_write_up_total();
        $news_online_posting_total = $this->news_online_posting_total();
        
        $rows[] = <<<EOF
<p style="Normal" props="font-family:Times New Roman; margin-top:0.0000in; font-style:normal; margin-left:0.1181in; dom-dir:ltr; color:505050; text-indent:0.0000in; text-position:normal; line-height:1.000000; lang:en-US; margin-right:0.0000in; font-size:8pt; text-decoration:none; margin-bottom:0.0000in; font-weight:normal; text-align:left"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Total Media Write-up Coverage: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">{$media_write_up_total}</c></p>
<p style="Normal" props="font-family:Times New Roman; margin-top:0.0000in; font-style:normal; margin-left:0.1181in; dom-dir:ltr; color:505050; text-indent:0.0000in; text-position:normal; line-height:1.000000; lang:en-US; margin-right:0.0000in; font-size:8pt; text-decoration:none; margin-bottom:0.0000in; font-weight:normal; text-align:left"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Total Online News Posting: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:8pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">{$news_online_posting_total}</c></p>
EOF;
        return implode("\n", $rows);
    }
    
    function breakdown_news_coverage()
    {
        if(empty($this->direct_news_feed)){
            return '';
        }
        
        $top = 12;
        $bot = $top + 1;
        
        $rows = array();
        
        $dataid = $this->base64Images['breakdown-news-coverage']['dataid'];
        
        $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Share of Voice By Type of News Coverage</c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><image dataid="{$dataid}" props="height:2.1528in; width:4.3285in; font-family:Arial"/></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
</cell>
EOF;
        return implode("\n", $rows);
    }
    
    function clippings_summary()
    {
        $top = 12;
        
        if(!empty($this->direct_news_feed)){
            $top += 1;
        }
        
        $bot = $top + 1;
        $rows = array();
        
        if(!empty($this->release->clippings_dist)){
         
            $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Top Media by Reach - Media Write-up Coverage</c></p>
</cell>
EOF;
            $top = $bot;
            $bot++;

            $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:2; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-size:9pt; font-family:Helvetica; font-weight:bold; color:505050">Source</c><c props="font-size:9pt; font-family:Helvetica; color:505050"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:3; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Source Link</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:3; right-attach:4; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Download</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:4; right-attach:5; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Circulation</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
EOF;

            foreach ($this->release->clippings_dist as $k => $v){
                $top = $bot;
                $bot++;

                $url = htmlspecialchars($v->remote_url);

                $mn = htmlspecialchars($v->media_name);
                $lang = htmlspecialchars($v->language_tr);

                $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:2; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$mn} ({$lang})</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:3; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><a xlink:href="{$url}"><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">View</c><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></a></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:3; right-attach:4; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><a xlink:href="https://{$this->HTTP_HOST}{$this->baseURL}/Clipping/View/download/{$v->id}.pdf?authkey="><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">View</c><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></a></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:4; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->circulationFormated()}</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>  
EOF;
            }
        }
        
        if(!empty($this->direct_news_feed) && !empty($this->release->clippings_dist_feed)){
         
            $top = $bot;
            $bot++;
        
            $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Top Media by Reach - Online News Posting</c></p>
</cell>
EOF;
            $top = $bot;
            $bot++;


            $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:2; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-size:9pt; font-family:Helvetica; font-weight:bold; color:505050">Source</c><c props="font-size:9pt; font-family:Helvetica; color:505050"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:3; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Source Link</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:3; right-attach:4; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Download</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:4; right-attach:5; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Circulation</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
EOF;

            foreach ($this->release->clippings_dist_feed as $k => $v){
                $top = $bot;
                $bot++;

                $url = htmlspecialchars($v->remote_url);

                $mn = htmlspecialchars($v->media_name);
                $lang = htmlspecialchars($v->language_tr);

                $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:2; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$mn} ({$lang})</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:3; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><a xlink:href="{$url}"><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">View</c><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></a></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:3; right-attach:4; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><a xlink:href="https://{$this->HTTP_HOST}{$this->baseURL}/Clipping/View/download/{$v->id}.pdf?authkey="><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">View</c><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></a></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:4; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->circulationFormated()}</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>  
EOF;
            }
        }
        
        return implode("\n", $rows);
    }
    
    function clippings_details()
    {
        $top = 14 + count($this->release->clippings_dist);
        
        if(!empty($this->direct_news_feed)){
            $top = 17 + count($this->release->clippings_dist_feed) + count($this->release->clippings_dist);
        }
        
        $bot = $top + 1;
        $rows = array();
        
        if(!empty($this->release->clippings)){
            
            $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Media Write-up Coverage</c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c></c></p>
</cell>
EOF;

            foreach ($this->release->clippings as $k => $v){

                $top = $bot;
                $bot++;

                $url = htmlspecialchars($v->remote_url);
                $headline = htmlspecialchars($v->headline());
                $mn = htmlspecialchars($v->media_name);
                $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:2; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><a xlink:href="https://{$this->HTTP_HOST}{$this->baseURL}/Clipping/View/download/{$v->id}.pdf?authkey="><image dataid="{$this->base64Images['clipping-detail-' . $v->id]['dataid']}" props="height:1.88in; width:1.33in; font-family:Arial"/></a></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Headline: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><a xlink:href="https://{$this->HTTP_HOST}{$this->baseURL}/Clipping/View/download/{$v->id}.pdf?authkey="><c props="font-size:9pt; font-weight:bold; font-family:Helvetica; color:ff0000">{$headline}</c></a></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Media Title: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$mn}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Published: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->published()}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Country: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->country('en')}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Language: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->language('en')}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">AdValue: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">US\${$v->advalue}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Circulation: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->circulationFormated()}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">URL: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><a xlink:href="{$url}"><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$mn}</c></a></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
</cell>
EOF;
            }
        }
        
        if(!empty($this->direct_news_feed) && !empty($this->release->clippings_feed)){
            $top = $bot;
            $bot++;

            $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Online News Posting</c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:404040; font-size:12pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c></c></p>
</cell>
EOF;
        
            foreach ($this->release->clippings_feed as $k => $v){

                $top = $bot;
                $bot++;

                $url = htmlspecialchars($v->remote_url);
                $headline = htmlspecialchars($v->headline());
                $mn = htmlspecialchars($v->media_name);
                $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:2; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><a xlink:href="https://{$this->HTTP_HOST}{$this->baseURL}/Clipping/View/download/{$v->id}.pdf?authkey="><image dataid="{$this->base64Images['clipping-detail-' . $v->id]['dataid']}" props="height:1.88in; width:1.33in; font-family:Arial"/></a></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Headline: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><a xlink:href="https://{$this->HTTP_HOST}{$this->baseURL}/Clipping/View/download/{$v->id}.pdf?authkey="><c props="font-size:9pt; font-weight:bold; font-family:Helvetica; color:ff0000">{$headline}</c></a></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Media Title: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$mn}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Published: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->published()}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Country: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->country('en')}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Language: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->language('en')}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">AdValue: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">US\${$v->advalue}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">Circulation: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->circulationFormated()}</c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">URL: </c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c><a xlink:href="{$url}"><c props="font-family:Helvetica; font-size:9pt; color:ff0000; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$mn}</c></a></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
</cell>
EOF;
            }
        }
        
        return implode("\n", $rows);
    }
    
    function historical_comparison()
    {
        $top = 17 + count($this->release->clippings_dist_feed) + count($this->release->clippings_dist) + count($this->release->clippings_feed) + count($this->release->clippings);
        
        if(!empty($this->direct_news_feed)){
            $top += 1;
        }
        
        $bot = $top + 1;
        $rows = array();
        
        $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:12pt; color:404040; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:12pt; color:404040; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c><c props="font-family:Helvetica; font-size:12pt; color:404040; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Historical Comparison</c></p>
</cell>
EOF;
        $top = $bot;
        $bot++;

        $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:1; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Date</c><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:1; right-attach:2; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Headline</c><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:3; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Clippings</c><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:3; right-attach:4; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Circulation</c><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:4; right-attach:5; top-attach:{$top}">
<p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">Advalue</c><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
EOF;

        
        foreach ($this->history as $k => $v){
            
            $top = $bot;
            $bot++;
            
            $headline = htmlspecialchars($v->headline);
            
            $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:1; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">{$v->publish_dt('d/M/Y')}</c><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:1; right-attach:2; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US">#{$v->id} {$headline}</c><c props="font-family:Helvetica; font-size:9pt; color:505050; text-decoration:none; text-position:normal; font-weight:normal; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:2; right-attach:3; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">{$v->clipping_total}</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:3; right-attach:4; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">{$v->reach_total}</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c></p>
</cell>
<cell props="bot-attach:{$bot}; left-attach:4; right-attach:5; top-attach:{$top}">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US">{$v->advalue_total}</c><c props="font-family:Helvetica; text-decoration:none; color:505050; font-size:9pt; text-position:normal; font-weight:bold; font-style:normal; lang:en-US"></c></p>
</cell>
EOF;
        }
        
        $top = $bot;
        $bot++;
        
        $rows[] = <<<EOF
<cell props="bot-attach:{$bot}; left-attach:0; right-attach:5; top-attach:{$top}; background-color:f4f4f4">
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
    <p style="Normal" props="text-align:left; dom-dir:ltr; margin-left:0.30cm"><c props="font-size:8pt; font-family:Helvetica; color:808080">The news clipping shall not be copied, redistributed, reproduced or passed on directly or indirectly to any 3rd party in whole or in part for any purpose at anytime. This news clipping is intended for client's internal usage only.</c><c props="font-size:8pt; font-family:Helvetica; color:808080"></c></p>
    <p style="Normal" props="margin-left:0.30cm"><c props="font-family:Arial"></c><c></c></p>
</cell>
EOF;
        return implode("\n", $rows);
        
    }
    
}
