<?php
// Copyright (C) 1988-2015 Relational Semantics, Inc. (RSI), Newton MA USA
// This Module contains Proprietary Information of Relational Semantics, Inc.
// and should be treated as Confidential. All rights reserved.
// FORECOURT and RSI are registered trademarks of Relational Semantics, Inc.
// PARAGON is a trademark of Relational Semantics, Inc.

// convertcharencodings.php  character conversion AKA substitution ( alternates
// or surrogates) and transliteration, where accented characters like À
// used in other languages are changed to the English language A
//
// ########################
//
//  see /doc/RSI_UTF-8.odt for comments and documentation on utf-8, Latin 1 Windows 1252 and charcter conversions
//  and for conversion routines in this file;
//
// ########################

// sample of code utf-8 character detection
function isUtf8($string) {
	return preg_match('%^(?:
		  [\x09\x0A\x0D\x20-\x7E]            # ASCII
		| [\xC2-\xDF][\x80-\xBF]             # non-overlong 2-byte
		|  \xE0[\xA0-\xBF][\x80-\xBF]        # excluding overlongs
		| [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}  # straight 3-byte
		|  \xED[\x80-\x9F][\x80-\xBF]        # excluding surrogates
		|  \xF0[\x90-\xBF][\x80-\xBF]{2}     # planes 1-3
		| [\xF1-\xF3][\x80-\xBF]{3}          # planes 4-15
		|  \xF4[\x80-\x8F][\x80-\xBF]{2}     # plane 16
	)*$%xs', $string);
}//end isUtf8()

function testutf82($str) {
	return mb_check_encoding($str, 'UTF-8');
}//end testutf82()

function utf8toLatin1($str) {
	setlocale(LC_ALL, array('en_US.utf8', 'en_US.UTF-8'));
	// fix iconv problems by transliterating (common codes used in names)
	// utf-8 codes it does not handle to windows 1252
	$str = fix_iconvUW($str);

	// let iconv do its thing
	$temp1 = iconv('UTF-8', 'Windows-1252//TRANSLIT', $str);
	if ($temp1 === false) {
		$temp1 = utf8Fail($str);
	}

	return $temp1;
}//end utf8toLatin1()

function utf8Fail($str) {

	// This function is not smart enough to deal with anything other than strings
	if (!is_string($str)) {
		$whatami = gettype($str);
		error_log(__FILE__ . ' line ' . __LINE__ . ' utf8 fail not string error for : ' . bin2hex($str) . $str . ' type ' . $whatami);
		# return hex?
		return false;
	}

	if (empty($str)) return '';  # handles if strlen == 0

	$isutf8 = mb_check_encoding($str, 'UTF-8');
	if ($isutf8 === false) {
		error_log(__FILE__ . ' line ' . __LINE__ . ' utf8 fail not utf-8 str conversion error for : ' . bin2hex($str) . $str);
	}

	if ($isutf8 === true) {
		# lets find the char that iconv barfed on
		$newstr = '';
		$tempstr = '';

		// @codingStandardsIgnoreStart

		$length = strlen($str);
		for ($i=0; $i < $length; $i++) {
			$c = ord($str[$i]);
			if ($c < 0x80) $n = 0; # 0bbbbbbb
			elseif (($c & 0xE0) == 0xC0) $n=1; # 110bbbbb
			elseif (($c & 0xF0) == 0xE0) $n=2; # 1110bbbb
			elseif (($c & 0xF8) == 0xF0) $n=3; # 11110bbb
			elseif (($c & 0xFC) == 0xF8) $n=4; # 111110bb
			elseif (($c & 0xFE) == 0xFC) $n=5; # 1111110b
			else return false; # Does not match any model
			$begginofsubstr = $i;
			$substrlen = $n + 1;
			$tempstr = substr($str, $begginofsubstr, $substrlen);

			// # n bytes matching 10bbbbbb follow ?
			// if the substring does not match the utf8 pattern convert it to hex
			for ($j=0; $j < $n; $j++) {
					if ((++$i == $length) || ((ord($str[$i]) & 0xC0) != 0x80)) {
					$newstr.= '1 x' . bin2hex($tempstr) . ' ';
				}
			}//for

			$temp1 = iconv('UTF-8', 'Windows-1252//TRANSLIT', $tempstr);
			if ($temp1 !== false) {
				$newstr.= $temp1;
			}

			if ($temp1 === false) {
				if (function_exists('utf8_decode')) {
					//fallback function - this returns ? if it can not decode so we will find a better alternative
					$temp1 = utf8_decode($tempstr);
					if ($temp1 === false) {
						$newstr.= '3 x' . bin2hex($tempstr) . ' ';
					} else {
						$newstr.= $temp1;
					}//endif
				} else {
						$newstr.= '2 x' . bin2hex($tempstr) . ' ';
				}
			}

		}// for

		// @codingStandardsIgnoreEnd
		//need an administrative alert here to fix this
		return $newstr;

	}//	if ($isutf8 === true)

	$is1252 = mb_check_encoding($str, 'Windows-1252');  # Windows-1252 is a super set of ISO-8859-1

	if ($is1252 === false) {
		error_log(__FILE__ . ' line ' . __LINE__ . ' utf8 fail not Windows-1252 str conversion error for : ' . bin2hex($str) . $str);
	}

	if ($is1252 === true) {
		return $str;
	}

	# lets see dump the string in a real easy to read format
	$len = strlen($str);
	$newstr = ' Invalid Byte Sequence ';
	for ($i=0; $i < $len; $i++) {
		$newstr.= 'x' . bin2hex($str[$i]) . ' ';
	}

	return $newstr;
}//end utf8Fail()


function Latin1toASCII($str) {

	setlocale(LC_ALL, array('en_US.CP1252', 'en_US.iso88591'));
	#  iconv('Windows-1252', 'ASCII//TRANSLIT', $str);  does not handle
	#  many of the characters we want correctly

	$charstable = array(
	"\x80" => "&#128;",              # &euro;                      &#128;
									 #                             &#129;
	"\x82" => "\x2c",                # &sbquo;                     &#130;
	"\x83" => "\x46",                # &fnof;                      &#131;
	"\x84" => "\x2c\x2c",            # &bdquo;                     &#132;
	"\x85" => "\x2e\x2e\x2e",        # &hellip;                    &#133;
	"\x86" => "\x2b",                # &dagger;                    &#134;
	"\x87" => "&#135;",              # &Dagger;                    &#135;
	"\x88" => "\x5e",                # &circ;                      &#136;
	"\x89" => "&#137;",              # &permil;                    &#137;
	"\x8a" => "\x53",                # &Scaron;                    &#138;
	"\x8b" => "&#139;",              # &lsaquo; iconv to <         &#139;
	"\x8c" => "\x4f\x45",            # &OElig;                     &#140;
									 #                             &#141;
	"\x8e" => "\x5a",                # &x17D;                      &#142;
									 #                             &#143;
									 #                             &#144;
	"\x91" => "\x27",                # &lsquo;                     &#145;
	"\x92" => "\x27",                # &rsquo;                     &#146;
	"\x93" => "\x22",                # &ldquo;                     &#147;
	"\x94" => "\x22",                # &rdquo;                     &#148;
	"\x95" => "\x6f",                # &bull;                      &#149;
	"\x96" => "\x2d",                # &ndash;                     &#150;
	"\x97" => "\x2d\x2d",            # &mdash;                     &#151;
	"\x98" => "\x7e",                # &tilde;                     &#152;
	"\x99" => "\x28\x54\x4d\x29",    # &trade;                     &#153;
	"\x9a" => "\x73",                # &scaron;                    &#154;
	"\x9b" => "&#155;",              # &rsaquo; iconv to >         &#155;
	"\x9c" => "\x6f\x65",            # &oelig;                     &#156;
									 #                             &#157;
	"\x9e" => "\x7a",                # &#x17E;                     &#158;
	"\x9f" => "\x59",                # &Yuml;                      &#159;
	"\xa0" => "&nbsp;",              # &nbsp;                      &#160; legacy
	"\xa1" => "!",                   # &iexcl;                     &#161;
	"\xa2" => "&#162;",              # &cent;                      &#162;
	"\xa3" => "&#163;",              # &pound;                     &#163;
	"\xa4" => "&#164;",              # &curren;                    &#164;
	"\xa5" => "&#165;",              # &yen;                       &#165;
	"\xa6" => "\x7c",                # &brvbar                     &#166;
	"\xa7" => "&#167;",              # &sect;                      &#167;
	"\xa8" => "&#168;",              # &uml;                       &#168;
	"\xa9" => "\x28\x43\x29",        # &copy;                      &#169;
	"\xaa" => "&#170;",              # &ordf;                      &#170;
	"\xab" => "&#171;",              # &laquo; iconv to >>         &#171;
	"\xac" => "not ",                # &not;                       &#172;
	#  soft hypen not translated                                   &#173;
	"\xae" => "\x28\x52\x29",        # &reg;                       &#174;
	"\xaf" => "&#175;",              # &macr; spacing macron       ##175;      overline
	"\xb0" => "&#176;",              # &deg;                       &#176;
	"\xb1" => "&#177;",              # &plusmn;                    &#177;
	"\xb2" => "&#178;",              # &sup2;                      &#178;
	"\xb3" => "&#179;",              # &sup3;                      &#179;
	"\xb4" => "&#180;",              # &acute;                     &#180;
	"\xb5" => "&#181;",              # &micro;                     &#181;
	"\xb6" => "&#182;",              # &para;                      &#182;
	"\xb7" => "&#183;",              # &middot;                    &#183;
	"\xb8" => "\x2c",                # &cedil;                     &#184;
	"\xb9" => "&#185;",              # &sup1;                      &#185;
	"\xba" => "&#186;",              # &ordm;                      &#186;
	"\xbb" => "&#187;",              # &raquo; iconv to <<         &#187;
	"\xbc" => "1/4",                 # &frac14;                    &#188;
	"\xbd" => "1/2",                 # &frac12;                    &#189;
	"\xbe" => "3/4",                 # &frac34;                    &#190;
	"\xbf" => "&#191",               # &iquest;                    &#191;
	"\xc0" => "\x41",                # &Agrave;                    &#192;
	"\xc1" => "\x41",                # &Aacute;                    &#193;
	"\xc2" => "\x41",                # &Acirc;                     &#194;
	"\xc3" => "\x41",                # &Atilde;                    &#195;
	"\xc4" => "\x41",                # &Auml;                      &#196;
	"\xc5" => "\x41",                # &Aring;                     &#197;
	"\xc6" => "\x41\x45",            # &AElig;                     &#198; # ?
	"\xc7" => "\x43",                # &Ccedil;                    &#199;
	"\xc8" => "\x45",                # &Egrave;                    &#200;
	"\xc9" => "\x45",                # &Eacute;                    &#201;
	"\xca" => "\x45",                # &Ecirc;                     &#202;
	"\xcb" => "\x45",                # &Euml;                      &#203;
	"\xcc" => "\x49",                # &Igrave;                    &#204;
	"\xcd" => "\x49",                # &Iacute;                    &#205;
	"\xce" => "\x49",                # &Icirc;                     &#206;
	"\xcf" => "\x49",                # &Iuml;                      &#207;
	"\xd0" => "\x44",                # &ETH;                       &#208;   # ? looks like a D
	"\xd1" => "\x4e",                # &Ntilde;                    &#209;
	"\xd2" => "\x4f",                # &Ograve;                    &#210;
	"\xd3" => "\x4f",                # &Oacute                     &#211;
	"\xd4" => "\x4f",                # &Ocirc;                     &#212;
	"\xd5" => "\x4f",                # &Otilde                     &#213;
	"\xd6" => "\x4f",                # &Ouml;                      &#214;
	"\xd7" => "\x78",                # &times;                     &#215;
	"\xd8" => "\x4f",                # &Oslash;                    &#216;
	"\xd9" => "\x55",                # &Ugrave;                    &#217;
	"\xda" => "\x55",                # &Uacute;                    &#218;
	"\xdb" => "\x55",                # &Ucirc;                     &#219;
	"\xdc" => "\x55",                # &Uuml;                      &#220;
	"\xdd" => "\x59",                # &Yacute;                    &#221;
	"\xde" => "TH",                  # &THORN;                     &#222; # ?
	"\xdf" => "\x73\x73",            # &szlig;                     &#223; # ?
	"\xe0" => "\x61",                # &agrave;                    &#224;
	"\xe1" => "\x61",                # &aacute;                    &#225;
	"\xe2" => "\x61",                # &acirc;                     &#226;
	"\xe3" => "\x61",                # &atilde                     &#227;
	"\xe4" => "\x61",                # &auml;                      &#228;
	"\xe5" => "\x61",                # &aring;                     &#229;
	"\xe6" => "\x61\x65",            # &aelig;                     &#230; # ?
	"\xe7" => "\x63",                # &ccedil;                    &#231;
	"\xe8" => "\x65",                # &egrave;                    &#232;
	"\xe9" => "\x65",                # &eacute;                    &#233;
	"\xea" => "\x65",                # &ecirc;                     &#234;
	"\xeb" => "\x65",                # &euml;                      &#235;
	"\xec" => "\x69",                # &igrave;                    &#236;
	"\xed" => "\x69",                # &iacute;                    &#237;
	"\xee" => "\x69",                # &icirc;                     &#238;
	"\xef" => "\x69",                # &iuml;                      &#239;
	"\xf0" => "&#240;",              # &eth;                       &#240; # ?
	"\xf1" => "\x6e",                # &ntilde;                    &#241;
	"\xf2" => "\x6f",                # &ograve;                    &#242;
	"\xf3" => "\x6f",                # &oacute;                    &#243;
	"\xf4" => "\x6f",                # &ocirc;                     &#244;
	"\xf5" => "\x6f",                # &otilde;                    &#245;
	"\xf6" => "\x6f",                # &ouml;                      &#246;
	"\xf7" => "&#247",               # &divide;                    &#247;
	"\xf8" => "\x6f",                # &oslash;                    &#248;
	"\xf9" => "\x75",                # &ugrave;                    &#249;
	"\xfa" => "\x75",                # &uacute;                    &#250;
	"\xfb" => "\x75",                # &ucirc;                     &#251;
	"\xfc" => "\x75",                # &uuml;                      &#252;
	"\xfd" => "\x79",                # &yacute;                    &#253;
	"\xfe" => "th",                  # &thorn;                     &#254; # ?
	"\xff" => "y",                   # &yuml;                      &#255; # ?
	);

		$str = strtr($str, $charstable);

	return $str;
}//end Latin1toASCII()


# fix inconv conversion problems from Utf-8 to Windows-1252  problems
# translated chars need to be valid utf-8
function fix_iconvUW($string) {

	$UWchars = array(
	"\xe2\x82\xac"	=> "&#128;",              # &euro;                      &#128;
	#										  #                             &#129;
	"\xe2\x80\x9a"	=> "\x2c",                # &sbquo;                     &#130;
	"\xc6\x92"		=> "\x46",                # &fnof;                      &#131;
	"\xe2\x80\x9e"	=> "\x2c\x2c",            # &bdquo;                     &#132;
	"\xe2\x80\xa6"	=> "\x2e\x2e\x2e",        # &hellip;                    &#133;
	"\xe2\x80\xa0"	=> "\x2b",                # &dagger;                    &#134;
	"\xe2\x80\xa1"	=> "&#135;",              # &dagger;                    &#135;
	"\xcb\x86"		=> "\x5e",                # &circ;                      &#136;
	"\xe2\x80\xb0"	=> "&#137;",              # &permil;                    &#137;
	"\xc5\xa0"		=> "\x53",                # &scaron;                    &#138;
	"\xe2\x80\xb9"	=> "&#139;",              # &lsaquo; iconv to <         &#139;
	"\xc5\x92"		=> "\x4f\x45",            # &oelig;                     &#140;
	#										                                &#141;
	"\xc5\xbd"		=> "\x5a",                # &x17d;                      &#142;
	#										  #                             &#143;
	#										  #                             &#144;
	"\xe2\x80\x98"	=> "\x27",                # &lsquo;                     &#145;
	"\xe2\x80\x99"	=> "\x27",                # &rsquo;                     &#146;
	"\xe2\x80\x9c"	=> "\x22",                # &ldquo;                     &#147;
	"\xe2\x80\x9d"	=> "\x22",                # &rdquo;                     &#148;
	"\xe2\x80\xa2"	=> "\x6f",                # &bull;                      &#149;
	"\xe2\x80\x93"	=> "\x2d",                # &ndash;                     &#150;
	"\xe2\x80\x94"	=> "\x2d\x2d",            # &mdash;                     &#151;
	"\xcb\x9c"		=> "\x7e",                # &tilde;                     &#152;
	"\xe2\x84\xa2"	=> "\x28\x54\x4d\x29",    # &trade;                     &#153;
	"\xc5\xa1"		=> "\x73",                # &scaron;                    &#154;
	"\xe2\x80\xba"	=> "&#155;",              # &rsaquo; iconv to >         &#155;
	"\xc5\x93"		=> "\x6f\x65",            # &oelig;                     &#156;
	#										  #                             &#157;
	"\xc5\xbe"		=> "\x7a",                # &#x17e;                     &#158;
	"\xc5\xb8"		=> "\x59",                # &yuml;                      &#159;
	"\xc3\xb0" => 'o',
	"\xc3\xb6" => 'o',
	"\xc3\xb8" => 'o',
	"\xc3\xbe" => 'th',

	"\xc4\x80" => 'A',
	"\xc4\x81" => 'a',
	"\xc4\x82" => 'A',
	"\xc4\x83" => 'a',
	"\xc4\x84" => 'A',
	"\xc4\x85" => 'a',
	"\xc4\x86" => 'C',
	"\xc4\x87" => 'c',
	"\xc4\x88" => 'C',
	"\xc4\x89" => 'c',
	"\xc4\x8a" => 'C',
	"\xc4\x8b" => 'c',
	"\xc4\x8c" => 'C',
	"\xc4\x8d" => 'c',
	"\xc4\x8e" => 'D',
	"\xc4\x8f" => 'd',

	"\xc4\x90" => 'D',
	"\xc4\x91" => 'd',

	"\xc4\xa6" => 'H',
	"\xc4\xa7" => 'h',
	"\xc4\xa8" => 'I',
	"\xc4\xa9" => 'i',

	"\xc4\xaa" => 'I',
	"\xc4\xab" => 'i',
	"\xc4\xac" => 'I',
	"\xc4\xad" => 'i',
	"\xc4\xae" => 'I',
	"\xc4\xaf" => 'i',

	"\xc4\xb0" => 'I',
	"\xc4\xb1" => 'i',
	"\xc4\xb8" => 'k',
	"\xc4\xbf" => 'L',

	"\xc5\x80" => 'l',
	"\xc5\x89" => 'N',
	"\xc5\x8a" => 'n',
	"\xc5\x8b" => 'N',

	"\xc5\x8c" => 'O',
	"\xc5\x8d" => 'o',
	"\xc5\x8e" => 'O',
	"\xc5\x8f" => 'o',

	"\xc5\x90" => 'O',
	"\xc5\x91" => 'o',

	"\xc5\xa6" => 'T',
	"\xc5\xa7" => 't',

	"\xc5\xa8" => 'U',
	"\xc5\xa9" => 'u',
	"\xc5\xaa" => 'U',
	"\xc5\xab" => 'u',
	"\xc5\xac" => 'U',
	"\xc5\xad" => 'u',
	"\xc5\xae" => 'U',
	"\xc5\xaf" => 'u',
	"\xc5\xb0" => 'U',
	"\xc5\xb1" => 'u',
	"\xc5\xb2" => 'U',
	"\xc5\xb3" => 'u',

	"\xc5\xa6" => 'T',
	"\xc5\xa7" => 't',

	"\xc7\x8e" => 'a',
	"\xc7\x8f" => 'I',
	"\xc7\x90" => 'i',

	"\xc7\xbb" => 'a',
	"\xc7\xbd" => 'ae',
	"\xc9\x91" => 'a',
	);

	$string = strtr($string, $UWchars);

	return $string;
}//end fix_iconvUW()

class utf8_to_latin1 {

	// Track if a conversion error occured
	private static $iconv_error;

	// Save the prior LC_ALL and LC_CTYPE values
	private static $prior_lc_all;
	private static $prior_lc_ctype;

	public static function convert(& $str) {
		self::set_lc_all_utf8();
		$result_pre  =  self::pre_iconv($str);
		$result_conv =  self::iconv($str);
		$result_post =  self::post_iconv($str);
		self::reset_lc_all();
		return ($result_pre && $result_conv && $result_post);
	} // convert()

	private static function set_lc_all_utf8() {
		// Get the current settings
		$LC_ALL   = setlocale(LC_ALL  , 0);
		$LC_CTYPE = setlocale(LC_CTYPE, 0);

		// For proper detection and coversion, the LC_CTYPE must be UTF-8, which is set via LC_ALL
		$utf8_types = array('en_US.utf8', 'en_US.UTF-8');
		if (!in_array($LC_CTYPE , $utf8_types)) {
			setlocale(LC_ALL, $utf8_types);
		}

		// Save the current settings
		self::$prior_lc_all   = $LC_ALL;
		self::$prior_lc_ctype = $LC_CTYPE;
	} // set_lc_all_utf8()

	private static function reset_lc_all() {
		if (isset(self::$prior_lc_ctype)) setlocale(LC_CTYPE, self::$prior_lc_ctype);
		if (isset(self::$prior_lc_all  )) setlocale(LC_ALL  , self::$prior_lc_all  );
	} // reset_lc_all()

	// Before calling iconv, fix things that it doesn't do well
	private static function pre_iconv(& $str) {
		$str = preg_replace('/\xE2\x80\x99/', "'", $str);	// Convert wierd open single quote

		$str = preg_replace('/\xC2\xA7/', 's.', $str);	// UTF8: Convert section symbol
		$str = preg_replace('/\xC2\xB6/', 'p.', $str);	// UTF8: Convert pilcrow symbol

		# $str = preg_replace('/\xE8/', 'e', $str);		// CP1252: e
		# $str = preg_replace('/\xE9/', 'e', $str);		// CP1252: e

		$cmap = array(
				chr(0xE8) => chr(0x65),	# CP1252: e
				chr(0xE9) => chr(0x65),	# CP1252: e
				);
		strtr($str, $cmap);

		return true;
	} // pre_iconv()

	// After calling iconv, remove any characters that we don't like
	private static function post_iconv(& $str) {
		# // Strip control characters:
		# $str = preg_replace('/[^\x20-\x7E]/', ' ', $str);
		# return true;
		#
		# // Strip non-printable ascii characters:
		# $str = preg_replace('/[\x00-\x08]/', ' ', $str);	// <HT
		# $str = preg_replace('/\x09/'       , ' ', $str);	// HT
		# $str = preg_replace('/[\x0B-\x0C]/', ' ', $str);	// >LF and <CR
		# $str = preg_replace('/[\x0E-\x1F]/', ' ', $str);	// >CR and <SP
		# $str = preg_replace('/[\x7F-\xFF]/', ' ', $str);	// >~
		return true;
	} // post_iconv()

	// Given a UTF-8 string, convert it to an latin1 string
	// Returns:
	//          true  = Conversion. Success.
	//          false = No conversion (ie: not a UTF-8 string)
	//          false = No conversion (ie: a Non-UTF-8 character detected)
//	private static function iconv(& $str) {
	public static function iconv(& $str) {

		// Start with no errors
		self::$iconv_error = false;

		// For proper detection and coversion, the LC_CTYPE must be UTF-8, which is set via LC_ALL
		# See: self::set_lc_all_utf8();

		// Only convert is the string is UTF-8
		if (function_exists('mb_detect_encoding') && (mb_detect_encoding($str) === 'UTF-8')) {

			# CP1252 === WINDOWS-1252
			# LATIN1 === ISO-8859-1

			// Convert the string, while working around an iconv design flaw
			set_error_handler( array(__CLASS__, 'iconv_error_handler') );
			$latin1 = iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $str);
			restore_error_handler();
			if ($latin1 === false) self::$iconv_error = true;

			// String successfully converted by iconv
			if (self::$iconv_error === false) {
				$str = $latin1;
				return true;
			}

			# // iconv error found, do not overwrite the string with iconv garbage
			# if (self::$iconv_error) {
			# 	return false;
			# }

			// Use mb_convert_encoding as a fallback to iconv
			if (function_exists('mb_convert_encoding')) {
				$str = mb_convert_encoding($str, 'ISO-8859-1', 'UTF-8');
				return true;
			}

			// Use utf_8decode as a fallback, only works when transliterating to ISO-8859-1
			if (function_exists('utf8_decode')) {
				$str = utf8_decode($str);
				return true;
			}

			return false;
		} // detect utf8

		return true;
	} // iconv()

	// When iconv discovers non-UTF8 characters, it barfs and returns a mangled string
	// This is how we get around the stupid string truncation bug:
	private static function iconv_error_handler($errno, $errstr) {
		// Set the error flag
		self::$iconv_error = true;

		// Detect the iconv error notice, and ignore it
		if ($errno === E_NOTICE && $errstr === 'iconv(): Detected an illegal character in input string') {
			return true;
		}

		// Allow the regular error handler to process the error
		return false;
	} // iconv_error_handler()

} // class utf8_to_latin1()


class latin1_to_ascii {
	public static function convert(& $str) {
		$str = trim($str);
		return true;
	} // convert()
} // class latin1_to_ascii()

