"module m1 {";
"  export fn1";
"  export var1";
"}";

/**
 * ES-Harmony Syntax:
 * 
 * module math {
 *   export fn1;*\/
 *   export var1;
 * }
 */


var fn1 = function () {
    return true;
};

var var1 = 'EXPORTED NAMED MODULE!!';