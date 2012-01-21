"module externalModule {";
"import m1 from '/test/fixtures/named.js';";
"export imp1;";
"export ref1;";
"}";

var imp1 = function () {
    return m1.fn1();
};

console.log('m1: ', m1);
var ref1 = m1.fn1;
