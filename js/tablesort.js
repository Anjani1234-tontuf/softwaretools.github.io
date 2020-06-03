$(function(){
		$('table').tablesorter({
			theme: 'blue',
			widgets        : ['zebra', 'columns'],
			usNumberFormat : false,
			sortReset      : true,
			sortRestart    : true
		});
	});