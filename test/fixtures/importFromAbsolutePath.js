/**
module importFromAbsolutePathFixture {
module externalModule at '/Users/xaviercambar/git/shepherd/test/fixtures/external.js';
export imp1;
export ref1;
}
**/

var imp1 = function () {
    return externalModule.ext1();
};

var ref1 = externalModule.ext1;
