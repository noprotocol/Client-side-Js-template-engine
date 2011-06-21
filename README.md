# Description

A [PURE](http://beebole.com/pure/) inspired templating engine.

# Usage

	$(selector).mapper(data);

### Your template:

	<div id="test1">
		<span class="say"></span><br/>
		<input class="answer"></span>
	</div>
  
### Some data:

	var data = {say: "hello world", answer:"we say hi!"};

### Fire:

	$('#test1').mapper(data);

### Results in: 

	<div id="test1">
		<span class="say">hello world</span><br/>
		<input class="answer" value="we say hi!"/>
	</div>

<div id="test1">
	<span class="say">hello world</span><br/>
	<input class="answer" value="we say hi!"/>
</div>

# Examples

	TODO