<?php

require_once 'Pman/PressRelease/DistributionReport.php';

class Pman_PressRelease_DistributionReport_VolumeOverTime extends Pman_PressRelease_DistributionReport {
    
    var $masterTemplate = 'graphs/master.html';
    var $template = 'graphs/volume_over_time.html';
    var $debugtype = '';
    var $days = 10;
    var $js_head = "

var r = new Raphael(false,600,300);
";
  var $driver = "g.bar.0.51.js";
    /**
     * 
     *
     *
     */
    
    function getAuth()
    {
        return true; // have to allow everyone in here??
    }
    
    function get($id='')
    {
        $this->debugtype = isset($_REQUEST['debug']) ?$_REQUEST['debug'] : '';
        $this->days = isset($_REQUEST['days']) ? (int)$_REQUEST['days'] : $this->days;
        $this->sessionState(0); // turn off session..
        $this->initRelease();
        $this->genSvg();
        exit;
        
          
        
    }
    
    function genJs()
    {
          $data = $this->genData();
        
        $cols = $labels = $titles = array();
        
        foreach($data as $d) {
            $cols[] = $d['qty'];
            $labels[] = $d['qty'] . '';
            $titles[] = $d['datef'] . '';
        }
       
        $js = "
r.text(340, 290, 'Date').attr( { 'font-size': 12, 'font-family':  \"'Fontin Sans', Fontin-Sans, sans-serif\" });
        
r.barchart(30, 30, 560, 250, ". json_encode($cols) . ", {
            labels : ". json_encode($labels) . ",
            axis : '0 0 1 1',
            axisxlabels :  ". json_encode($titles) . ",
            axisystep : 10,
            ymin : 0
        });
print(r.toSVG());
        ";
        
        
        return $js;
    }
    
    function genSvg()
    {
        $bar =  realpath($this->rootDir .'/g.raphael/'.$this->driver) ;
        $js = "
imports.searchPath.push('" . dirname($bar) ."');

Raphael = imports['". basename($bar)."'].Raphael;\n";
        
        $js .=  $this->js_head . $this->genJs();
        
        if ($this->debugtype == 'js') {
            header('Content-type:text/plain');
            echo $js;
            exit;
        }
        
        
        $jsfile = $this->tempName('js');
        file_put_contents($jsfile, $js);
        require_once 'System.php';
        $seed = System::which('seed');
        
        $cmd = "$seed $jsfile";
        if ($this->debugtype == 'cmd') {
            header('Content-type:text/plain');
            echo $cmd;
            exit;
        }
        
        //echo $cmd;exit;
        $res = `$cmd`;
        
        if ($this->debugtype == 'svg') {
            header('Content-type:image/svg+xml');
            echo $res;
            exit;
        }
        //header('Content type: image/svg+xml');
        //echo $res;
        unlink($jsfile);
        $svg = $this->tempName('svg');
        file_put_contents($svg, $res);
        require_once 'File/Convert.php';
        $cv = new File_Convert($svg, 'image/svg'); //??
        //$cv->debug=1;
        $fn = $cv->convert(
                'image/png' ,
                600,
                300
        );
        $cv->serve("image/png");
//        print_r(base64_encode($fn));exit;
        unlink($fn);
        
        
        
        
        exit;
        // run seed with that code...
        
        
    }
    function initRelease()
    {
         // example is #1111 - pocari ?
        $this->release  = DB_DataObject::Factory('pressrelease_entry');
        if (!$this->release->get($_REQUEST['release_id'])) {
            $this->jerr("invalid id");
        }
        $this->pressrelease_id  = (int) $_REQUEST['release_id'];
        //$this->client = $this->release->client();
        
        $versions = $this->release->versionsAll();
        
        require_once 'Pman/Core/I18n.php';
        $x = new Pman_Core_I18n();
        
        $langs=  array();
        
        foreach($versions as $v) {
            $langs[$v->id] = $x->translate('en', 'l', $v->language);
        }
        $this->languages = $langs;
        
         
        $pr = DB_DataObject::Factory('Projects');
        if (!$pr->get('pressrelease_id', $this->release->id)) {
            $this->jerr("invalid release id");
        }
        $this->project = $pr;
         $pr = DB_DataObject::Factory('Projects');
        $pr->whereAddIn('pressrelease_id', array_keys($this->languages), 'int');
        
        $this->projects_ids = $pr->fetchAll('id');
    }
    
    function genData()
    {
        
        // get a history summary of dates..
        //DB_DataObject::debugLevel(1);
        
        
       
       
        //DB_Dataobject::debugLevel(1);
        // now let's get the clippings..
        $cl = DB_DataObject::Factory('Clipping');
          $cl->whereAddIn('project_id',  $this->projects_ids , 'int'); 
        //$cl->project_id = $this->project->id;
        $cl->whereAdd('rejected = 0');
        $cl->orderBy('circulation DESC');
        $cl->selectAdd();
        $cl->selectAdd("
            DATE_FORMAT(CASE WHEN(published) < '{$this->release->publish_dt}' THEN '{$this->release->publish_dt}' ELSE published END, '%Y-%m-%d') as created_d,
            count(id) as qty
        ");
        $cl->whereAdd("published < '{$this->release->publish_dt}' + INTERVAL {$this->days} DAY");
        $cl->groupBy('created_d');
        $cl->orderBy('created_d ASC');
        $data = $cl->fetchAll('created_d', 'qty');
        // from release to today
        $out = array();
        $dn=0;
        for($d = date('Y-m-d', strtotime($this->release->publish_dt));
            $d <= date('Y-m-d');
            $d = date('Y-m-d',strtotime($d . ' + 1 DAY'))) {
            
            if ($dn > $this->days) {
                continue;
            }
            $dn++;
            $out[] = array(
                'date' =>  $d,
                'datef' =>date('d/M', strtotime($d)),
                'qty' => isset($data[$d]) ? $data[$d] : 0
            );
            
        }
        
       return $out;
        
    }
    function post()
    {
        
         $this->sessionState(0);
        require_once 'File/MimeType.php';
        $y = new File_MimeType();
        $src_ext = $y->toExt( 'image/svg' );
        
        
        $tmp = $this->tempName('svg');
        file_put_contents($tmp, $_REQUEST['data']);
   
        require_once 'File/Convert.php';
        $cv = new File_Convert($tmp, 'image/svg'); //??
        
        $fn = $cv->convert(
                'image/png' ,
                600,
                300
        );
        $target = dirname($tmp).'/'. basename($_REQUEST['fn']);
        // where should we put this?
        copy($fn,$target);
        unlink($fn);
        $this->jok($target);
      
    }
    function buildImage($prid)
    {
        $this->pressrelease_id = $prid;
        require_once 'System.php';
        $wk = System::which('wkhtmltopdf-0.10');
        if (!$wk) {
            $wk = System::which('wkhtmltopdf');
        }
        $xv = System::which('xvfb-run');
        
        
        $tmp = $this->tempName('png');
        $tmpb = basename($tmp);
        $urlb = explode('_', get_class($this));
        array_shift($urlb);
        $url =  implode('/',$urlb);
        $host = empty($_SERVER['HTTP_HOST']) ? 'release.media-outreach.com' : $_SERVER['HTTP_HOST'];
        
        $cmd = "$xv -a $wk --javascript-delay 1000  'http://" . $_SERVER['HTTP_HOST'] .
                $this->baseURL . "/{$url}?release_id=$prid&fn=$tmpb'  /dev/null";
        `$cmd`;
        
        for($i = 0; $i < 10;$i++) { 
       // echo $cmd;
            sleep(1);
            
            clearstatcache();
            if (file_exists($tmp)) {
                break;
            }
        }
        
        if (!file_exists($tmp)) {
            echo $cmd;
            return false;
        }
        return $tmp;
    }
    function serveImage($tmp)
    {
        require_once 'File/Convert.php';
        $cv = new File_Convert($tmp, 'image/png'); //??
        $fa = $cv->convert('image/png');
        $cv->serve('image/png');
        unlink($fa);
        unlink($tmp);
        exit;
    }
    function storeImage($fn)
    {
        $n = array_pop(explode('_',get_class($this)));
        $i = DB_DataObject::factory('Images');
        $i->setFrom(array(
                'ontable' => 'pressrelease_entry_graph',
                'onid' => $this->pressrelease_id ,
                'imgtype' => 'CACHED_GRAPH',
        ));
        $ii = clone($i);
        $ii->filename = $n . '.png';
        if ($ii->count()) {
           
            $ii->find();
            while ($ii->fetch()) {
                $ii->beforeDelete();
                $ii->delete();
            }
        }
        
        
        $i->createFrom($fn, $n.'.png');
        return $i;
    }
    function serveStored($prid)
    {
        //DB_DataObject::debugLevel(1);
        $n = array_pop(explode('_',get_class($this)));
        $i = DB_DataObject::factory('Images');
        $i->setFrom(array(
                'ontable' => 'pressrelease_entry_graph',
                'onid' => $prid ,
                'imgtype' => 'CACHED_GRAPH',
                'filename' => $n . '.png'
        ));
        if ($i->find(true)) {
            $fc= $i->toFileConvert();
            $fa = $fc->convert('image/png');
            $fc->serve('image/png');
            unlink($fa);
            unlink($tmp);
            exit; // return true?
        }
        return false;
        
    }
        
        

         
}