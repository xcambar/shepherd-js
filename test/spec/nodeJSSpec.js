var s6d = require('../../build/shepherd.dev.js');

describe('global.require function', function () {
    it ('has been replaced by a custom function', function () {
        this.loadModule('fixtures/NodeJS/using_require.js');
        runs(function () {
            expect(s6d.get('fixtures/NodeJS/using_require.js').stat).toBe(require('fs').stat);
            expect(s6d.get('fixtures/NodeJS/using_require.js').shepherd_stat).toBe(require('fs').stat);
            expect(s6d.get('fixtures/NodeJS/using_require.js').native_stat).toBe(require('fs').stat); // Not Strict, allowed for convenience
        });
    });
    
    it ('is recursively consistent over module loading', function () {
        this.loadModule('fixtures/NodeJS/recursive/main.js');
        runs(function () {
            expect(s6d.get('fixtures/NodeJS/recursive/main.js').test).toBe('test value');
            expect(s6d.get('fixtures/NodeJS/recursive/a.js').a1).toBe('a1');
            expect(s6d.get('fixtures/NodeJS/recursive/b.js').b1).toBe('test2');
            expect(s6d.get('fixtures/NodeJS/recursive/c.js').test2).toBe('test2');
        });
    });
});

describe('exports', function () {
    it('should be able to expose exported module elements declared with exports', function () {
        this.loadModule('fixtures/NodeJS/withExports.js');
        runs(function () {
            expect(s6d.get('fixtures/NodeJS/withExports.js').a).toBe('yep');
        });
    });
    it('should be able to expose exported module elements declared with module.exports', function () {
        this.loadModule('fixtures/NodeJS/withModuleExports.js');
        runs(function () {
            expect(s6d.get('fixtures/NodeJS/withModuleExports.js').a).toBe('yep');
        });
    });
});

describe('Declare modules by their paths', function () {
    it ('should be able to import modules from a relative path', function () {
        this.loadModule('fixtures/importFromRelativeURL.js');
        runs(function () {
            expect(s6d.get('fixtures/importFromRelativeURL.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('fixtures/importFromRelativeURL.js').ref1).toBe('function');
        });
    });

    it ('should be able to import modules from an absolute path (!! path in fixture file must be updated on your machine !!)', function () {
        this.loadModule('fixtures/importFromAbsolutePath.js');
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

describe('Importing a module by its reference', function () {
    it ('can load node native modules', function () {
        this.loadModule('fixtures/NodeJS/load_fs.js');
        runs(function () {
            expect(s6d.get('fixtures/NodeJS/load_fs.js').stat).toBe(require('fs').stat);
        });
    });
});