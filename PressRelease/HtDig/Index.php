<?php

/**
 * Description of Index
 *
 * @author chris
 */
//
require_once 'Pman.php';
class Pman_PressRelease_HtDig_Index extends Pman
{
    //put your code here
    
    var $options = array(
        /**
         * # VarDir /usr/local/mnogosearch/var
         * # You may choose alternative working directory for 
         * # search results cache:
         */
//        'VarDir' => '',
        /**
         * # DBAddr <URL-style database description>
         * # Options (type, host, database name, port, user and password) 
         * # to connect to SQL database.
         * # Should be used before any other commands.
         * # Has global effect for whole config file.
         * # Format:
         * #DBAddr <DBType>:[//[DBUser[:DBPass]@]DBHost[:DBPort]]/DBName/[?dbmode=mode]
         */
        'DBAddr' => 'sqlite3://$(DBPath)',
        /**
         * # LocalCharset <charset>
         * # Defines the charset which will be used to store data in the database.
         * # All other character sets will be converted into the given charset.
         * # Take a look into mnoGoSearch documentation for detailed explanation 
         * # how to choose a LocalCharset depending on languages used on your site(s).
         * # This command should be used once and takes global effect for the config file.
         * # Only most popular charsets used in Internet are written here.
         * # Take a look into the documentation to check the whole list of
         * # supported charsets.
         */
        'LocalCharset' => 'UTF-8',
        /**
         * # CrossWords yes/no
         * # Whether to build CrossWords index
         * # Default value is no
         */
        'CrossWords' => 'yes',
        /**
         * # Disallow [Match|NoMatch] [NoCase|Case] [String|Regex] <arg> [<arg> ... ]
         * # Use this to disallow URLs that match (doesn't match) given argument.
         * # The meaning of first three optional parameters is exactly the same 
         * # with "Allow" command.
         * # You can use several arguments for one 'Disallow' command.
         * # Takes global effect for config file.
         * Disallow *.js
         */
        'Disallow' => array(
            '*.doc',
            '*.xls',
            '*.ppt',
            '*.pdf',
            '*.b    *.sh   *.md5  *.rpm',
            '*.arj  *.tar  *.zip  *.tgz  *.gz   *.z     *.bz2 ',
            '*.lha  *.lzh  *.rar  *.zoo  *.ha   *.tar.Z',
            '*.gif  *.jpg  *.jpeg *.bmp  *.tiff *.tif   *.xpm  *.xbm *.pcx',
            '*.vdo  *.mpeg *.mpe  *.mpg  *.avi  *.movie *.mov  *.wmv',
            '*.mid  *.mp3  *.rm   *.ram  *.wav  *.aiff  *.ra',
            '*.vrml *.wrl  *.png  *.ico  *.psd  *.dat',
            '*.exe  *.com  *.cab  *.dll  *.bin  *.class *.ex_',
            '*.tex  *.texi *.texinfo',
            '*.cdf  *.ps',
            '*.ai   *.eps  *.hqx',
            '*.cpt  *.bms  *.oda  *.tcl',
            '*.o    *.a    *.la   *.so ',
            '*.pat  *.pm   *.m4   *.am   *.css',
            '*.map  *.aif  *.sit  *.sea',
            '*.m3u  *.qt',
            '*.js',
            // # Exclude Apache directory list in different sort order using "string" match:
            '*D=A *D=D *M=A *M=D *N=A *N=D *S=A *S=D',
            // # More complicated case. RAR .r00-.r99, ARJ a00-a99 files 
            // # and UNIX shared libraries. We use "Regex" match type here:
            'Regex \.r[0-9][0-9]$ \.a[0-9][0-9]$ \.so\.[0-9]$',
        ),
        /**
         * #AddType [String|Regex] [Case|NoCase] <mime type> <arg> [<arg>...]
         *   # This command associates filename extensions (for services
         *   # that don't automatically include them) with their mime types.
         *   # Currently "file:" protocol uses these commands.
         *   # Use optional first two parameter to choose comparison type.
         *   # Default type is "String" "NoCase" (case sensitive string match with
         *   # '?' and '*' wildcards for one and several characters correspondingly).
         * AddType image/x-xpixmap	*.xpm
         */
        'AddType' => array(
            'image/x-xpixmap'               => '*.xpm',
            'image/x-xbitmap'               => '*.xbm',
            'image/gif'                     => '*.gif',
            'text/plain'                    => '*.txt  *.pl *.js *.h *.c *.pm *.e',
            'text/html'                     => '*.html *.htm',
            'text/xml'                      => '*.xml',
            'message/rfc822'                => '*.eml *.mht *.mhtml',
            'text/rtf'                      => '*.rtf',
            'application/pdf'               => '*.pdf',
            'application/msword'            => '*.doc',
            'application/vnd.ms-excel'      => '*.xls',
            'application/vnd.ms-powerpoint' => '*.ppt',
            'text/x-postscript'             => '*.ps',
            'application/unknown'           => '*.*',
        ),
        /**
         * # Document sections.
         * #
         * # Format is:
         * #
         * #   Section <string> <number> <maxlen> [clone] [sep] [{expr} {repl}]
         * #
         * # where <string> is a section name and <number> is section ID
         * # between 0 and 255. Use 0 if you don't want to index some of 
         * # these sections. It is better to use different sections IDs
         * # for different documents parts. In this case during search 
         * # time you'll be able to give different weight to each part
         * # or even disallow some sections at a search time.
         * # <maxlen> argument contains a maximum length of section
         * # which will be stored in database.
         * # "clone" is an optional parameter describing whether this
         * # section should affect clone detection. It can 
         * # be "DetectClone" or "cdon", or "NoDetectClone" or "cdoff".
         * # By default, url.* section values are not taken in account
         * # for clone detection, while any other sections take part
         * # in clone detection.
         * # "sep" is an optional argument to specify a separator between
         * # parts of the same section. It is a space character by default.
         * # "expr" and "repl" can be used to extract user defined sections,
         * # for example pieces of text between the given tags. "expr" is
         * # a regular expression, "repl" is a replacement with $1, $2, etc
         * # meta-characters designating matches "expr" matches.
         */
        'Section' => array(
                'body			1	256',
                'title			2	256',
                'meta.keywords		3	256',
                'meta.description	4	256',
                'url.file		6	0',
                'url.path		7	0',
                'url.host		8	0',
                'url.proto		9	0',
                'crosswords		10	0',
                'Charset 		11 	32',
                'Content-Type		12	64',
                'Content-Language	13	16',
                'msg.from		18	0',
                'msg.to			19	0',
                'msg.subject		20	0',
                'CachedCopy		25      64000',
        ),
        /**
         * Server [Method] [SubSection] <URL> [alias]
         * 
         */
        'Server' => array(
//            'path http://www.dbpower.com.hk/ch/news/news-finance-news-outreach/',
//            'path http://www.88iv.com/tc/media_outreach_news.html'
        ),
        /**
         * for chinese charset
         */
        'Segmenter' => 'cjk',
    );
    
    var $exOptions = array(
        'Allow' => '',
        'Disallow' => '',
    );
    /*
    * Where are the executables of htsearch, htdig, htmerge, htfuzzy
    * located? They should be in the same directory. It does not need
    * to be in the original instalation directory.
    */
    var $varDir_path = "mnogosearch";
//    var $DBPath = "";
    /**
     * configuration file and path
     * @var type 
     * 
     */
    var $configuration_path = '';
    var $configuration_file = '';
    var $db_path = '';
    
    function getAuth() 
    {
        
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
        $this->post(); //for testing only
    }
    
    function post()
    {
        $storedir = HTML_FlexyFramework::get()->Pman['storedir'];
        $this->varDir_path = $storedir."/".$this->varDir_path;
        $this->configuration_path = $this->varDir_path.'/conf/';
        $this->db_path = $this->varDir_path.'/db/';
//        print_r($this->database_dir_path);
        if(!is_dir($this->varDir_path)){
            if(!mkdir($this->varDir_path, 0777, true)){
                echo "it was not specified a valid database directory \n";
                exit;
            }
        }
        
        if(!is_dir($this->db_path)){
            if(!mkdir($this->db_path, 0777, true)){
                echo "it was not specified a valid configuration directory \n";
                exit;
            }
        }
        chmod($this->db_path, 0777);
        
        
        if(!is_dir($this->configuration_path)){
            if(!mkdir($this->configuration_path, 0777, true)){
                echo "it was not specified a valid configuration directory \n";
                exit;
            }
        }
        chmod($this->configuration_path, 0777);
        
//        exit;
        $autoImport = DB_DataObject::factory('pressrelease_auto_import');
        $autoImport->use_local_search = 1;
        
//        $this->DBPath 
        
//        
//        $urls = $autoImport->fetchAll();
//        $site = $urls;
//        $sites = array();
        foreach($autoImport->fetchAll() as $item){
            $u = parse_url($item->url);
//            print_r($u);
            $this->options['DBAddr'] = str_replace('$(DBPath)', $this->db_path.$u['host'].'.sqlite3/', $this->options['DBAddr']);
//            print_r($u);
            
            $lsu = explode(',', $item->local_search_url);
            
            if(!empty($item->local_search_allow)){
                $this->exOptions['Allow'] = array(
                    $lsu[0],
                    $item->local_search_allow,
                );
                $this->exOptions['Disallow'] = 'http://'.$u['host'].'/*';
            }
            
            foreach($lsu as $k=>$l){
                $lsu[$k] = 'path '.$l;
            }
            
            $this->options['Server'] = $lsu;
            
            $this->configuration_file = $this->configuration_path.$u['host'].'.conf';
            
            if(!$this->generateConfiguration()){
                echo 'generating configuration error.';
                exit;
            }
            
        }
        
        //must match this format 
//        88iv
//        Server path http://www.88iv.com/tc/media_outreach_news.html
//        Allow http://www.88iv.com/tc/media_outreach_news.html
//        Allow  *media_outreach*
//        Disallow  http://www.88iv.com/*
        
//        bizwireexpress
//        Server path http://www.bizwireexpress.com/MediaOutreach.php
//        Allow http://www.bizwireexpress.com/MediaOutreach.php
//        Allow  *showstoryMediaOutreach.php*
//        Disallow http://www.bizwireexpress.com/*
        
        //businesses
//        http://www.businesses.com.au/business-updates/mediaoutreachcom/
        
        //hksilicon
//        Server path http://www.hksilicon.com/kb/authors/1647/Media-OutReach
//        Server path http://www.hksilicon.com/kb/articles/
//        Allow http://www.hksilicon.com/kb/authors/1647/Media-OutReach
//        Allow  http://www.hksilicon.com/kb/articles/*
//        Disallow http://www.hksilicon.com/*

        
        
        //cannot do 
//        http://www.asiatoday.com/pressreleasebycategory/3319
//        http://sharejunction.com/sharejunction/news.htm?recordCount=0

        
        if($this->cacheIndex($this->configuration_file)){
            $ret = $this->search('media', 'www.businesses.com.au');
            print_r($ret);
        }
        
        
        
        exit;
        
    }
    
    function generateConfiguration()
    {
//        if(!is_dir($this->options['VarDir'])){
//            echo "it was not specified a valid database directory\n";
//            return false;
//        }
        
        if(empty($this->options["Server"])){
            echo "it was not specified a valid start url\n";
            return false;
        }
        
        //if config file is not generated
        if(!file_exists($this->configuration_file)){
            //create empty file at first time
            touch($this->configuration_file);
            chmod($this->configuration_file, 0777);
        }
        
        $configuration = "";
        foreach($this->options as $k=>$o){
            if(is_array($o)){
                foreach($o as $opt){
                    if(empty($opt)){
                        continue;
                    }
                    $configuration .= $k.' '.$opt."\n";
                }
                continue;
            }
            $configuration .= $k.' '.$o."\n";
        }
        
        foreach($this->exOptions as $k=>$o){
            if(is_array($o)){
                foreach($o as $opt){
                    if(empty($opt)){
                        continue;
                    }
                    $configuration .= $k.' '.$opt."\n";
                }
                continue;
            }
            $configuration .= $k.' '.$o."\n";
        }
        
        if(!($file=fopen($this->configuration_file,"w"))){
            //if not existing then should create the new one...
            echo "could not open the configuration file \"".$this->configuration_file."\" for writing \n";
            return false;
        }

        if(strcmp($configuration,"") && (!fwrite($file,$configuration) || !fclose($file))){
            echo "could not write to the configuration file \n";
            return false;
        }
        
        // after generated the config file then create the database
        require_once 'System.php';
        $indexer = System::which('/usr/sbin/indexer');
        
        if (empty($indexer)) {
            echo "The indexer not found, please install it.\n";
            return false;
        }
        
        $cmd = "$indexer -Ecreate ".$this->configuration_file;
        $ret = `$cmd`;
        
        echo "The config file are generated.\n";
        
//        print_r($_REQUEST);
        return true;
    }

    function cacheIndex($conf)
    {
        require_once 'System.php';
        $indexer = System::which('/usr/sbin/indexer');
        
        if (empty($indexer)) {
            echo "The indexer not found, please install it.\n";
            return false;
        }

        /**
         * indexer -Ecreate // create the sqlite3 table
         * 
         * indexer -m // get the site
         * 
         * indexer --index  // cache and insert to db
         * 
         */
        
        $cmd = "$indexer -m $conf";
        echo "indexing $cmd ....\n";
        $ret = `$cmd`;
//        print_r($ret);
        
        echo "indexed ......\n";
        
        $cmd = "$indexer --index $conf";
        $ret = `$cmd`;
//        'indexer --index'
//        print_r($ret);
        return true;
    }

//    function search($words,$options,&$results)
    function search($str,$domain)
    {
        
        /*
         * chinese search format must add " and space bar
         * '"適 合 任 何 場 合"'
         */
//        $str = '"適 合 任 何 場 合"';
//        $str = '"Philip Pearce"';
        
        $loc = str_replace('$(DBPath)', $this->db_path.$domain.'.sqlite3/', $this->options['DBAddr']);
//        print_r($loc);
//        exit;
        $udm_agent = udm_alloc_agent($loc);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_CHARSET, "utf-8");
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_BROWSER_CHARSET, "utf-8");
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_SEARCH_MODE, UDM_MODE_ALL);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_PHRASE_MODE, UDM_PHRASE_ENABLED);
        Udm_Set_Agent_Param($udm_agent, UDM_PARAM_PAGE_SIZE, 100);
        
        $res = udm_find($udm_agent, $str);
        $totalMatches = udm_get_res_param($res,UDM_PARAM_FOUND);
        $pageSize = udm_get_res_param($res,UDM_PARAM_NUM_ROWS);
        $firstRow = udm_get_res_param($res,UDM_PARAM_FIRST_DOC);
        $lastRow = udm_get_res_param($res,UDM_PARAM_LAST_DOC);
        print_r($totalMatches);
        $ret = array();
        if($totalMatches > 0){
            $row=0;
            for ($i=$firstRow-1;$i<$lastRow;$i++) {
                $row++;
                echo "Match $row:";
                echo 'Url: ';
                $url = udm_get_res_field($res,$i,UDM_FIELD_URL);
                $ret[$i]['url'] = $url;
                echo "<a href=\"$url\">$url</a>";
                echo "\nTitle: <b>";
                $title = udm_get_res_field($res, $i,UDM_FIELD_TITLE);
                echo $title;
                $ret[$i]['title'] = $title;
                echo "</b>\nMeta Desc:";
                $desc = udm_get_res_field($res, $i,UDM_FIELD_DESC);
                echo $desc;
                $ret[$i]['meta'] = $desc;
                echo "\nPage Text: <b>\n";
                $text = udm_get_res_field($res, $i,UDM_FIELD_TEXT);
                echo $text;
                $ret[$i]['text'] = $text;
                echo "</b>\n<hr>\n";
            }
        }
        
        return $ret;
    }
    
}
