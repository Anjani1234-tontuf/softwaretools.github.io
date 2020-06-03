<?php
// Copyright (C) 1988-2015 Relational Semantics, Inc. (RSI), Newton MA USA
// This Module contains Proprietary Information of Relational Semantics, Inc.
// and should be treated as Confidential. All rights reserved.
// FORECOURT and RSI are registered trademarks of Relational Semantics, Inc.
// PARAGON is a trademark of Relational Semantics, Inc.

// convertcharsets.php  character conversion AKA substitution ( alternates
// or surrogates) and transliteration, where accented characters like À
// used in other languages are changed to the English language A
//
// ########################
//
//  see /doc/RSI_UTF-8.odt for comments and documentation on utf-8, Latin 1 Windows 1252 and charcter conversions
//  and for conversion routines in this file;
//
// ########################
// pass in false to show iconv problems
function init($debugit='') {

	if (empty($debugit)) {
		$gjLocal = false;
	} else {
		$gjLocal = true;
	}

	if ($gjLocal) {
		$gjDebug = true;
		error_reporting(E_ALL | E_STRICT);
		ini_set('display_errors', 1);
		ini_set('log_errors', 1); //!!!!!
		echo 'debugging' .  PHP_EOL;
		// display setlocale setting;
		//echo 'setlocale(LC_ALL, 0) returns: ' . setlocale(LC_ALL, 0) . PHP_EOL;
		// A return value of C means that the user has not set any locale and
		// the default locale is active.

		if (function_exists('mb_internal_encoding') && is_callable('mb_internal_encoding')) {
			$encoding = mb_internal_encoding();
		} else {
			echo 'we do not have  mb_internal_encoding()' . PHP_EOL;
			$encoding = ini_get('default_charset'); # 	'UTF-8'
		}

		if (function_exists('mb_check_encoding') && is_callable('mb_check_encoding')) {
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

		if (!(function_exists('utf8_decode') && is_callable('utf8_decode'))) {
			echo 'we do not have utf8_decode' . PHP_EOL;
		}

		if (!(function_exists('iconv') && is_callable('iconv'))) {
			echo 'we do not have iconv' . PHP_EOL;
		}

		// debugging on sceh only
		// require_once '../../XDEBUG/startXdebug.php';
		if ((function_exists('startXdebug') && is_callable('startXdebug'))) {
			if(!startXdebug()) {
				echo 'no debugging'. PHP_EOL;
			}
		}

	} else {
		error_reporting(0);
		//error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);
		//error_reporting(E_ALL & ~E_DEPRECATED);
		ini_set('display_errors', 0);
		ini_set('log_errors', 1);
		echo 'not debugging' . PHP_EOL;
	}



}

function my_error_handler($e_number, $e_message, $e_file, $e_line, $e_vars) {
    // Build the error message:
    $message = "An error occurred in script '$e_file' on line $e_line errno '$e_number' : $e_message\n";
	$message .= print_r($e_vars,1);
    $message .= "<hr>";

        // Log the error:

        //echo $message;

        // Only print an error message if the error isn't a notice or strict.
        if ( ($e_number != E_NOTICE) && ($e_number < 2048)) {
            echo '<div class="error">A system error occurred. We apologize for the inconvenience.</div>';
        }

} // End of my_error_handler() definition.

// Use my error handler:
set_error_handler('my_error_handler');


include "convertcharencodings.php";

// function convutf8toASCII($str) {
// return  iconv('UTF-8', 'ASCII//TRANSLIT', $str);
// }

//
// function convutf8toiso8($str) {
// return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $str);
// }

// function convutf8to1252($str) {
// return iconv('UTF-8', 'Windows-1252//TRANSLIT', $str);
// }

//function utf8toASCII($str) {
//	setlocale(LC_ALL, array('en_US.utf8', 'en_US.UTF-8'));
//
//	$str = fix_iconvUA($str);
//return  iconv('UTF-8', 'ASCII//TRANSLIT', $str);
//} // utf8toASCII


# not used
function fix_iconvLANamedHE($string) {

		# -- all values > 127 are converted to html entities

		$HEchars = array(
		# start 1252 only
		"\x80" => '&euro;',    // euro currency symbol  x80 128
		# no 81
		"\x82" => '&sbquo;',   // Single Low-9 Quotation Mark  x82 130
		"\x83" => '&fnof;',    // Latin Small Letter F With Hook
		"\x84" => '&bdquo;',   // Double Low-9 Quotation Mark
		"\x85" => '&hellip;',  // Horizontal Ellipsis
		"\x86" => '&dagger;',  // Dagger
		"\x87" => '&Dagger;',  // Double Dagger
		"\x88" => '&circ;',    // Modifier Letter Circumflex Accent
		"\x89" => '&permil;',  // Per Mille Sign
		"\x8A" => '&Scaron;',  // Latin Capital Letter S With Caron
		"\x8B" => '&lsaquo;',  // Single Left-Pointing Angle Quotation Mark
		"\x8C" => '&OElig;',   // Latin Capital Ligature OE
		# no 8d
		"\x8E" => '&#x17D;',   // Latin Captial Z with Caron
		# no 8f
		# no 90
		"\x91" => '&lsquo;',   // Left Single Quotation Mark
		"\x92" => '&rsquo;',   // Right Single Quotation Mark
		"\x93" => '&ldquo;',   // Left Double Quotation Mark
		"\x94" => '&rdquo;',   // Right Double Quotation Mark
		"\x95" => '&bull;',    // Bullet
		"\x96" => '&ndash;',   // En Dash
		"\x97" => '&mdash;',   // Em Dash
		"\x98" => '&tilde;',   // Small Tilde
		"\x99" => '&trade;',   // Trade Mark Sign
		"\x9A" => '&scaron;',  // Latin Small Letter S With Caron
		"\x9B" => '&rsaquo;',  // Single Right-Pointing Angle Quotation Mark
		"\x9C" => '&oelig;',   // Latin Small Ligature OE
		# no 9d
		"\x9E" => '&#x17E;',   // Latin Small Letter Z With Caron
		"\x9F" => '&Yuml;',    // Latin Capital Letter Y With Diaeresis  x9f  159
		# end 1252 only
		"\xa0" => '&nbsp;',    // non-breaking space     xa0 160
		"\xa1" => '&iexcl;',   // inverted exclamation mark
		"\xa2" => '&cent;',    // cent sign
		"\xa3" => '&pound;',   // pound sign
		"\xa4" => '&curren;',  // currency sign
		"\xa5" => '&yen;',     // yen sign
		"\xa6" => '&brvbar;',  // broken vertical bar
		"\xa7" => '&sect;',    // section sign
		"\xa8" => '&uml;',     // spacing diaeresis - umlaut
		"\xa9" => '&copy;',    // copyright sign
		"\xaa" => '&ordf;',    // feminine ordinal indicator
		"\xab" => '&laquo;',   // left double angle quotes
		"\xac" => '&not;',     // not sign
		"\xad" => '&shy;',     // soft hyphen
		"\xae" => '&reg;',     // registered trade mark sign
		"\xaf" => '&macr;',    // spacing macron - overline  xaf 175
		"\xb0" => '&deg;',     // degree sign  xb0  176
		"\xb1" => '&plusmn;',  // plus-or-minus sign
		"\xb2" => '&sup2;',    // superscript two - squared
		"\xb3" => '&sup3;',    // superscript three - cubed
		"\xb4" => '&acute;',   // acute accent - spacing acute
		"\xb5" => '&micro;',   // micro sign
		"\xb6" => '&para;',    // pilcrow sign - paragraph sign
		"\xb7" => '&middot;',  // middle dot - Georgian comma
		"\xb8" => '&cedil;',   // spacing cedilla
		"\xb9" => '&sup1;',    // superscript one
		"\xba" => '&ordm;',    // masculine ordinal indicator
		"\xbb" => '&raquo;',   // right double angle quotes
		"\xbc" => '&frac14;',  // fraction one quarter
		"\xbd" => '&frac12;',  // fraction one half
		"\xbe" => '&frac34;',  // fraction three quarters
		"\xbf" => '&iquest;',  // inverted question mark    xbf 191
		"\xc0" => '&Agrave;',  // latin capital letter A with grave  xc0  192
		"\xc1" => '&Aacute;',  // latin capital letter A with acute
		"\xc2" => '&Acirc;',   // latin capital letter A with circumflex
		"\xc3" => '&Atilde;',  // latin capital letter A with tilde
		"\xc4" => '&Auml;',    // latin capital letter A with diaeresis
		"\xc5" => '&Aring;',   // latin capital letter A with ring above
		"\xc6" => '&AElig;',   // latin capital letter AE
		"\xc7" => '&Ccedil;',  // latin capital letter C with cedilla
		"\xc8" => '&Egrave;',  // latin capital letter E with grave
		"\xc9" => '&Eacute;',  // latin capital letter E with acute
		"\xca" => '&Ecirc;',   // latin capital letter E with circumflex
		"\xcb" => '&Euml;',    // latin capital letter E with diaeresis
		"\xcc" => '&Igrave;',  // latin capital letter I with grave
		"\xcd" => '&Iacute;',  // latin capital letter I with acute
		"\xce" => '&Icirc;',   // latin capital letter I with circumflex
		"\xcf" => '&Iuml;',    // latin capital letter I with diaeresis xcf  207
		"\xd0" => '&ETH;',     // latin capital letter ETH    xd0 208
		"\xd1" => '&Ntilde;',  // latin capital letter N with tilde
		"\xd2" => '&Ograve;',  // latin capital letter O with grave
		"\xd3" => '&Oacute;',  // latin capital letter O with acute
		"\xd4" => '&Ocirc;',   // latin capital letter O with circumflex
		"\xd5" => '&Otilde;',  // latin capital letter O with tilde
		"\xd6" => '&Ouml;',    // latin capital letter O with diaeresis
		"\xd7" => '&times;',   // multiplication sign
		"\xd8" => '&Oslash;',  // latin capital letter O with slash
		"\xd9" => '&Ugrave;',  // latin capital letter U with grave
		"\xda" => '&Uacute;',  // latin capital letter U with acute
		"\xdb" => '&Ucirc;',   // latin capital letter U with circumflex
		"\xdc" => '&Uuml;',    // latin capital letter U with diaeresis
		"\xdd" => '&Yacute;',  // latin capital letter Y with acute
		"\xde" => '&THORN;',   // latin capital letter THORN
		"\xdf" => '&szlig;',   // latin small letter sharp s - ess-zed  xdf 223
		"\xe0" => '&agrave;',  // latin small letter a with grave  xd0 208
		"\xe1" => '&aacute;',  // latin small letter a with acute
		"\xe2" => '&acirc;',   // latin small letter a with circumflex
		"\xe3" => '&atilde;',  // latin small letter a with tilde
		"\xe4" => '&auml;',    // latin small letter a with diaeresis
		"\xe5" => '&aring;',   // latin small letter a with ring above
		"\xe6" => '&aelig;',   // latin small letter ae
		"\xe7" => '&ccedil;',  // latin small letter c with cedilla
		"\xe8" => '&egrave;',  // latin small letter e with grave
		"\xe9" => '&eacute;',  // latin small letter e with acute
		"\xea" => '&ecirc;',   // latin small letter e with circumflex
		"\xeb" => '&euml;',    // latin small letter e with diaeresis
		"\xec" => '&igrave;',  // latin small letter i with grave
		"\xed" => '&iacute;',  // latin small letter i with acute
		"\xee" => '&icirc;',   // latin small letter i with circumflex
		"\xef" => '&iuml;',    // latin small letter i with diaeresis   xdf  239
		"\xf0" => '&eth;',     // latin small letter eth     xf0  240
		"\xf1" => '&ntilde;',  // latin small letter n with tilde
		"\xf2" => '&ograve;',  // latin small letter o with grave
		"\xf3" => '&oacute;',  // latin small letter o with acute
		"\xf4" => '&ocirc;',   // latin small letter o with circumflex
		"\xf5" => '&otilde;',  // latin small letter o with tilde
		"\xf6" => '&ouml;',    // latin small letter o with diaeresis
		"\xf7" => '&divide;',  // division sign
		"\xf8" => '&oslash;',  // latin small letter o with slash
		"\xf9" => '&ugrave;',  // latin small letter u with grave
		"\xfa" => '&uacute;',  // latin small letter u with acute
		"\xfb" => '&ucirc;',   // latin small letter u with circumflex
		"\xfc" => '&uuml;',    // latin small letter u with diaeresis
		"\xfd" => '&yacute;',  // latin small letter y with acute
		"\xfe" => '&thorn;',   // latin small letter thorn
		"\xff" => '&yuml;',    // latin small letter y with diaeresis  xff  255
		);
		$string = strtr($string, $HEchars);

	return $string;
} //fix_iconvLANamedHE

function dumptestTable($arrayin, $title='', $which='ltoa') {

	if ($which == 'utol') {
		setlocale(LC_ALL, array('en_US.utf8', 'en_US.UTF-8'));
	} else {
		setlocale(LC_ALL, array('en_US.CP1252', 'en_US.iso88591'));
	}

	# write the table header row
	if (!empty($title)) {
		echo oh1 . $title . ch1;
	} else {
		echo oh1 . 'Your Table' . ch1;
	}

	echo '<table class="tablesorter custom-popup" data-table-group="' . microtime(). '">';

	#echo otableCP . PHP_EOL;
	#echo otable . PHP_EOL;
	echo othead; # table head
	echo otr . PHP_EOL;
	# table head
	echo oth;
	echo 'char';
	echo cth;

	echo oth;
	echo 'hex';
	echo cth;

	echo ctr . PHP_EOL;
	echo cthead; # close table head
	echo otbody; # open table body

	# write the table body
	foreach ($arrayin as $value) {
		echo otr;

		echo otd;
		echo " $value ";
		echo ctd ;

		echo otd;
		echo bin2hex($value);
		echo ctd ;

		echo ctr;
		echo  PHP_EOL;

	}

	echo ctr .   PHP_EOL;
	echo ctbody; # close table body
	echo ctable . PHP_EOL;
} //dumptestTable



