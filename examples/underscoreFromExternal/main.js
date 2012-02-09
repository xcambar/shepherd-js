"module {                       ";
"  module Underscore from _;    ";
"};                             ";

var list = document.getElementsByTagName('ul')[0];
for (var i in Underscore) {
    Underscore.hasOwnProperty(i) && (list.innerHTML += ('<li>' + i + '</li>'));
}