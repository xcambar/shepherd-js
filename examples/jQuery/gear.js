"module {                                                   ";
"  import jQuery from '/examples/jQuery/jquery-1.7.1.js';   ";
"  export gear;                                             ";
"}                                                          ";

var $ = jQuery;

var diameter = 100;

var gear = $('<div>')
    .css({
        position: 'absolute',
        backgroundColor: 'grey',
        borderRadius: diameter,
        border: '10px dotted white'
    })
    .height(diameter)
    .width(diameter);
