<?php
// Copyright (C) 1988-2015 Relational Semantics, Inc. (RSI), Newton MA USA
// This Module contains Proprietary Information of Relational Semantics, Inc.
// and should be treated as Confidential. All rights reserved.
// FORECOURT and RSI are registered trademarks of Relational Semantics, Inc.
// PARAGON is a trademark of Relational Semantics, Inc.

# formatcliorhtml.php
	# used to create a table for html display and nothing for cli
//	global $otable;
//	global $oth;
//	global $cth;
//	global $otr;
//	global $otd;
//	global $ctd;
//	global $ctr;
//	global $ctable;
//	global $hr;

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
 