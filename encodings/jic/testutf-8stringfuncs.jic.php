<?php if (php_sapi_name() != "cli"): ?>
<!--

	THIS FILE MUST BE EDITED AND SAVED AS UTF-8

	add some html for formatting, if not run from the php command line

-->
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>rsi encode decode utf-8 test page</title>
<style>
input { -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; }

textarea.buttonNgrey, select.buttonNgrey, input.buttonNgrey {
font-weight:bold;
font-size:16px;
font-family: "Segoe UI","Helvetica Neue", Verdana ,Helvetica , sans-serif;
color: #000;
border: 2px solid #000;
background-color: #D5D5D4;}

textarea.buttonNgrey:hover, select.buttonNgrey:hover, input.buttonNgrey:hover {
background-color: #B0C4DE;}

body {
background-color:white;
color:black;
margin:2em;
font-family:"Courier New",Courier,monospace;
font-size:16px;}

table {
background-color: white;
color: black;
vertical-align:top;
text-align:left;
border-collapse: separate ;
padding: 4px 7px;
border: 1px solid black;}

table td, table th {
padding: 1px;
border:none;
vertical-align:top;}

hr {
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAF0lEQVQIHWNgYGBY9v//fwYYhjOIFwAA1l0teiSFyaMAAAAASUVORK5CYII%3D) repeat center top;
background-size: 4px 4px;
border: 0;
height: 1px;
margin: 0 0 24px;
}
</style>
</head>
<body>
<pre>

<?php else: ?>

<?php endif ?>

<?php
/**
* testutf-8stringfuncs.php

Please run this page http://garyjohnsoninfo.info/saab/testutf-8stringfuncs.php
and scan this /home/gary/share/testutf-8stringfuncs.php  source to see how this works

xx strin:       input string
convutf8toasci: inconv
remove_accents: remove_accents
xx strhex:      the hex of the input string

To verify this conversion, the following web page is easy to search by hex code values
http://www.fileformat.info/info/charset/UTF-8/list.htm
as well as
http://garyjohnsoninfo.info/XXSoftwareTools/GaryCodePage.html


We wanted to use iconv with transliteration:
when a character can't be represented in the target charset, it can be approximated through one or several similarly looking characters.

The call iconv('UTF-8', 'ASCII//TRANSLIT', $str);
is very powerful; however, it does not handle the following ISO-8859-1 characters:

input               output

¡¢£¤¥¦§¨©ª«¬­®¯  : ????????(C)?<
°±²³´µ¶·¸¹º»¼½¾¿ : ?????u??,??>> 1/4 1/2 3/4 ?

very well.

One of the problems is that it converts « to < and » to >, which makes it problematic to use on xml data

It also misses a few accent charaters that could be replaced with ASCII

an example
0 strin: Björk Guðmundsdóttir is utf8: true
convutf8toasci: Bjork Gu?mundsdottir
remove_accents: Bjork Gudmundsdottir


The function remove_accents from the wordpress file formatting.php has been modifed to handle these shortcomings.

The following list shows some of remove_accents transliterations.

strin is tha character in
convutf8toasci is what iconv('UTF-8', 'ASCII//TRANSLIT', $str) produces
remove_accents shows what its tranliterated too

0 strin:        ¡
convutf8toasci:  ?
remove_accents:  inverted !
0 strhex:      20c2a1
1 strin:       ¢
convutf8toasci: ?
remove_accents: cent
1 strhex:      c2a2
2 strin:       £
convutf8toasci: ?
remove_accents: GBP
2 strhex:      c2a3
3 strin:       ¤
convutf8toasci: ?
remove_accents: currency
3 strhex:      c2a4
4 strin:       ¥
convutf8toasci: ?
remove_accents: Yen
4 strhex:      c2a5
5 strin:       ¦
convutf8toasci: ?
remove_accents: broken bar
5 strhex:      c2a6
6 strin:       §
convutf8toasci: ?
remove_accents: section
6 strhex:      c2a7
7 strin:       ¨
convutf8toasci: ?
remove_accents: diaersis
7 strhex:      c2a8
8 strin:       ©
convutf8toasci: (C)
remove_accents: (C)
8 strhex:      c2a9
9 strin:       ª
convutf8toasci: ?
remove_accents: a
9 strhex:      c2aa
10 strin:       «
convutf8toasci: <<
remove_accents: left double angle
10 strhex:      c2ab
11 strin:       ¬
convutf8toasci: ?
remove_accents: not
11 strhex:      c2ac
12 strin:       ­
convutf8toasci: -
remove_accents: soft hypen
12 strhex:      c2ad
13 strin:       ®
convutf8toasci: (R)
remove_accents: (R)
13 strhex:      c2ae
14 strin:       ¯
convutf8toasci: ?
remove_accents: macron
14 strhex:      c2af
15 strin:       °
convutf8toasci: ?
remove_accents: degree
15 strhex:      c2b0
16 strin:       ±
convutf8toasci: ?
remove_accents: plus-minus
16 strhex:      c2b1
17 strin:       ²
convutf8toasci: ?
remove_accents: superscript 2
17 strhex:      c2b2
18 strin:       ³
convutf8toasci: ?
remove_accents: superscript 3
18 strhex:      c2b3
19 strin:       ´
convutf8toasci: ?
remove_accents: Acute
19 strhex:      c2b4
20 strin:       µ
convutf8toasci: u
remove_accents: micro
20 strhex:      c2b5
21 strin:       ¶
convutf8toasci: ?
remove_accents: pilcrow
21 strhex:      c2b6
22 strin:       ·
convutf8toasci: ?
remove_accents: middle dot
22 strhex:      c2b7
23 strin:       ¸
convutf8toasci: ,
remove_accents: cedilla
23 strhex:      c2b8
24 strin:       ¹
convutf8toasci: ?
remove_accents: superscript 1
24 strhex:      c2b9
25 strin:       º
convutf8toasci: ?
remove_accents: masculine ordinal
25 strhex:      c2ba
26 strin:       »
convutf8toasci: >>
remove_accents: right double angle
26 strhex:      c2bb
27 strin:       ¼
convutf8toasci:  1/4
remove_accents: 1/4
27 strhex:      c2bc
28 strin:       ½
convutf8toasci:  1/2
remove_accents: 1/2
28 strhex:      c2bd
29 strin:       ¾
convutf8toasci:  3/4
remove_accents: 3/4
29 strhex:      c2be
30 strin:       ¿
convutf8toasci: ?
remove_accents: inverted ?
30 strhex:      c2bf

as well as the € Euro

Notes

Windows 1252 only chars, do not use
‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ.


Windows bitnami php isapi iconv complains that
"¯"  c2af is an illegal character
"¤"  c2a4 is an illegal character

displaying the soft hypen screws up most displays

*/


error_reporting(E_ALL); //for test if sessionstart put it after error_reporting
ini_set('display_errors', 1);  // 1 to display errors


function remove_accents($string) {
global $chars;
	if ( !preg_match('/[\x80-\xff]/', $string) )
		return $string;


	if (seems_utf8($string)) {
		$chars = array(
		// custom rsi
		chr(194).chr(161) => 'inverted !', chr(194).chr(162) => 'cent',
		chr(194).chr(164) => 'currency',
		chr(194).chr(165) => 'Yen', chr(194).chr(166) => 'broken bar',
		chr(194).chr(167) => 'section', chr(194).chr(168) => 'diaersis',
		chr(194).chr(169) => '(C)', # chr(194).chr(170) => 'Feminine ordinal',
		chr(194).chr(171) => 'left double angle', chr(194).chr(172) => 'not',
		chr(194).chr(173) => 'soft hypen', chr(194).chr(174) => '(R)',
		chr(194).chr(175) => 'macron', chr(194).chr(176) => 'degree',

		chr(194).chr(177) => 'plus-minus', chr(194).chr(178) => 'superscript 2',
		chr(194).chr(179) => 'superscript 3', chr(194).chr(180) => 'Acute',
		chr(194).chr(181) => 'micro', chr(194).chr(182) => 'pilcrow',
		chr(194).chr(183) => 'middle dot', chr(194).chr(184) => 'cedilla',
		chr(194).chr(185) => 'superscript 1', chr(194).chr(186) => 'masculine ordinal',
		chr(194).chr(187) => 'right double angle',
		chr(194).chr(188) => '1/4', chr(194).chr(189) => '1/2',
		chr(194).chr(190) => '3/4', chr(194).chr(191) => 'inverted ?',



		// Decompositions for Latin-1 Supplement
		chr(194).chr(170) => 'a', #chr(194).chr(186) => 'o',
		chr(195).chr(128) => 'A', chr(195).chr(129) => 'A',
		chr(195).chr(130) => 'A', chr(195).chr(131) => 'A',
		chr(195).chr(132) => 'A', chr(195).chr(133) => 'A',
		chr(195).chr(134) => 'AE',chr(195).chr(135) => 'C',
		chr(195).chr(136) => 'E', chr(195).chr(137) => 'E',
		chr(195).chr(138) => 'E', chr(195).chr(139) => 'E',
		chr(195).chr(140) => 'I', chr(195).chr(141) => 'I',
		chr(195).chr(142) => 'I', chr(195).chr(143) => 'I',
		chr(195).chr(144) => 'D', chr(195).chr(145) => 'N',
		chr(195).chr(146) => 'O', chr(195).chr(147) => 'O',
		chr(195).chr(148) => 'O', chr(195).chr(149) => 'O',
		chr(195).chr(150) => 'O', chr(195).chr(153) => 'U',
		chr(195).chr(154) => 'U', chr(195).chr(155) => 'U',
		chr(195).chr(156) => 'U', chr(195).chr(157) => 'Y',
		chr(195).chr(158) => 'TH',chr(195).chr(159) => 's',
		chr(195).chr(160) => 'a', chr(195).chr(161) => 'a',
		chr(195).chr(162) => 'a', chr(195).chr(163) => 'a',
		chr(195).chr(164) => 'a', chr(195).chr(165) => 'a',
		chr(195).chr(166) => 'ae',chr(195).chr(167) => 'c',
		chr(195).chr(168) => 'e', chr(195).chr(169) => 'e',
		chr(195).chr(170) => 'e', chr(195).chr(171) => 'e',
		chr(195).chr(172) => 'i', chr(195).chr(173) => 'i',
		chr(195).chr(174) => 'i', chr(195).chr(175) => 'i',
		chr(195).chr(176) => 'd', chr(195).chr(177) => 'n',
		chr(195).chr(178) => 'o', chr(195).chr(179) => 'o',
		chr(195).chr(180) => 'o', chr(195).chr(181) => 'o',
		chr(195).chr(182) => 'o', chr(195).chr(184) => 'o',
		chr(195).chr(185) => 'u', chr(195).chr(186) => 'u',
		chr(195).chr(187) => 'u', chr(195).chr(188) => 'u',
		chr(195).chr(189) => 'y', chr(195).chr(190) => 'th',
		chr(195).chr(191) => 'y', chr(195).chr(152) => 'O',
		// Decompositions for Latin Extended-A
		chr(196).chr(128) => 'A', chr(196).chr(129) => 'a',
		chr(196).chr(130) => 'A', chr(196).chr(131) => 'a',
		chr(196).chr(132) => 'A', chr(196).chr(133) => 'a',
		chr(196).chr(134) => 'C', chr(196).chr(135) => 'c',
		chr(196).chr(136) => 'C', chr(196).chr(137) => 'c',
		chr(196).chr(138) => 'C', chr(196).chr(139) => 'c',
		chr(196).chr(140) => 'C', chr(196).chr(141) => 'c',
		chr(196).chr(142) => 'D', chr(196).chr(143) => 'd',
		chr(196).chr(144) => 'D', chr(196).chr(145) => 'd',
		chr(196).chr(146) => 'E', chr(196).chr(147) => 'e',
		chr(196).chr(148) => 'E', chr(196).chr(149) => 'e',
		chr(196).chr(150) => 'E', chr(196).chr(151) => 'e',
		chr(196).chr(152) => 'E', chr(196).chr(153) => 'e',
		chr(196).chr(154) => 'E', chr(196).chr(155) => 'e',
		chr(196).chr(156) => 'G', chr(196).chr(157) => 'g',
		chr(196).chr(158) => 'G', chr(196).chr(159) => 'g',
		chr(196).chr(160) => 'G', chr(196).chr(161) => 'g',
		chr(196).chr(162) => 'G', chr(196).chr(163) => 'g',
		chr(196).chr(164) => 'H', chr(196).chr(165) => 'h',
		chr(196).chr(166) => 'H', chr(196).chr(167) => 'h',
		chr(196).chr(168) => 'I', chr(196).chr(169) => 'i',
		chr(196).chr(170) => 'I', chr(196).chr(171) => 'i',
		chr(196).chr(172) => 'I', chr(196).chr(173) => 'i',
		chr(196).chr(174) => 'I', chr(196).chr(175) => 'i',
		chr(196).chr(176) => 'I', chr(196).chr(177) => 'i',
		chr(196).chr(178) => 'IJ',chr(196).chr(179) => 'ij',
		chr(196).chr(180) => 'J', chr(196).chr(181) => 'j',
		chr(196).chr(182) => 'K', chr(196).chr(183) => 'k',
		chr(196).chr(184) => 'k', chr(196).chr(185) => 'L',
		chr(196).chr(186) => 'l', chr(196).chr(187) => 'L',
		chr(196).chr(188) => 'l', chr(196).chr(189) => 'L',
		chr(196).chr(190) => 'l', chr(196).chr(191) => 'L',
		chr(197).chr(128) => 'l', chr(197).chr(129) => 'L',
		chr(197).chr(130) => 'l', chr(197).chr(131) => 'N',
		chr(197).chr(132) => 'n', chr(197).chr(133) => 'N',
		chr(197).chr(134) => 'n', chr(197).chr(135) => 'N',
		chr(197).chr(136) => 'n', chr(197).chr(137) => 'N',
		chr(197).chr(138) => 'n', chr(197).chr(139) => 'N',
		chr(197).chr(140) => 'O', chr(197).chr(141) => 'o',
		chr(197).chr(142) => 'O', chr(197).chr(143) => 'o',
		chr(197).chr(144) => 'O', chr(197).chr(145) => 'o',
		chr(197).chr(146) => 'OE',chr(197).chr(147) => 'oe',
		chr(197).chr(148) => 'R',chr(197).chr(149) => 'r',
		chr(197).chr(150) => 'R',chr(197).chr(151) => 'r',
		chr(197).chr(152) => 'R',chr(197).chr(153) => 'r',
		chr(197).chr(154) => 'S',chr(197).chr(155) => 's',
		chr(197).chr(156) => 'S',chr(197).chr(157) => 's',
		chr(197).chr(158) => 'S',chr(197).chr(159) => 's',
		chr(197).chr(160) => 'S', chr(197).chr(161) => 's',
		chr(197).chr(162) => 'T', chr(197).chr(163) => 't',
		chr(197).chr(164) => 'T', chr(197).chr(165) => 't',
		chr(197).chr(166) => 'T', chr(197).chr(167) => 't',
		chr(197).chr(168) => 'U', chr(197).chr(169) => 'u',
		chr(197).chr(170) => 'U', chr(197).chr(171) => 'u',
		chr(197).chr(172) => 'U', chr(197).chr(173) => 'u',
		chr(197).chr(174) => 'U', chr(197).chr(175) => 'u',
		chr(197).chr(176) => 'U', chr(197).chr(177) => 'u',
		chr(197).chr(178) => 'U', chr(197).chr(179) => 'u',
		chr(197).chr(180) => 'W', chr(197).chr(181) => 'w',
		chr(197).chr(182) => 'Y', chr(197).chr(183) => 'y',
		chr(197).chr(184) => 'Y', chr(197).chr(185) => 'Z',
		chr(197).chr(186) => 'z', chr(197).chr(187) => 'Z',
		chr(197).chr(188) => 'z', chr(197).chr(189) => 'Z',
		chr(197).chr(190) => 'z', chr(197).chr(191) => 's',
		// Decompositions for Latin Extended-B
		chr(200).chr(152) => 'S', chr(200).chr(153) => 's',
		chr(200).chr(154) => 'T', chr(200).chr(155) => 't',
		// Euro Sign
		chr(226).chr(130).chr(172) => 'EUR',
		// GBP (Pound) Sign
		chr(194).chr(163) => 'GBP',
		// Vowels with diacritic (Vietnamese)
		// unmarked
		chr(198).chr(160) => 'O', chr(198).chr(161) => 'o',
		chr(198).chr(175) => 'U', chr(198).chr(176) => 'u',
		// grave accent
		chr(225).chr(186).chr(166) => 'A', chr(225).chr(186).chr(167) => 'a',
		chr(225).chr(186).chr(176) => 'A', chr(225).chr(186).chr(177) => 'a',
		chr(225).chr(187).chr(128) => 'E', chr(225).chr(187).chr(129) => 'e',
		chr(225).chr(187).chr(146) => 'O', chr(225).chr(187).chr(147) => 'o',
		chr(225).chr(187).chr(156) => 'O', chr(225).chr(187).chr(157) => 'o',
		chr(225).chr(187).chr(170) => 'U', chr(225).chr(187).chr(171) => 'u',
		chr(225).chr(187).chr(178) => 'Y', chr(225).chr(187).chr(179) => 'y',
		// hook
		chr(225).chr(186).chr(162) => 'A', chr(225).chr(186).chr(163) => 'a',
		chr(225).chr(186).chr(168) => 'A', chr(225).chr(186).chr(169) => 'a',
		chr(225).chr(186).chr(178) => 'A', chr(225).chr(186).chr(179) => 'a',
		chr(225).chr(186).chr(186) => 'E', chr(225).chr(186).chr(187) => 'e',
		chr(225).chr(187).chr(130) => 'E', chr(225).chr(187).chr(131) => 'e',
		chr(225).chr(187).chr(136) => 'I', chr(225).chr(187).chr(137) => 'i',
		chr(225).chr(187).chr(142) => 'O', chr(225).chr(187).chr(143) => 'o',
		chr(225).chr(187).chr(148) => 'O', chr(225).chr(187).chr(149) => 'o',
		chr(225).chr(187).chr(158) => 'O', chr(225).chr(187).chr(159) => 'o',
		chr(225).chr(187).chr(166) => 'U', chr(225).chr(187).chr(167) => 'u',
		chr(225).chr(187).chr(172) => 'U', chr(225).chr(187).chr(173) => 'u',
		chr(225).chr(187).chr(182) => 'Y', chr(225).chr(187).chr(183) => 'y',
		// tilde
		chr(225).chr(186).chr(170) => 'A', chr(225).chr(186).chr(171) => 'a',
		chr(225).chr(186).chr(180) => 'A', chr(225).chr(186).chr(181) => 'a',
		chr(225).chr(186).chr(188) => 'E', chr(225).chr(186).chr(189) => 'e',
		chr(225).chr(187).chr(132) => 'E', chr(225).chr(187).chr(133) => 'e',
		chr(225).chr(187).chr(150) => 'O', chr(225).chr(187).chr(151) => 'o',
		chr(225).chr(187).chr(160) => 'O', chr(225).chr(187).chr(161) => 'o',
		chr(225).chr(187).chr(174) => 'U', chr(225).chr(187).chr(175) => 'u',
		chr(225).chr(187).chr(184) => 'Y', chr(225).chr(187).chr(185) => 'y',
		// acute accent
		chr(225).chr(186).chr(164) => 'A', chr(225).chr(186).chr(165) => 'a',
		chr(225).chr(186).chr(174) => 'A', chr(225).chr(186).chr(175) => 'a',
		chr(225).chr(186).chr(190) => 'E', chr(225).chr(186).chr(191) => 'e',
		chr(225).chr(187).chr(144) => 'O', chr(225).chr(187).chr(145) => 'o',
		chr(225).chr(187).chr(154) => 'O', chr(225).chr(187).chr(155) => 'o',
		chr(225).chr(187).chr(168) => 'U', chr(225).chr(187).chr(169) => 'u',
		// dot below
		chr(225).chr(186).chr(160) => 'A', chr(225).chr(186).chr(161) => 'a',
		chr(225).chr(186).chr(172) => 'A', chr(225).chr(186).chr(173) => 'a',
		chr(225).chr(186).chr(182) => 'A', chr(225).chr(186).chr(183) => 'a',
		chr(225).chr(186).chr(184) => 'E', chr(225).chr(186).chr(185) => 'e',
		chr(225).chr(187).chr(134) => 'E', chr(225).chr(187).chr(135) => 'e',
		chr(225).chr(187).chr(138) => 'I', chr(225).chr(187).chr(139) => 'i',
		chr(225).chr(187).chr(140) => 'O', chr(225).chr(187).chr(141) => 'o',
		chr(225).chr(187).chr(152) => 'O', chr(225).chr(187).chr(153) => 'o',
		chr(225).chr(187).chr(162) => 'O', chr(225).chr(187).chr(163) => 'o',
		chr(225).chr(187).chr(164) => 'U', chr(225).chr(187).chr(165) => 'u',
		chr(225).chr(187).chr(176) => 'U', chr(225).chr(187).chr(177) => 'u',
		chr(225).chr(187).chr(180) => 'Y', chr(225).chr(187).chr(181) => 'y',
		// Vowels with diacritic (Chinese, Hanyu Pinyin)
		chr(201).chr(145) => 'a',
		// macron
		chr(199).chr(149) => 'U', chr(199).chr(150) => 'u',
		// acute accent
		chr(199).chr(151) => 'U', chr(199).chr(152) => 'u',
		// caron
		chr(199).chr(141) => 'A', chr(199).chr(142) => 'a',
		chr(199).chr(143) => 'I', chr(199).chr(144) => 'i',
		chr(199).chr(145) => 'O', chr(199).chr(146) => 'o',
		chr(199).chr(147) => 'U', chr(199).chr(148) => 'u',
		chr(199).chr(153) => 'U', chr(199).chr(154) => 'u',
		// grave accent
		chr(199).chr(155) => 'U', chr(199).chr(156) => 'u',
		);

		// Used for locale-specific rules
//		$locale = get_locale();

//		if ( 'de_DE' == $locale ) {
//			$chars[ chr(195).chr(132) ] = 'Ae';
//			$chars[ chr(195).chr(164) ] = 'ae';
//			$chars[ chr(195).chr(150) ] = 'Oe';
//			$chars[ chr(195).chr(182) ] = 'oe';
//			$chars[ chr(195).chr(156) ] = 'Ue';
//			$chars[ chr(195).chr(188) ] = 'ue';
//			$chars[ chr(195).chr(159) ] = 'ss';
//		} elseif ( 'da_DK' === $locale ) {
//			$chars[ chr(195).chr(134) ] = 'Ae';
// 			$chars[ chr(195).chr(166) ] = 'ae';
//			$chars[ chr(195).chr(152) ] = 'Oe';
//			$chars[ chr(195).chr(184) ] = 'oe';
//			$chars[ chr(195).chr(133) ] = 'Aa';
//			$chars[ chr(195).chr(165) ] = 'aa';
//		}

		$string = strtr($string, $chars);
	} else {
		// Assume ISO-8859-1 if not UTF-8
		$chars['in'] = chr(128).chr(131).chr(138).chr(142).chr(154).chr(158)
			.chr(159).chr(162).chr(165).chr(181).chr(192).chr(193).chr(194)
			.chr(195).chr(196).chr(197).chr(199).chr(200).chr(201).chr(202)
			.chr(203).chr(204).chr(205).chr(206).chr(207).chr(209).chr(210)
			.chr(211).chr(212).chr(213).chr(214).chr(216).chr(217).chr(218)
			.chr(219).chr(220).chr(221).chr(224).chr(225).chr(226).chr(227)
			.chr(228).chr(229).chr(231).chr(232).chr(233).chr(234).chr(235)
			.chr(236).chr(237).chr(238).chr(239).chr(241).chr(242).chr(243)
			.chr(244).chr(245).chr(246).chr(248).chr(249).chr(250).chr(251)
			.chr(252).chr(253).chr(255);

		$chars['out'] = 'EfSZszYcYuAAAAAACEEEEIIIINOOOOOOUUUUYaaaaaaceeeeiiiinoooooouuuuyy';

		$string = strtr($string, $chars['in'], $chars['out']);
		$double_chars['in'] = array(chr(140), chr(156), chr(198), chr(208), chr(222), chr(223), chr(230), chr(240), chr(254));
		$double_chars['out'] = array('OE', 'oe', 'AE', 'DH', 'TH', 'ss', 'ae', 'dh', 'th');
		$string = str_replace($double_chars['in'], $double_chars['out'], $string);
	}

	return $string;
}

function seems_utf8($str) {
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
				for ($j=0; $j<$n; $j++) { # n bytes matching 10bbbbbb follow ?
						if ((++$i == $length) || ((ord($str[$i]) & 0xC0) != 0x80))
								return false;
				}
		}
		return true;
}

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
}

function testutf81($str) {
		$ret1 = mb_detect_encoding($str, 'UTF-8');
return $ret1;
}

function testutf82($str) {
		$ret1 = mb_check_encoding ( $str, 'UTF-8');
return $ret1;
}

function convutf8toasci( $str) {
return  iconv('UTF-8', 'ASCII//TRANSLIT', $str);
}

function convutf8toiso8($str) {
return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $str);
}


function gjpath() {

	# used to create a table for html display and nothing to cli
	global $otable;
	global $oth;
	global $cth;
	global $otr;
	global $otd;
	global $ctd;
	global $ctr;
	global $ctable;
	global $hr;

	if (php_sapi_name() != 'cli') {
	$otable='</pre><table>';
	$oth='<th>';
	$cth='</th>';
	$otr='<tr>';
	$otd='<td>';
	$ctd='</td>';
	$ctr='</tr>';
	$ctable='</table><pre>';
	$hr='<hr>';
	} else {
	$otable='';
	$oth='';
	$cth='';
	$otr='';
	$otd='';
	$ctd='';
	$ctr='';
	$ctable='';
	$hr='';
	}

	# strings to test conversion
	$inStrs = array(
	'Björk Guðmundsdóttir',
	'Gérard Depardieu',
	'Camille Saint-Saëns',
	'Jean Réno',
	'Jürgen Klinsmann',
	'Sinéad O’Connor',
	'Andrés Iniesta',
	'Cesc Fàbregas',
	'Raúl Albiol',
	'Iñigo Martínez',
	'Álvaro Arbeloa',
	'Juan Gómez',
	'abcdefghijklmnopqrstuvwxyz 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'ÀÖØöøÿabcdefghijklmnopqrstuvwxyz 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'abcdefghijklmnopqrstuvwxyz 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZÀÖØöøÿ',
	"GÀÖRY's Johnsonÿ hyp-name with single quote",
	'Gary` accented.lastname with period',
	'Anne Doherty Johnson',
	'Gary < Sc Johnson',
	"Gary '' Sc Johnson",
	' double double quotes " " ',
	"  'double single quotes '  ",
	'single forward slash /',
	'single backslash\\',
	'Gary;Drop',
	'delete drop update replace kill lock',
	'<(>){}[]',
	"!@#$%^&*()_+<>:''\\|",
	'====utf-8=======',
	' ¡¢£¤¥¦§¨©ª«¬­®¯',
	'°±²³´µ¶·¸¹º»¼½¾¿',
	'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ',
	'ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß',
	'àáâãäåæçèéêëìíîï',
	'ðñòóôõö÷øùúûüýþÿ',
	'================',
	'view source for the following, the data is confused with tags',
	'<tyler:DocumentOptionalService>',
    '<nc:IdentificationID>COPIES</nc:IdentificationID>',
    '<tyler:Multiplier>10</tyler:Multiplier>',
    '</tyler:DocumentOptionalService>',
    '<ecf:EntityPerson s:id="Party_1">',
	'<appellate:AppellateCase xmlns:appellate="urn:oasis:names:tc:legalxml-courtfiling:schema:xsd:AppellateCase-4.0" xsi:schemaLocation="urn:oasis:names:tc:legalxml-courtfiling:schema:xsd:AppellateCase-4.0 ../../../casetype/ECF-4.0-AppellateCase.xsd">',
    '<nc:BinaryBase64Object/>',
	'<tyler:FilingCommentsText> ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ</tyler:FilingCommentsText>',
	"\xC3\x84\xC3\x96\xC3\x9C", #   'ÄÖÜ';
	# plane 2 utf-8 strings
	chr(195).chr(132),
	'€'
	);

	#tbale to show the main problem children chars
	$inStrs2 = array(
	' ¡','¢','£','¤','¥','¦','§','¨','©','ª','«','¬','­','®','¯',
	'°','±','²','³','´','µ','¶','·','¸','¹','º','»','¼','½','¾','¿',
//	'À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï',
//	'Ð','Ñ','Ò','Ó','Ô','Õ','Ö','×','Ø','Ù','Ú','Û','Ü','Ý','Þ','ß',
//	'à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï',
	);

	echo  'Check Environment  #################'  . PHP_EOL;

	$CurrentVer = phpversion();
	switch (version_compare($CurrentVer, '5.3.3')) {
		case -1:
				print " You are running an older version of PHP: $CurrentVer" . PHP_EOL;
			break;
		case 0:
				print 'You are running PHP 5.3.3' . PHP_EOL;
			break;
		case 1:
				print "You are running a version of PHP after 5.3: $CurrentVer" . PHP_EOL;
	}

	$str = realpath(__FILE__);
	echo 'test file:  ' . $str . PHP_EOL;

	// add the file to the array of strings to test
	$inStrs[] = $str;

	// Enable support for UTF-8. Needed for iconv() calls.
	setlocale(LC_ALL, array('en_US.utf8', 'en_US.UTF-8'));

	// display setlocale setting;
	echo 'setlocale(LC_ALL, 0) returns: ' . setlocale(LC_ALL, 0) .PHP_EOL;
	// A return value of C means that the user has not set any locale and the default locale is active.

	if (function_exists('mb_internal_encoding') && is_callable('mb_internal_encoding')) {
		echo 'we have  mb_internal_encoding()' . PHP_EOL;
		$encoding = mb_internal_encoding();
	} else {
		echo 'we do not have  mb_internal_encoding()' . PHP_EOL;
		$encoding = ini_get('default_charset'); # 	'UTF-8'
	}

	if (function_exists('mb_check_encoding') && is_callable('mb_check_encoding')) {
		echo 'we have  mb_check_encoding()' . PHP_EOL;
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

	if (function_exists('utf8_decode') && is_callable('utf8_decode')) {
		echo 'we have utf8_decode()' . PHP_EOL;
	} else {
		echo 'we do not have utf8_decode' . PHP_EOL;
	}

	if (function_exists('iconv') && is_callable('iconv')) {
		echo 'we have iconv()' . PHP_EOL;
	} else {
		echo 'we do not have iconv' . PHP_EOL;
	}

# http://php.net/manual/en/function.iconv.php
	iconv_set_encoding('internal_encoding', 'UTF-8');
	iconv_set_encoding('input_encoding', 'UTF-8');
	//iconv_set_encoding('output_encoding', 'ISO-8859-1');
	iconv_set_encoding('output_encoding', 'ASCII');
	echo 'default iconv encodings' . PHP_EOL;

	print_r(iconv_get_encoding('all'));

	echo 'Running input test strings from inStrs' . PHP_EOL;

	echo $otable;

	for ($i=0; $i < count($inStrs); $i++) {
        $strout0 = seems_utf8($inStrs[$i]);
		echo $otr;
		echo $otd;
		echo "$i strin:       " . $inStrs[$i] . " is utf8: " . ($strout0 ? 'true':'false')  . PHP_EOL;
		echo $ctd;
		echo $ctr;

		echo $otr;
		echo $otd;
		$strout1 = convutf8toasci($inStrs[$i]);
		echo 'convutf8toasci: ' . $strout1  . PHP_EOL;
		echo $ctd;
		echo $ctr;

		echo $otr;
		echo $otd;
		$strout2 = remove_accents($inStrs[$i]);
		echo 'remove_accents: ' . $strout2  . PHP_EOL;
		echo $ctd;
		echo $ctr;

		echo $otr;
		echo $otd;
		echo '$i strhex:      ' . bin2hex($inStrs[$i])  . PHP_EOL;
		echo $hr;

		echo $ctd;
		echo $ctr;
//
//		check encoding tests
//		$strout1 = testutf81($inStrs[$i]);
//		$strout2 = testutf82($inStrs[$i]);
//		$strout3 = isUtf8($inStrs[$i]);
//		$strout4 = seems_utf8($inStrs[$i]);
//
//
//		echo 'testutf81: ' . ($strout1 ? 'true':'false') . PHP_EOL;
//		echo 'testutf82: ' . ($strout2 ? 'true':'false')	. PHP_EOL;
//		echo 'isutf8:	' .	($strout3 ?	'true':'false')	 . PHP_EOL;
//		echo 'seems_utf8:	' .	($strout4 ?	'true':'false')	 . PHP_EOL;
	}



	echo PHP_EOL . PHP_EOL;
	echo 'Running test characters from inStrs2 - highlight the special conversions done by remove_accents' . PHP_EOL;


//	build a table if web else nothing if php cli
	echo $ctable;

	for ($i=0; $i < count($inStrs2); $i++) {

		echo $otr;
		echo $otd;
		echo '$i strin:       ' . $inStrs2[$i]  . PHP_EOL;
		echo $ctd;
		echo $ctr;

		echo $otr;
		echo $otd;
		$strout1 = convutf8toasci($inStrs2[$i]);
		echo 'convutf8toasci: ' . $strout1  . PHP_EOL;
		echo $ctd;
		echo $ctr;

		echo $otr;
		echo $otd;
		$strout2 = remove_accents($inStrs2[$i]);
		echo 'remove_accents: ' . $strout2  . PHP_EOL;
		echo $ctd;
		echo $ctr;

		echo $otr;
		echo $otd;
		echo '$i strhex:      ' . bin2hex($inStrs2[$i])  . PHP_EOL;
		echo $hr;

		echo $ctd;
		echo $ctr;
	}

	echo $ctable;
	echo  '#################'  . PHP_EOL;
}


gjpath();

echo PHP_EOL;
// the following  between the -----------------------------are notes on various problems with code conversions
// -----------------------------

//Have a look at iconv() or mb_convert_encoding(). Just by the way: why don't utf8_encode() and utf8_decode() work for you?
//
//utf8_decode — Converts a string with ISO-8859-1 characters encoded with UTF-8 to single-byte ISO-8859-1
//
//utf8_encode — Encodes an ISO-8859-1 string to UTF-8

// iso latin1 win 1252    0xC4,0xD6,0xDC
// utf-8  0xC3 0x84  0xC3 0x96 0xC3 0x9C
// see pack("CCC",0xef,0xbb,0xbf));  pack("H*",bin2hex($str)) ;


// $utf8 = 'ÄÖÜ'; // file must be UTF-8 encoded
//$utf8 = "\xC3\x84\xC3\x96\xC3\x9C"; #   'ÄÖÜ'; // file must be UTF-8 encoded
//$iso88591_1 = utf8_decode($utf8);
//$iso88591_2 = iconv('UTF-8', 'ISO-8859-1', $utf8);
//$iso88591_2 = mb_convert_encoding($utf8, 'ISO-8859-1', 'UTF-8');

// put in an html table

//echo  '      UTF8: ' . $utf8 . PHP_EOL;
//
//echo  'INPUT UTF8: ' . bin2hex($utf8) . ' OP1: ' . bin2hex($iso88591_1) .  '       OP2: ' . bin2hex($iso88591_2) . PHP_EOL;


//$iso88591 = 'ÄÖÜ'; // file must be ISO-8859-1 encoded
//$iso88591 = "\xC4\xD6\xDC"; // file must be ISO-8859-1 encoded
//$utf8_1 = utf8_encode($iso88591);
//$utf8_2 = iconv('ISO-8859-1', 'UTF-8', $iso88591);
//$utf8_2 = mb_convert_encoding($iso88591, 'UTF-8', 'ISO-8859-1');

//all should do the same - with utf8_en/decode() requiring no special extension, mb_convert_encoding() requiring ext/mbstring and iconv() requiring ext/iconv

//
//echo 'INPUT ISO:  ' . bin2hex($iso88591) . '       OP1: ' .  bin2hex($utf8_1) . ' OP2: ' .bin2hex($utf8_2) . PHP_EOL;

//
//The "//ignore" option doesn't work with recent versions of the iconv library.  So if you're having trouble with that option, you aren't alone.
//[UPDATE 15-JUN-2012]
//Here's a workaround...
//
//  ini_set('mbstring.substitute_character', "none");
//  $text= mb_convert_encoding($text, 'UTF-8', 'UTF-8');

//$text = "This is the Euro symbol '€'.";
//echo 'Original : ', $text, PHP_EOL;
//echo 'TRANSLIT : ', iconv("UTF-8", "ISO-8859-1//TRANSLIT", $text), PHP_EOL;
////echo 'IGNORE   : ', iconv("UTF-8", "ISO-8859-1//IGNORE", $text), PHP_EOL;
//echo 'Plain    : ', iconv("UTF-8", "ISO-8859-1", $text), PHP_EOL;

//IGNORE   : PHP Notice:  iconv(): Detected an illegal character in input string in /home/gary/share/testutf-8stringfuncs.php on line 292
//PHP Stack trace:
//PHP   1. {main}() /home/gary/share/testutf-8stringfuncs.php:0
//PHP   2. iconv() /home/gary/share/testutf-8stringfuncs.php:292
//
//Notice: iconv(): Detected an illegal character in input string in /home/gary/share/testutf-8stringfuncs.php on line 292
//
//Call Stack:
//    0.0003     714520   1. {main}() /home/gary/share/testutf-8stringfuncs.php:0
//    0.0038     716968   2. iconv() /home/gary/share/testutf-8stringfuncs.php:292
//
//This is the Euro symbol ''.
//Plain    : PHP Notice:  iconv(): Detected an illegal character in input string in /home/gary/share/testutf-8stringfuncs.php on line 293
//PHP Stack trace:
//PHP   1. {main}() /home/gary/share/testutf-8stringfuncs.php:0
//PHP   2. iconv() /home/gary/share/testutf-8stringfuncs.php:293
//
//Notice: iconv(): Detected an illegal character in input string in /home/gary/share/testutf-8stringfuncs.php on line 293
//
//Call Stack:
//    0.0003     714520   1. {main}() /home/gary/share/testutf-8stringfuncs.php:0
//    0.0039     716960   2. iconv() /home/gary/share/testutf-8stringfuncs.php:293
//
// -----------------------------


echo PHP_EOL . PHP_EOL;
echo 'The remove_accents conversion table' . PHP_EOL;

echo $otable . PHP_EOL;
echo $otr . PHP_EOL;
# table head
echo $oth;
echo 'key';
echo $cth;

echo $oth;
echo 'hex';
echo $cth;

echo $oth;
echo 'value';
echo $cth;

echo $oth;
echo 'hex';
echo $cth;

echo $ctr . PHP_EOL;


foreach ($chars as $key => $value) {
echo $otr;

echo $otd;
echo " $key ";
echo $ctd ;

echo $otd;
echo bin2hex($key);
echo $ctd ;

echo $otd ;
echo " $value " ;
echo $ctd ;

echo $otd;
echo bin2hex($value);
echo $ctd;
echo $ctr . PHP_EOL;
}

echo $ctable . PHP_EOL;
echo PHP_EOL;


?>


<?php if (php_sapi_name() != 'cli'): ?>

</pre>
</body>
</html>

<?php else: ?>

<?php endif ?>