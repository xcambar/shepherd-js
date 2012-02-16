"module {                                               ";
"  module $ from jQuery;                                ";
"  import rebound from '/examples/jQuery/animation.js'; ";
"  import gear from '/examples/jQuery/gear.js';         ";
"};                                                     ";

$(function () {
    var ctn = $('body');
    rebound(gear.appendTo(ctn), ctn);
});