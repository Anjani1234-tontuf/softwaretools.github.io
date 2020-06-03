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
<meta charset="<?php echo $enco;?>">
<title>dump code convert testTables</title>
<link rel="StyleSheet" href="../css/encodingstyles.css" type="text/css">
<link rel="stylesheet" href="../js/tablesorter/css/theme.blue.css">
</head>
<body>
<?php
/**

To verify this conversion, the following web page is easy to search by hex code values
http://www.fileformat.info/info/charset/UTF-8/list.htm

Notes

displaying the soft hypen screws up most displays

This file dumps an input test table

run from run_conversions.php
file encodinggets.php sets up the array to dump $temp1 and the title to display

	$temp1  = array($inStrs, $accentedLetters,$utf8Latin1samplechars, $utf8arrows);
	$titlea = array('inStrs', 'Accented Letters','utf8 Latin1 sample chars', 'utf-8 arrows');

the arrays are in 'testTablesinHex.php';'testTablesinutf8.php';

or this dumps whatever was put into the textbox in run_conversions.php

*/
include 'formatcliorhtml.php';
include 'convertcharsets.php';
include 'testTablesinHex.php';
if ($conv != 'ltoa') {
	include 'testTablesinutf8.php';
}
include 'encodinggets.php';

# arrows needs a better font
# pretty dump the input


if ($runwhat !== 'hexprint') exit();
$temp2 = substr($input_array,1,1) - 1;

if($array_override != '') {
	dumptestTable(array($tb),$title, $conv);
} else if($conv == 'ltoa') {
	dumptestTable($singlebytegreaterthan128, $title, $conv);
} else {
	dumptestTable($temp1[$temp2], $title);
}



?>

<?php if($supress_tablesorter == 's_t'): ?>

<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.js"></script>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.widgets.js"></script>
<script type="text/javascript" src="../js/tablesort.js"></script>
<?php else: ?>

<?php endif ?>
<script type="text/javascript" src="../js/gjAppcore.min.js"></script>
<script type="text/javascript" src="../js/gjtrack.js"></script>
</body>
</html>
