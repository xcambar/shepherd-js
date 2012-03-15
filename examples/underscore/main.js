/**
    module {
      import _ from '../libs/underscore.min.js';
    };
**/
var list = document.getElementsByTagName('ul')[0];
for (var i in _) {
    _.hasOwnProperty(i) && (list.innerHTML += ('<li>' + i + '</li>'));
}