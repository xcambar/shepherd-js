"module $ from jQuery;";

var container = $('div.container dl.examples');
var terms = $('dt', container);
terms.next().hide();

terms.on('click', function() {
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
    var contents = $(this).next().html();
    container.next().empty().append(contents).addClass('well').css('min-height', container.height());
})
