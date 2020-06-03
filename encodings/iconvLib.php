<?php
// Copyright (C) 1988-2015 Relational Semantics, Inc. (RSI), Newton MA USA
// This Module contains Proprietary Information of Relational Semantics, Inc.
// and should be treated as Confidential. All rights reserved.
// FORECOURT and RSI are registered trademarks of Relational Semantics, Inc.
// PARAGON is a trademark of Relational Semantics, Inc.
//
// iconv.php - Character string encoding coversion lib
//
# namespace rsi\util;
#
# use \rsi as rsi;
# use \rsi\util as util;

/* Usage:
   $result = util\utf8_to_latin1::convert($str);
*/

# TODO: Create a class for latin1_to_ascii()

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
	private static function iconv(& $str) {

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

