// s6d
module importFromAbsolutePathFixture {
module externalModule at '/Users/xaviercambar/git/shepherd/code/test/fixtures/external.js';
export imp1;
export ref1;
}
// -s6d

var imp1 = function () {
    return externalModule.ext1();
};

var ref1 = externalModule.ext1;
