/**
 * Server-side fixture
 **/
//s6d
module aFixture {
  module b at 'fixtures/NodeJS/recursive/b.js';
  export b;
  export a1;
}
//-s6d
var a1 = 'a1';