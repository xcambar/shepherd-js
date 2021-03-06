//s6d
module using_requireFixture {
  module real_fs is fs;
  export stat;
  export shepherd_stat;
  export native_stat;
}
//-s6d

var stat            = require('real_fs').stat,
    shepherd_stat   = real_fs.stat,
    native_stat     = require('fs').stat; //This should not be made possible, although it is for convenience
