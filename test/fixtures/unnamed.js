// s6d
module {
  export fn2;
  export var2
}
// -s6d
"use strict";

/**
 * ES-Harmony Syntax:
 * This syntax is not valid according to http://wiki.ecmascript.org/doku.php?id=harmony:modules. A module MUST have a name.
 * module {
 *   export fn1;*\/
 *   export var1;
 * }
 */


var fn2 = function () {
    return true;
};

var var2 = 'EXPORTED!!';