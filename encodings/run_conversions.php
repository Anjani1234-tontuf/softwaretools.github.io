<?php
$conv	= strtolower(htmlspecialchars($_GET['conv']));
$enco	= strtolower(htmlspecialchars($_GET['enco']));
$check	= array('utol','ltoa');

if (!in_array($conv, $check)) {
	die('invalid start');
}

# run operations

/*
this script uses the 2 pass convention for showing a php / html form
the first time this php file is loaded, it display the form, and since there is no post data
it skips the rest of the processing, it does nothing.

The form posts to this file, on the 'second' pass, where we decide what to do next

default values & reset the values already sent


*/

include 'formatcliorhtml.php';
ob_start();
if (isset($_GET) && array_key_exists('secondform', $_GET)) {

	logToFile('RGet');
	dumpGet();

	$gjErr = false;
	$msg1 = '';

	if (!empty($_GET['input_array'])) {
		$input_array = $_GET['input_array'];
	} else {
		$input_array = '';
	}

	if (!empty($_GET['array_override'])) {
		$array_override = $_GET['array_override'];
	} else {
		$array_override = '';
	}

	if (!empty($_GET['runwhat'])) {
		$runwhat = $_GET['runwhat'];
	} else {
		$runwhat = '';
	}

	if (!empty($_GET['gjdebug'])) {
		$gjdebug = $_GET['gjdebug'];
	} else {
		$gjdebug = '';
	}

	if (!empty($_GET['supress_pagination'])) {
		$supress_pagination = $_GET['supress_pagination'];
	} else {
		$supress_pagination = '';
	}

	if (!empty($_GET['supress_tablesorter'])) {
		$supress_tablesorter = $_GET['supress_tablesorter'];
	} else {
		$supress_tablesorter = '';
	}

	if (!empty($_GET['tb'])) {
		$tb = $_GET['tb'];
	} else {
		$tb = '';
	}

	if($conv == 'utol' && $input_array === '' && $array_override === '') {
		$gjErr = true;
		$msg1 .= 'please pick some kind of input';
	}

	if ($gjErr || $msg1 != '') {
		error_log('Error : ' .  $msg1);
		echo "<pre style='color:red'>\n";
		echo 'Error : ' . $msg1;
		echo "</pre'>\n";
		exit(1);
	}


	$conv 					= urlencode($conv);
	$enco 					= urlencode($enco);
	$input_array 			= urlencode($input_array);
	$array_override			= urlencode($array_override);
	$runwhat				= urlencode($runwhat);
	$gjdebug				= urlencode($gjdebug);
	$supress_pagination		= urlencode($supress_pagination);
	$supress_tablesorter	= urlencode($supress_tablesorter);

	// if tb is filled in, it could be large, so put it last
	if (!empty($tb)) {
		$tb = urlencode($tb);
	} else {
		$tb = '';
	}

	$data = array(
	'conv' 					=> $conv,
	'enco'					=> $enco,
	'input_array'			=> $input_array,
	'array_override'		=> $array_override,
	'runwhat'				=> $runwhat,
	'gjdebug'				=> $gjdebug,
	'supress_pagination'	=> $supress_pagination,
	'supress_tablesorter'	=> $supress_tablesorter,
	'tb'					=> $tb);


	generateDebugReport('browser',get_defined_vars());
	//dumpHeaders();
	//logToFile(http_build_query($data));


	if ($conv == 'ltoa') {
		setlocale(LC_ALL, array('en_US.CP1252', 'en_US.iso88591'));

		# build a fully qualified path to the souce, avoid redirection

		$host  = $_SERVER['HTTP_HOST'];
		$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');

		# in the file that is being loaded example dumpit.php , it sends a header
		# header('Content-Type: text/html; charset=Windows-1252',TRUE);
		# to force the browser to display as 1252, the meta tag
		# <meta http-equiv="Content-Type" content="text/html; charset=Windows-1252">
		# is not enough
		# the header has to be sent in the php file that does the header ( location


		if ($runwhat == 'hexprint') {
				$gjhref = 'dumpit.php?' . http_build_query($data);
				# logToFile("$host$uri/$gjhref");
				header("Location: http://$host$uri/$gjhref", TRUE, 307);

		} else {
			$gjhref1 = 'dumplatin1.php?' . http_build_query($data);
			header("Location: http://$host$uri/$gjhref1", TRUE, 307);
		}
	} else { #do utf8 based conversion
		// you can run a dump of an input table or a conversion; but not both at the same time
		# we can use redirect to browser since default charset is utf-8

		if ($runwhat == 'hexprint') {
			setlocale(LC_ALL, array('en_US.utf8', 'en_US.UTF-8'));
			$gjhref1 = 'dumpit.php?'  .  http_build_query($data);
			js_redirect($gjhref1, 0);
		} else {
			$gjhref2 = 'dumputf-8.php?' . http_build_query($data);
			js_redirect($gjhref2, 1000);
		}
	}
} // end if (isset($_GET)
ob_end_flush();

?>
<!doctype html>
<html>
<head>
<meta charset="<?php echo $enco;?>">
<title>Run an encoding operation</title>
<link rel="StyleSheet" href="../css/encodingstyles.css" type="text/css">
</head>
<body>
<?php
include('SimpleBanner.html');
echo '<p style=\'padding-left: 15px; font-weight:bold;color:black;\'>Run an operation,  Please allow popups! from this site.<br>Do you have another instance
of me open in a new window, to display utf-8 and windows 1252 side by side?.</p>' .  "\n";
?>

<form style="margin-left:7px;display:block;" name="sfm" id="sfm" action=""
<?php if ($enco == 'windows-1252') echo 'accept-charset="ISO-8859-1"'; ?> method="get">

<legend>Input</legend>
<legend>Make your input selection:</legend>

<table class="pt">
<tr>

<?php if ($enco != 'windows-1252'): ?>
<td>
<label for="ut1">
<input type="radio" checked="checked" name="input_array" id="ut1" value="u1" />
utf-8 Large String Table</label>

<label for="ut2">
<input type="radio" name="input_array" id="ut2" value="u2" />
utf-8 Accented characters</label>

<label for="ut3">
<input type="radio" name="input_array" id="ut3" value="u3" />
utf8 sample code points</label>

<label for="ut4">
<input type="radio" name="input_array" id="ut6" value="u4" />
rsi</label>
</td>

<?php else: ?>
<td>
<label for="lt1" >
<input type="radio" checked="checked" name="input_array" id="lt1" value="l1" />
Latin1 - Windows 1252 code point</label>
</td>

<?php endif ?>
</tr>

<tr>
<td>
<label for="ao">
<input type="radio" name="array_override" id="ao" value="1" />
The TextBox Below</label>

<label class="buttonNgrey" for="tb">The text you enter will be in <?php echo $enco;?> </label><br>
<textarea class="buttonNgrey" name="tb" id="tb" cols="40" rows="5" style="width:50em"></textarea>
<br>
</td>
</tr>

<tr>
<td>
<input type="checkbox" name="runwhat" value="hexprint">Dump the Input <b>OR</b>
</td>
</tr>

<tr>
<td>
<input type="checkbox" name="runwhat" value="runconv" checked>Convert <?php echo $conv;?>
</td>
</tr>

<tr>
<td>
<input type="checkbox" name="gjdebug" value="gjdebug">Debug &nbsp;
<input type="checkbox" name="supress_tablesorter" value="s_t">Supress Tablesorter &nbsp;
</td>
</tr>

</table>
<br>
<input type="hidden" name="secondform" value="1">
<input type="hidden" name="conv" value="<?php echo $conv;?>">
<input type="hidden" name="enco" value="<?php echo $enco;?>">
<input type="hidden" name="supress_pagination" value="">
<input class="buttonNgrey" type="Submit" id="submit1" value="Go">
</form>
</body>
</html>