//s6d
    module underscoreExample {
      import _ from '../libs/underscore.min.js';
    }
//-s6d
var list = document.getElementsByTagName('ul')[0];
for (var i in _) {
    _.hasOwnProperty(i) && (list.innerHTML += ('<li>' + i + '</li>'));
}