"module $ from jQuery;";

var container = $('div.container dl.examples');
var terms = $('dt', container);
terms.next().hide();

terms.on('click', function() {
    terms.next().hide();
    var contents = $(this).next().html();
    container.next().empty().append(contents);
})
