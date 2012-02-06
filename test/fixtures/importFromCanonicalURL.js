"module {                                                                                               ";
"  module extModule1 from 'https://raw.github.com/xcambar/shepherd-js/master/test/fixtures/named.js';   ";
"  export export1;                                                                                      ";
"};                                                                                                     ";

console.log('extModule1', extModule1);
var export1 = extModule1;