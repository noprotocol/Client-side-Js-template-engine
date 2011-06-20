# Description

A [PURE](http://beebole.com/pure/) inspired templating engine.

# Usage

	$(selector).mapper(data);

## Given:

	<div id="test1">
		<span class="say"></span><br/>
		<input class="answer"></span>
	</div>

	var data = {say: "hello world", answer:"we say hi!"};

## Do:

	$('#test1').mapper(data);

## Gives: 

	<div id="test1">
		<span class="say">hello world</span><br/>
		<input class="answer">we say hi!</span>
	</div>

# Examples

Some examples here

	TODO