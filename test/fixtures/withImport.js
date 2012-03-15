/**
module hasImport {
  module m1 from m1;
  export imp1;
  export ref1;
}
**/

"use strict";

var imp1 = function () {
    return m1.fn1();
};

var ref1 = m1.fn1;
