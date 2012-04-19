// s6d
module hasImport {
  module m1 is m1;
  export imp1;
  export ref1;
}
// -s6d

"use strict";

var imp1 = function () {
    return m1.fn1();
};

var ref1 = m1.fn1;
