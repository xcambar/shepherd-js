// s6d
module importFromAbsoluteURLFixture {
    module externalModule at '/test/fixtures/external.js';
    export imp1;
    export ref1;
}
// -s6d

var imp1 = function () {
    return externalModule.ext1();
};

var ref1 = externalModule.ext1;
