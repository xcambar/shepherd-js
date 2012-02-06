if (typeof window == 'undefined') {
    var s6d = require('../../shepherd.js');
}

beforeEach(function () {
    this.addMatchers({
        toHaveMembers: function (expected) {
            for (var i = 0; i < expected.length; i++) {
                if(!this.actual.hasOwnProperty(expected[i])) {
                    return false;
                }
            }
            return true;
        }
    });

    this.addMatchers({
        toHaveNumberOfMembers: function (expected) {
            var _c = 0;
            for (var i in this.actual) {
                if(this.actual.hasOwnProperty(i)) {
                    _c++;
                }
            }
            return _c === expected;
        }
    });
    
    this.loadModule = function (moduleName) {
        var spy = jasmine.createSpy();
        runs(function () {
            s6d(moduleName, spy);
        });
        waitsFor(function () {
            return !!s6d.get(moduleName);
        }, 'The module has been loaded', 2000);
        
        return spy;
    };
})