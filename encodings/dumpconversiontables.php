<?php
//$conv	= strtolower(htmlspecialchars($_GET['conv']));
//$enco	= strtolower(htmlspecialchars($_GET['enco']));
//$check	= array('utol','ltoa');

//if (!in_array($conv, $check)) {
//	die('invalid start');
//}


//if ($conv == 'ltoa') {
//	# trouble with setting to CP1252
//	setlocale(LC_ALL, array('en_US.CP1252', 'en_US.iso88591'));
//	# reguired - the html meta tag is not enough to force the display to Windows 1252
//	header('Content-Type: text/html; charset=Windows-1252',TRUE);
//}


?>
<!doctype html>
<html>
<head>
<meta charset="windows-1252">
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
//if ($conv != 'ltoa') {
//	include 'testTablesinutf8.php';
//}
//include 'encodinggets.php';

# arrows needs a better font
# pretty dump the input


//if ($runwhat !== 'hexprint') exit();
//$temp2 = substr($input_array,1,1) - 1;
//
//if($array_override != '') {
//	dumptestTable(array($tb),$title, $conv);
//} else if($conv == 'ltoa') {
//	dumptestTable($singlebytegreaterthan128, $title, $conv);
//} else {
//	dumptestTable($temp1[$temp2], $title);
//}

	$charstable  = array(
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




	$chars = array(
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
	"\xc2\xa0" => '&nbsp;',         # encoded as &nbsp; instead of decimal html &#160;
	"\xc2\xa1" => '!',              # inverted ! is used in legal writing
	"\xc2\xa2" => '&#162;',         #
	"\xc2\xa3" => '&#163;',         # Great Britian Pound
	"\xc2\xa4" => '&#164;',
	"\xc2\xa5" => '&#165;',
	"\xc2\xa6" => "\x7c",           # 'broken bar'  | use vertical bar
	"\xc2\xa7" => '&#167;',         # § a section of a statute and regulation. ex U.S.C. §§ 1981-198
	"\xc2\xa8" => '&#168;',
	"\xc2\xa9" => '(C)',
	"\xc2\xaa" => '&#170;',
	"\xc2\xab" => '&#171;',
	"\xc2\xac" => 'not ',
 	"\xc2\xad" => '',               # do not translate 	"\xc2\xad" => 'soft hypen',  try to null
	"\xc2\xae" => '(R)',
	"\xc2\xaf" => '&#175;',
	"\xc2\xb0" => '&#176;',
	"\xc2\xb1" => '&#177;',
	"\xc2\xb2" => '&#178;',
	"\xc2\xb3" => '&#179;',
	"\xc2\xb4" => '&#180;',
	"\xc2\xb5" => '&#181;',
	"\xc2\xb6" => '&#182;',
	"\xc2\xb7" => '&#183;',
	"\xc2\xb8" => '\x2c',
	"\xc2\xb9" => '&#185;',
	"\xc2\xba" => '&#186;',
	"\xc2\xbb" => '&#187;',
	"\xc2\xbc" => '1/4',
	"\xc2\xbd" => '1/2',
	"\xc2\xbe" => '3/4',
	"\xc2\xbf" => '&#191;',  # end iso-8859-1 and windows-1252
	"\xc3\xb6" => 'd',     #ð

	"\xc3\xb7" => '&#247', #÷
	"\xc2\xaa" => '&#170;',#ª

	"\xc3\x80" => 'A',     #
	"\xc3\x81" => 'A',     #
	"\xc3\x82" => 'A',     #
	"\xc3\x83" => 'A',     #
	"\xc3\x84" => 'A',     #
	"\xc3\x85" => 'A',     #
	"\xc3\x86" => 'AE',    #

	"\xc3\x8c" => 'I',    #
	"\xc3\x8d" => 'I',    #
	"\xc3\x8e" => 'I',    #
	"\xc3\x8f" => 'I',    #

	"\xc3\x90" => 'D',     #Ð
	"\xc3\x92" => 'O',     #
	"\xc3\x93" => 'O',     #
	"\xc3\x94" => 'O',     #
	"\xc3\x95" => 'O',     #
	"\xc3\x96" => 'O',     #

	"\xc3\x9e" => 'TH',    #Þ
	"\xc3\x9f" => 's',     #ß

	"\xc3\x98" => 'O',     #Ø
	"\xc3\x99" => 'U',     #
	"\xc3\x9a" => 'U',     #
	"\xc3\x9b" => 'U',     #
	"\xc3\x9c" => 'U',     #

	"\xc3\xa0" => 'a',     #
	"\xc3\xa1" => 'a',     #
	"\xc3\xa2" => 'a',     #
	"\xc3\xa3" => 'a',     #
	"\xc3\xa4" => 'a',     #
	"\xc3\xa5" => 'a',     #
	"\xc3\xa6" => 'ae',    #

	"\xc3\xac" => 'i',    #
	"\xc3\xad" => 'i',    #
	"\xc3\xae" => 'i',    #
	"\xc3\xaf" => 'i',    #



	"\xc3\xb9" => 'u',
	"\xc3\xba" => 'u',
	"\xc3\xbb" => 'u',
	"\xc3\xbc" => 'u',
	"\xc3\xbd" => 'y',
	"\xc3\xbf " => 'y',

	"\xc4\x81" => 'a',     #
	"\xc4\x83" => 'a',     #
	"\xc4\x85" => 'a',     #

	"\xc4\x90" => 'D',     #Ð
	"\xc4\x91" => 'd',     #d
	"\xc4\xa6" => 'H',     #H
	"\xc4\xa7" => 'h',     #h

	"\xc4\xa8" => 'I',     #
	"\xc4\xa9" => 'i',     #

	"\xc4\xaa" => 'I',     #
	"\xc4\xab" => 'i',     #

	"\xc4\xac" => 'I',     #
	"\xc4\xad" => 'i',     #

	"\xc4\xae" => 'I',     #
	"\xc4\xaf" => 'i',     #

	"\xc4\xb0" => 'I',     #i
	"\xc4\xb1" => 'i',     #i

	"\xc4\xb1" => 'i',     #i
	"\xc4\xb8" => 'k',     #
	"\xc4\xbf" => 'L',     #

	"\xc5\x80" => 'l',     #
	"\xc5\x89" => 'N',     #
	"\xc5\x8a" => 'n',     #
	"\xc5\x8b" => 'N',     #

	"\xc5\x8c" => 'O',     #
	"\xc5\x8d" => 'o',     #
	"\xc5\x8e" => 'O',     #
	"\xc5\x8f" => 'o',     #

	"\xc5\x90" => 'O',     #
	"\xc5\x91" => 'o',     #

	"\xc5\xa8" => 'U',
	"\xc5\xa9" => 'u',
	"\xc5\xaa" => 'U',
	"\xc5\xab" => 'u',
	"\xc5\xac" => 'U',
	"\xc5\xad" => 'u',
	"\xc5\xae" => 'U',
	"\xc5\xaf" =>  'u',
	"\xc5\xb0" => 'U',
	"\xc5\xb1" => 'u',
	"\xc5\xb2" => 'U',
	"\xc5\xb3" => 'u',

	"\xc5\xa6" => 'T',     #T
	"\xc5\xa7" => 't',     #t

	"\xc7\x8e" => 'a',     #
	"\xc7\x8f" => 'I',    #
	"\xc7\x90" => 'i',    #

	"\xc7\xbb" => 'a',     #
	"\xc7\xbd" => 'ae',    #

	"\xc9\x91" => 'a',     #
	"\xe2\x82\xac" => '&#128;',
	);


	$UWchars = array(

	"\xC3\x80" => "\xC0",      // Latin  CAPITAL LETTER A WITH GRAVE
	"\xC3\x81" => "\xC1",      // Latin  CAPITAL LETTER A WITH ACUTE
	"\xC3\x82" => "\xC2",      // Latin  CAPITAL LETTER A WITH CIRCUMFLEX
	"\xC3\x83" => "\xC3",      // Latin  CAPITAL LETTER A WITH TILDE
	"\xC3\x84" => "\xC4",      // Latin  CAPITAL LETTER A WITH DIAERESIS
	"\xC3\x85" => "\xC5",      // Latin  CAPITAL LETTER A WITH RING ABOVE
	"\xC3\x86" => "\xC6",      // Latin  CAPITAL LETTER AE
	"\xC3\x87" => "\xC7",      // Latin  CAPITAL LETTER C WITH CEDILLA
	"\xC3\x88" => "\xC8",      // Latin  CAPITAL LETTER E WITH GRAVE
	"\xC3\x89" => "\xC9",      // Latin  CAPITAL LETTER E WITH ACUTE
	"\xC3\x8A" => "\xCA",      // Latin  CAPITAL LETTER E WITH CIRCUMFLEX
	"\xC3\x8B" => "\xCB",      // Latin  CAPITAL LETTER E WITH DIAERESIS
	"\xC3\x8C" => "\xCC",      // Latin  CAPITAL LETTER I WITH GRAVE
	"\xC3\x8D" => "\xCD",      // Latin  CAPITAL LETTER I WITH ACUTE
	"\xC3\x8E" => "\xCE",      // Latin  CAPITAL LETTER I WITH CIRCUMFLEX
	"\xC3\x8F" => "\xCF",      // Latin  CAPITAL LETTER I WITH DIAERESIS
#
	"\xC3\x90" => "\xD0",      // Latin  CAPITAL LETTER ETH (Icelandic)
	"\xC3\x91" => "\xD1",      // Latin  CAPITAL LETTER N WITH TILDE
	"\xC3\x92" => "\xD2",      // Latin  CAPITAL LETTER O WITH GRAVE
	"\xC3\x93" => "\xD3",      // Latin  CAPITAL LETTER O WITH ACUTE
	"\xC3\x94" => "\xD4",      // Latin  CAPITAL LETTER O WITH CIRCUMFLEX
	"\xC3\x95" => "\xD5",      // Latin  CAPITAL LETTER O WITH TILDE
	"\xC3\x96" => "\xD6",      // Latin  CAPITAL LETTER O WITH DIAERESIS
	"\xC3\x97" => "\xD7",      // MULTIPLICATION SIGN
	"\xC3\x98" => "\xD8",      // Latin  CAPITAL LETTER O WITH STROKE
	"\xC3\x99" => "\xD9",      // Latin  CAPITAL LETTER U WITH GRAVE
	"\xC3\x9A" => "\xDA",      // Latin  CAPITAL LETTER U WITH ACUTE
	"\xC3\x9B" => "\xDB",      // Latin  CAPITAL LETTER U WITH CIRCUMFLEX
	"\xC3\x9C" => "\xDC",      // Latin  CAPITAL LETTER U WITH DIAERESIS
	"\xC3\x9D" => "\xDD",      // Latin  CAPITAL LETTER Y WITH ACUTE
	"\xC3\x9E" => "\xDE",      // Latin  CAPITAL LETTER THORN (Icelandic)
	"\xC3\x9F" => "\xDF",      // Latin  SMALL LETTER SHARP S (German)
#
	"\xC3\xA0" => "\xE0",      // Latin  SMALL LETTER A WITH GRAVE
	"\xC3\xA1" => "\xE1",      // Latin  SMALL LETTER A WITH ACUTE
	"\xC3\xA2" => "\xE2",      // Latin  SMALL LETTER A WITH CIRCUMFLEX
	"\xC3\xA3" => "\xE3",      // Latin  SMALL LETTER A WITH TILDE
	"\xC3\xA4" => "\xE4",      // Latin  SMALL LETTER A WITH DIAERESIS
	"\xC3\xA5" => "\xE5",      // Latin  SMALL LETTER A WITH RING ABOVE
	"\xC3\xA6" => "\xE6",      // Latin  SMALL LETTER AE
	"\xC3\xA7" => "\xE7",      // Latin  SMALL LETTER C WITH CEDILLA
	"\xC3\xA8" => "\xE8",      // Latin  SMALL LETTER E WITH GRAVE
	"\xC3\xA9" => "\xE9",      // Latin  SMALL LETTER E WITH ACUTE
	"\xC3\xAA" => "\xEA",      // Latin  SMALL LETTER E WITH CIRCUMFLEX
	"\xC3\xAB" => "\xEB",      // Latin  SMALL LETTER E WITH DIAERESIS
	"\xC3\xAC" => "\xEC",      // Latin  SMALL LETTER I WITH GRAVE
	"\xC3\xAD" => "\xED",      // Latin  SMALL LETTER I WITH ACUTE
	"\xC3\xAE" => "\xEE",      // Latin  SMALL LETTER I WITH CIRCUMFLEX
	"\xC3\xAF" => "\xEF",      // Latin  SMALL LETTER I WITH DIAERESIS
#
	"\xC3\xB0" => "\xF0",      // Latin  SMALL LETTER ETH (Icelandic)
	"\xC3\xB1" => "\xF1",      // Latin  SMALL LETTER N WITH TILDE
	"\xC3\xB2" => "\xF2",      // Latin  SMALL LETTER O WITH GRAVE
	"\xC3\xB3" => "\xF3",      // Latin  SMALL LETTER O WITH ACUTE
	"\xC3\xB4" => "\xF4",      // Latin  SMALL LETTER O WITH CIRCUMFLEX
	"\xC3\xB5" => "\xF5",      // Latin  SMALL LETTER O WITH TILDE
	"\xC3\xB6" => "\xF6",      // Latin  SMALL LETTER O WITH DIAERESIS
	"\xC3\xB7" => "\xF7",      // DIVISION SIGN
	"\xC3\xB8" => "\xF8",      // Latin  SMALL LETTER O WITH STROKE
	"\xC3\xB9" => "\xF9",      // Latin  SMALL LETTER U WITH GRAVE
	"\xC3\xBA" => "\xFA",      // Latin  SMALL LETTER U WITH ACUTE
	"\xC3\xBB" => "\xFB",      // Latin  SMALL LETTER U WITH CIRCUMFLEX
	"\xC3\xBC" => "\xFC",      // Latin  SMALL LETTER U WITH DIAERESIS
	"\xC3\xBD" => "\xFD",      // Latin  SMALL LETTER Y WITH ACUTE
	"\xC3\xBE" => "\xFE",      // Latin  SMALL LETTER THORN (Icelandic)
	"\xC3\xBF" => "\xFF",      // Latin  SMALL LETTER Y WITH DIAERESIS

	"\xc4\x80" => 'A',     #
	"\xc4\x81" => 'a',     #
	"\xc4\x82" => 'A',     #
	"\xc4\x83" => 'a',     #
	"\xc4\x84" => 'A',     #
	"\xc4\x85" => 'a',     #
	"\xc4\x86" => 'C',     #
	"\xc4\x87" => 'c',     #
	"\xc4\x88" => 'C',     #
	"\xc4\x89" => 'c',     #
	"\xc4\x8a" => 'C',     #
	"\xc4\x8b" => 'c',     #
	"\xc4\x8c" => 'C',     #
	"\xc4\x8d" => 'c',     #
	"\xc4\x8e" => 'D',     #
	"\xc4\x8f" => 'd',     #

	"\xc4\x90" => 'Ð',     #
	"\xc4\x91" => 'd',     #

	"\xc4\xa6" => 'H',     #
	"\xc4\xa7" => 'h',     #
	"\xc4\xa8" => 'I',     #
	"\xc4\xa9" => 'i',     #

	"\xc4\xaa" => 'I',     #
	"\xc4\xab" => 'i',     #
	"\xc4\xac" => 'I',     #
	"\xc4\xad" => 'i',     #
	"\xc4\xae" => 'I',     #
	"\xc4\xaf" => 'i',     #

	"\xc4\xb0" => 'I',     #
	"\xc4\xb1" => 'i',     #
	"\xc4\xb8" => 'k',     #
	"\xc4\xbf" => 'L',     #

	"\xc5\x80" => 'l',     #
	"\xc5\x89" => 'N',     #
	"\xc5\x8a" => 'n',     #
	"\xc5\x8b" => 'N',     #

	"\xc5\x8c" => 'O',     #
	"\xc5\x8d" => 'o',     #
	"\xc5\x8e" => 'O',     #
	"\xc5\x8f" => 'o',     #

	"\xc5\x90" => 'O',     #
	"\xc5\x91" => 'o',     #

	"\xc5\xa6" => 'T',     #
	"\xc5\xa7" => 't',     #

	"\xc5\xa8" => 'U',
	"\xc5\xa9" => 'u',
	"\xc5\xaa" => 'U',
	"\xc5\xab" => 'u',
	"\xc5\xac" => 'U',
	"\xc5\xad" => 'u',
	"\xc5\xae" => 'U',
	"\xc5\xaf" =>  'u',
	"\xc5\xb0" => 'U',
	"\xc5\xb1" => 'u',
	"\xc5\xb2" => 'U',
	"\xc5\xb3" => 'u',

	"\xc5\xa6" => 'T',     #
	"\xc5\xa7" => 't',     #

	"\xc7\x8e" => 'a',     #
	"\xc7\x8f" => 'I',    #
	"\xc7\x90" => 'i',    #

	"\xc7\xbb" => 'a',     #
	"\xc7\xbd" => 'ae',    #
	"\xc9\x91" => 'a',     #
	"\xe2\x82\xac" => '&#128;',
	);

function dumptestConversionTables($arrayin, $title='', $which='ltoa') {

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

#	echo '<table class="tablesorter custom-popup" data-table-group="' . microtime(). '">';"
	echo '<table class="pt">';

	#echo otableCP . PHP_EOL;
	#echo otable . PHP_EOL;
	echo othead; # table head
	echo otr . PHP_EOL;
	# table head
	echo oth;
	echo 'key';
	echo cth;

	echo oth;
	echo 'hex';
	echo cth;

	echo oth;
	echo 'is';
	echo cth;

	echo oth;
	echo 'value';
	echo cth;

	echo oth;
	echo 'hex';
	echo cth;

	echo oth;
	echo 'is';
	echo cth;


	echo ctr . PHP_EOL;
	echo cthead; # close table head
	echo otbody; # open table body

	# write the table body
	foreach ($arrayin as $key => $value) {
		echo otr;

		echo otd;
		echo " $key ";
		echo ctd ;

		echo otd;
		echo bin2hex($key);
		echo ctd ;

		echo otd;
		$strout83 = testutf82($key);
		#$stroutf8 = seems_utf8($uchars[$i]);
		#echo 't: ' . ($strout82 ? 'T':'F') . ' s: ' . ($stroutf8 ?	'T':'F');
		echo 'is: ' . ($strout83 ? 'T':'F');
		echo ctd  . PHP_EOL;



		echo otd;
		echo " $value ";
		echo ctd ;

		echo otd;
		echo bin2hex($value);
		echo ctd ;

		echo otd;
		$strout82 = testutf82($value);
		#$stroutf8 = seems_utf8($uchars[$i]);
		#echo 't: ' . ($strout82 ? 'T':'F') . ' s: ' . ($stroutf8 ?	'T':'F');
		echo 'is: ' . ($strout82 ? 'T':'F');
		echo ctd  . PHP_EOL;



		echo ctr;
		echo  PHP_EOL;

	}

	echo ctr .   PHP_EOL;
	echo ctbody; # close table body
	echo ctable . PHP_EOL;
} //dumptestConversionTables


//dumptestConversionTables($UWchars, "UWchars");
dumptestConversionTables($chars, "chars");

//not multi byte should be false
//dumptestConversionTables($charstable, "charstable");


?>


<!--
<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.js"></script>
<script type="text/javascript" src="../js/tablesorter/js/jquery.tablesorter.widgets.js"></script>
<script type="text/javascript" src="../js/tablesort.js"></script>"-->

<script type="text/javascript" src="../js/gjAppcore.min.js"></script>
<script type="text/javascript" src="../js/gjtrack.js"></script>
</body>
</html>
