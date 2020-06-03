<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");


function gjgoodstring($strin){
            //'      -          .       0-  9        A-  Z      `        a-   z   sp     �  Ԡ       ֭  �      �       // [\x27\x2D\x2E\x30-\x39\x41-\x5a\x60\x61-\x7a\s\xC0-\xD6\xD8-\xF6\xF8-\xFF]+;

    $gjret =preg_match('/[\x27\x2D\x2E\x30-\x39\x41-\x5a\x60\x61-\x7a\s\xC0-\xD6\xD8-\xF6\xF8-\xFF]+/', $strin,$strmatched);
    if(count($strmatched)) {
      $gjtmp = strlen($strmatched[0]);
      $ok = ($gjtmp === strlen($strin) ? TRUE : FALSE);
    } else {
      $ok = FALSE;
    }

    if($ok) {
        $gjret2 =preg_match_all('/\x27/', $strin,$strmatched);
        if ($gjret2 && isset($strmatched[0][1])) {
            echo "More than one single quote  ".$strin. "<br />";
            return FALSE; // More than one single quote
        } else {
            echo "we are good  ".$strin. "<br />";
            return TRUE; // yippe
        }
    } else {
        echo "not matched  ".$strin. "<br />";
      return FALSE; //not my extended alpaha
    }
}

function gjteststring1($strin){
    $gjret =preg_match_all('/hackerrank/', $strin,$strmatched);

	if($gjret === FALSE) {
		echo "gjteststring failed ".$strin. "<br />";
		return FALSE;
	}

   print_r($strmatched);
   echo "<br />";

    if($gjret) {

//	   print_r($gjret);
     // $gjtmp = strlen((string)$strmatched[0][0]);
     // $ok = ($gjtmp === strlen($strin) ? TRUE : FALSE);
	 $ok = TRUE;
    } else {
      $ok = FALSE;
    }

	if($ok) {
		echo "gjteststring1 matched  ".$strin. "<br />";
		return TRUE; // yippe
	} else {
		echo "gjteststring1 not matched  ".$strin. "<br />";
		return FALSE; //
	}
}

function gjteststring2($strin){
//	$regex = '/(^\S{3}\.\S{3}\.\S{3}\.\S{3})\$/';
//	$regex = '/(^[a-zA-z]{3}\.[a-zA-z]{3}\.[a-zA-z]{3}\.[a-zA-z]{3})\$/';
// fail	$regex = '/([a-zA-z0-9]{3}\.[a-zA-z0-9]{3}\.[a-zA-z0-9]{3}\.[a-zA-z0-9]{3})\$/';
//	$regex = '/([a-zA-z0-9]{3}\.[a-zA-z0-9]{3}\.[a-zA-z0-9]{3}\.[a-zA-z0-9]{3})/';
//	$regex = '/(^{\S3}\.{\S3}\.{\S3}\.{\S3})\$/';
//	$regex = '/(^[\S]{3}\.[\S]{3}\.[\S]{3}\.[\S]{3})\$/';
	$regex = '/^([\Sa-zA-z0-9]{3}\.[\Sa-zA-z0-9]{3}\.[\Sa-zA-z0-9]{3}\.[\Sa-zA-z0-9]{3}$)/';
//	$regex = '/([\S]{3}\.[\]{3}\.[\S]{3}\.[\S]{3})\$/';

    $gjret =preg_match($regex, $strin,$strmatched);

	if($gjret === FALSE) {
		echo "gjteststring2 failed ".$strin. "<br />";
		return FALSE;
	}

   print_r($strmatched);
   echo "<br />";

    if($gjret) {

//	   print_r($gjret);
     // $gjtmp = strlen((string)$strmatched[0][0]);
     // $ok = ($gjtmp === strlen($strin) ? TRUE : FALSE);
	 $ok = TRUE;
    } else {
      $ok = FALSE;
    }

	if($ok) {
		echo "gjteststring2 matched  ".$strin. "<br />";
		return TRUE; // yippe
	} else {
		echo "gjteststring2 not matched  ".$strin. "<br />";
		print_r($regex);
		echo "<br />";
		return FALSE; //
	}
}


function gjteststring3($strin){
	$regex = '/\d\d\D\d\d\D\d\d\d\d/';

    $gjret =preg_match($regex, $strin,$strmatched);

	if($gjret === FALSE) {
		echo "gjteststring3 failed ".$strin. "<br />";
		return FALSE;
	}

   print_r($strmatched);
   echo "<br />";

    if($gjret) {
	 $ok = TRUE;
    } else {
      $ok = FALSE;
    }

	if($ok) {
		echo "gjteststring3 matched  ".$strin. "<br />";
		return TRUE; // yippe
	} else {
		echo "gjteststring3 not matched  ".$strin. "<br />";
		print_r($regex);
		echo "<br />";
		return FALSE; //
	}
}
//
//You have a test string . Your task is to match the pattern  XXxXXxXX
//Here,  denotes whitespace characters, and  denotes non-white space characters.


function gjteststring4($strin){
	$regex = '/\S\S\s\S\S\s\S\S/';

    $gjret =preg_match($regex, $strin,$strmatched);

	if($gjret === FALSE) {
		echo "gjteststring4 failed ".$strin. "<br />";
		return FALSE;
	}

   print_r($strmatched);
   echo "<br />";

    if($gjret) {
	 $ok = TRUE;
    } else {
      $ok = FALSE;
    }

	if($ok) {
		echo "gjteststring4 matched  ".$strin. "<br />";
		return TRUE; // yippe
	} else {
		echo "gjteststring4 not matched  ".$strin. "<br />";
		print_r($regex);
		echo "<br />";
		return FALSE; //
	}
}
$inStrs = array(
"firststuffhackerrankmore stuff",
"defghijklmnopqrstuvwxyz 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ",
"abc.def.ghi.jkx",
"123.456.abc.def",
"1123.456.abc.def",
"123.456.abc",
"123.456.abc.def.abc",
"xxXxxXxxxx",
"12A34B5678",
"06-11-2015",
"06 11 2015"
);

$Test_String1 = "firststuffhackerrankmore stuff";

echo date('H:i:s'), '<BR>';


echo "<HR> Regular Expression Testing <br>";
  for ($i=0;$i < count($inStrs); $i++) {
    gjgoodstring($inStrs[$i]);
  }
echo "<HR><br>";

  for ($i=0;$i < count($inStrs); $i++) {
    gjteststring2($inStrs[$i]);
  }

