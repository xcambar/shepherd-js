"module {                                               ";
"  import _ from '/examples/libs/underscore.min.js';    ";
"};                                                     ";

var list = document.getElementsByTagName('ul')[0];
for (var i in _) {
    _.hasOwnProperty(i) && (list.innerHTML += ('<li>' + i + '</li>'));
}