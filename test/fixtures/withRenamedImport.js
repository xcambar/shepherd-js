// s6d
module hasImport {
module myModule is m1;
export imp1;
export ref1;
}
// -s6d

var imp1 = function () {
    return myModule.fn1();
};

var ref1 = myModule.fn1;
