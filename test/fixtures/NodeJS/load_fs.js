//s6d
module load_fsFixture {
  module fs is fs;
  export stat;
}
//-s6d

var stat = fs.stat;