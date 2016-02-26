<?php

require_once 'Pman.php';

class Pman_PressRelease_ExcelToText extends Pman
{
    function getAuth() 
    {
        $ff = HTML_Flexyframework::get();
        if ($ff->cli) {
            return true;
        }
        $au = $this->getAuthUser();
        if (!$au) {
             $this->jerr("Not authenticated", array('authFailure' => true));
        }
        $this->authUser = $au;
        // check that it's a supplier!!!! 
        
        return true; 
    }
    function get()
    {
        $this->process('/home/alan/financial spreadsheet.xls');
        
    }
    function post()
    {
        if (empty($_FILES['imageUpload']['tmp_name']) || 
            empty($_FILES['imageUpload']['name']) || 
            empty($_FILES['imageUpload']['type'])
        ) {
            $this->jerr ("Missing file details");
            exit;
        }
        $this->process($_FILES['imageUpload']['tmp_name']);
    }
        
    function process($file)
    {
        require_once 'System.php';
        $xlhtml = System::which('xlhtml');
        $cmd = "$xlhtml -csv -xp:0 ". escapeshellarg($file);
        
        
        $data= `$cmd`;
        $fh = fopen('php://memory', 'rw');
        fputs($fh,$data);
        fseek($fh,0);
        $rows = array();
        $max = array();
        while (false !== ($row = fgetcsv($fh))) {
           // $row = fgetcsv($fh);
            
            foreach($row as $i=>$c) {
                $c = preg_replace('/[\t \n]+/', ' ', $c);
                $row[$i] = trim($c);
            }
           // var_dump($row);
          //  print_r($max);
            $rows[] = $row;
        }
       // print_r($max);
        $out = "<PRE><table>\n";
        
        foreach($rows as $r) {
            $out.='<tr>';
            foreach($r as $i=>$c) {
                
                $out .= '<td align="' . ($i ? 'right' : 'left') . '">'. htmlspecialchars($c) . "</td>\n";
            }
            $out.="</tr>\n";
        }
        
        
        //echo $out;
        $out.="</table></PRE>";
        
        return $this->jok($out);

        
        
    }
    function mb_str_pad ($input, $pad_length, $pad_string, $pad_style, $encoding="UTF-8") {
        $len = $pad_length - mb_strlen($input,$encoding);
        $pad = str_repeat(html_entity_decode(' ', ENT_NOQUOTES, "UTF-8"), $len);
        return $pad_style == STR_PAD_LEFT ? ($input . $pad) : ($pad . $input);
    } 
    
}