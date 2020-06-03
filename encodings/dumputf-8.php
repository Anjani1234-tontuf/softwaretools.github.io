<!doctype html>
<html lang="en">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Display of conversion test 2 for charset utf8</title>

<link rel="StyleSheet" href="../css/encodingstyles.css" type="text/css">
<link rel="stylesheet" href="../js/tablesorter/css/theme.blue.css">
<link rel="stylesheet" href="../js/tablesorter/addons/pager/jquery.tablesorter.pager.css">
</head>
<body>

<input class="closeit" type="button" id="close02" value="-" onClick="toggleDisplayButton('cSWrapper','close02');">
<div id="cSWrapper" class="note">
<!-- This selector markup is completely customizable -->
<div class="columnSelectorWrapper" >
	<input id="colSelect1" type="checkbox" class="hidden">
	<label class="columnSelectorButton" for="colSelect1">Column</label>
	<div id="columnSelector" class="columnSelector">
		<!-- this div is where the column selector is added -->
	</div>
</div>

<?php
/*
dumputf-8.php

This file sets up the display and dump of conversions from utf-8 to Latin 1 and Ascii for the input table selected in
run_conversions.php

file encodinggets.php sets up the array to dump $temp1 and the title to display

	$temp1  = array($inStrs, $accentedLetters,$utf8Latin1samplechars, $utf8arrows);
	$titlea = array('inStrs', 'Accented Letters','utf8 Latin1 sample chars', 'utf-8 arrows');

the arrays are in 'testTablesinHex.php';'testTablesinutf8.php';

or this dumps whatever was put into the textbox in run_conversions.php

*/

include 'formatcliorhtml.php';
include 'convertcharsets.php';
include 'testTablesinHex.php';
include 'testTablesinutf8.php';
include 'encodinggets.php';

//ob_start();

// for accentletters I have to add characters from remove accents around to the table c6a1

#$uchars = $accentedLetters;
#$uchars =  $utf8Latin1samplechars;
#$uchars = $utf8arrows;

echo "<pre id=\"notes\" class=\"notes\">\n";
//$gjdebug = 1;
if ($gjdebug != '') {
	init('1');
} else {
	init();
}
# init() for regular error reporting , pass anything ex init('debug') to debug and show these
# echo 'Notice:  iconv(): Detected an illegal character in input string in ..\convertcharsets.php on line xx' . PHP_EOL;

echo 'This page has 2 incompatible sets of encodings, single byte and multi-byte.  What you see requires interpertation'  . PHP_EOL . PHP_EOL;

echo 'in the default display (view encodings utf-8, multi-byte) -> the column utoL is not valid' . PHP_EOL;

echo 'If you change view encodings to use windows-1252, single-byte ' . PHP_EOL;
echo 'the column utoL displays correct values for single byte characters and transliterated values -> the column char is not valid ' . PHP_EOL;

echo '</pre>';

echo '</div>'; # cSWrapper

	echo oh1 . $title . ch1;

	# the table
	echo '<table class="tablesorter custom-popup" data-table-group="' . $conv.microtime(). '">';

	# echo otableCP;
	echo othead; # table head
	echo otr . PHP_EOL;

	echo oth1;
	echo '#';
	echo cth;

	echo oth2;
	echo 'char';
	echo cth;

	echo oth3;
	echo 'hex';
	echo cth;

	echo oth4;
	echo 'is';
	echo cth;

	echo oth;
	echo 'rsitol';
	echo cth;
//
//	echo oth;
//	echo 'hex';
//	echo cth;

	echo oth5;
	echo 'utoL';
	echo cth;

	echo oth6;
	echo 'hex';
	echo cth;

//	echo oth;
//	echo 'cutf8to1252';
//	echo cth;
//
//	echo oth;
//	echo 'hex';
//	echo cth;

//	echo oth;
//	echo 'utf8toAscii';
//	echo cth;

//	echo oth;
//	echo 'cutf8toa';
//	echo cth;

	echo oth7;
	echo 'LtoA';
	echo cth;
	echo ctr . PHP_EOL;
	echo cthead; # close table head
	echo otbody; # open table body

	for ($i=0; $i < count($uchars); $i++) {

#
		$tst = utf8toLatin1($uchars[$i]);
#		if (($tst == '?') || ($tst == '')) continue;
#		if (($tst == '?') || ($tst == '')) {

		echo otr  . PHP_EOL;

#1
		echo otdp;
		if (!empty($charset) && $charset != 'UTF8') {
			echo "$i";
		} else {
		#	echo "$i in: " . $uchars[$i];
			echo "$i";
		}
		echo ctd  . PHP_EOL;

#2
		echo otdr;
		if (!empty($charset) && $charset != 'UTF8') {
			echo "$i" . PHP_EOL;
		} else {
		#	echo "$i in: " . $uchars[$i];
			echo "$uchars[$i]";
		}
		echo ctd  . PHP_EOL;

#3
		echo otd;
		echo bin2hex($uchars[$i]);
		echo ctd  . PHP_EOL;

#4
		echo otd;
		$strout82 = testutf82($uchars[$i]);
		#$stroutf8 = seems_utf8($uchars[$i]);
		#echo 't: ' . ($strout82 ? 'T':'F') . ' s: ' . ($stroutf8 ?	'T':'F');
		echo 'is: ' . ($strout82 ? 'T':'F');
		echo ctd  . PHP_EOL;

#4b
		echo otd;
		$strin  = $uchars[$i];
		$strout1 = utf8_to_latin1::iconv($strin);
//		$strout1 = convutf8toiso8($uchars[$i]);
		echo  $strin;
		echo ctd  . PHP_EOL;
//
//		echo otd;
//		echo bin2hex($strout1);
//		echo ctd  . PHP_EOL;

#5
		echo otdb;
		$strout2 = utf8toLatin1($uchars[$i]);
#		echo 'utoL' . $strout2;
		echo $strout2;
		echo ctd  . PHP_EOL;

		echo otd;
		echo bin2hex($strout2);
		echo ctd  . PHP_EOL;

//		echo otd;
//		$strout3 = convutf8to1252($uchars[$i]);
//		echo 'cutf8to1252 ' . $strout3;
//		echo ctd  . PHP_EOL;
//
//		echo otd;
//		echo bin2hex($strout3);
//		echo ctd  . PHP_EOL;

//		echo otd;
//		$strout4 = utf8toAscii($uchars[$i]);
//		echo 'utf8toAscii ' . $strout4;
//		echo ctd  . PHP_EOL;

//		echo otd;
//		$strout5 = convutf8toascii($uchars[$i]);
//		echo 'cutf8toa ' . $strout5;
//		echo ctd  . PHP_EOL;

		echo otdg;
		$strout6 = Latin1toAscii($strout2);
		#$strout6 = Latin1toAsccii($strout3);
		echo $strout6;
#		echo 'LtoA ' . $strout6;
		echo ctd . PHP_EOL;

		echo ctr .   PHP_EOL;
#											}
	}

	echo ctbody; # close table body
	echo ctable;


?>
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>

<?php if ($supress_tablesorter != 's_t'): ?>

		<div id="pager" class="pager">
		  <form>
		    <img src="../js/tablesorter/addons/pager/icons/first.png" class="first"/>
		    <img src="../js/tablesorter/addons/pager/icons/prev.png" class="prev"/>
		    <span class="pagedisplay"></span>
		    <img src="../js/tablesorter/addons/pager/icons/next.png" class="next"/>
		    <img src="../js/tablesorter/addons/pager/icons/last.png" class="last"/>
		    <select class="pagesize">
		      <option value="10">10</option>
		      <option value="20">20</option>
		      <option value="30">30</option>
		      <option value="40">40</option>
		    </select>
		  </form>
		</div>

	<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.js"></script>
	<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.widgets.js"></script>
	<script type="text/javascript" src="../js/tablesorter/addons/pager/jquery.tablesorter.pager.js"></script>
	<script type="text/javascript" src="../js/tablesorter/js/widgets/widget-columnSelector.js"></script>
	<script type="text/javascript" src="../js/tablesortwithpager.js"></script>

<?php else: ?>


<?php endif ?>

	<script type="text/javascript" src="../js/gjAppcore.min.js"></script>
	<script type="text/javascript" src="../js/gjtrack.js"></script>
<?php
//ob_end_flush();
?>
</body>
</html>
