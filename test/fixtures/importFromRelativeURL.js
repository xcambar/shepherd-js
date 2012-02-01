"module externalModule {";
"module externalModule from 'fixtures/external.js';";
"export imp1;";
"export ref1;";
"}";

var imp1 = function () {
    return externalModule.ext1();
};

console.log('externalModule: ', externalModule);
var ref1 = externalModule.ext1;
