/**
    module shape {
      import jQuery from '../libs/jquery-1.7.1.min.js';
      export gear;
    }
**/

var $ = jQuery;

var diameter = 100;

var gear = $('<div>')
    .css({
        position: 'relative',
        backgroundColor: 'grey',
        borderRadius: diameter,
        border: '10px dotted white'
    })
    .height(diameter)
    .width(diameter);
