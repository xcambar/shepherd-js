// s6d
module importFromCanonicalURLFixture {
  module extModule1 at 'https://raw.github.com/xcambar/shepherd-js/master/test/fixtures/named.js';
  export export1;
}
// -s6d

var export1 = extModule1;