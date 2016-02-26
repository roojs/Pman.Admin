<?php

require_once 'Pman/PressRelease/DistributionReport/VolumeOverTime.php';

class Pman_PressRelease_DistributionReport_BreakdownByCountry extends Pman_PressRelease_DistributionReport_VolumeOverTime {
    
    
    var $template = 'graphs/breakdown_by_country.html';
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
            $titles[] = $d['country'] . ' ('. $d['qty'] .')';
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
            i18n_translate('c', country, 'en') as country_tr,
            count(id) as qty
        ");
        $cl->whereAdd("published < '{$this->release->publish_dt}' + INTERVAL {$this->days} DAY");
        $cl->groupBy('country_tr');
        $cl->orderBy('qty DESC');
        $data = $cl->fetchAll('country_tr', 'qty');
        //print_r($data);
        // from release to today
        $out = array();
        foreach($data as $l=>$q) {
            $out[] = array(
                'country' =>  $l,
                'qty' => $q
            );
            
        }
        return $out; 
        
    }
   
        
        
        

         
}