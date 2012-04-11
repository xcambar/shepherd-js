if (typeof window == 'undefined') {
    var s6d = require('../../build/shepherd.dev.js');
}

describe('Generic features of the Loader', function () {
    it('should reset its state at will', function () {
        var modPath = 'fixtures/named.js';
        s6d.reset();
        expect(s6d.error()).toBeNull();
        expect(s6d.get(modPath)).toBeUndefined();
    });
    
    it('should contain no erroneous module at init', function () {
        expect(s6d.error()).toBeNull();
    });
    
    it('should allow a custom global error callback', function () {
        var modPath = '/invalid/file/path.js';
        var spy = jasmine.createSpy();
        s6d.error(spy);
        
        runs(function () {
            s6d(modPath);
        });
        waitsFor(function () {
            return s6d.error();
        }, 'No error happened', 2000);
    });
    
    it('should log the modules which could not have been loaded', function () {
        s6d.reset();
        var modPath = '/invalid/file/path.js';
        var spy = jasmine.createSpy();
        s6d.error(spy);
        
        runs(function () {
            s6d(modPath);
        });
        
        waitsFor(function () {
            return s6d.error();
        }, 'No error happened', 2000);
        
        runs(function () {
            expect(s6d.error()).toEqual([modPath]);
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(1);
        });
    });

});

describe('Parsing a module definition', function () {
    it('should allow no definition', function () {
        var emptyModule = 'fixtures/empty.js';
        var spy = this.loadModule(emptyModule);
        runs(function () {
            expect(spy).toHaveBeenCalled();
            expect(s6d.get(emptyModule)).toHaveNumberOfMembers(0);
        });
    });

    it('should skip "use strict"; statements', function () {
        var module = 'fixtures/named.js';
        var spy = this.loadModule(module);
        runs(function () {
            expect(spy).toHaveBeenCalled();
            //Ensure the module loaded correctly
            expect(s6d.get(module)).toHaveMembers(['var1', 'fn1']);
            expect(s6d.get(module)).toHaveNumberOfMembers(2);
        });
    });
    it('should skip single line comments', function () {
        var module = 'fixtures/comments/singleLine.js';
        var spy = this.loadModule(module);
        runs(function () {
            expect(spy).toHaveBeenCalled();
            //Ensure the module loaded correctly
            expect(s6d.get(module)).toHaveMembers(['loaded']);
            expect(s6d.get(module).loaded).toBe(true);
        });
    });
    it('should skip multi line comments written on one line', function () {
        var module = 'fixtures/comments/multiLineOnOneLine.js';
        var spy = this.loadModule(module);
        runs(function () {
            expect(spy).toHaveBeenCalled();
            //Ensure the module loaded correctly
            expect(s6d.get(module)).toHaveMembers(['loaded']);
            expect(s6d.get(module).loaded).toBe(true);
        });
    });
    it('should skip multi line comments', function () {
        var module = 'fixtures/comments/multiLine.js';
        var spy = this.loadModule(module);
        runs(function () {
            expect(spy).toHaveBeenCalled();
            //Ensure the module loaded correctly
            expect(s6d.get(module)).toHaveMembers(['loaded']);
            expect(s6d.get(module).loaded).toBe(true);
        });
    });
    it('should raise an exception if an invalid declaration is encountered', function () {
        s6d.reset();
        var modPath = 'fixtures/invalidToken.js';
        var spy = jasmine.createSpy();

        s6d.error(spy);
        runs(function () {
            s6d(modPath);
        });
        waitsFor(function () {
            return s6d.error();
        });
        runs(function () {
            expect(spy).toHaveBeenCalled();
        });
    });
});

describe('Declaring an named module', function () {
    var modPath = 'fixtures/named.js',
        modName = 'm1';
    
    it('should load a named module by its path and call the optionnally provided callback', function () {
        var spy = this.loadModule(modPath);
        
        runs(function () {
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(1);
        });
    });

    it('should return an available named module by its name', function () {
        var module = s6d.get(modName);
        expect(module).not.toBeFalsy();
    });
    
    it('should return an available named module by its path', function () {
        var module = s6d.get(modPath);
        expect(module).not.toBeFalsy();
    });
    
    it('should return the same module reference either by name or path', function () {
        var moduleP = s6d.get(modPath);
        var moduleN = s6d.get(modName);
        expect(moduleP).toBe(moduleN);
        expect(moduleP).toHaveMembers(['fn1', 'var1']);
        expect(moduleP.var1).toBe('EXPORTED NAMED MODULE!!')
        expect(typeof moduleP.fn1).toBe('function');
    });
});

describe('Importing named modules', function () {
    var modWithImport = 'fixtures/withImport.js';
    var importedMod = 'fixtures/named.js';
    it('should be able to load an available module from its import name', function () {
        this.loadModule(importedMod);
        runs(function () {
            this.loadModule(modWithImport);
        });
        runs(function () {
            expect(s6d.get(modWithImport).imp1()).toBeTruthy();
            expect(s6d.get(modWithImport).ref1).toBe(s6d.get(importedMod).fn1);
        });
    });
    
    it ('should load modules and rename its imports', function () {
        var importedMod = 'fixtures/named.js';
        this.loadModule(importedMod);
        runs(function () {
            this.loadModule('fixtures/withRenamedImport.js');
        });
        runs(function () {
            expect(s6d.get('fixtures/withRenamedImport.js').imp1()).toBeTruthy();
            expect(s6d.get('fixtures/withRenamedImport.js').ref1).toBe(s6d.get(importedMod).fn1);
        });
    });
});

describe('Recursive module loading', function () {
    it ('should be able to load files recursively', function () {
        var spy = this.loadModule('fixtures/recursive/d0.js');
        runs(function () {
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(1);
            expect(s6d.get('fixtures/recursive/d0.js')).toBeTruthy();
            expect(s6d.get('./fixtures/recursive/d2.js').a).toBe('Module export');
            expect(s6d.get('d1')).toHaveNumberOfMembers(0);
            expect(s6d.get('d0')).toHaveNumberOfMembers(0);
        });
    });
    
    it ('should be able to load files recursively with recurrent dependencies', function () {
        var spy = this.loadModule('fixtures/recursive/d0a.js');
        runs(function () {
            expect(s6d.get('fixtures/recursive/d0a.js')).toBeTruthy();
            expect(s6d.get('./fixtures/recursive/d2.js').a).toBe('Module export');
            expect(s6d.get('d1')).toHaveNumberOfMembers(0);
            expect(s6d.get('d0')).toHaveNumberOfMembers(0);
        });
    });

    it ('should load correctly shared dependencies between parent and child', function () {
        var spy = this.loadModule('/test/fixtures/recursive/useCase2/index.js');
        runs(function () {
            expect(spy).toHaveBeenCalled();
            console.log('index', s6d.get('/test/fixtures/recursive/useCase2/index.js'));
            expect(s6d.get('/test/fixtures/recursive/useCase2/index.js').common).toEqual({something: 'worth it'});
            expect(s6d.get('/test/fixtures/recursive/useCase2/index.js').child.whatever).toEqual('some value');
            expect(s6d.get('/test/fixtures/recursive/useCase2/index.js').child.common).toEqual(s6d.get('/test/fixtures/recursive/useCase2/common.js'));
            expect(s6d.get('/test/fixtures/recursive/useCase2/child.js').common).toEqual({something: 'worth it'});
            expect(s6d.get('/test/fixtures/recursive/useCase2/child.js').whatever).toBe('some value');
            expect(s6d.get('/test/fixtures/recursive/useCase2/common.js').something).toBe('worth it');
        });
    });
    
    xit ('allows cyclic dependencies', function () {
        throw 'Not implemented';
        var spy = this.loadModule('fixtures/cyclic/a.js');
        runs(function () {
            expect(s6d.get('./fixtures/cycle/a.js')).toBeTruthy();
            expect(s6d.get('./fixtures/cycle/b.js')).toBeTruthy();
        });
    });
});
