/**
module importFromRelativeURL {
module externalModule at 'fixtures/external.js';
export imp1;
export ref1;
}
**/

var imp1 = function () {
    return externalModule.ext1();
};

var ref1 = externalModule.ext1;
