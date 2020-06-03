<?php
/**
*  Single Byte Windows 1252 and IS0-8859-1 to Utf-8
*
*  This file is in the Windows 1252 code set
*  Hex is used to make minimize character code and other editing mistakes

  File:     singlebytetoUTF8.php
*/

# convert Latin1 Windows to utf-8

	$sbgt128toutf8=array(
	"\x80" => "\xE2\x82\xAC",  // EURO SIGN
	# no 81 unassigned
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
	# no 8d unassigned
	"\x8E" => "\xC5\xBD",      // LATIN CAPITAL LETTER Z WITH CARON
	# no 8f unassigned
	# no 90 unassigned
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
	# no 9d unassigned
	"\x9E" => "\xC5\xBE",      // LATIN SMALL LETTER Z WITH CARON
	"\x9F" => "\xC5\xB8",      // LATIN CAPITAL LETTER Y WITH DIAERESIS
	# end 1252 only start iso 8859-1 and 1252
	"\xA0" => "\xC2\xA0",    // NO-BREAK SPACE
	"\xA1" => "\xC2\xA1",    // INVERTED EXCLAMATION MARK
	"\xA2" => "\xC2\xA2",    // CENT SIGN
	"\xA3" => "\xC2\xA3",    // POUND SIGN
	"\xA4" => "\xC2\xA4",    // CURRENCY SIGN
	"\xA5" => "\xC2\xA5",    // YEN SIGN
	"\xA6" => "\xC2\xA6",    // BROKEN BAR
	"\xA7" => "\xC2\xA7",    // SECTION SIGN
	"\xA8" => "\xC2\xA8",    // DIAERESIS
	"\xA9" => "\xC2\xA9",    // COPYRIGHT SIGN
	"\xAA" => "\xC2\xAA",    // FEMININE ORDINAL INDICATOR
	"\xAB" => "\xC2\xAB",    // LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
	"\xAC" => "\xC2\xAC",    // NOT SIGN
	//  do not translate soft hypen its only inserted or displayed at the discretion of the browser "\xAD" => "\xC2\xAD",    // SOFT HYPHEN
	"\xAE" => "\xC2\xAE",    // REGISTERED SIGN
	"\xAF" => "\xC2\xAF",    // MACRON

	"\xB0" => "\xC2\xB0",    // DEGREE SIGN
	"\xB1" => "\xC2\xB1",    // PLUS-MINUS SIGN
	"\xB2" => "\xC2\xB2",    // SUPERSCRIPT TWO
	"\xB3" => "\xC2\xB3",    // SUPERSCRIPT THREE
	"\xB4" => "\xC2\xB4",    // ACUTE ACCENT
	"\xB5" => "\xC2\xB5",    // MICRO SIGN
	"\xB6" => "\xC2\xB6",    // PILCROW SIGN
	"\xB7" => "\xC2\xB7",    // MIDDLE DOT
	"\xB8" => "\xC2\xB8",    // CEDILLA
	"\xB9" => "\xC2\xB9",    // SUPERSCRIPT ONE
	"\xBA" => "\xC2\xBA",    // MASCULINE ORDINAL INDICATOR
	"\xBB" => "\xC2\xBB",    // RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
	"\xBC" => "\xC2\xBC",    // VULGAR FRACTION ONE QUARTER
	"\xBD" => "\xC2\xBD",    // VULGAR FRACTION ONE HALF
	"\xBE" => "\xC2\xBE",    // VULGAR FRACTION THREE QUARTERS
	"\xBF" => "\xC2\xBF",    // INVERTED QUESTION MARK

	"\xC0" => "\xC3\x80",    // Latin  CAPITAL LETTER A WITH GRAVE
	"\xC1" => "\xC3\x81",    // Latin  CAPITAL LETTER A WITH ACUTE
	"\xC2" => "\xC3\x82",    // Latin  CAPITAL LETTER A WITH CIRCUMFLEX
	"\xC3" => "\xC3\x83",    // Latin  CAPITAL LETTER A WITH TILDE
	"\xC4" => "\xC3\x84",    // Latin  CAPITAL LETTER A WITH DIAERESIS
	"\xC5" => "\xC3\x85",    // Latin  CAPITAL LETTER A WITH RING ABOVE
	"\xC6" => "\xC3\x86",    // Latin  CAPITAL LETTER AE
	"\xC7" => "\xC3\x87",    // Latin  CAPITAL LETTER C WITH CEDILLA
	"\xC8" => "\xC3\x88",    // Latin  CAPITAL LETTER E WITH GRAVE
	"\xC9" => "\xC3\x89",    // Latin  CAPITAL LETTER E WITH ACUTE
	"\xCA" => "\xC3\x8A",    // Latin  CAPITAL LETTER E WITH CIRCUMFLEX
	"\xCB" => "\xC3\x8B",    // Latin  CAPITAL LETTER E WITH DIAERESIS
	"\xCC" => "\xC3\x8C",    // Latin  CAPITAL LETTER I WITH GRAVE
	"\xCD" => "\xC3\x8D",    // Latin  CAPITAL LETTER I WITH ACUTE
	"\xCE" => "\xC3\x8E",    // Latin  CAPITAL LETTER I WITH CIRCUMFLEX
	"\xCF" => "\xC3\x8F",    // Latin  CAPITAL LETTER I WITH DIAERESIS

	"\xD0" => "\xC3\x90",    // Latin  CAPITAL LETTER ETH (Icelandic)
	"\xD1" => "\xC3\x91",    // Latin  CAPITAL LETTER N WITH TILDE
	"\xD2" => "\xC3\x92",    // Latin  CAPITAL LETTER O WITH GRAVE
	"\xD3" => "\xC3\x93",    // Latin  CAPITAL LETTER O WITH ACUTE
	"\xD4" => "\xC3\x94",    // Latin  CAPITAL LETTER O WITH CIRCUMFLEX
	"\xD5" => "\xC3\x95",    // Latin  CAPITAL LETTER O WITH TILDE
	"\xD6" => "\xC3\x96",    // Latin  CAPITAL LETTER O WITH DIAERESIS
	"\xD7" => "\xC3\x97",    // MULTIPLICATION SIGN
	"\xD8" => "\xC3\x98",    // Latin  CAPITAL LETTER O WITH STROKE
	"\xD9" => "\xC3\x99",    // Latin  CAPITAL LETTER U WITH GRAVE
	"\xDA" => "\xC3\x9A",    // Latin  CAPITAL LETTER U WITH ACUTE
	"\xDB" => "\xC3\x9B",    // Latin  CAPITAL LETTER U WITH CIRCUMFLEX
	"\xDC" => "\xC3\x9C",    // Latin  CAPITAL LETTER U WITH DIAERESIS
	"\xDD" => "\xC3\x9D",    // Latin  CAPITAL LETTER Y WITH ACUTE
	"\xDE" => "\xC3\x9E",    // Latin  CAPITAL LETTER THORN (Icelandic)
	"\xDF" => "\xC3\x9F",    // Latin  SMALL LETTER SHARP S (German)

	"\xE0" => "\xC3\xA0",    // Latin  SMALL LETTER A WITH GRAVE
	"\xE1" => "\xC3\xA1",    // Latin  SMALL LETTER A WITH ACUTE
	"\xE2" => "\xC3\xA2",    // Latin  SMALL LETTER A WITH CIRCUMFLEX
	"\xE3" => "\xC3\xA3",    // Latin  SMALL LETTER A WITH TILDE
	"\xE4" => "\xC3\xA4",    // Latin  SMALL LETTER A WITH DIAERESIS
	"\xE5" => "\xC3\xA5",    // Latin  SMALL LETTER A WITH RING ABOVE
	"\xE6" => "\xC3\xA6",    // Latin  SMALL LETTER AE
	"\xE7" => "\xC3\xA7",    // Latin  SMALL LETTER C WITH CEDILLA
	"\xE8" => "\xC3\xA8",    // Latin  SMALL LETTER E WITH GRAVE
	"\xE9" => "\xC3\xA9",    // Latin  SMALL LETTER E WITH ACUTE
	"\xEA" => "\xC3\xAA",    // Latin  SMALL LETTER E WITH CIRCUMFLEX
	"\xEB" => "\xC3\xAB",    // Latin  SMALL LETTER E WITH DIAERESIS
	"\xEC" => "\xC3\xAC",    // Latin  SMALL LETTER I WITH GRAVE
	"\xED" => "\xC3\xAD",    // Latin  SMALL LETTER I WITH ACUTE
	"\xEE" => "\xC3\xAE",    // Latin  SMALL LETTER I WITH CIRCUMFLEX
	"\xEF" => "\xC3\xAF",    // Latin  SMALL LETTER I WITH DIAERESIS

	"\xF0" => "\xC3\xB0",    // Latin  SMALL LETTER ETH (Icelandic)
	"\xF1" => "\xC3\xB1",    // Latin  SMALL LETTER N WITH TILDE
	"\xF2" => "\xC3\xB2",    // Latin  SMALL LETTER O WITH GRAVE
	"\xF3" => "\xC3\xB3",    // Latin  SMALL LETTER O WITH ACUTE
	"\xF4" => "\xC3\xB4",    // Latin  SMALL LETTER O WITH CIRCUMFLEX
	"\xF5" => "\xC3\xB5",    // Latin  SMALL LETTER O WITH TILDE
	"\xF6" => "\xC3\xB6",    // Latin  SMALL LETTER O WITH DIAERESIS
	"\xF7" => "\xC3\xB7",    // DIVISION SIGN
	"\xF8" => "\xC3\xB8",    // Latin  SMALL LETTER O WITH STROKE
	"\xF9" => "\xC3\xB9",    // Latin  SMALL LETTER U WITH GRAVE
	"\xFA" => "\xC3\xBA",    // Latin  SMALL LETTER U WITH ACUTE
	"\xFB" => "\xC3\xBB",    // Latin  SMALL LETTER U WITH CIRCUMFLEX
	"\xFC" => "\xC3\xBC",    // Latin  SMALL LETTER U WITH DIAERESIS
	"\xFD" => "\xC3\xBD",    // Latin  SMALL LETTER Y WITH ACUTE
	"\xFE" => "\xC3\xBE",    // Latin  SMALL LETTER THORN (Icelandic)
	"\xFF" => "\xC3\xBF",    // Latin  SMALL LETTER Y WITH DIAERESIS
);
