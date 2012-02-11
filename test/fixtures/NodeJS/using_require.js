"module {                   ";
"  module real_fs from fs;  ";
"  export stat;             ";
"  export shepherd_stat;    ";
"  export native_stat;      ";
"};                         ";

var stat            = require('real_fs').stat,
    shepherd_stat   = real_fs.stat,
    native_stat     = require('fs').stat; //This should not be made possible, although it is for convenience