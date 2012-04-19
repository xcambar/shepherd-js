//s6d
module bFixture {
  module c at 'fixtures/NodeJS/recursive/c.js';
  export c;
  export b1;
}
//-s6d

var b1 = c.test2;