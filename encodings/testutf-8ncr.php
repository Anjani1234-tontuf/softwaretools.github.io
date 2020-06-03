<?php if (php_sapi_name() != "cli"): ?>
<!--

	THIS FILE MUST BE EDITED AND SAVED AS UTF-8

	add some html for formatting, if not run from the php command line

	use this instead http://www.utf8-chartable.de/unicode-utf8-table.pl
http://www.utf8-chartable.de/unicode-utf8-table.pl?number=1024&utf8=0x&unicodeinhtml=dec

-->
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>rsi utf-8 ncr test page</title>
<link rel="StyleSheet" href="encodingstyles.css" type="text/css">

</head>
<body>
<pre>

<?php else: ?>

<?php endif ?>

<?php
# c0 c1 are invalid  so remove them from the dump

function utf8($num)
{
    if($num<=0x7F)       return chr($num);
    if($num<=0x7FF)      return chr(($num>>6)+192).chr(($num&63)+128);
    if($num<=0xFFFF)     return chr(($num>>12)+224).chr((($num>>6)&63)+128).chr(($num&63)+128);
    if($num<=0x1FFFFF)   return chr(($num>>18)+240).chr((($num>>12)&63)+128).chr((($num>>6)&63)+128).chr(($num&63)+128);
    return '';
}

function uniord($c)
{
    $ord0 = ord($c{0}); if ($ord0>=0   && $ord0<=127) return $ord0;
    $ord1 = ord($c{1}); if ($ord0>=192 && $ord0<=223) return ($ord0-192)*64 + ($ord1-128);
    $ord2 = ord($c{2}); if ($ord0>=224 && $ord0<=239) return ($ord0-224)*4096 + ($ord1-128)*64 + ($ord2-128);
    $ord3 = ord($c{3}); if ($ord0>=240 && $ord0<=247) return ($ord0-240)*262144 + ($ord1-128)*4096 + ($ord2-128)*64 + ($ord3-128);
    return false;
}
#utf8() and uniord() try to mirror the chr() and ord() functions on php:


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

//echo utf8(0x6211)."\n";
//echo uniord(utf8(0x6211))."\n";
//echo "U+".dechex(uniord(utf8(0x6211)))."\n";
//
////In your case:
//$wo='U+6211';
//$hao='U+597D';
//echo utf8(hexdec(str_replace("U+","", $wo)))."\n";
//echo utf8(hexdec(str_replace("U+","", $hao)))."\n";

#
for ($i=80; $i < 2000; $i++) {
  $tmp1 = dechex($i);
  if (strlen ($tmp1) < 3) {
    echo 'U+00'.$tmp1.'  &#'.$i.';'.PHP_EOL;
  } elseif (strlen ($tmp1) < 4) {
    echo 'U+0'.$tmp1.'  &#'.$i.';'.PHP_EOL;
  } else {
    echo 'U+'.$tmp1.'  &#'.$i.';'.PHP_EOL;
  }

//scanf

}

echo  PHP_EOL . PHP_EOL. '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' . PHP_EOL . PHP_EOL;

for ($i=8400; $i < 8600; $i++) {
  $tmp1 = dechex($i);
  if (strlen ($tmp1) < 3) {
    echo 'U+00'.$tmp1.'  &#'.$i.';'.PHP_EOL;
  } elseif (strlen ($tmp1) < 4) {
    echo 'U+0'.$tmp1.'  &#'.$i.';'.PHP_EOL;
  } else  {
    echo 'U+'.$tmp1.'  &#'.$i.';'.PHP_EOL;
  }

//scanf

}


function init_byte_map(){
  global $byte_map;
  for($x=128;$x<256;++$x){
    $byte_map[chr($x)]=utf8_encode(chr($x));
  }
  $cp1252_map=array(
    "\x80"=>"\xE2\x82\xAC",    // EURO SIGN
    "\x82" => "\xE2\x80\x9A",  // SINGLE LOW-9 QUOTATION MARK
    "\x83" => "\xC6\x92",      // LATIN SMALL LETTER F WITH HOOK
    "\x84" => "\xE2\x80\x9E",  // DOUBLE LOW-9 QUOTATION MARK
    "\x85" => "\xE2\x80\xA6",  // HORIZONTAL ELLIPSIS
    "\x86" => "\xE2\x80\xA0",  // DAGGER
    "\x87" => "\xE2\x80\xA1",  // DOUBLE DAGGER
    "\x88" => "\xCB\x86",      // MODIFIER LETTER CIRCUMFLEX ACCENT
    "\x89" => "\xE2\x80\xB0",  // PER MILLE SIGN
    "\x8A" => "\xC5\xA0",      // LATIN CAPITAL LETTER S WITH CARON
    "\x8B" => "\xE2\x80\xB9",  // SINGLE LEFT-POINTING ANGLE QUOTATION MARK
    "\x8C" => "\xC5\x92",      // LATIN CAPITAL LIGATURE OE
    "\x8E" => "\xC5\xBD",      // LATIN CAPITAL LETTER Z WITH CARON
    "\x91" => "\xE2\x80\x98",  // LEFT SINGLE QUOTATION MARK
    "\x92" => "\xE2\x80\x99",  // RIGHT SINGLE QUOTATION MARK
    "\x93" => "\xE2\x80\x9C",  // LEFT DOUBLE QUOTATION MARK
    "\x94" => "\xE2\x80\x9D",  // RIGHT DOUBLE QUOTATION MARK
    "\x95" => "\xE2\x80\xA2",  // BULLET
    "\x96" => "\xE2\x80\x93",  // EN DASH
    "\x97" => "\xE2\x80\x94",  // EM DASH
    "\x98" => "\xCB\x9C",      // SMALL TILDE
    "\x99" => "\xE2\x84\xA2",  // TRADE MARK SIGN
    "\x9A" => "\xC5\xA1",      // LATIN SMALL LETTER S WITH CARON
    "\x9B" => "\xE2\x80\xBA",  // SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
    "\x9C" => "\xC5\x93",      // LATIN SMALL LIGATURE OE
    "\x9E" => "\xC5\xBE",      // LATIN SMALL LETTER Z WITH CARON
    "\x9F" => "\xC5\xB8"       // LATIN CAPITAL LETTER Y WITH DIAERESIS
  );
  foreach($cp1252_map as $k=>$v){
    $byte_map[$k]=$v;
  }
}

function fix_latin($instr){
  if(mb_check_encoding($instr,'UTF-8'))return $instr; // no need for the rest if it's all valid UTF-8 already
  global $nibble_good_chars,$byte_map;
  $outstr='';
  $char='';
  $rest='';
  while((strlen($instr))>0){
    if(1==preg_match($nibble_good_chars,$input,$match)){
      $char=$match[1];
      $rest=$match[2];
      $outstr.=$char;
    }elseif(1==preg_match('@^(.)(.*)$@s',$input,$match)){
      $char=$match[1];
      $rest=$match[2];
      $outstr.=$byte_map[$char];
    }
    $instr=$rest;
  }
  return $outstr;
}

$byte_map=array();
init_byte_map();
$ascii_char='[\x00-\x7F]';
$cont_byte='[\x80-\xBF]';
$utf8_2='[\xC0-\xDF]'.$cont_byte;
$utf8_3='[\xE0-\xEF]'.$cont_byte.'{2}';
$utf8_4='[\xF0-\xF7]'.$cont_byte.'{3}';
$utf8_5='[\xF8-\xFB]'.$cont_byte.'{4}';
$nibble_good_chars = "@^($ascii_char+|$utf8_2|$utf8_3|$utf8_4|$utf8_5)(.*)$@s";

?>


<?php if (php_sapi_name() != 'cli'): ?>

</pre>
</body>
</html>

<?php else: ?>

<?php endif ?>