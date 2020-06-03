<?php
// Copyright (C) 1988-2015 Relational Semantics, Inc. (RSI), Newton MA USA
// This Module contains Proprietary Information of Relational Semantics, Inc.
// and should be treated as Confidential. All rights reserved.
// FORECOURT and RSI are registered trademarks of Relational Semantics, Inc.
// PARAGON is a trademark of Relational Semantics, Inc.

# formatcliorhtml.php
# used to create a table for html display and nothing for cli

	if (php_sapi_name() != 'cli') {
	define('oh1','<H1>');
	define('ch1','</H1>');
	define('otableCP','<table class="tablesorter custom-popup">');
	define('otable','<table class="tablesorter">');
	define('otablePT','<table class="pt">');
	define('othead','<thead>');
	define('cthead','</thead>');
	define('oth','<th>');
	define('cth','</th>');
	define('otbody','<tbody>');
	define('ctbody','</tbody');
	define('otr','<tr>');
	define('otr1','<tr class="tr1">');
	define('otr2','<tr class="tr2">');
	define('otr3','<tr class="tr3">');
	define('otr4','<tr class="tr4">');
	define('otr5','<tr class="tr5">');
	define('otr6','<tr class="tr6">');
	define('otr7','<tr class="tr7">');
	define('otd','<td>');
	define('ctd','</td>');
	define('ctr','</tr>');
	define('ctable','</table>');
	define('opre','<pre>');
	define('cpre','</pre>');
	define('odiv','<div>');
	define('cdiv','</div>');
	define('hr','<hr class="light">');
	define('hrt','<hr class="teal">');
	define('oth1','<th data-priority="1">');
	define('oth2','<th data-priority="2">');
	define('oth3','<th data-priority="3">');
	define('oth4','<th data-priority="4">');
	define('oth5','<th data-priority="5">');
	define('oth6','<th data-priority="6">');
	define('oth7','<th data-priority="6">');
	define('oth8','<th data-priority="6">');
	define('oth9','<th data-priority="critical">');
	define('oth10','<th data-priority="critical">');
	define('oth11','<th data-priority="critical">');
	define('otdb','<td class="blue">');
	define('otdg','<td class="green">');
	define('otdo','<td class="orange">');
	define('otdp','<td class="purple">');
	define('otdr','<td class="red">');
	define('otdy','<td class="yellow">');
	} else {
	define('oh1','');
	define('ch1','');
	define('otableCP','');
	define('otable','');
	define('othead','');
	define('cthead','');
	define('oth','    ----   ');
	define('cth','');
	define('otbody','');
	define('ctbody','');
	define('otr','');
	define('otr1','');
	define('otr2','');
	define('otr3','');
	define('otr4','');
	define('otr5','');
	define('otr6','');
	define('otr7','');
	define('otd','');
	define('ctd','');
	define('ctr','');
	define('ctable','');
	define('opre','');
	define('cpre','');
	define('odiv','');
	define('cdiv','');
	define('hr', PHP_EOL . '---------------------');
	define('hrt', PHP_EOL . '---------------------');
	define('oth1','');
	define('oth2','');
	define('oth3','');
	define('oth4','');
	define('oth5','');
	define('oth6','');
	define('oth7','');
	define('oth8','');
	define('oth9','');
	define('oth10','');
	define('oth11','');
	define('otdb','');
	define('otdg','');
	define('otdo','');
	define('otdp','');
	define('otdr','');
	define('otdy','');
	}

// open in new window, if pop blocker allows
function js_redirect($url, $millseconds=5) {
    echo "<script language=\"JavaScript\">\n";
    echo "function redirect() {\n";
    echo "window.open('" . $url . "' , '_blank');\n";
    echo "}\n";
    echo "timer = setTimeout('redirect()', '" . ($millseconds) . "');\n";
    echo "</script>\n";
    return true;
} // end js_redirect()


function logToFile($msg) {
    $fd = fopen('logfile.txt', 'a');
    if ($fd) {
        $str = '[' . date('Y/m/d h:i:s', time() + 18000) .'] ' . $msg;
        fwrite($fd, $str . "\n");
        fclose($fd);
    } else {
        error_log('+++***'.$msg, 0); //php system logger
    }
} // end logToFile()

function dumpPost() {
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		foreach($_POST as $key=>$value) 	{
			logToFile("$key=$value");
		}
	}
}

function dumpGet() {
	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		foreach($_GET as $key=>$value) 	{
			logToFile("$key=$value");
		}
	}
}

function dumpHeaders() {
	$headers = apache_request_headers();
	foreach ($headers as $header => $value) {
    	logToFile( "$header: $value");
	}
}

	// writes report to loggjdbg.log if method is browser

	// adapted from get_define_vars comments on php.net
	// Function to create a debug report to display or email.
	// Usage: generateDebugReport('browser or email ' method,get_defined_vars(),email[optional]);
	// Where method is "browser" or "email".

	// Create an ignore list for keys returned by 'get_defined_vars'.
	// For example, HTTP_POST_VARS, HTTP_GET_VARS and others are
	// redundant (same as _POST, _GET)
	// Also include vars you want ignored for security reasons - i.e. PHPSESSID.
function generateDebugReport($method, $defined_vars, $email='undefined'){
	$ignorelist =array(
	//'HTTP_POST_VARS',
	//'HTTP_GET_VARS',
	//'HTTP_COOKIE_VARS',
	//'HTTP_SERVER_VARS',
	//'HTTP_ENV_VARS',
	//'HTTP_SESSION_VARS',
	//'_ENV',
	'PHPSESSID',
	//'_SERVER',
	//'GLOBALS'
	);

	$timestamp=date('m/d/y h:m:s');
	$message="Debug report created $timestamp\n";

	// Get the last SQL error for good measure, where $link is the resource identifier
	// for mysql_connect. Comment out or modify for your database or abstraction setup.
	//global $link;
	//$sql_error=mysql_error($link);
	//if($sql_error){
	//  $message.="\nMysql Messages:\n".mysql_error($link);
	// }
	// End MySQL

	// Could use a recursive function here. You get the idea ;-)
	foreach ($defined_vars as $key => $val) {
		if (is_object($val)) {	$val = obj2array($val);
			$message .= ' obj2array: ' . "\n";}
		if (is_array($val) && !in_array($key, $ignorelist) && count($val) > 0) {
			$message .="\n$key array (key=value):\n";
			foreach ($val as $subkey => $subval) {
				if (!in_array($subkey, $ignorelist) && !is_array($subval)) {
					$message .=$subkey.' = '.$subval."\n";
				} elseif (!in_array($subkey, $ignorelist) && is_array($subval)) {
					foreach ($subval as $subsubkey => $subsubval) {
						if (!in_array($subsubkey, $ignorelist)) {
							$message .=$subsubkey.' = '.$subsubval."\n";
						}
					}
				}
			}
		} elseif (!is_array($val) && !in_array($key, $ignorelist) && $val) {
			if (is_object($val)) {$val = obj2array($val);
				$message .= ' obj2array: ' . "\n";}
			$message .="\nVariable ".$key.' = '.$val."\n";
		}
	}

	if ($method=='browser') {
		file_put_contents('loggjdbg.log', $message);
	} elseif ($method=='email') {
		if ($email=='undefined') {
			$email =$_SERVER['SERVER_ADMIN'];
		}

		$mresult =mail($email, 'Debug Report for '.$_ENV['HOSTNAME'].'', $message);
		if ($mresult==1) {
			echo "Debug Report sent successfully.\n";
		} else {
			echo "Failed to send Debug Report.\n";
		}
	}
} //end generateDebugReport()
