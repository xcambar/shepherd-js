/**
 * Missing:
 * ========
 *  
 *  * Multiple declarations
 *  * Exports
 *  * moduleBody
 */

var parser = require('../shepherd_parser.js');

describe ('ECMAScript:Harmony module definition parser', function () {
    it('should accept null requests', function () {
        expect(parser.parse('')).toEqual({});
    });

    it('should accept module reference', function () {
        expect(parser.parse('module M at "http://code.jquery.com/latest.js";').type).toBe('module');
        expect(parser.parse('module M at "http://code.jquery.com/latest.js";').decl.id).toBe('M');
        expect(parser.parse('module M at "http://code.jquery.com/latest.js";').decl.path).toBe('"http://code.jquery.com/latest.js"');
    });
    
    it('should accept local renaming', function () {
        expect(parser.parse('module $ is c from a.b;').type).toBe('module');
        expect(parser.parse('module $ is c from a.b;').decl.id).toBe('$');
        expect(parser.parse('module $ is c from a.b;').decl.src.id).toBe('c');
        expect(parser.parse('module $ is c from a.b;').decl.src.module).toBe('a.b');
        
        expect(parser.parse('module $ is c from "http://example.com/a/b.js";').type).toBe('module');
        expect(parser.parse('module $ is c from "http://example.com/a/b.js";').decl.id).toBe('$');
        expect(parser.parse('module $ is c from "http://example.com/a/b.js";').decl.src.id).toBe('c');
        expect(parser.parse('module $ is c from "http://example.com/a/b.js";').decl.src.uri).toBe('http://example.com/a/b.js');
    });
    
    it('should accept empty module deinitions', function () {
        expect(parser.parse('module myMod {}').type).toBe('module');
        expect(parser.parse('module myMod {}').decl.id).toBe('myMod');
        expect(parser.parse('module myMod {}').decl.contents).toBe(null);
    });
    
    it('should accept module definitions with a body', function () {});
    
});

describe ('import definition parser', function () {
    it('should allow to import a single identifier from a path/URI', function () {
        expect(parser.parse('import X from "/modules/x.js";').type).toBe('import');
        expect(parser.parse('import X from "/modules/x.js";').decl.vars).toBe('X');
        expect(parser.parse('import X from "/modules/x.js";').decl.from).toEqual({type: 'uri', path: '/modules/x.js'});
    });
    
    it('should allow to import a single identifier from a module reference', function () {
        expect(parser.parse('import X from a.b.c;').type).toBe('import');
        expect(parser.parse('import X from a.b.c;').decl.vars).toBe('X');
        expect(parser.parse('import X from a.b.c;').decl.from).toEqual({type: 'module', path: 'a.b.c'});
    });
    
    it('should allow to import all the entries of a module', function () {
        expect(parser.parse('import * from a.b.c;').type).toBe('import');
        expect(parser.parse('import * from a.b.c;').decl.vars).toBe('*');
        expect(parser.parse('import * from a.b.c;').decl.from).toEqual({type: 'module', path: 'a.b.c'});
    });
    
    it('should allow to import a subset of the entries of a module', function () {
        expect(parser.parse('import {x, y, z} from "a/b/c.js";').type).toBe('import');
        expect(parser.parse('import {x, y, z} from "a/b/c.js";').decl.vars).toEqual(['x', 'y', 'z']);
        expect(parser.parse('import {x, y, z} from "a/b/c.js";').decl.from).toEqual({type: 'uri', path: 'a/b/c.js'});
    });
    
    it('should allow to import a subset of the entries of a module, with local renaming', function () {
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').type).toBe('import');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.vars[0].remote).toBe('x');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.vars[1].remote).toBe('y');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.vars[2].remote).toBe('z');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.vars[0].local).toBe('A');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.vars[1].local).toBe('B');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.vars[2].local).toBe('C');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.from).toEqual({type: 'module', path: 'a.b.c'});
    });
});

describe ('export definition parser', function () {
    it('should allow to export a single identifier', function () {
        expect(parser.parse('export xyz;').type).toBe('export');
        expect(parser.parse('export xyz;').decl.length).toBe(1);
        expect(parser.parse('export xyz;').decl[0]).toBe('xyz');
        expect(parser.parse('export {x};').type).toBe('export');
        expect(parser.parse('export {x};').decl.length).toBe(1);
        expect(parser.parse('export {xyz};').decl[0]).toBe('xyz');
    });

    it('should allow to export a list of references', function () {
        expect(parser.parse('export x, y, z;').type).toBe('export');
        expect(parser.parse('export x, y, z;').decl.length).toBe(3);
        expect(parser.parse('export x, y, z;').decl).not.toBe('xyz');
        expect(parser.parse('export x, y, z;').decl).toEqual(['x', 'y', 'z']);
        
        expect(parser.parse('export {x, y, z};').type).toBe('export');
        expect(parser.parse('export {x, y, t};').decl.length).toBe(3);
        expect(parser.parse('export {x, y, z};').decl).not.toBe('xyz');
        expect(parser.parse('export {x, y, z};').decl).toEqual(['x', 'y', 'z']);
    });

    it('should allow to export *', function () {
        expect(parser.parse('export *;').type).toBe('export');
        expect(parser.parse('export *;').decl.length).toBe(1);
        expect(parser.parse('export *;').decl[0]).toBe('*');
    });

    it('should allow to export * from a specific module', function () {
        expect(parser.parse('export * from a.b.c;').type).toBe('export');
        expect(parser.parse('export * from a.b.c;').decl.length).toBe(1);
        expect(parser.parse('export * from a.b.c;').decl[0]).toEqual({from: 'a.b.c'});
    });

    it('should allow to export * with renaming', function () {
        expect(parser.parse('export {local: remote};').type).toBe('export');
        expect(parser.parse('export {local: remote};').decl.length).toBe(1);
        expect(parser.parse('export {local: remote};').decl[0]).toEqual({local: 'local', remote: 'remote'});
    });
    
    //Misses export * from Path, export x: X, y:Y
});
