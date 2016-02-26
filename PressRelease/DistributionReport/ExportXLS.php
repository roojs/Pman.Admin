<?php
require_once 'Pman/PressRelease/DistributionReport/ExportWord.php';

class Pman_PressRelease_DistributionReport_ExportXLS extends Pman_PressRelease_DistributionReport_ExportWord {
    
    var $masterTemplate = 'mail/exportmaster.html';
    
    var $lastTask = 'task_create_file';
    
    var $docType = 'Excel';
    
    function createTaskList()
    {
        $tasks = array();
        
        $tot = count($this->release->clippings) + count($this->release->clippings_feed);
        
        $i = 0;
        
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
        
        $this->ImageStoreName = (empty($this->ImageStoreName)) ? array() : $this->ImageStoreName;
        
        $this->saveTask(0);
        
    }
    
    function saveTask($n)
    {
        $_SESSION[get_class($this)][$this->taskid] = array(
            'tasks' => $this->tasks,
            'taskid' => $this->taskid,
            'ImageStoreName' => $this->ImageStoreName
        );
        
        $this->jok(array(
            'total' => count($this->tasks),
            'done' =>  $n,
            'result' => $this->tasks[$n],
            'task' => $this->taskid,
            'desc' => isset($this->tasks[$n])  ? $this->tasks[$n]['desc']: '?'
        ));
    }
    
    function task_create_image()
    {
        $this->task['r'] = '';
        
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
        $img = $fc->convert('image/x-ms-bmp', 75, 0);

        if (!$img) {
            $this->task['err'] = "Could not convert image";
        }

        $this->ImageStoreName[$this->task['id']] = $img;

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
        require_once 'File/Convert.php';
        $fc=  new File_Convert($outfile2, 'application/vnd.ms-excel');
        $fn = $fc->convert('application/vnd.ms-excel'); 
        $fc->serve('attachment'); 
        
        exit;
    }
    
    function task_create_file()
    {
        $this->buildReport($this->release_id, $this->days, false, $this->direct_news_feed);
        
        require_once 'Spreadsheet/Excel/Writer.php';
        
        $outfile2 = $this->tempName('xls') ;
        $workbook = new Spreadsheet_Excel_Writer($outfile2);
        $workbook->setVersion(8);
        
        $format_top = &$workbook->addFormat();
        $format_top->setAlign('top');
        $format_top->setTextWrap(1);
        
        $format_top_blod_red = &$workbook->addFormat();
        $format_top_blod_red->setAlign('top');
        $format_top_blod_red->setBold(1);
        $format_top_blod_red->setColor('red');
        $format_top_blod_red->setTextWrap(1);
        
        $format_us = &$workbook->addFormat();
        $format_us->setAlign('top');
        $format_us->setTextWrap(1);
        $format_us->setNumFormat('"US$"#,##0_);("US$"#,##0)');

        $format_num = &$workbook->addFormat();
        $format_num->setAlign('top');
        $format_num->setTextWrap(1);
        $format_num->setNumFormat('#,##0');

        $format_link = &$workbook->addFormat();
        $format_link->setAlign('top');
        $format_link->setTextWrap(1);
        $format_link->setColor('blue');
        $format_link->setUnderline(1);
        $this->format_link = $format_link;

        
        // Creating a worksheet
        $worksheet = &$workbook->addWorksheet('DistributionReport');
        $worksheet->setInputEncoding('UTF-8'); 
        
        $worksheet->setMerge(1, 0, 1, 9);
        $worksheet->write(1, 0, "Media OutReach News Dashboard - {$this->days()} Day Report", $format_top);
        
        $worksheet->setMerge(3, 0, 3, 9);
        $worksheet->write(3, 0, "Description : {$this->release->headline}", $format_top);
        
        $worksheet->setMerge(5, 0, 5, 9);
        $worksheet->write(5, 0, 'Release Details', $format_top);
        
        $last = 5;
        foreach ($this->releases as $r){
            $last++;
            $worksheet->setMerge($last, 0, $last, 9);
            $worksheet->write($last, 0, "#{$r->id} - {$r->publish_dt('d F Y h:ia')} - {$r->inlanguages}", $format_top);
        }
        
        $summary = array();
        $country = array();
        
        $ad_value_total = 0;
        $media_ad_value_total = 0;
        $posting_ad_value_total = 0;
        $circulation_total = 0;
        $country_total = array(
            'media_write_up' => 0,
            'online_news_posting' => 0,
            'total_clipping' => 0
        );
        
        $all_clippings = array_merge($this->release->clippings, $this->release->clippings_feed);
        
        foreach($all_clippings as $r => $cl) {
            $title = $cl->mediaTypeToString();
            if(!isset($summary[$title])){
                $summary[$title] = array(
                    'ad_value' => 0,
                    'media_ad_value' => 0,
                    'posting_ad_value' => 0,
                    'circulation' => 0
                );
            }
            
            if(!isset($country[$cl->country_name])){
                $country[$cl->country_name] = array(
                    'media_write_up' => 0,
                    'online_news_posting' => 0,
                    'total_clipping' => 0
                );
            }
            
            $summary[$title]['media_ad_value'] += empty($cl->release_is_feed) ? 2000 : 0;
            $summary[$title]['posting_ad_value'] += empty($cl->release_is_feed) ? 0 : 1000;
            $summary[$title]['ad_value'] += empty($cl->release_is_feed) ? 2000 : 1000;
            $summary[$title]['circulation'] += $cl->circulation;
            
            $country[$cl->country_name]['media_write_up'] += empty($cl->release_is_feed) ? 1 : 0;
            $country[$cl->country_name]['online_news_posting'] += empty($cl->release_is_feed) ? 0 : 1;
            $country[$cl->country_name]['total_clipping'] += 1;
            
            $media_ad_value_total += empty($cl->release_is_feed) ? 2000 : 0;
            $posting_ad_value_total += empty($cl->release_is_feed) ? 0 : 1000;
            $ad_value_total += empty($cl->release_is_feed) ? 2000 : 1000;
            $circulation_total += $cl->circulation;
            
            $country_total['media_write_up'] += empty($cl->release_is_feed) ? 1 : 0;
            $country_total['online_news_posting'] += empty($cl->release_is_feed) ? 0 : 1;
            $country_total['total_clipping'] += 1;
        }
        
        $last++;$last++;
        
        if(empty($this->direct_news_feed)){
            $worksheet->write($last, 0, "Summary", $format_top);
            $worksheet->write($last, 1, "AdValue", $format_top);
            $worksheet->write($last, 2, "Circulation", $format_top);


            foreach($summary as $k => $v) {
                $last++;
                $worksheet->write($last, 0, $k, $format_top);
                $worksheet->write($last, 1, $v['ad_value'],  $format_us);
                $worksheet->write($last, 2, $v['circulation'],$format_num);
            }
            $last++;$last++;

            $worksheet->write($last, 0, "Total", $format_top);
            $worksheet->write($last, 1, $ad_value_total,  $format_us);
            $worksheet->write($last, 2, $circulation_total,$format_num);
            $last++;$last++;
            
            $worksheet->setMerge($last, 0, $last, 1);
        
            $worksheet->write($last, 0, "Breakdown by Country", $format_top);

            foreach($country as $k => $v){
                $last++;
                $worksheet->write($last, 0, $k, $format_top);
                $worksheet->write($last, 1, $v['total_clipping'], $format_num);
            }
            $last++;
            $worksheet->write($last, 0, 'Total:', $format_top);
            $worksheet->write($last, 1, $country_total['total_clipping'], $format_num);
            $last++;$last++;
        } else {
            $worksheet->write($last, 0, "Summary", $format_top);
            $worksheet->write($last, 1, "Media Write Up Advalue", $format_top);
            $worksheet->write($last, 2, "Online News Posting Advalue", $format_top);
            $worksheet->write($last, 3, "Total AdValue", $format_top);
            $worksheet->write($last, 4, "Circulation", $format_top);


            foreach($summary as $k => $v) {
                $last++;
                $worksheet->write($last, 0, $k, $format_top);
                $worksheet->write($last, 1, $v['media_ad_value'], $format_us);
                $worksheet->write($last, 2, $v['posting_ad_value'], $format_us);
                $worksheet->write($last, 3, $v['ad_value'], $format_us);
                $worksheet->write($last, 4, $v['circulation'], $format_num);
                
            }
            $last++;$last++;
            
            $worksheet->write($last, 0, "Total", $format_top);
            $worksheet->write($last, 1, $media_ad_value_total, $format_us);
            $worksheet->write($last, 2, $posting_ad_value_total, $format_us);
            $worksheet->write($last, 3, $ad_value_total, $format_us);
            $worksheet->write($last, 4, $circulation_total, $format_num);

            $last++;$last++;
            
            $worksheet->write($last, 0, "Breakdown by Country", $format_top);
            $worksheet->write($last, 1, "Media Write Up", $format_top);
            $worksheet->write($last, 2, "Online News Posting", $format_top);
            $worksheet->write($last, 3, "Total Clippings", $format_top);

            foreach($country as $k => $v){
                $last++;
                $worksheet->write($last, 0, $k, $format_top);
                $worksheet->write($last, 1, $v['media_write_up'], $format_num);
                $worksheet->write($last, 2, $v['online_news_posting'], $format_num);
                $worksheet->write($last, 3, $v['total_clipping'], $format_num);
            }
            $last++;$last++;
            $worksheet->write($last, 0, 'Total:', $format_top);
            $worksheet->write($last, 1, $country_total['media_write_up'], $format_num);
            $worksheet->write($last, 2, $country_total['online_news_posting'], $format_num);
            $worksheet->write($last, 3, $country_total['total_clipping'], $format_num);
            $last++;$last++;
        }
        
        $cols = array(
            array(
                'header'=> "Thumbnail",
                'dataIndex'=> 'id',
                'width'=>  75,
                'renderer' => array($this, 'getThumb')
            ),
            array(
                'header'=>"Headline",
                'dataIndex'=> 'headline',
                'width'=> 200,
                'renderer' => array($this, 'headline')
            ),
            array(
                'header'=>"Media Title",
                'dataIndex'=> 'media_name',
                'width'=> 100
            ),
            array(
                'header'=>"Published",
                'dataIndex'=> 'published',
                'width'=> 75,
                'txtrenderer' => array($this, 'published')
            ),
            array(
                'header'=>"Country",
                'dataIndex'=> 'country',
                'width'=> 50,
                'txtrenderer' => array($this, 'country')
            ),
            array(
                'header'=>"Language",
                'dataIndex'=> 'language',
                'width'=> 50,
                'txtrenderer' => array($this, 'language')
            ),
            array(
                'header'=>"AdValue",
                'dataIndex'=> 'ad_value',
                'width'=> 50,
                'format' => $format_us,
                'txtrenderer' => array($this, 'advalue')
            ),
            array(
                'header'=>"Circulation",
                'dataIndex'=> 'circulation',
                'width'=> 60,
                'format' => $format_num
            ),
            array(
                'header'=>"URL",
                'dataIndex'=> 'remote_url',
                'width'=> 100,
                'txtrenderer' => array($this, 'remote_url')
            )
        );
        
        if(!empty($this->release->clippings)){
            $last++;$last++;
        
            $worksheet->setMerge($last, 0, $last, 8);

            $worksheet->write($last, 0, "Media Write-up Coverage", $format_top_blod_red);

            $last++;$last++;

            foreach($cols as $c => $cfg) {
                $h = $cfg['header'];
                $worksheet->write($last, $c, $h, $format_top);
                $worksheet->setColumn ($c, $c, $cfg['width'] / 5);
            }

            foreach($this->release->clippings as $r => $cl) {
                $last++;

                $worksheet->setRow($last, 85);

                foreach($cols as $c => $cfg) {

                    $v = isset($cl->{$cfg['dataIndex']}) ? $cl->{$cfg['dataIndex']} : '';

                    if (isset($cfg['renderer'])) {
                        call_user_func($cfg['renderer'], $cl->{$cfg['dataIndex']}, $worksheet, $last, $c, $cl);
                        continue;
                    }

                    if (isset($cfg['txtrenderer'])) {
                        $v = call_user_func($cfg['txtrenderer'], $cl->{$cfg['dataIndex']}, $worksheet, $last, $c, $cl);
                    }

                    if(empty($v)){
                        continue;
                    }

                    $v = @iconv('UTF-8', 'UTF-8//IGNORE', $v);

                    $format = isset($cfg['format']) ? $cfg['format'] : $format_top;

                    $worksheet->write($last, $c, $v, $format);
                }
            }
        }
        
        
        if(!empty($this->direct_news_feed) && !empty($this->release->clippings_feed)){
            $last++;$last++;
        
            $worksheet->setMerge($last, 0, $last, 8);

            $worksheet->write($last, 0, "Online News Posting", $format_top_blod_red);

            $last++;$last++;
            
            foreach($cols as $c => $cfg) {
                $h = $cfg['header'];
                $worksheet->write($last, $c, $h, $format_top);
                $worksheet->setColumn ($c, $c, $cfg['width'] / 5);
            }

            foreach($this->release->clippings_feed as $r => $cl) {
                $last++;

                $worksheet->setRow($last, 85);

                foreach($cols as $c => $cfg) {

                    $v = isset($cl->{$cfg['dataIndex']}) ? $cl->{$cfg['dataIndex']} : '';

                    if (isset($cfg['renderer'])) {
                        call_user_func($cfg['renderer'], $cl->{$cfg['dataIndex']}, $worksheet, $last, $c, $cl);
                        continue;
                    }

                    if (isset($cfg['txtrenderer'])) {
                        $v = call_user_func($cfg['txtrenderer'], $cl->{$cfg['dataIndex']}, $worksheet, $last, $c, $cl);
                    }

                    if(empty($v)){
                        continue;
                    }

                    $v = @iconv('UTF-8', 'UTF-8//IGNORE', $v);

                    $format = isset($cfg['format']) ? $cfg['format'] : $format_top;

                    $worksheet->write($last, $c, $v, $format);
                }
            }
        }
        
        $workbook->close();
     
        $this->task['r'] = $outfile2;
        

    }
    
    function getThumb($v, $ws, $r, $c, $cl) 
    {
        $fn = false;
        
        if(!empty($this->ImageStoreName[$cl->id]) && file_exists($this->ImageStoreName[$cl->id])){
            $fn = $this->ImageStoreName[$cl->id];
        }
        
        if (!$fn) {
            return;
        }
        
        $ws->insertBitmap($r, $c, $fn, 0, 0, 1, 1); 
        
        return false;
    }
    
    function headline($v, $ws, $r, $c, $cl)
    {
        $ret = $cl->headline();
        $ret = @iconv('UTF-8', 'UTF-8//IGNORE', substr($ret,0,128));
        $url = "https://{$_SERVER['HTTP_HOST']}{$this->baseURL}/Clipping/View/download/{$cl->id}.pdf?authkey=";
        $ret = strlen($ret) ? $ret : 'Missing Headline';
        
        $ws->writeURL($r,$c, $url, $ret, $this->format_link);
        
        return false;
    }
    
    function published($v, $ws, $r, $c, $cl)
    {
        return date('d/M/Y', strtotime($v));
        
    }
    
    function country($v, $ws, $r, $c, $cl)
    {
        $x = new Pman_Core_I18n();
        return $x->translate($this->authUser, 'c', $v);
    }
    
    function language($v, $ws, $r, $c, $cl)
    {
        $x = new Pman_Core_I18n();
        return $x->translate($this->authUser, 'l', $v);
    }
    
    function advalue($v, $ws, $r, $c, $cl)
    {
        return empty($cl->release_is_feed) ? 2000 : 1000;
    }
    
    function remote_url($v, $ws, $r, $c, $cl)
    {
        if (!in_array($cl->media_type , array('ONLINE', 'BLOG',  'FACEBOOK'))) {
            return;
        }
        if (empty($v)) {
            return '';
        }
        
        $ws->writeURL($r, $c, $v, $v, $this->format_link);
        
        return false;
        
    }
}
