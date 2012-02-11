"module {";
"  module a from 'fixtures/NodeJS/recursive/a.js';";
"  export test;";
"};";

var test = a.b.c.test;