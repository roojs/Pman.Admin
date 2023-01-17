<?php


require_once 'Pman/Core/Cli.php';
class Pman_Admin_Tools_LoadTest extends Pman_Core_Cli
{
    
    static $cli_desc = "Load testing for a domain";
    
    static $cli_opts = array(
        
        'per_second' => array(
            'desc' => 'Request per second (default 1)',
            'default' => '2',
            'short' => 'P',
            'max' => 1
           
        ),
        
        'timeout' => array(
            'desc' => 'Timeout in seconds',
             'default' => '5',
            'short' => 'T' ,
            'max' => 1
        ),
        'total' => array(
            'desc' => 'Total tests (20)',
             'default' => '20',
            'short' => 't' ,
            'max' => 1
        ),
        
    );
    // try and do some load testing..
    var $total = 20; // total number of tests to run.
    var $timeout = 5; // for each request.
    var $per_second = 2; // how many per second.
    var $host = 'www-new.regulationasia.com';
    var $url = 'https://sg2-web.regulationasia.com/';
    
    var $cmd = ""; // filled in by initCmd
    
    var $started = 0;
    var $done = array();
    var $pool = array();
    function get($r,$opts=array())    
    {

       // print_R($opts);exit;
        foreach($opts as $k=>$v) {
            $this->{$k} = $v;
        }
        $this->initCmd();

        echo "Run:
        
Request Per Second: {$this->per_second}
No. Requests : {$this->total}
Timeout: {$this->timeout}
URL: {$this->url}
Host: {$this->host}
CMD: {$this->cmd}

";  
        
        
        while (true) {
             
            
            $ps = $this->poolsize();
             
            if ($this->started >= $this->total) {
                if ($ps == 0) {
                    break;
                }
                usleep((1.0/$this->per_second) * 1000000);
                continue;
            }
            // run it..
            $this->run();
            $this->started++;
            //echo "Sleep: " . ((1.0/$this->per_second) * 1000000) . "\n";
            usleep((1.0/$this->per_second) * 1000000);
            
        }
        $this->displayResults();
        //print_R($this->done);
        exit;
    }
    var $log = array();
    var $keynames = array();
    function initCmd()
    {
        require_once 'System.php';
        $curl = System::which('curl');
        $this->cmd = implode(" ", array(
                $curl,
                "--max-time " , $this->timeout , 
                "-s -o /dev/null -k ",
                "-H \"Host: {$this->host}\"",
                "\"{$this->url}\"",
                "-w \"%{http_code},%{size_download},%{time_connect},%{time_starttransfer},%{time_total}\n\""
        ));
        
        $sn =  $_SERVER["SCRIPT_NAME"];
        
        $this->cwd = $sn[0] == '/' ? dirname($sn) : dirname(realpath(getcwd() . '/'. $sn));
        
        $this->keynames =array(
            'success',
            'size',
            'connect',
            'building',
            'sent'
        );
        foreach($this->keynames as $k=>$v) {
            $this->log[$v] = array();
        }
        
        
    }
    
    function run()
    {
       
         
         
        $tn =  $this->tempName('stdout', true);
        $descriptorspec = array(
            0 => array("pipe", 'r'),  // stdin is a pipe that the child will read from
            1 => array("file", $tn, 'w'),  // stdout is a pipe that the child will write to
            2 => array("pipe", "w") // stderr is a file to write to
        );
        
         
        //$cmd = 'exec ' . $php . ' ' . $app . ' ' . $cmdOpts; //. ' &';
        
       
        $pipe = array();
         
        //echo date("H:i:s"). ":Start: {$this->started} : {$this->cmd}\n";
        
        $p = proc_open($this->cmd, $descriptorspec, $pipes,  $this->cwd  );
        $info =  proc_get_status($p);
        
         
        $this->pool[] = array(
                'proc' => $p,
                'pid' => $info['pid'],
                'out' => $tn,
                'id' => $this->started,
                //'cmd' => $cmd,
                'pipes' => $pipes,
                'started' => time()
        );
    }   
       
    
    
    function poolsize()
    {
        $pool = array();
        clearstatcache();
         
        foreach($this->pool as $p) {
             
         
            $info =  proc_get_status($p['proc']);
            
            // update if necessday.
            if ($info['pid'] && $p['pid'] != $info['pid']) {
                $p['pid'] = $info['pid'];
            }
            
            
            if ($info['running']) {
            
                $pool[] = $p;
                continue;
            }
            // closed...
            
            
            fclose($p['pipes'][0]);
            fclose($p['pipes'][2]);
            proc_close($p['proc']);
            $res = trim(file_get_contents($p['out']));
            
            $p['data'] = explode(",", $res);
            $this->done[] = $p;
            foreach($p['data'] as $i=>$v) {
                $this->log[$this->keynames[$i]][]  = $v;
            }
            $suc = $p['data'][0] == 200 ? 'Done' : 'Fail';
            
            echo date("H:i:s"). ":{$suc}: ". (1+$p['id']). "/{$this->total}: ";
            $this->displayResults();
            
            
            @unlink($p['out']);
            
        }
        $this->pool = $pool;
        return count($pool);
        
    }
    
    function displayResults()
    {
        $log = $this->log;
        // we could slice log values to get recent.. // to show current trend.
        
        
        $done = count($this->done);
        echo
            "Success Rate: ". number_format(100*(count(array_filter($log['success'], function($s) { return $s == 200; })) / $done), 0) . '%'.
            "   Largest: " . number_format(max($log['size']),0) .'b'.  // these ignore failures.
            "   Smallest: " . number_format(min($log['size']),0) .'b'.
            "   Av.Connect: ".  number_format(array_sum($log['connect'])/$done, 2) .'s'.
            "   Average Before Output Time: ", number_format(array_sum($log['building'])/$done, 2) .'s'.
            "   Average Load Time: " .number_format(array_sum($log['sent'])/$done, 2) .'s' .
            "   Load: {$this->per_second} req/s" .
            "\n";
            
            
            
             
        
        
        
    }

}