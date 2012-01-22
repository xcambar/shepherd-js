"module {                                                   ";
"  import jQuery from '/examples/libs/jquery-1.7.1.min.js'; ";
"  import rebound from '/examples/jQuery/animation.js';     ";
"  import gear from '/examples/jQuery/gear.js';             ";
"};                                                         ";

var $ = jQuery;

$(function () {
    var ctn = $('body');
    rebound(gear.appendTo(ctn), ctn);
});