<?php
$conv	= strtolower(htmlspecialchars($_GET['conv']));
$enco	= strtolower(htmlspecialchars($_GET['enco']));
$check	= array('utol','ltoa');

if (!in_array($conv, $check)) {
	die('invalid start');
}

if ($conv == 'ltoa') {
	# trouble with setting to CP1252
	setlocale(LC_ALL, array('en_US.CP1252', 'en_US.iso88591'));
	# reguired - the html meta tag is not enough to force the display to Windows 1252
	header('Content-Type: text/html; charset=Windows-1252',TRUE);
}


?>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=Windows-1252">
<title>Display of conversion test 2 for charset windows 1252</title>
<link rel="StyleSheet" href="../css/encodingstyles.css" type="text/css">
<link rel="stylesheet" href="../js/tablesorter/css/theme.blue.css">
<link rel="stylesheet" href="../js/tablesorter/addons/pager/jquery.tablesorter.pager.css">
</head>
<body>

<input class="closeit" type="button" id="close02" value="-" onClick="toggleDisplayButton('cSWrapper','close02');">
<div id="cSWrapper" class="note">

<?php
/*
dumplatin1.php

This file sets up the display and dump of conversions from Latin 1 and RSI ASCII
run_conversions.php

or this dumps whatever was put into the textbox in run_conversions.php

*/

include 'formatcliorhtml.php';
include 'convertcharsets.php';
include 'testTablesinHex.php';
if ($conv != 'ltoa') {
	include 'testTablesinutf8.php';
}
include 'encodinggets.php';


ob_start();

echo "<pre id=\"notes\" class=\"notes\">\n";

if ($gjdebug != '') {
	init('1');
} else {
	init();
}

# init() for regular error reporting , pass anything ex init('debug') to debug and show these
# echo 'Notice:  iconv(): Detected an illegal character in input string in ..\convertcharsets.php on line xx' . PHP_EOL;

// force the locale in CP1252
Latin1toASCII(chr(134));

//check it
echo 'setlocale(LC_ALL, 0) returns: ' . setlocale(LC_ALL, 0) .PHP_EOL;

echo 'This page has Latin1 and Latin1 transliterated to decimal html entitys and other characters'  . PHP_EOL . PHP_EOL;

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

	echo oth5;
	echo 'LtoA';
	echo cth;

	echo oth6;
	echo 'hex';
	echo cth;

	echo ctr . PHP_EOL;
	echo cthead; # close table head
	echo otbody; # open table body

	for ($i=0; $i < count($uchars); $i++) {

//		$tst = Latin1toASCII($uchars[$i]);
#		if (($tst == '?') || ($tst == '')) continue;
#		if (($tst == '?') || ($tst == '')) {

		echo otr  . PHP_EOL;

		echo otdp;
		echo "$i";
		echo ctd  . PHP_EOL;

		echo otdr;
		echo "$uchars[$i]";
		echo ctd  . PHP_EOL;

		echo otd;
		echo bin2hex($uchars[$i]);
		echo ctd  . PHP_EOL;

		echo otdb;
		$strout2 = Latin1toASCII($uchars[$i]);
		echo $strout2;
		echo ctd  . PHP_EOL;

		echo otd;
		echo bin2hex($strout2);
		echo ctd  . PHP_EOL;


		echo ctr .   PHP_EOL;
#											}
	}

	echo ctbody; # close table body
	echo ctable;

	generateDebugReport('browser',get_defined_vars());

	if ($supress_tablesorter == 's_t') {
		logToFile(' supress_tablesorter');
	} else {
		logToFile('no supress_tablesorter');
	}

ob_end_flush();
?>


</div>
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<?php if ($supress_tablesorter != 's_t'): ?>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.js"></script>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.widgets.js"></script>
<script type="text/javascript" src="../js/tablesort.js"></script>
<script  type="text/javascript" src="../js/tablesorter/js/widgets/widget-columnSelector.js"></script>

<?php else: ?>

<?php endif ?>
<script type="text/javascript" src="../js/gjAppcore.min.js"></script>
<script type="text/javascript" src="../js/gjtrack.js"></script>
</body>
</html>
