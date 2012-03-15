/**
    module {
      module $ from jQuery;
      import rebound from 'animation.js';
      import gear from 'gear.js';
    };
**/

$(function () {
    var ctn = $('body');
    rebound(gear.appendTo(ctn), ctn);
});
