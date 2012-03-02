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
        expect(parser.parse('module $ is c from "http://example.com/a/b.js";').decl.src.module).toBe('"http://example.com/a/b.js"');
    });
    
    it('should accept empty module deinitions', function () {
        expect(parser.parse('module myMod {}').type).toBe('module');
        expect(parser.parse('module myMod {}').decl.id).toBe('myMod');
        expect(parser.parse('module myMod {}').decl.contents).toBe(null);
    });
    
    it('should accept module definitions with a body', function () {});
    
});

describe ('import definition parser', function () {
    it('should allowd to import a single identifier from a path/URI', function () {
        expect(parser.parse('import X from "/modules/x.js";').type).toBe('import');
        expect(parser.parse('import X from "/modules/x.js";').decl.specifiers).toBe('X');
        expect(parser.parse('import X from "/modules/x.js";').decl.module).toBe('"/modules/x.js"');
    });
    
    it('should allowd to import a single identifier from a module reference', function () {
        expect(parser.parse('import X from a.b.c;').type).toBe('import');
        expect(parser.parse('import X from a.b.c;').decl.specifiers).toBe('X');
        expect(parser.parse('import X from a.b.c;').decl.module).toBe('a.b.c');
    });
    
    it('should allowd to import all the entries of a module', function () {
        expect(parser.parse('import * from a.b.c;').type).toBe('import');
        expect(parser.parse('import * from a.b.c;').decl.specifiers).toBe('*');
        expect(parser.parse('import * from a.b.c;').decl.module).toBe('a.b.c');
    });
    
    it('should allowd to import a subset of the entries of a module', function () {
        expect(parser.parse('import {x, y, z} from "a.b.c";').type).toBe('import');
        expect(parser.parse('import {x, y, z} from "a.b.c";').decl.specifiers[0]).toBe('x');
        expect(parser.parse('import {x, y, z} from "a.b.c";').decl.specifiers[1]).toBe('y');
        expect(parser.parse('import {x, y, z} from "a.b.c";').decl.specifiers[2]).toBe('z');
        expect(parser.parse('import {x, y, z} from "a.b.c";').decl.module).toBe('"a.b.c"');
    });
    
    
    it('should allowd to import a subset of the entries of a module, with local renaming', function () {
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').type).toBe('import');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.specifiers[0].remote).toBe('x');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.specifiers[1].remote).toBe('y');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.specifiers[2].remote).toBe('z');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.specifiers[0].local).toBe('A');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.specifiers[1].local).toBe('B');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.specifiers[2].local).toBe('C');
        expect(parser.parse('import {x: A, y: B, z: C} from a.b.c;').decl.module).toBe('a.b.c');
    });
});