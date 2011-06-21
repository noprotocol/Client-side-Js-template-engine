function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

$(document).ready(function() {
	
	// Preperation
	
	$('.prettyprint:not(.lang-html)').each(function() {
		$(this).text($(this).html().replace(/\t/gi, '   '));
	})
	$('.prettyprint.lang-html').each(function() {
		$(this).text($(this).html().replace(/\t/gi, '   '));
	})
	prettyPrint();
	
	
	// Dataset
	
	var data1 = {say: "hello world", type: "msg", answer:"we say hi!"};
	var fnmap1 = {say: {onclick: function() { alert($(this).text()); return false; }}};
	
	var data2 = {say: "hello world", replies:[{answer:'no', test:'1'},{answer:'yes', test:'2'},{answer:'maybe', test:'3'}]};
	var fnmap2 = {answer:{onclick: function() { alert($(this).text()); return false; }}};
	
	var data3 = {say: "hello world", replies:[1,"yes","maybe"]};
	var data5 = {say: "hello world"};
	
	// Map!!
	
	$('#test0').mapper('only a string');
	$('#test1').mapper(data1, fnmap1);
	$('#test2').mapper(data2, fnmap2);
	$('#test3').mapper(data3);
	$('#test4').mapper(data2, fnmap2);
	$('#test4b').mapper(data2, fnmap2);
	$('#test4c').mapper(data2, fnmap2);
	$('#test5').mapper(data5);
});