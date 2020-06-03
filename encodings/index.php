<?php
include 'formatcliorhtml.php';
if (isset($_GET['conv']) && !empty($_GET['conv'])) { // Handle the form input .

	$conv = strtolower($_GET['conv']);

	$aconv = array('utol','ltoa');
	$ameta = array('utf-8','windows-1252');

	$enco = '';

	$length = sizeof($aconv);

	for ($i=0; $i < $length; $i++) {
		if($conv == $aconv[$i]) {
			$enco = $ameta[$i];
			break;
		}
	}

	//dumpPost();
	//logToFile('conv ' . $conv . ' enc ' . $enco);

	if ($enco != '') {
		$conv = urlencode($conv);
		$enco = urlencode($enco);
		$data = array(	'conv'=> $conv,
						'enco' => $enco);
		$gjhref = 'run_conversions.php?' . http_build_query($data);
		// header ("location: $gjhref");
		js_redirect($gjhref, 0);
	} else {
		echo '<p style=\'padding-left: 15px; font-weight:bold;color:red;\'>' . 'I want either utol or ltoa. your entered ' . $conv. ' Pls, one more time, with feeling. </p>' . PHP_EOL;
	}

}
// Show the ask:
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Pick a Default encoding</title>
	<link rel="StyleSheet" href="../css/encodingstyles.css" type="text/css">
</head>
<body>
<h3>Open another instance of this in a new window.  This lets you run operations and show the windows side by side, with utf-8 on one side and Windows 1252 on the other.</h3>

<div id="cSWrapper" class="note">

<a target="_blank" href="index.php">Open another Instance - Right Click Open in New Window</a><br>

<form action="index.php" method="get">
<fieldset>
<legend>I am starting out as </legend>

<label for="conv1"><input type="radio" checked="checked" name="conv" id="conv1" value="utol" />utf-8</label><br>
<label for="conv2"><input type="radio" name="conv" id="conv2" value="ltoa" />Windows-1252 aka Latin1</label><br>
<p><input type="submit" name="submit" value="Start" /></p>

</fieldset>
<br>

</form>
</div>
<!--
<a target="_blank" href="dumpremove_accents.php">dumpremove_accents.php</a>
<a target="_blank" href="testurlify.php">testurlify.php</a>
<a target="_blank" href="testutf-8ncr.php">testutf-8ncr.php</a>
<a target="_blank" href="dumputf-8.php">dumputf-8.php</a>
-->
<p>
<a target="_blank" href="testutf-8stringfuncs.php">Click here to run the first conversion test routine - testutf-8stringfuncs.php</a><br>
<a target="_blank" href="GaryCodePage1252.html">GaryCodePage1252.html</a><br>
<a target="_blank" href="GaryCodePageutf8.html">GaryCodePageutf8.html</a><br>
<a target="_blank" href="GaryCodePage.html">GaryCodePage.html</a><br>
<a target="_blank" href="dumpstrclean.php">strclean</a><br>
<a target="_blank" href="testutf-8ncr.php">testutf-8ncr.php</a><br>
<a target="_blank" href="dumphtmlentities.php">dumphtmlentities.php</a><br>
<a target="_blank" href="dumpconversiontables.php">dumpconversiontables.php</a><br>

</p>

</body>
</html>