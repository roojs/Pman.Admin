<?php 
require_once 'Pman.php';

class Pman_PressRelease_MediaListExport extends Pman {
    var $masterTemplate = "distribution.html";
    
    
    // get - same as parent.
    function post($id) {
        die("BAD URL")   ;
    }
    function get($id) {
        // DB_DataObject::debugLevel(1);

        // get distinct countries from DB
        // get distinct news beat for each country
        // get distinct publications for each news beat

        $results = array();
        $uCountry = (isset($id)) ? $id : $this->jerr('No country was provided');

        $cty = DB_DataObject::Factory('pressrelease_contact');
        $cty->selectAdd();
        $cty->selectAdd('DISTINCT country');
        $cty->country = $uCountry;
        // $cty->query("SELECT DISTINCT country FROM pressrelease_contact");
        // while($cty->fetch()) {

        if(!$cty->count()) {
            $this->jerr('Invalid country provided');
        }else {
            $items = array();

            $nb = DB_DataObject::Factory('pressrelease_beats');
            $nb->selectAdd();
            $nb->selectAdd("DISTINCT category_id");
            $nb->whereAdd("contact_id IN (SELECT id FROM pressrelease_contact WHERE country = '{$uCountry}')");
            $ctgIds = $nb->fetchAll('category_id');

            $nb = DB_DataObject::Factory('pressrelease_category');
            $nb->selectAdd();
            $nb->selectAdd("id, concat(hgroup, ' :: ',  name) AS cname");
            $nb->whereAddIn('id', $ctgIds, 'int');
            $nb->orderBy('hgroup ASC, name ASC');
            $ctgs = $nb->fetchAll('id', 'cname');

            foreach($ctgs as $_id=>$name) {
                $pub = DB_DataObject::Factory('pressrelease_contact');
                $pub->selectAdd();
                $pub->selectAdd("DISTINCT publication_name");
                $pub->country = $uCountry;
                $pub->whereAdd("id IN (SELECT contact_id FROM pressrelease_beats WHERE category_id = {$_id})");
                $pub->orderBy('publication_name ASC');
                $pubs = $pub->fetchAll("publication_name");

                $items[] = array(
                    'id'=>$_id,
                    'name'=>$name,
                    'publications'=>$pubs
                );
            }

            $results[] = array(
                'country'=>$uCountry,
                'beats'=>$items
            );
        }

        $xid = 3;

        //  create dom obj 
        //  write results out to abw file
        $dom = new DOMDocument();
        $dom->formateOutput = true;
        $dom->load(dirname(__FILE__).'/templates/mediaexport_template.abw');
        $aw = $dom->documentElement;


        /// attribute templates
        $styleAttr = $dom->createAttribute('style');
        $styleAttr->value = 'Normal';

        $propAttr = $dom->createAttribute('props');
        $propAttr->value = 'text-align:left; line-height:1.0; dom-dir:ltr';
        ///

        /// blank row template
        $blank = $dom->createElement('p');
        $blank->appendChild($styleAttr);
        $blank->appendChild($propAttr);
        $blank->appendChild($dom->createElement('c'));
        ///


        $content = $dom->createElement('section');
        $aw->appendChild($content);

        $attr = $dom->createAttribute('footer');
        $attr->value = 9;
        $content->appendChild($attr);

        $attr = $dom->createAttribute('header');
        $attr->value = 7;
        $content->appendChild($attr);

        $attr = $dom->createAttribute('xid');
        $attr->value = 2;
        $content->appendChild($attr);

        $attr = $dom->createAttribute('props');
        $attr->value = 'dom-dir:ltr; section-space-after:0.0000in; page-margin-right:1.2500in; 
                page-margin-top:1.7000in; page-margin-footer:0.5000in; 
                page-margin-left:1.2500in; page-margin-bottom:1.4257in; 
                page-margin-header:0.5000in; columns:2; column-gap:0.5000in; 
                section-restart-value:1';
        $content->appendChild($attr);

        foreach($results as $el) {
             foreach($el['beats'] as $nb) {
                $nbRow = $dom->createElement('p');
                $content->appendChild($nbRow);

                $nbRow->appendChild($styleAttr);
                $nbRow->appendChild($propAttr);

                $attr = $dom->createAttribute('xid');
                $attr->value = $xid++;
                $nbRow->appendChild($attr);

                $nbTxt = $dom->createElement('c');
                $nbRow->appendChild($nbTxt);

                $attr = $dom->createAttribute('props');
                $attr->value = 'lang:en-US; font-size:9pt; font-family:Arial Unicode MS; font-weight:bold';
                $nbTxt->appendChild($attr);
                $nbTxt->appendChild($dom->createTextNode($nb['name']));

                foreach($nb['publications'] as $pub) {
                    $pubRow = $dom->createElement('p');
                    $content->appendChild($pubRow);

                    $pubRow->appendChild($styleAttr);
                    $pubRow->appendChild($propAttr);

                    $attr = $dom->createAttribute('xid');
                    $attr->value = $xid++;
                    $pubRow->appendChild($attr);

                    $pubTxt = $dom->createElement('c');
                    $pubRow->appendChild($pubTxt);

                    $attr = $dom->createAttribute('props');
                    $attr->value = 'lang:en-US; font-size:9pt; font-family:Arial Unicode MS';
                    $pubTxt->appendChild($attr);
                    $pubTxt->appendChild($dom->createTextNode($pub));
                }

                // insert blank row
                $content->appendChild($blank);
             }
            // insert 2 blank rows
            $content->appendChild($blank);
        }

        /// HEADER
        $hdr = $dom->createElement('section');
        $aw->appendChild($hdr);

        foreach(array('type'=>'header', 'id'=>7, 'xid'=>($xid++)) as $a=>$v) {
            $attr = $dom->createAttribute($a);
            $attr->value = $v;
            $hdr->appendChild($attr);
        }

       $hdr->appendChild($blank);

       $ctyRow = $dom->createElement('p');
       $hdr->appendChild($ctyRow);

       $ctyRow->appendChild($styleAttr);
       $ctyRow->appendChild($propAttr);

       $attr = $dom->createAttribute('xid');
       $attr->value = $xid++;
       $ctyRow->appendChild($attr);

        $ctyTxt = $dom->createElement('c');
        $ctyRow->appendChild($ctyTxt);
        $attr = $dom->createAttribute('props');
        $attr->value = 'lang:en-us; font-weight:bold; font-size:12pt; font-family:Arial Unicode MS; color:ff0000';
        $ctyTxt->appendChild($attr);
        $ctyTxt->appendChild($dom->createTextNode($uCountry));

        $hdr->appendChild($blank);

        $hdrRow = $dom->createElement('p');
        $hdr->appendChild($hdrRow);

        $hdrRow->appendChild($styleAttr);
        $hdrRow->appendChild($propAttr);
        $attr = $dom->createAttribute('xid');
        $attr->value = $xid++;
        $hdrRow->appendChild($attr);

        $hdrTxt = $dom->createElement('c');
        $hdrRow->appendChild($hdrTxt);

        $attr = $dom->createAttribute('props');
        $attr->value = 'lang:en-US; font-size:9pt; font-family:Arial Unicode MS; color:000000';
        $hdrTxt->appendChild($attr);
        $hdrTxt->appendChild($dom->createTextNode('The Hong Kong circuit sends your release to general media, magazines, newswires, broadcast, websites and trade publications according to client’s target journalist. Please advise your servicing which trade publications are to be included with the distribution'));


        /// FOOTER
        $ftr = $dom->createElement('section');
        $aw->appendChild($ftr);

        foreach(array('type'=>'footer', 'id'=>9, 'xid'=>($xid++)) as $a=>$v) {
            $attr = $dom->createAttribute($a);
            $attr->value = $v;
            $ftr->appendChild($attr);
        }

        $ftr->appendChild($blank);
        $ftr->appendChild($blank);
        $ftr->appendChild($blank);

        // $dom->save("ME_{$uCountry}.abw");
        // print_r($results);

        $fn = $this->tempName('abw');
        $dom->save($fn);
        require_once 'File/Convert.php';
        $fc = new File_Convert($fn, 'application/x-abiword');
        $fc->convert('application/msword');
        $fc->serve('attachment');

        unlink($fn);

        return true;
    }
 }
