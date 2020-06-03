<?php
	# strings to test conversion
	$inStrs = array(
	'Björk Guðmundsdóttir',  # 0
	'Gérard Depardieu',
	'Camille Saint-Saëns',
	'Jean Réno',
	'Jürgen Klinsmann',
	'Sinéad O’Connor',
	'Andrés Iniesta',
	'Cesc Fàbregas',
	'Raúl Albiol',
	'Iñigo Martínez',
	'Álvaro Arbeloa',  # 10
	'Juan Gómez',
	'abcdefghijklmnopqrstuvwxyz',
	'0123456789',
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'ÀÖØöøÿ',
	"GÀÖRY's Johnsonÿ le quote",
	'Gary` accented.lastod',
	'Gary < Sc Johnson',
	"Gary '' Sc Johnson",
	' double double quotes " " ', #20
	"  'double single quotes '  ",
	'single forward slash /',
	'single backslash\\',
	'Gary;Drop',
	'delete drop update replace kill lock',
	'<(>){}[]',
	"!@#$%^&*()_+<>:''\\|",
	'====utf-8=======',
	' ¡¢£¤¥¦§¨©ª«¬­®¯',
	'°±²³´µ¶·¸¹º»¼½¾¿', #30
	'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ',
	'ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß',
	'àáâãäåæçèéêëìíîï',
	'ðñòóôõö÷øùúûüýþÿ',
	'================',
	'view source for the next 8 tests',
	'<tyler:DocumentOptionalService>',
	'<nc:IdentificationID>COPIES</nc:IdentificationID>',
	'<tyler:Multiplier>10</tyler:Multiplier>',
	'</tyler:DocumentOptionalService>',  #40
	'<ecf:EntityPerson s:id="Party_1">',
	'<appellate:AppellateCase xmlns:appellate="urn:oasis:names:tc:legalxml-courtfiling:schema:xsd:AppellateCase-4.0" xsi:schemaLocation="urn:oasis:names:tc:legalxml-courtfiling:schema:xsd:AppellateCase-4.0 ../../../casetype/ECF-4.0-AppellateCase.xsd">',
	'<nc:BinaryBase64Object/>',
	'<tyler:FilingCommentsText> </tyler:FilingCommentsText>',
	"\xC3\x84\xC3\x96\xC3\x9C", #   'ÄÖÜ';
	chr(195).chr(132),
	'€',
	"\xE2\x86\x90", # &larr;
	'/ä|æ|ǽ/',   #'ae'
	'/ö|œ/',   #'oe'
	'/ü/',   #'ue'
	'/Ä/',   #'Ae'
	'/Ü/',   #'Ue'
	'/Ö/',   #'Oe'
	'/À|Á|Â|Ã|Ä|Å|Ā|Ă|Ą|Ǎ/',   #'A'
	'/à|á|â|ã|å|ā|ă|ą|ǎ|ª/',   #'a'
	'/Ç|Ć|Ĉ|Ċ|Č/',   #'C'
	'/ç|ć|ĉ|ċ|č/',   #'c'
	'/Ð|Ď|Đ/',   #'D'
	'/ð|ď|đ/',   #'d'
	'/È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě/',   #'E'
	'/è|é|ê|ë|ē|ĕ|ė|ę|ě/',   #'e'
	'/Ĝ|Ğ|Ġ|Ģ/',   #'G'
	'/ĝ|ğ|ġ|ģ/',   #'g'
	'/Ĥ|Ħ/',   #'H'
	'/ĥ|ħ/',   #'h'
	'/Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ/',   #'I'
	'/ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı/',   #'i'
	'/Ĵ/',   #'J'
	'/ĵ/',   #'j'
	'/Ķ/',   #'K'
	'/ķ/',   #'k'
	'/Ĺ|Ļ|Ľ|Ŀ|Ł/',   #'L'
	'/ĺ|ļ|ľ|ŀ|ł/',   #'l'
	'/Ñ|Ń|Ņ|Ň/',   #'N'
	'/ñ|ń|ņ|ň|ŉ/',   #'n'
	'/Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ/',   #'O'
	'/ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º/',   #'o'
	'/Ŕ|Ŗ|Ř/',   #'R'
	'/ŕ|ŗ|ř/',   #'r'
	'/Ś|Ŝ|Ş|Š/',   #'S'
	'/ś|ŝ|ş|š|ſ/',   #'s'
	'/Ţ|Ť|Ŧ/',   #'T'
	'/ţ|ť|ŧ/',   #'t'
	'/Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ/',   #'U'
	'/ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ/',   #'u'
	'/Ý|Ÿ|Ŷ/',   #'Y'
	'/ý|ÿ|ŷ/',   #'y'
	'/Ŵ/',   #'W'
	'/ŵ/',   #'w'
	'/Ź|Ż|Ž/',   #'Z'
	'/ź|ż|ž/',   #'z'
	'/Æ|Ǽ/',   #'AE'
	'/ß/' ,  #'ss'
	'/Ĳ/',   #'IJ'
	'/ĳ/',   #'ij'
	'/Œ/',   #'OE'
	'/ƒ/',   #'f'
	'# Mathmatical operators',
	"\xe2\x88\x80",
	"\xe2\x88\x81",
	"\xe2\x88\x82",
	"\xe2\x88\x83",
	"\xe2\x88\x84",
	"\xe2\x88\x85",
	"\xe2\x88\x86",
	"\xe2\x88\x87",
	"\xe2\x88\x88",
	"\xe2\x88\x89",
	"\xe2\x88\x8a",
	"\xe2\x88\x8b",
	"\xe2\x88\x8c",
	"\xe2\x88\x8d",
	"\xe2\x88\x8e",
	"\xe2\x88\x8f",
	"\xe2\x88\x90",
	"\xe2\x88\x91",
	"\xe2\x88\x92",
	"\xe2\x88\x93",
	"\xe2\x88\x94",
	"\xe2\x88\x95",
	"\xe2\x88\x96",
	"\xe2\x88\x97",
	"\xe2\x88\x98",
	"\xe2\x88\x99",
	"\xe2\x88\x9a",
	"\xe2\x88\x9b",
	#  "\x3F\x09",  wtf
	'# roman numerals',
	"\xe2\x85\xa0", #	ROMAN NUMERAL ONE
	"\xe2\x85\xa1", #	ROMAN NUMERAL TWO
	"\xe2\x85\xa2", #	ROMAN NUMERAL THREE
	"\xe2\x85\xa3", #	ROMAN NUMERAL FOUR
	"\xe2\x85\xa4", #	ROMAN NUMERAL FIVE
	"\xe2\x85\xa5", #	ROMAN NUMERAL SIX
	"\xe2\x85\xa6", #	ROMAN NUMERAL SEVEN
	"\xe2\x85\xa7", #	ROMAN NUMERAL EIGHT
	"\xe2\x85\xa8", #	ROMAN NUMERAL NINE
	"\xe2\x85\xa9", #	ROMAN NUMERAL TEN
	"\xe2\x85\xaa", #	ROMAN NUMERAL ELEVEN
	"\xe2\x85\xab", #	ROMAN NUMERAL TWELVE
	"\xe2\x85\xac", #	ROMAN NUMERAL FIFTY
	"\xe2\x85\xad", #	ROMAN NUMERAL ONE HUNDRED
	"\xe2\x85\xae", #	ROMAN NUMERAL FIVE HUNDRED
	"\xe2\x85\xaf", #	ROMAN NUMERAL ONE THOUSAND
	"\xe2\x85\xb0", #	SMALL ROMAN NUMERAL ONE
	"\xe2\x85\xb1", #	SMALL ROMAN NUMERAL TWO
	"\xe2\x85\xb2", #	SMALL ROMAN NUMERAL THREE
	"\xe2\x85\xb3", #	SMALL ROMAN NUMERAL FOUR
	"\xe2\x85\xb4", #	SMALL ROMAN NUMERAL FIVE
	"\xe2\x85\xb5", #	SMALL ROMAN NUMERAL SIX
	"\xe2\x85\xb6", #	SMALL ROMAN NUMERAL SEVEN
	"\xe2\x85\xb7", #	SMALL ROMAN NUMERAL EIGHT
	"\xe2\x85\xb8", #	SMALL ROMAN NUMERAL NINE
	"\xe2\x85\xb9", #	SMALL ROMAN NUMERAL TEN
	"\xe2\x85\xba", #	SMALL ROMAN NUMERAL ELEVEN
	"\xe2\x85\xbb", #	SMALL ROMAN NUMERAL TWELVE
	"\xe2\x85\xbc", #	SMALL ROMAN NUMERAL FIFTY
	"\xe2\x85\xbd", #	SMALL ROMAN NUMERAL ONE HUNDRED
	"\xe2\x85\xbe", #	SMALL ROMAN NUMERAL FIVE HUNDRED
	"\xe2\x85\xbf", #	SMALL ROMAN NUMERAL ONE THOUSAND
	"\xe2\x86\x80", #	ROMAN NUMERAL ONE THOUSAND C D  no
	"\xe2\x86\x81", #	ROMAN NUMERAL FIVE THOUSAND  no
	"\xe2\x86\x82", #	ROMAN NUMERAL TEN THOUSAND no
	"\xe2\x86\x83", #	ROMAN NUMERAL REVERSED ONE HUNDRED no
	"\xe2\x86\x84", #	LATIN SMALL LETTER REVERSED C no
	"Привет, меня зовут Алексей",
	);


	#table to show the main problem children chars
	$inStrs2 = array(
		// custom rsi
		"\xc2\xa1" , # '!',              # inverted ! is used in legal writing   -- codes from c2 a1 thru c2 bf exist in iso 8859-1
		"\xc2\xa2" , # 'cent',           # and windows 1252 and are handled correctly by the conversion routines --
		"\xc2\xa3" , # 'GBP',            # Great Britian Pound
		"\xc2\xa4" , # 'currency', #check
		"\xc2\xa5" , # 'Yen',
		"\xc2\xa6" , # "\x7c",          #  'broken bar'  | use vertical bar
		"\xc2\xa7" , # ' s.',       # § refers to a particular section of a statute and regulation. ex  42 U.S.C. §§ 1981-198
		"\xc2\xa8" , # 'diaersis',
		"\xc2\xa9" , # '(C)',
		"\xc2\xaa" , # 'Feminine ordinal',
		"\xc2\xab" , # 'left double angle',
		"\xc2\xac" , # 'not',
		# do not translate 		"\xc2\xad" , # 'soft hypen',
		"\xc2\xae" , # '(R)',
		"\xc2\xaf" , # 'macron',   #'check
		"\xc2\xb0" , # 'degree',
		"\xc2\xb1" , # 'plus-minus',
		"\xc2\xb2" , # 'superscript 2',
		"\xc2\xb3" , # 'superscript 3',
		"\xc2\xb4" , # 'Acute',
		"\xc2\xb5" , # 'micro',
		"\xc2\xb6" , # 'pilcrow',
		"\xc2\xb7" , # 'middle dot',
		"\xc2\xb8" , # '\x2c',
		"\xc2\xb9" , # 'superscript 1',
		"\xc2\xba" , # 'masculine ordinal',
		"\xc2\xbb" , # 'right double angle',
		"\xc2\xbc" , # '1/4',
		"\xc2\xbd" , # '1/2',
		"\xc2\xbe" , # '3/4',
		"\xc2\xbf" , # 'inverted ?',   #' end iso-8859-1 and windows-1252
		"\xc3\xb6" , # 'd',
		"\xc2\xaa" , # 'a',
		"\xc3\x90" , # 'D',
		"\xc3\x9e" , # 'TH',
		"\xc3\x9f" , # 's',
		"\xc3\xb0" , # 'd',
		"\xc3\xb6" , # 'o',
		"\xc3\xb8" , # 'o',
		"\xc3\xbe" , # 'th',
		"\xc3\x98" , # 'O',
		"\xc4\x90" , # 'D',
		"\xc4\x91" , # 'd',
		"\xc4\xa6" , # 'H',
		"\xc4\xa7" , # 'h',
		"\xc4\xb1" , # 'i',
		"\xc4\xb8" , # 'k',
		"\xc4\xbf" , # 'L',
		"\xc5\x80" , # 'l',
		"\xc5\x89" , # 'N',
		"\xc5\x8a" , # 'n',
		"\xc5\x8b" , # 'N',
		"\xc5\xa6" , # 'T',
		"\xc5\xa7" , # 't',
		"\xc9\x91" , # 'a',
		"\xe2\x82\xac" , # 'EUR',
		"\xc2\xa1",  #  '¡',               codes from c2 a1 thru c2 bf exist in iso 8859-1
		"\xc2\xa2",  #  '¢',               and windows 1252 and are handled correctly by the conversion routines
		"\xc2\xa3",  #  '£',               Great Britian Pound
		"\xc2\xa4",  #  '¤',               check
		"\xc2\xa5",  #  '¥',
		"\xc2\xa6",  #  '¦',
		"\xc2\xa7",  #  '§',
		"\xc2\xa8",  #  '¨',
		"\xc2\xa9",  #  '©',
		"\xc2\xaa",  #  'ª',
		"\xc2\xab",  #  '«',
		"\xc2\xac",  #  '¬',
		"\xc2\xad",  #  '­',
		"\xc2\xae",  #  '®',
		"\xc2\xaf",  #  '¯',   #check
		"\xc2\xb0",  #  '°',
		"\xc2\xb1",  #  '±',
		"\xc2\xb2",  #  '²',
		"\xc2\xb3",  #  '³',
		"\xc2\xb4",  #  '´',
		"\xc2\xb5",  #  'µ',
		"\xc2\xb6",  #  '¶',
		"\xc2\xb7",  #  '·',
		"\xc2\xb8",  #  '¸',
		"\xc2\xb9",  #  '¹',
		"\xc2\xba",  #  'º',
		"\xc2\xbb",  #  '»',
		"\xc2\xbc",  #  '¼',
		"\xc2\xbd",  #  '½',
		"\xc2\xbe",  #  '¾',
		"\xc2\xbf",  #  '¿',                 # end iso-8859-1 and windows-1252
	);

