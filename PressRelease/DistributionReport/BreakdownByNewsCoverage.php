<?php

require_once 'Pman/PressRelease/DistributionReport/VolumeOverTime.php';

class Pman_PressRelease_DistributionReport_BreakdownByNewsCoverage extends Pman_PressRelease_DistributionReport_VolumeOverTime {
    
    
    var $template = 'graphs/breakdown_by_news_coverage.html';
    var $driver = "g.pie.js";
    
    /**
     * 
     *
     *
     */
    
    function genJs()
    {
        $data = $this->genData();
        
        $cols = $labels = $titles = array();
        
        foreach($data as $d) {
            $cols[] = $d['qty']*1;
            $labels[] = $d['qty'] . '';
            $titles[] = $d['newsType'] . ' ('. $d['qty'] .')';
        }
       
        $js = "
r.piechart(100, 120, 80, ". json_encode($cols) . ", {
            cut : ". count($cols) .",
            
            legend:  ". json_encode($titles) . ",
            legendpos: 'east'
           
        });
print(r.toSVG());
        ";
        return $js;
    }
    
    
    function genData()
    {
        $cl = DB_DataObject::Factory('Clipping');
        $cl->whereAddIn('project_id',  $this->projects_ids , 'int');
        $cl->whereAdd('rejected = 0');
        $cl->selectAdd();
        $cl->selectAdd("
            release_is_feed,
            count(id) as qty
        ");
        $cl->whereAdd("published < '{$this->release->publish_dt}' + INTERVAL {$this->days} DAY");
        
        $cl->groupBy('release_is_feed');
        $cl->orderBy('qty DESC');
        $data = $cl->fetchAll('release_is_feed', 'qty');
        
        // from release to today
        $out = array();
        foreach($data as $l=>$q) {
            $out[] = array(
                'newsType' =>  empty($l) ? 'Media Write-up Coverage' : 'Online News Posting',
                'qty' => $q
            );
            
        }
        return $out; 
        
    }
   
        
        
        

         
}