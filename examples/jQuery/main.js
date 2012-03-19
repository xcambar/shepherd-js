/**
  module app {
    import jQuery from '../libs/jquery-1.7.1.min.js';
    import rebound from './animation.js';
    import gear from './gear.js';
  }
**/

var $ = jQuery;

$(function () {
    var ctn = $('body');
    rebound(gear.appendTo(ctn), ctn);
});
