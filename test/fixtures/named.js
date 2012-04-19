// s6d
module m1 {
  export fn1, var1;
}
// -s6d

"use strict";

var fn1 = function () {
    return true;
};

var var1 = 'EXPORTED NAMED MODULE!!';