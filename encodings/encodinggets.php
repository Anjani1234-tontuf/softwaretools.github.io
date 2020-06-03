<?php
	logToFile('EGet');
	dumpGet();

	$gjErr = false;
	$msg1 = '';

	if (!empty($_GET['conv'])) {
		$conv = $_GET['conv'];
	} else {
		$conv = '';
	}

	if (!empty($_GET['enco'])) {
		$enco = $_GET['enco'];
	} else {
		$encov = '';
	}

	if (!empty($_GET['input_array'])) {
		$input_array = $_GET['input_array'];
	} else {
		$input_array = '';
	}

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
		$runwaht = '';
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

	if ($conv == 'ltoa') {  # $conv === ltoa   windows 1252
		if($array_override != '') {
			$uchars = array($tb);
			$title  = 'Your Latin1 Input';
		} else {
			$uchars = $singlebytegreaterthan128;
			$title  = 'Latin1 to RSI';
		}
	} else {  //utf-8

		$temp1  = array($inStrs, $accentedLetters,$utf8Latin1samplechars, $inStrs2);
		$titlea = array('inStrs', 'Accented Letters','utf8 Latin1 sample chars','rsi conversion overrides') ;

		$temp2 = substr($input_array,1,1) -1;

		if($array_override != '') {
			$uchars = array($tb);
			$title  = 'Your utf-8 Input';
		} else {
			$uchars = $temp1[$temp2];
			$title  = $titlea[$temp2];
		}
	}
