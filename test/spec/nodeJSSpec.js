var s6d = require('../../shepherd.js');

describe('global.require function', function () {
    it ('has been replaced by a custom function', function () {
        throw 'Test not written';
    });
    
    it ('is recursively consistent over module loading', function () {
        throw 'Test not written';
    });
});

describe('exports', function () {
    it('should be able to expose module elements via exports', function () {
        throw 'Test not written';
    });
    it('should be able to expose module elements via module.exports', function () {
        throw 'Test not written';
    });
});

describe('Declare modules by their paths', function () {
    it ('should be able to import modules from a relative path', function () {
        var spy = jasmine.createSpy();
        runs(function () {
           s6d('fixtures/importFromRelativeURL.js', spy); 
        });
        waitsFor(function () {
            return s6d.get('fixtures/importFromRelativeURL.js');
        });
        runs(function () {
            expect(s6d.get('fixtures/importFromRelativeURL.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('fixtures/importFromRelativeURL.js').ref1).toBe('function');
        });
    });

    it ('should be able to import modules from an absolute path', function () {
        var spy = jasmine.createSpy();
        runs(function () {
           s6d('fixtures/importFromAbsolutePath.js', spy); 
        });
        waitsFor(function () {
            return s6d.get('fixtures/importFromAbsolutePath.js');
        });
        runs(function () {
            expect(s6d.get('fixtures/importFromAbsolutePath.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('fixtures/importFromAbsolutePath.js').ref1).toBe('function');
        });
    });
});

describe('Importing module declared by a canonical URL', function () {
    it ('should be able to import modules from a canonical URL', function () {
        var spy = this.loadModule('fixtures/importFromCanonicalURL.js');
        runs(function () {
            expect(s6d.get('fixtures/importFromCanonicalURL.js').export1).toBeTruthy();
            expect(s6d.get('fixtures/importFromCanonicalURL.js').export1.var1).toBe('EXPORTED NAMED MODULE!!');
            expect(s6d.get('fixtures/importFromCanonicalURL.js').export1).toHaveMembers(['var1', 'fn1']);
        });
    });
});
