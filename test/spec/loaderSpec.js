describe('Generic features of the Loader', function () {
    it('should reset its state at will', function () {
        var modPath = '/test/fixtures/unnamed.js';
        nh.reset();
        expect(nh.error()).toBeNull();
        expect(nh.get(modPath)).toBeUndefined();
    })
    
    it('should contain no erroneous module at init', function () {
        expect(nh.error()).toBeNull();
    });
    
    it('should allow a custom global error callback', function () {
        var modPath = '/invalid/file/path.js';
        var spy = jasmine.createSpy();
        nh.error(spy);
        
        runs(function () {
            nh(modPath);
        });
        waitsFor(function () {
            return nh.error();
        }, 'No error happened', 10000);
    });
    
    it('should log the modules which could not have been loaded', function () {
        nh.reset();
        var modPath = '/invalid/file/path.js';
        var spy = jasmine.createSpy();
        nh.error(spy);
        
        runs(function () {
            nh(modPath);
        });
        
        waitsFor(function () {
            return nh.error();
        }, 'No error happened', 10000);
        
        runs(function () {
            expect(nh.error()).toEqual([modPath]);
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
            nh(modPath, spy);
        });
        waitsFor(function () {
            return !!nh.get(modPath);
        }, 'The module has never been loaded', 10000);
        
        runs(function () {
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(1);
        });
    });

    it('should return an available module by its path', function () {
        var module = nh.get('/test/fixtures/unnamed.js');
        expect(module).toHaveMembers(['fn2', 'var2']);
        expect(module.var2).toBe('EXPORTED!!')
        expect(typeof module.fn2).toBe('function');
    });
    
    it('should raise an exception if an invalid token is encountered', function () {
        nh.reset();
        var modPath = '/test/fixtures/invalidToken.js';
        var caught = false;
        var spy = jasmine.createSpy();
        nh.error(spy);
        runs(function () {
            nh(modPath);
        });
        waitsFor(function () {
            return nh.error();
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
            nh(modPath, spy);
        });
        waitsFor(function () {
            return !!nh.get(modPath);
        }, 'The module has never been loaded', 10000);
        
        runs(function () {
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(1);
        });
    });

    it('should return an available named module by its name', function () {
        var module = nh.get(modName);
        expect(module).not.toBeFalsy();
    });
    
    it('should return an available named module by its path', function () {
        var module = nh.get(modPath);
        expect(module).not.toBeFalsy();
    });
    
    it('should return the same module reference either by name or path', function () {
        var moduleP = nh.get(modPath);
        var moduleN = nh.get(modName);
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
           nh.reset();
           nh(importedMod);
       });
       waitsFor(function () {
           return nh.get(importedMod);
       });
   })
   
   it('should be able to load an available module from its import name', function () {
       var spy = jasmine.createSpy();
       runs(function () {
          nh(modWithImport, spy); 
       });
       waitsFor(function () {
           return nh.get(modWithImport);
       });
       runs(function () {
           expect(nh.get(modWithImport).imp1()).toBeTruthy();
           expect(nh.get(modWithImport).ref1).toBe(nh.get(importedMod).fn1);
       });
   });
});
