<?php
$conv	= 'ltoa';
$enco	= 'windows-1252';
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
<title>show conversion of of Latin1 > 127 to html entity hex encoded</title>
<link rel="StyleSheet" href="../css/encodingstyles.css" type="text/css">
<link rel="stylesheet" href="../js/tablesorter/css/theme.blue.css">
<!--<link rel="stylesheet" href="../js/tablesorter/addons/pager/jquery.tablesorter.pager.css">"-->
</head>
<body>

<input class="closeit" type="button" id="close02" value="-" onClick="toggleDisplayButton('cSWrapper','close02');">
<div id="cSWrapper" class="note">
<!-- This selector markup is completely customizable -->
<!--
<div class="columnSelectorWrapper" >
	<input id="colSelect1" type="checkbox" class="hidden">
	<label class="columnSelectorButton" for="colSelect1">Column</label>
	<div id="columnSelector" class="columnSelector">
	</div>
</div>
Numerical or Hexidecimal


substitue these entries in fucntion fix_iconvLAHE in convertcharsets.php
-->
<?php
/*
use to build a search string table


function fix_iconvLANamedHE($string)
Latin1toAscii

*/

include 'formatcliorhtml.php';
include 'convertcharsets.php';
include 'testTablesinHex.php';
if ($conv != 'ltoa') {
	include 'testTablesinutf8.php';
}
#include 'encodinggets.php';
$uchars = $singlebytegreaterthan128;
$title  = 'htmlentites in decimal for latin1 > 127';
ob_start();

echo "<pre id=\"notes\" class=\"notes\">\n";

$gjdebug = 'y';

if ($gjdebug != '') {
	init('1');
} else {
	init();
}

# convert latin1 > 127 to decimal encoded html entities to match what is currently done for &#167

function Latin1GT127toDecimalHtmlEntity($str) {
return '&#' . ord($str) . ';'  ;
}


function Latin1GT127DecimalHtmlEntityto($str) {
return chr((int)substr($str,2));
}



# init() for regular error reporting , pass anything ex init('debug') to debug and show these
# echo 'Notice:  iconv(): Detected an illegal character in input string in ..\convertcharsets.php on line xx' . PHP_EOL;

// force the locale in CP1252

//check it
echo 'setlocale(LC_ALL, 0) returns: ' . setlocale(LC_ALL, 0) .PHP_EOL;

echo 'hex encoding'  . PHP_EOL . PHP_EOL;

echo '</pre>';

echo '</div>'; # cSWrapper

	echo oh1 . $title . ch1;

	# the table
	echo otable;
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
	echo 'Latin1GT127toDecimalHtmlEntity';
	echo cth;

	echo oth6;
	echo 'hex';
	echo cth;

	echo oth6;
	echo 'Latin1GT127DecimalHtmlEntityto';
	echo cth;

	echo oth8;
	echo 'hex';
	echo cth;

	echo ctr . PHP_EOL;
	echo cthead; # close table head
	echo otbody; # open table body

	for ($i=0; $i < count($uchars); $i++) {

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
		$strout2 = Latin1GT127toDecimalHtmlEntity($uchars[$i]);
		echo $strout2;
		echo ctd  . PHP_EOL;

		echo otd;
		echo bin2hex($strout2);
		echo ctd  . PHP_EOL;

		echo otdb;
		$strout3 = Latin1GT127DecimalHtmlEntityto($strout2);
		echo $strout3;
		echo ctd  . PHP_EOL;

		echo otd;
		echo bin2hex($strout3);
		echo ctd  . PHP_EOL;

		echo ctr .   PHP_EOL;
#											}
	}

	echo ctbody; # close table body
	echo ctable;

ob_end_flush();
?>

<pre>
Gómez¶§

--codes

€‚ƒ„…†‡ˆ‰Š‹
ŒŽ‘’“”•–—˜™
š›œžŸ

--decimal html entities.  See if Browsers support 127 to 159

&#128;&#129;&#130;&#131;&#132;&#133;&#134;&#135;&#136;&#137;&#138;&#139;
&#140;&#141;&#142;&#143;&#144;&#145;&#146;&#147;&#148;&#149;&#150;&#151;&#152;&#153;
&#154;&#155;&#156;&#157;&#158;&#159;

</pre>

<!--
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
-->
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.js"></script>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.widgets.js"></script>
<script type="text/javascript" src="../js/tablesort.js"></script>
<!--script type="text/javascript" src="../js/tablesorter/addons/pager/jquery.tablesorter.pager.js"></script>"-->

<script src="../js/tablesorter/js/widgets/widget-columnSelector.js"></script>
<script type="text/javascript" src="../js/gjAppcore.min.js"></script>
<script type="text/javascript" src="../js/gjtrack.js"></script>

</body>
</html>
