//s6d
    module underscoreFromExternalExample {
      module Underscore is _;
    }
//-s6d

var list = document.getElementsByTagName('ul')[0];
for (var i in Underscore) {
    Underscore.hasOwnProperty(i) && (list.innerHTML += ('<li>' + i + '</li>'));
}