<?php
require_once 'Pman.php';

class Pman_Coba_Passport_Dump extends Pman
{
    function getAuth()
    {
        return true;
    }

    function get($userdata_id)
    {
        $x = PDO_DataObject::factory('ext_data');
        $x->autoJoin();
        $x->get('userdata_id',$userdata_id);
        $ext_data = $x->toArray();
        
        $y = PDO_DataObject::factory('coba_person_investor_profile');
        $y->autoJoin();
        $y->setFrom(array(
             'modx_user_id' => $userdata_id,
         ));
        $inv_prof = $y->fetchAll(false, false, 'toArray');
        
        $data = array_merge($ext_data, $inv_prof);
        
        $json_data = json_encode($data, JSON_PRETTY_PRINT);
        
        print_r($json_data);exit;
        
        $uid = isset($ext_data['id_card_number']) ?
            $ext_data['in_dob']."-".$ext_data['id_card_number'] :
            $ext_data['in_dob']."-".$ext_data['in_id_passport_number'];

        $storedir = $this->bootLoader->Pman['storedir'];
        $json_file_dir = "{$storedir}/{$uid}.json";
        $zip_file_dir = "{$storedir}/{$uid}.zip";

        if(!file_exists($json_file_dir)) {
            $json_file = fopen($json_file_dir, "w") or die("cannot create/open the JSON file\n");
            if (isset($json_file)) {
                chmod($json_file_dir, 0777);
                fwrite($json_file, $json_data);
                fclose($json_file);
            }
        }
        
        if (!file_exists($zip_file_dir)) {
            $zip = new ZipArchive;
            if (!$zip->open($zip_file_dir, ZipArchive::CREATE)) {
                echo "cannot open the zip file\n";
            }
            $zip->addFile($json_file_dir,"{$uid}.json");
            $zip->close();
            echo "ZipArchive::done\n";
        }

        /*
        //encrypting the zip file
        $data = file_get_contents($zip_file_dir);

        echo $data;
        putenv('GNUPGHOME=/home/sender/.gnupg');
        $gpg = new gnupg();
        $gpg->seterrormode(gnupg::ERROR_EXCEPTION);

        try {
                $keys = $gpg->keyinfo('testing');
        } catch(Exception $e) {
            echo 'ERROR: '.$e->getMessage();
        }

        var_dump($keys);exit;
        */


        /*
        // set path to keyring directory
        putenv('GNUPGHOME={$storedir}');

        // create new GnuPG object
        $gpg = new gnupg();

        // throw exception if error occurs
        $gpg->seterrormode(gnupg::ERROR_EXCEPTION);

        // get list of keys containing string 'example'
        try {
          $info = $gpg->keyinfo("example");
          print_r($info);
        } catch (Exception $e) {
          echo 'ERROR: ' . $e->getMessage();
        }
        */




        /*
        putenv("GNUPGHOME=/tmp");
        $pubkey = "-----BEGIN PGP PUBLIC KEY BLOCK-----
        Version: GnuPG v1.2.6 (GNU/Linux)

        mQGiBEe68W8RBACVuFuv4d+roDSCdRO1SuO8dQwds4VTjVOqgVKQtq6+8Fe95RY8
        BAf1IyLj4bxvWPhr0wZdVwTosD/sFoPtdCyhVcF932nP0GLHsTEeVwSz9mid22HI
        O4Kmwj2kE+I+C9QdzAg0zaWQnVaF9UC7pIdMR6tEnADI8nkVDdZ+zb2ziwCg6Yqu
        tk3KAzKRT1SNUzTE/n9y2PED/1tIWiXfGBGzseX0W/e1G+MjuolWOXv4BXeiFGmn
        8wnHsQ4Z4Tzk+ag0k+6pZZXjcL6Le486wpZ9MAe6LM31XDpQDVtyCL8t63nvQpB8
        TUimbseBZMb3TytCubNLGFe5FnNLGDciElcD09d2xC6Xv6zE2jj4GtBW1bXqYWtl
        jm0PA/4u6av6o6pIgLRfAawspr8kaeZ8+FU4NbIiS6xZmBUEQ/o7q95VKGgFVKBi
        ugDOlnbgSzBIwSlsRVT2ivu/XVWnhQaRCotSm3AzOc2XecqrJ6F1gqk0n+yP/1h1
        yeTvvfS5zgqNTG2UmovjVsKFzaDqmsYZ+sYfwc209z9PY+6FuLQnQXBhY2hlVGVz
        dCAoVGVzdGluZykgPGFwYWNoZUBsb2NhbGhvc3Q+iF4EExECAB4FAke68W8CGwMG
        CwkIBwMCAxUCAwMWAgECHgECF4AACgkQJE9COu2PFIEGDwCglArzAza13xjbdR04
        DQ1U9FWQhMYAnRrWQeGTRm+BYm6SghNpDOKcmMqruQENBEe68XAQBADPIO+JFe5t
        BQmI4l60bNMNSUqsL0TtIP8G6Bpd8q2xBOemHCLfGT9Y5DN6k0nneBQxajSfWBQ5
        ZdKFwV5ezICz9fnGisEf9LPSwctfUIcvumbcPPsrUOUZX7BuCHrcfy1nebS3myO/
        ScTKpW8Wz8AjpKTBG55DMkXSvnx+hS+PEwADBQP/dNnVlKYdNKA70B4QTEzfvF+E
        5lyiauyT41SQoheTMhrs/3RIqUy7WWn3B20aTutHWWYXdYV+E85/CarhUmLNZGA2
        tml1Mgl6F2myQ/+MiKi/aj9NVhcuz38OK/IAze7kNJJqK+UEWblB2Wfa31/9nNzv
        ewVHa1xHtUyVDaewAACISQQYEQIACQUCR7rxcAIbDAAKCRAkT0I67Y8UgRwEAKDT
        L6DwyEZGLTpAqy2OLUH7SFKm2ACgr3tnPuPFlBtHx0OqY4gGiNMJHXE=
        =jHPH
        -----END PGP PUBLIC KEY BLOCK-----";

        $enc = (null);
        $res = gnupg_init();
        echo "gnupg_init RTV = <br/><pre>\n";
        var_dump($res);
        echo "</pre>\n";
        $rtv = gnupg_import($res, $pubkey);
        echo "gnupg_import RTV = <br/><pre>\n";
        var_dump($rtv);
        echo "</pre>\n";
        $rtv = gnupg_addencryptkey($res, "C25F29936D9046D73A77DCF8244F423AED8F1481");
        echo "gnupg_addencryptkey RTV = <br /><pre>\n";
        var_dump($rtv);
        echo "</pre>\n";
        $enc = gnupg_encrypt($res, $data);
        echo "Encrypted Data: " . $enc . "<br/>";
        */

        /*
        $config = array(
            "digest_alg" => "sha512",
            "private_key_bits" => 4096,
            "private_key_type" => OPENSSL_KEYTYPE_RSA,
        );

        $res = openssl_pkey_new($config);
        openssl_pkey_export($res, $privKey);

        $pubKey = openssl_pkey_get_details($res);
        $pubKey = $pubKey["key"];

        $zip_file = fopen($zip_file_dir, "r") or die("cannot read the zip file\n ");
        $data = fread($zip_file,filesize($zip_file_dir));

        echo strlen("data length: {$data} \n");

        if (openssl_public_encrypt($data, $encrypted, $pubKey)) {
            print_r($encrypted);
        } else {
            echo "cannot encrypt the zip file\n";
        }
        */
    }
    
}
