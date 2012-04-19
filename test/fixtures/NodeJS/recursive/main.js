//s6d
module mainFixture {
  module a at 'fixtures/NodeJS/recursive/a.js';
  export test;
}
//-s6d

var test = a.b.c.test;