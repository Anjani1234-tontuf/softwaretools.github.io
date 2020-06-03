<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>rsi encode decode utf-8 test page</title>
<link rel="StyleSheet" href="../css/encodingstyles.css" type="text/css">

</head>
<body>
<input class="closeit" type="button" id="close02" value="-" onClick="toggleDisplayButton('cSWrapper','close02');">
<div id="cSWrapper" class="note">
<pre style="padding-left:1em;border: 1px solid black;color:darkslateblue;">
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/gjAppcore.min.js"></script>
<script type="text/javascript" src="../js/gjtrack.js"></script>

<?php

# see /doc/RSI_UTF-8.odt for comments and documentation on utf-8, Latin 1 Windows 1252 and charcter conversions
# and for conversion routines in include 'convertcharsets.php';

include 'formatcliorhtml.php';
include 'convertcharsets.php';
include 'testTablesinHex.php';
include 'testTablesinutf8.php';

# init('t'); # turn on debug
init();
function gjpath() {
global $inStrs;
	echo  'Check Environment  #################'  . PHP_EOL;

	$CurrentVer = phpversion();
	switch (version_compare($CurrentVer, '5.3.3')) {
		case -1:
				print " You are running an older version of PHP: $CurrentVer" . PHP_EOL;
			break;
		case 0:
				print 'You are running PHP 5.3.3' . PHP_EOL;
			break;
		case 1:
				print "You are running a version of PHP after 5.3: $CurrentVer" . PHP_EOL;
	}

	$str = realpath(__FILE__);
	echo 'test file:  ' . $str . PHP_EOL;

	// add the file to the array of strings to test
	$inStrs[] = $str;


	if (function_exists('mb_internal_encoding') && is_callable('mb_internal_encoding')) {
		echo 'we have  mb_internal_encoding()' . PHP_EOL;
		$encoding = mb_internal_encoding();
	} else {
		echo 'we do not have  mb_internal_encoding()' . PHP_EOL;
		$encoding = ini_get('default_charset'); # 	'UTF-8'
	}

	if (function_exists('mb_check_encoding') && is_callable('mb_check_encoding')) {
		echo 'we have  mb_check_encoding()' . PHP_EOL;
		//$encoding = mb_check_encoding();
	} else {
		echo 'we do not have  mb_check_encoding()' . PHP_EOL;
		//$encoding = ini_get('default_charset'); # 	'UTF-8'
	}

	if (empty($encoding)) {
	echo 'we can not tell what the default php encoding is ' . PHP_EOL;

	} else {
	echo 'the default php encoding is ' . $encoding . PHP_EOL;
	if ($encoding != 'UTF-8')
		mb_internal_encoding('UTF-8');
		$encoding = mb_internal_encoding();
		echo 'set the default php encoding to ' . $encoding . PHP_EOL;
	}

	if (function_exists('utf8_decode') && is_callable('utf8_decode')) {
		echo 'we have utf8_decode()' . PHP_EOL;
	} else {
		echo 'we do not have utf8_decode' . PHP_EOL;
	}

	if (function_exists('iconv') && is_callable('iconv')) {
		echo 'we have iconv()' . PHP_EOL;
	} else {
		echo 'we do not have iconv' . PHP_EOL;
	}

# http://php.net/manual/en/function.iconv.php
	iconv_set_encoding('internal_encoding', 'UTF-8');
	iconv_set_encoding('input_encoding', 'UTF-8');
	//iconv_set_encoding('output_encoding', 'ISO-8859-1');
	iconv_set_encoding('output_encoding', 'ASCII');
	echo 'default iconv encodings' . PHP_EOL;

	print_r(iconv_get_encoding('all'));


echo 'error reporting is minimal.  If its higher, you will see MANY of the following,  iconv does not convert a lot of the chars' . PHP_EOL;
echo 'PHP Notice:  iconv(): Detected an illegal character in input string in dumputf-8.php on line xxx' . PHP_EOL;

echo 'This page has 2 incompatible sets of encodings, single byte and multi-byte.  What you see requires interpertation'  . PHP_EOL . PHP_EOL;

echo 'If you change view encodings to use windows-1252, single-byte ' . PHP_EOL;
//echo 'the rows starting wit cutf8toiso,  mbcutf8to1252, cutf8to1252 display correct values for single byte characters and transliterated values' . PHP_EOL;
echo ' utf8toLatin1 is valid and the row starting with a number and in: are invalid' . PHP_EOL . PHP_EOL;

echo 'if you change view encodings to use utf-8, multi-byte ' . PHP_EOL;
//echo 'the rows starting with cutf8toiso,  mbcutf8to1252, cutf8to1252 displays are not valid' . PHP_EOL . PHP_EOL;
echo 'the rows starting with Latin1toAscii, utf8toAscii and with a number and in: valid' . PHP_EOL . PHP_EOL;

//echo 'the row with columns utf8toAscii and cutf8toaalid are valid in both single-byte and multi-byte.  ignore the remove row' . PHP_EOL;


echo cpre;
echo cdiv;
	echo 'Running input test strings from inStrs' . PHP_EOL;


	# the table
	echo otablePT;
	#the table body
	for ($i=0; $i < count($inStrs); $i++) {
		echo otr1;
		echo otd;
		if (!empty($charset) && $charset != 'UTF8') {
			echo "$i" . PHP_EOL;
		} else {
			echo "$i in: " . $inStrs[$i];
		}
		echo ctd;
		echo ctr .   PHP_EOL;

		echo otr2;
		echo otd;
		$strout82 = testutf82($inStrs[$i]);
		echo 'is: ' . ($strout82 ? 'T':'F');
		echo ctd;
		echo ctr .   PHP_EOL;

		echo otr3;
		echo otd;
		echo bin2hex($inStrs[$i]);
		echo ctd;
		echo ctr .   PHP_EOL;

//
//		echo otd;
//		$strout1 = convutf8toiso8($inStrs[$i]);
//		echo 'cutf8toiso ' . $strout1;
//		echo ctd  . PHP_EOL;
//
//		echo otd;
//		echo bin2hex($strout1);
//		echo ctd  . PHP_EOL;
//
//		echo ctr .   PHP_EOL;
//		echo otr  . PHP_EOL;


//		echo otd;
//		$strout2 = mbconvutf8to1252($inStrs[$i]);
//		echo 'mbcutf8to1252 ' . $strout2;
//		echo ctd  . PHP_EOL;
//
//		echo otd;
//		echo bin2hex($strout2);
//		echo ctd  . PHP_EOL;
//
//		echo ctr .   PHP_EOL;
//		echo otr  . PHP_EOL;


		echo otr4;
		echo otd;
		$strout3 = utf8toLatin1($inStrs[$i]);
		echo 'utf8toLatin1 ' . $strout3;
		echo ctd;
		echo ctr .   PHP_EOL;


		echo otr5;
		echo otd;
		echo bin2hex($strout3);
		echo ctd;
		echo ctr .   PHP_EOL;

//		echo otr6;
//		echo otd;
//		$strout4 = utf8toAscii($inStrs[$i]);
//		echo 'utf8toAscii ' . $strout4;
//		echo ctd;
//		echo ctr .   PHP_EOL;

//		echo otd;
//		$strout5 = convutf8toascii($inStrs[$i]);
//		echo 'cutf8toa ' . $strout5;
//		echo ctd  . PHP_EOL;
//
//		echo otd;
//		$strout6 = remove_accents($inStrs[$i]);
//		echo 'remove ' . $strout6;
//		echo ctd . PHP_EOL;

		echo otr7;
		echo otd;
		$strout6 = Latin1toAscii($strout3);
		echo 'Latin1toAscii ' . $strout6;
		echo hrt;
		echo ctd;
		echo ctr .   PHP_EOL;

	}

	echo ctable;
	echo  "End #################" . PHP_EOL;


//
//		check encoding tests
//		$strout1 = testutf81($inStrs[$i]);
//		$strout2 = mb_check_encoding( $inStrs[$i], 'UTF-8');
//		$strout3 = isUtf8($inStrs[$i]);
//		$strout4 = seems_utf8($inStrs[$i]);
//
//
//		echo 'testutf81: ' . ($strout1 ? 'true':'false') . PHP_EOL;
//		echo '$inStrs[$i]: ' . ($strout2 ? 'true':'false')	. PHP_EOL;
//		echo 'isutf8:	' .	($strout3 ?	'true':'false')	 . PHP_EOL;
//		echo 'seems_utf8:	' .	($strout4 ?	'true':'false')	 . PHP_EOL;

	echo hr;

	echo PHP_EOL . PHP_EOL;
	echo 'Running test characters from inStrs2 - highlight the special conversions ' . PHP_EOL;

	global $inStrs2;

//	build a table if web else nothing if php cli
	echo otable  . PHP_EOL;

	for ($i=0; $i < count($inStrs2); $i++) {

		echo otr;
		echo otd;
		echo "$i strin:       " . $inStrs2[$i];
		echo ctd;
		echo ctr .   PHP_EOL;

		echo otr;
		echo otd;
		$strout2 = utf8toLatin1($inStrs2[$i]);
		echo ' utf8toLatin1: ' . $strout2;
		echo ctd;
		echo ctr .   PHP_EOL;

		echo otr;
		echo otd;
		$strout6 = Latin1toAscii($strout2);
		echo ' Latin1toAscii ' . $strout6;
		echo ctd;
		echo ctr .   PHP_EOL;

		echo otr;
		echo otd;
		$strout1 = utf8toAscii($inStrs2[$i]);
		echo ' utf8toAscii: ' . $strout1;
		echo ctd;
		echo ctr .   PHP_EOL;

		echo otr;
		echo otd;
		echo " strhex:      " . bin2hex($inStrs2[$i]);
		echo hr;

		echo ctd;
		echo ctr .   PHP_EOL;

	}

	echo ctable . PHP_EOL;
	echo  '#################' . PHP_EOL;
}


gjpath();

echo PHP_EOL;

?>


<table class="unicode" style="line-height:1.2;">

<tr valign="top"><th width="80">Character<br>(decimal)</th><th width="80">Decimal</th><th width="80">Character<br>(hex)</th><th width="80">Hex</th><th width="80">Entity</th><th>Name</th></tr>

<tr><td class="b">&#8592;</td><td>8592</td><td class="b">&#x2190;</td><td>2190</td><td>&amp;larr;</td><td>LEFTWARDS ARROW &nbsp; <small>(present in WGL4 and in Symbol font)</small></td></tr>
<tr><td class="b">&#8593;</td><td>8593</td><td class="b">&#x2191;</td><td>2191</td><td>&amp;uarr;</td><td>UPWARDS ARROW &nbsp; <small>(present in WGL4 and in Symbol font)</small></td></tr>
</table>


</body>
</html>



