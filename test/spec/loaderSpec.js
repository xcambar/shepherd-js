describe('Generic features of the Loader', function () {
    it('should reset its state at will', function () {
        var modPath = '/test/fixtures/unnamed.js';
        s6d.reset();
        expect(s6d.error()).toBeNull();
        expect(s6d.get(modPath)).toBeUndefined();
    })
    
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
        }, 'No error happened', 10000);
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
        }, 'No error happened', 10000);
        
        runs(function () {
            expect(s6d.error()).toEqual([modPath]);
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(1);
        });
    });
});

describe('Declaring an unnamed module', function () {
    it('should load an unnamed module and call the optionnally provided callback', function () {
        var modPath = '/test/fixtures/unnamed.js';
        var spy = jasmine.createSpy();
        runs(function () {
            s6d(modPath, spy);
        });
        waitsFor(function () {
            return !!s6d.get(modPath);
        }, 'The module has never been loaded', 10000);
        
        runs(function () {
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(1);
        });
    });

    it('should return an available module by its path', function () {
        var module = s6d.get('/test/fixtures/unnamed.js');
        expect(module).toHaveMembers(['fn2', 'var2']);
        expect(module.var2).toBe('EXPORTED!!')
        expect(typeof module.fn2).toBe('function');
    });
    
    it('should raise an exception if an invalid token is encountered', function () {
        s6d.reset();
        var modPath = '/test/fixtures/invalidToken.js';
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
    var modPath = '/test/fixtures/named.js',
        modName = 'm1';
    
    it('should load a named module by its path and call the optionnally provided callback', function () {
        var spy = jasmine.createSpy();
        runs(function () {
            s6d(modPath, spy);
        });
        waitsFor(function () {
            return !!s6d.get(modPath);
        }, 'The module has never been loaded', 10000);
        
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
    var modWithImport = '/test/fixtures/withImport.js';
    var importedMod = '/test/fixtures/named.js';
    beforeEach(function () {
        runs(function () {
            s6d.reset();
            s6d(importedMod);
        });
        waitsFor(function () {
            return s6d.get(importedMod);
        });
    })
    
    it('should be able to load an available module from its import name', function () {
        var spy = jasmine.createSpy();
        runs(function () {
           s6d(modWithImport, spy); 
        });
        waitsFor(function () {
            return s6d.get(modWithImport);
        });
        runs(function () {
            expect(s6d.get(modWithImport).imp1()).toBeTruthy();
            expect(s6d.get(modWithImport).ref1).toBe(s6d.get(importedMod).fn1);
        });
    });
    
    it ('should load modules and rename its imports', function () {
        var spy = jasmine.createSpy();
        runs(function () {
           s6d('/test/fixtures/withRenamedImport.js', spy); 
        });
        waitsFor(function () {
            return s6d.get('/test/fixtures/withRenamedImport.js');
        });
        runs(function () {
            expect(s6d.get('/test/fixtures/withRenamedImport.js').imp1()).toBeTruthy();
            expect(s6d.get('/test/fixtures/withRenamedImport.js').ref1).toBe(s6d.get(importedMod).fn1);
        });
    });
    
    it ('should be able to import modules from URL', function () {
        var spy = jasmine.createSpy();
        runs(function () {
           s6d('/test/fixtures/importFromURL.js', spy); 
        });
        waitsFor(function () {
            return s6d.get('/test/fixtures/importFromURL.js');
        });
        runs(function () {
            expect(s6d.get('/test/fixtures/importFromURL.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('/test/fixtures/importFromURL.js').ref1).toBe('function');
        });
    });
});
