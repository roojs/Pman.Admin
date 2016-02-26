<?php

require_once 'Pman/PressRelease/DistributionReport/VolumeOverTime.php';

class Pman_PressRelease_DistributionReport_BreakdownByReach extends Pman_PressRelease_DistributionReport_VolumeOverTime {
    
    
    var $template = 'graphs/breakdown_by_reach.html';
    var $driver = "g.pie.js";
    
    
          
     function genJs()
    {
        $data = $this->genData();
        
        $cols = $labels = $titles = array();
        
        foreach($data as $d) {
            $cols[] = $d['qty']*1;
            $labels[] = $d['qty'] . '';
            $titles[] = $d['media_name'] . ' ('. $d['qtyf'] .')';
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
        
        
        //DB_Dataobject::debugLevel(1);
        // now let's get the clippings..
        $cl = DB_DataObject::Factory('Clipping');
        $cl->whereAddIn('project_id',  $this->projects_ids , 'int');
        //$cl->project_id = $this->project->id;
        $cl->whereAdd('rejected = 0');
        $cl->orderBy('circulation DESC');
        $cl->selectAdd();
        $cl->selectAdd("
            media_name,
            sum(circulation) as qty
        ");
        $cl->whereAdd("published < '{$this->release->publish_dt}' + INTERVAL {$this->days} DAY");
        $cl->groupBy('media_name');
        $cl->orderBy('qty DESC');
        $cl->limit(20);
        $data = $cl->fetchAll('media_name', 'qty');
        //print_r($data);
        // from release to today
        $out = array();
        foreach($data as $l=>$q) {
            $out[] = array(
                'media_name' =>  $l,
                'qty' => $q,
                'qtyf' => number_format($q,0)
            );
            
        }
        return $out;
        
    }
   
        
        
        

         
}