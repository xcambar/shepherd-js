"module {                   ";
"module real_fs from fs;    ";
"export stat;               ";
"export stat_shepherd;      ";
"}";

var stat = require('real_fs').stat;
var stat_shepherd = real_fs.stat;