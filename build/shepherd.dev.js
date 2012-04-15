(function() {
    var harmonyParser = function() {
        var exports;
        var harmony_parser = function() {
            var parser = {
                trace: function trace() {},
                yy: {},
                symbols_: {
                    error: 2,
                    Program: 3,
                    ProgramNext: 4,
                    ProgramElement: 5,
                    ModuleDeclaration: 6,
                    ImportDeclaration: 7,
                    ExportDeclaration: 8,
                    EOF: 9,
                    ModuleSpecifier: 10,
                    Path: 11,
                    String: 12,
                    module: 13,
                    Id: 14,
                    at: 15,
                    SEMICOLON: 16,
                    IS: 17,
                    ImportSource: 18,
                    OPEN_BRACE: 19,
                    ModuleBody: 20,
                    CLOSE_BRACE: 21,
                    from: 22,
                    "import": 23,
                    ImportSpecifierSet: 24,
                    WILDCARD: 25,
                    ImportSpecifier: 26,
                    ImportSpecifierNext: 27,
                    COMMA: 28,
                    COLON: 29,
                    "export": 30,
                    ExportSpecifierSet: 31,
                    ExportSpecifierSetNext: 32,
                    ExportSpecifier: 33,
                    ExportSpecifierNext: 34,
                    ModuleElement: 35,
                    PERIOD: 36,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    9: "EOF",
                    12: "String",
                    13: "module",
                    14: "Id",
                    15: "at",
                    16: "SEMICOLON",
                    17: "IS",
                    19: "OPEN_BRACE",
                    21: "CLOSE_BRACE",
                    22: "from",
                    23: "import",
                    25: "WILDCARD",
                    28: "COMMA",
                    29: "COLON",
                    30: "export",
                    36: "PERIOD"
                },
                productions_: [ 0, [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 1 ], [ 5, 1 ], [ 5, 1 ], [ 5, 1 ], [ 10, 1 ], [ 10, 1 ], [ 6, 5 ], [ 6, 5 ], [ 6, 5 ], [ 18, 1 ], [ 18, 3 ], [ 7, 5 ], [ 24, 1 ], [ 24, 1 ], [ 24, 4 ], [ 27, 3 ], [ 27, 0 ], [ 26, 1 ], [ 26, 3 ], [ 8, 4 ], [ 32, 3 ], [ 32, 0 ], [ 31, 4 ], [ 31, 1 ], [ 31, 1 ], [ 31, 3 ], [ 33, 1 ], [ 33, 3 ], [ 34, 3 ], [ 34, 0 ], [ 20, 2 ], [ 20, 2 ], [ 20, 2 ], [ 20, 0 ], [ 35, 1 ], [ 35, 1 ], [ 11, 1 ], [ 11, 3 ] ],
                performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
                    var $0 = $$.length - 1;
                    switch (yystate) {
                      case 1:
                        return $$[$0];
                        break;
                      case 2:
                        this.$ = $$[$0];
                        break;
                      case 3:
                        this.$ = $$[$0].length ? $$[$0 - 1].concat($$[$0]) : $$[$0 - 1];
                        break;
                      case 4:
                        this.$ = [ {
                            type: "module",
                            decl: $$[$0]
                        } ];
                        break;
                      case 5:
                        this.$ = [ {
                            type: "import",
                            decl: $$[$0]
                        } ];
                        break;
                      case 6:
                        this.$ = [ {
                            type: "export",
                            decl: $$[$0]
                        } ];
                        break;
                      case 7:
                        this.$ = [];
                        break;
                      case 8:
                        this.$ = {
                            type: "module",
                            path: $$[$0]
                        };
                        break;
                      case 9:
                        this.$ = {
                            type: "uri",
                            path: $$[$0].trim().replace(/^(['"])(.*)\1$/, function(str, m1, m2, m3) {
                                return m2;
                            })
                        };
                        break;
                      case 10:
                        this.$ = {
                            id: $$[$0 - 3],
                            path: $$[$0 - 1].trim().replace(/^(['"])(.*)\1$/, function(str, m1, m2, m3) {
                                return m2;
                            })
                        };
                        break;
                      case 11:
                        this.$ = {
                            id: $$[$0 - 3],
                            src: $$[$0 - 1]
                        };
                        break;
                      case 12:
                        this.$ = {
                            id: $$[$0 - 3],
                            expressions: $$[$0 - 1]
                        };
                        break;
                      case 13:
                        this.$ = $$[$0];
                        break;
                      case 14:
                        var out = {
                            id: $$[$0 - 2]
                        };
                        out[$$[$0].type] = $$[$0].path;
                        this.$ = out;
                        break;
                      case 15:
                        this.$ = {
                            from: $$[$0 - 1],
                            vars: $$[$0 - 3]
                        };
                        break;
                      case 16:
                        this.$ = [ $$[$0] ];
                        break;
                      case 17:
                        this.$ = [ $$[$0] ];
                        break;
                      case 18:
                        this.$ = [ $$[$0 - 2] ].concat($$[$0 - 1]);
                        break;
                      case 19:
                        this.$ = typeof $$[$0] != "undefined" ? [ $$[$0 - 1] ].concat($$[$0]) : $$[$0 - 1];
                        break;
                      case 21:
                        this.$ = $$[$0];
                        break;
                      case 22:
                        this.$ = {
                            remote: $$[$0 - 2],
                            local: $$[$0]
                        };
                        break;
                      case 23:
                        this.$ = typeof $$[$0 - 1] != "undefined" ? $$[$0 - 2].concat($$[$0 - 1]) : $$[$0 - 2];
                        break;
                      case 24:
                        this.$ = typeof $$[$0] != "undefined" ? $$[$0 - 1].concat($$[$0]) : $$[$0 - 1];
                        break;
                      case 26:
                        this.$ = typeof $$[$0 - 1] != "undefined" ? [ $$[$0 - 2] ].concat($$[$0 - 1]) : [ $$[$0 - 2] ];
                        break;
                      case 27:
                        this.$ = [ $$[$0] ];
                        break;
                      case 28:
                        this.$ = [ $$[$0] ];
                        break;
                      case 29:
                        this.$ = [ {
                            from: $$[$0]
                        } ];
                        break;
                      case 30:
                        this.$ = $$[$0];
                        break;
                      case 31:
                        this.$ = {
                            local: $$[$0 - 2],
                            remote: $$[$0]
                        };
                        break;
                      case 32:
                        this.$ = typeof $$[$0] != "undefined" ? [ $$[$0 - 1] ].concat($$[$0]) : [ $$[$0 - 1] ];
                        break;
                      case 34:
                        this.$ = [ {
                            type: "module",
                            decl: $$[$0 - 1]
                        } ].concat($$[$0]);
                        break;
                      case 35:
                        this.$ = [ {
                            type: "import",
                            decl: $$[$0 - 1]
                        } ].concat($$[$0]);
                        break;
                      case 36:
                        this.$ = [ {
                            type: "export",
                            decl: $$[$0 - 1]
                        } ].concat($$[$0]);
                        break;
                      case 37:
                        this.$ = [];
                        break;
                      case 38:
                        this.$ = $$[$0];
                        break;
                      case 39:
                        this.$ = $$[$0];
                        break;
                      case 40:
                        this.$ = $$[$0];
                        break;
                      case 41:
                        this.$ = $$[$0 - 2] + "." + $$[$0];
                        break;
                    }
                },
                table: [ {
                    3: 1,
                    4: 2,
                    5: 3,
                    6: 4,
                    7: 5,
                    8: 6,
                    9: [ 1, 7 ],
                    13: [ 1, 8 ],
                    23: [ 1, 9 ],
                    30: [ 1, 10 ]
                }, {
                    1: [ 3 ]
                }, {
                    1: [ 2, 1 ]
                }, {
                    1: [ 2, 2 ],
                    4: 11,
                    5: 3,
                    6: 4,
                    7: 5,
                    8: 6,
                    9: [ 1, 7 ],
                    13: [ 1, 8 ],
                    23: [ 1, 9 ],
                    30: [ 1, 10 ]
                }, {
                    1: [ 2, 4 ],
                    9: [ 2, 4 ],
                    13: [ 2, 4 ],
                    23: [ 2, 4 ],
                    30: [ 2, 4 ]
                }, {
                    1: [ 2, 5 ],
                    9: [ 2, 5 ],
                    13: [ 2, 5 ],
                    23: [ 2, 5 ],
                    30: [ 2, 5 ]
                }, {
                    1: [ 2, 6 ],
                    9: [ 2, 6 ],
                    13: [ 2, 6 ],
                    23: [ 2, 6 ],
                    30: [ 2, 6 ]
                }, {
                    1: [ 2, 7 ],
                    9: [ 2, 7 ],
                    13: [ 2, 7 ],
                    23: [ 2, 7 ],
                    30: [ 2, 7 ]
                }, {
                    14: [ 1, 12 ]
                }, {
                    14: [ 1, 14 ],
                    19: [ 1, 16 ],
                    24: 13,
                    25: [ 1, 15 ]
                }, {
                    14: [ 1, 19 ],
                    19: [ 1, 18 ],
                    25: [ 1, 20 ],
                    31: 17
                }, {
                    1: [ 2, 3 ]
                }, {
                    15: [ 1, 21 ],
                    17: [ 1, 22 ],
                    19: [ 1, 23 ]
                }, {
                    22: [ 1, 24 ]
                }, {
                    22: [ 2, 16 ]
                }, {
                    22: [ 2, 17 ]
                }, {
                    14: [ 1, 26 ],
                    26: 25
                }, {
                    16: [ 2, 25 ],
                    28: [ 1, 28 ],
                    32: 27
                }, {
                    14: [ 1, 30 ],
                    33: 29
                }, {
                    16: [ 2, 27 ],
                    28: [ 2, 27 ]
                }, {
                    16: [ 2, 28 ],
                    22: [ 1, 31 ],
                    28: [ 2, 28 ]
                }, {
                    12: [ 1, 32 ]
                }, {
                    14: [ 1, 34 ],
                    18: 33
                }, {
                    6: 36,
                    7: 37,
                    8: 38,
                    13: [ 1, 8 ],
                    20: 35,
                    21: [ 2, 37 ],
                    23: [ 1, 9 ],
                    30: [ 1, 10 ]
                }, {
                    10: 39,
                    11: 40,
                    12: [ 1, 41 ],
                    14: [ 1, 42 ]
                }, {
                    21: [ 2, 20 ],
                    27: 43,
                    28: [ 1, 44 ]
                }, {
                    21: [ 2, 21 ],
                    28: [ 2, 21 ],
                    29: [ 1, 45 ]
                }, {
                    16: [ 1, 46 ]
                }, {
                    14: [ 1, 19 ],
                    19: [ 1, 18 ],
                    25: [ 1, 20 ],
                    31: 47
                }, {
                    21: [ 2, 33 ],
                    28: [ 1, 49 ],
                    34: 48
                }, {
                    21: [ 2, 30 ],
                    28: [ 2, 30 ],
                    29: [ 1, 50 ]
                }, {
                    11: 51,
                    14: [ 1, 42 ]
                }, {
                    16: [ 1, 52 ]
                }, {
                    16: [ 1, 53 ]
                }, {
                    16: [ 2, 13 ],
                    22: [ 1, 54 ]
                }, {
                    21: [ 1, 55 ]
                }, {
                    6: 36,
                    7: 37,
                    8: 38,
                    13: [ 1, 8 ],
                    20: 56,
                    21: [ 2, 37 ],
                    23: [ 1, 9 ],
                    30: [ 1, 10 ]
                }, {
                    6: 36,
                    7: 37,
                    8: 38,
                    13: [ 1, 8 ],
                    20: 57,
                    21: [ 2, 37 ],
                    23: [ 1, 9 ],
                    30: [ 1, 10 ]
                }, {
                    6: 36,
                    7: 37,
                    8: 38,
                    13: [ 1, 8 ],
                    20: 58,
                    21: [ 2, 37 ],
                    23: [ 1, 9 ],
                    30: [ 1, 10 ]
                }, {
                    16: [ 1, 59 ]
                }, {
                    16: [ 2, 8 ]
                }, {
                    16: [ 2, 9 ]
                }, {
                    16: [ 2, 40 ],
                    21: [ 2, 40 ],
                    28: [ 2, 40 ],
                    36: [ 1, 60 ]
                }, {
                    21: [ 1, 61 ]
                }, {
                    14: [ 1, 26 ],
                    26: 62
                }, {
                    11: 63,
                    14: [ 1, 42 ]
                }, {
                    1: [ 2, 23 ],
                    9: [ 2, 23 ],
                    13: [ 2, 23 ],
                    21: [ 2, 23 ],
                    23: [ 2, 23 ],
                    30: [ 2, 23 ]
                }, {
                    16: [ 2, 25 ],
                    28: [ 1, 28 ],
                    32: 64
                }, {
                    21: [ 1, 65 ]
                }, {
                    14: [ 1, 30 ],
                    33: 66
                }, {
                    11: 67,
                    14: [ 1, 42 ]
                }, {
                    16: [ 2, 29 ],
                    28: [ 2, 29 ]
                }, {
                    1: [ 2, 10 ],
                    9: [ 2, 10 ],
                    13: [ 2, 10 ],
                    21: [ 2, 10 ],
                    23: [ 2, 10 ],
                    30: [ 2, 10 ]
                }, {
                    1: [ 2, 11 ],
                    9: [ 2, 11 ],
                    13: [ 2, 11 ],
                    21: [ 2, 11 ],
                    23: [ 2, 11 ],
                    30: [ 2, 11 ]
                }, {
                    10: 68,
                    11: 40,
                    12: [ 1, 41 ],
                    14: [ 1, 42 ]
                }, {
                    1: [ 2, 12 ],
                    9: [ 2, 12 ],
                    13: [ 2, 12 ],
                    21: [ 2, 12 ],
                    23: [ 2, 12 ],
                    30: [ 2, 12 ]
                }, {
                    21: [ 2, 34 ]
                }, {
                    21: [ 2, 35 ]
                }, {
                    21: [ 2, 36 ]
                }, {
                    1: [ 2, 15 ],
                    9: [ 2, 15 ],
                    13: [ 2, 15 ],
                    21: [ 2, 15 ],
                    23: [ 2, 15 ],
                    30: [ 2, 15 ]
                }, {
                    11: 69,
                    14: [ 1, 42 ]
                }, {
                    22: [ 2, 18 ]
                }, {
                    21: [ 2, 20 ],
                    27: 70,
                    28: [ 1, 44 ]
                }, {
                    21: [ 2, 22 ],
                    28: [ 2, 22 ]
                }, {
                    16: [ 2, 24 ]
                }, {
                    16: [ 2, 26 ],
                    28: [ 2, 26 ]
                }, {
                    21: [ 2, 33 ],
                    28: [ 1, 49 ],
                    34: 71
                }, {
                    21: [ 2, 31 ],
                    28: [ 2, 31 ]
                }, {
                    16: [ 2, 14 ]
                }, {
                    16: [ 2, 41 ],
                    21: [ 2, 41 ],
                    28: [ 2, 41 ]
                }, {
                    21: [ 2, 19 ]
                }, {
                    21: [ 2, 32 ]
                } ],
                defaultActions: {
                    2: [ 2, 1 ],
                    11: [ 2, 3 ],
                    14: [ 2, 16 ],
                    15: [ 2, 17 ],
                    40: [ 2, 8 ],
                    41: [ 2, 9 ],
                    56: [ 2, 34 ],
                    57: [ 2, 35 ],
                    58: [ 2, 36 ],
                    61: [ 2, 18 ],
                    64: [ 2, 24 ],
                    68: [ 2, 14 ],
                    70: [ 2, 19 ],
                    71: [ 2, 32 ]
                },
                parseError: function parseError(str, hash) {
                    throw new Error(str);
                },
                parse: function parse(input) {
                    var self = this, stack = [ 0 ], vstack = [ null ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
                    this.lexer.setInput(input);
                    this.lexer.yy = this.yy;
                    this.yy.lexer = this.lexer;
                    if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                    var yyloc = this.lexer.yylloc;
                    lstack.push(yyloc);
                    if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                    function popStack(n) {
                        stack.length = stack.length - 2 * n;
                        vstack.length = vstack.length - n;
                        lstack.length = lstack.length - n;
                    }
                    function lex() {
                        var token;
                        token = self.lexer.lex() || 1;
                        if (typeof token !== "number") {
                            token = self.symbols_[token] || token;
                        }
                        return token;
                    }
                    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
                    while (true) {
                        state = stack[stack.length - 1];
                        if (this.defaultActions[state]) {
                            action = this.defaultActions[state];
                        } else {
                            if (symbol == null) symbol = lex();
                            action = table[state] && table[state][symbol];
                        }
                        _handle_error : if (typeof action === "undefined" || !action.length || !action[0]) {
                            if (!recovering) {
                                expected = [];
                                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                                    expected.push("'" + this.terminals_[p] + "'");
                                }
                                var errStr = "";
                                if (this.lexer.showPosition) {
                                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'";
                                } else {
                                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                                }
                                this.parseError(errStr, {
                                    text: this.lexer.match,
                                    token: this.terminals_[symbol] || symbol,
                                    line: this.lexer.yylineno,
                                    loc: yyloc,
                                    expected: expected
                                });
                            }
                            if (recovering == 3) {
                                if (symbol == EOF) {
                                    throw new Error(errStr || "Parsing halted.");
                                }
                                yyleng = this.lexer.yyleng;
                                yytext = this.lexer.yytext;
                                yylineno = this.lexer.yylineno;
                                yyloc = this.lexer.yylloc;
                                symbol = lex();
                            }
                            while (1) {
                                if (TERROR.toString() in table[state]) {
                                    break;
                                }
                                if (state == 0) {
                                    throw new Error(errStr || "Parsing halted.");
                                }
                                popStack(1);
                                state = stack[stack.length - 1];
                            }
                            preErrorSymbol = symbol;
                            symbol = TERROR;
                            state = stack[stack.length - 1];
                            action = table[state] && table[state][TERROR];
                            recovering = 3;
                        }
                        if (action[0] instanceof Array && action.length > 1) {
                            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                        }
                        switch (action[0]) {
                          case 1:
                            stack.push(symbol);
                            vstack.push(this.lexer.yytext);
                            lstack.push(this.lexer.yylloc);
                            stack.push(action[1]);
                            symbol = null;
                            if (!preErrorSymbol) {
                                yyleng = this.lexer.yyleng;
                                yytext = this.lexer.yytext;
                                yylineno = this.lexer.yylineno;
                                yyloc = this.lexer.yylloc;
                                if (recovering > 0) recovering--;
                            } else {
                                symbol = preErrorSymbol;
                                preErrorSymbol = null;
                            }
                            break;
                          case 2:
                            len = this.productions_[action[1]][1];
                            yyval.$ = vstack[vstack.length - len];
                            yyval._$ = {
                                first_line: lstack[lstack.length - (len || 1)].first_line,
                                last_line: lstack[lstack.length - 1].last_line,
                                first_column: lstack[lstack.length - (len || 1)].first_column,
                                last_column: lstack[lstack.length - 1].last_column
                            };
                            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                            if (typeof r !== "undefined") {
                                return r;
                            }
                            if (len) {
                                stack = stack.slice(0, -1 * len * 2);
                                vstack = vstack.slice(0, -1 * len);
                                lstack = lstack.slice(0, -1 * len);
                            }
                            stack.push(this.productions_[action[1]][0]);
                            vstack.push(yyval.$);
                            lstack.push(yyval._$);
                            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                            stack.push(newState);
                            break;
                          case 3:
                            return true;
                        }
                    }
                    return true;
                }
            };
            var lexer = function() {
                var lexer = {
                    EOF: 1,
                    parseError: function parseError(str, hash) {
                        if (this.yy.parseError) {
                            this.yy.parseError(str, hash);
                        } else {
                            throw new Error(str);
                        }
                    },
                    setInput: function(input) {
                        this._input = input;
                        this._more = this._less = this.done = false;
                        this.yylineno = this.yyleng = 0;
                        this.yytext = this.matched = this.match = "";
                        this.conditionStack = [ "INITIAL" ];
                        this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        };
                        return this;
                    },
                    input: function() {
                        var ch = this._input[0];
                        this.yytext += ch;
                        this.yyleng++;
                        this.match += ch;
                        this.matched += ch;
                        var lines = ch.match(/\n/);
                        if (lines) this.yylineno++;
                        this._input = this._input.slice(1);
                        return ch;
                    },
                    unput: function(ch) {
                        this._input = ch + this._input;
                        return this;
                    },
                    more: function() {
                        this._more = true;
                        return this;
                    },
                    pastInput: function() {
                        var past = this.matched.substr(0, this.matched.length - this.match.length);
                        return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
                    },
                    upcomingInput: function() {
                        var next = this.match;
                        if (next.length < 20) {
                            next += this._input.substr(0, 20 - next.length);
                        }
                        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
                    },
                    showPosition: function() {
                        var pre = this.pastInput();
                        var c = (new Array(pre.length + 1)).join("-");
                        return pre + this.upcomingInput() + "\n" + c + "^";
                    },
                    next: function() {
                        if (this.done) {
                            return this.EOF;
                        }
                        if (!this._input) this.done = true;
                        var token, match, tempMatch, index, col, lines;
                        if (!this._more) {
                            this.yytext = "";
                            this.match = "";
                        }
                        var rules = this._currentRules();
                        for (var i = 0; i < rules.length; i++) {
                            tempMatch = this._input.match(this.rules[rules[i]]);
                            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                                match = tempMatch;
                                index = i;
                                if (!this.options.flex) break;
                            }
                        }
                        if (match) {
                            lines = match[0].match(/\n.*/g);
                            if (lines) this.yylineno += lines.length;
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
                            };
                            this.yytext += match[0];
                            this.match += match[0];
                            this.yyleng = this.yytext.length;
                            this._more = false;
                            this._input = this._input.slice(match[0].length);
                            this.matched += match[0];
                            token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                            if (token) return token; else return;
                        }
                        if (this._input === "") {
                            return this.EOF;
                        } else {
                            this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            });
                        }
                    },
                    lex: function lex() {
                        var r = this.next();
                        if (typeof r !== "undefined") {
                            return r;
                        } else {
                            return this.lex();
                        }
                    },
                    begin: function begin(condition) {
                        this.conditionStack.push(condition);
                    },
                    popState: function popState() {
                        return this.conditionStack.pop();
                    },
                    _currentRules: function _currentRules() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                    },
                    topState: function() {
                        return this.conditionStack[this.conditionStack.length - 2];
                    },
                    pushState: function begin(condition) {
                        this.begin(condition);
                    }
                };
                lexer.options = {};
                lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                    var YYSTATE = YY_START;
                    switch ($avoiding_name_collisions) {
                      case 0:
                        break;
                      case 1:
                        break;
                      case 2:
                        break;
                      case 3:
                        return "SEMICOLON";
                        break;
                      case 4:
                        return "COLON";
                        break;
                      case 5:
                        return "OPEN_BRACE";
                        break;
                      case 6:
                        return "CLOSE_BRACE";
                        break;
                      case 7:
                        return "module";
                        break;
                      case 8:
                        return "import";
                        break;
                      case 9:
                        return "export";
                        break;
                      case 10:
                        return 15;
                        break;
                      case 11:
                        return 17;
                        break;
                      case 12:
                        return 22;
                        break;
                      case 13:
                        return "WILDCARD";
                        break;
                      case 14:
                        return 28;
                        break;
                      case 15:
                        return 36;
                        break;
                      case 16:
                        return "Id";
                        break;
                      case 17:
                        return "String";
                        break;
                      case 18:
                        return "String";
                        break;
                      case 19:
                        return 9;
                        break;
                    }
                };
                lexer.rules = [ /^\n+/, /^\s+/, /^\t+/, /^;/, /^:/, /^\{/, /^\}/, /^module\b/, /^import\b/, /^export\b/, /^at\b/, /^is\b/, /^from\b/, /^\*/, /^,/, /^\./, /^[a-zA-Z_$][0-9a-zA-Z_$]*/, /^'[^\']+'/, /^"[^\"]+"/, /^$/ ];
                lexer.conditions = {
                    INITIAL: {
                        rules: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ],
                        inclusive: true
                    }
                };
                return lexer;
            }();
            parser.lexer = lexer;
            return parser;
        }();
        if (typeof require !== "undefined" && typeof exports !== "undefined") {
            exports.parser = harmony_parser;
            exports.parse = function() {
                return harmony_parser.parse.apply(harmony_parser, arguments);
            };
            exports.main = function commonjsMain(args) {
                if (!args[1]) throw new Error("Usage: " + args[0] + " FILE");
                if (typeof process !== "undefined") {
                    var source = require("fs").readFileSync(require("path").join(process.cwd(), args[1]), "utf8");
                } else {
                    var cwd = require("file").path(require("file").cwd());
                    var source = cwd.join(args[1]).read({
                        charset: "utf-8"
                    });
                }
                return exports.parser.parse(source);
            };
            if (typeof module !== "undefined" && require.main === module) {
                exports.main(typeof process !== "undefined" ? process.argv.slice(1) : require("system").args);
            }
        }
        return harmony_parser;
    }();
    var when = function() {
        var module = {};
        (function(define) {
            define(function() {
                var freeze, reduceArray, undef;
                function noop() {}
                function allocateArray(n) {
                    return new Array(n);
                }
                freeze = Object.freeze || function(o) {
                    return o;
                };
                reduceArray = [].reduce || function(reduceFunc) {
                    var arr, args, reduced, len, i;
                    i = 0;
                    arr = Object(this);
                    len = arr.length >>> 0;
                    args = arguments;
                    if (args.length <= 1) {
                        for (;;) {
                            if (i in arr) {
                                reduced = arr[i++];
                                break;
                            }
                            if (++i >= len) {
                                throw new TypeError;
                            }
                        }
                    } else {
                        reduced = args[1];
                    }
                    for (; i < len; ++i) {
                        if (i in arr) reduced = reduceFunc(reduced, arr[i], i, arr);
                    }
                    return reduced;
                };
                function Promise() {}
                function resolved(value) {
                    var p = new Promise;
                    p.then = function(callback) {
                        checkCallbacks(arguments);
                        var nextValue;
                        try {
                            if (callback) nextValue = callback(value);
                            return promise(nextValue === undef ? value : nextValue);
                        } catch (e) {
                            return rejected(e);
                        }
                    };
                    return freeze(p);
                }
                function rejected(reason) {
                    var p = new Promise;
                    p.then = function(callback, errback) {
                        checkCallbacks(arguments);
                        var nextValue;
                        try {
                            if (errback) {
                                nextValue = errback(reason);
                                return promise(nextValue === undef ? reason : nextValue);
                            }
                            return rejected(reason);
                        } catch (e) {
                            return rejected(e);
                        }
                    };
                    return freeze(p);
                }
                function checkCallbacks(arrayOfCallbacks) {
                    var arg, i = arrayOfCallbacks.length;
                    while (i) {
                        arg = arrayOfCallbacks[--i];
                        if (arg != null && typeof arg != "function") throw new Error("callback is not a function");
                    }
                }
                function defer() {
                    var deferred, promise, listeners, progressHandlers, _then, _progress, complete;
                    listeners = [];
                    progressHandlers = [];
                    _then = function unresolvedThen(callback, errback, progback) {
                        checkCallbacks(arguments);
                        var deferred = defer();
                        listeners.push(function(promise) {
                            promise.then(callback, errback).then(deferred.resolve, deferred.reject, deferred.progress);
                        });
                        progback && progressHandlers.push(progback);
                        return deferred.promise;
                    };
                    function then(callback, errback, progback) {
                        return _then(callback, errback, progback);
                    }
                    function resolve(val) {
                        complete(resolved(val));
                    }
                    function reject(err) {
                        complete(rejected(err));
                    }
                    _progress = function(update) {
                        var progress, i = 0;
                        while (progress = progressHandlers[i++]) progress(update);
                    };
                    function progress(update) {
                        _progress(update);
                    }
                    complete = function(completed) {
                        var listener, i = 0;
                        _then = completed.then;
                        complete = _progress = function alreadyCompleted() {
                            throw new Error("already completed");
                        };
                        progressHandlers = undef;
                        while (listener = listeners[i++]) {
                            listener(completed);
                        }
                        listeners = [];
                    };
                    deferred = {};
                    promise = new Promise;
                    promise.then = deferred.then = then;
                    deferred.promise = freeze(promise);
                    deferred.resolver = freeze({
                        resolve: deferred.resolve = resolve,
                        reject: deferred.reject = reject,
                        progress: deferred.progress = progress
                    });
                    return deferred;
                }
                function isPromise(promiseOrValue) {
                    return promiseOrValue && typeof promiseOrValue.then === "function";
                }
                function when(promiseOrValue, callback, errback, progressHandler) {
                    var trustedPromise = promise(promiseOrValue);
                    return trustedPromise.then(callback, errback, progressHandler);
                }
                function promise(promiseOrValue) {
                    var promise, deferred;
                    if (promiseOrValue instanceof Promise) {
                        promise = promiseOrValue;
                    } else {
                        deferred = defer();
                        if (isPromise(promiseOrValue)) {
                            promiseOrValue.then(deferred.resolve, deferred.reject, deferred.progress);
                            promise = deferred.promise;
                        } else {
                            deferred.resolve(promiseOrValue);
                            promise = deferred.promise;
                        }
                    }
                    return promise;
                }
                function some(promisesOrValues, howMany, callback, errback, progressHandler) {
                    var toResolve, results, ret, deferred, resolver, rejecter, handleProgress, len, i;
                    len = promisesOrValues.length >>> 0;
                    toResolve = Math.max(0, Math.min(howMany, len));
                    results = [];
                    deferred = defer();
                    ret = when(deferred, callback, errback, progressHandler);
                    function resolve(val) {
                        resolver(val);
                    }
                    function reject(err) {
                        rejecter(err);
                    }
                    function progress(update) {
                        handleProgress(update);
                    }
                    function complete() {
                        resolver = rejecter = handleProgress = noop;
                    }
                    if (!toResolve) {
                        deferred.resolve(results);
                    } else {
                        resolver = function(val) {
                            results.push(val);
                            if (!--toResolve) {
                                complete();
                                deferred.resolve(results);
                            }
                        };
                        rejecter = function(err) {
                            complete();
                            deferred.reject(err);
                        };
                        handleProgress = deferred.progress;
                        for (i = 0; i < len; ++i) {
                            if (i in promisesOrValues) {
                                when(promisesOrValues[i], resolve, reject, progress);
                            }
                        }
                    }
                    return ret;
                }
                function all(promisesOrValues, callback, errback, progressHandler) {
                    var results, promise;
                    results = allocateArray(promisesOrValues.length);
                    promise = reduce(promisesOrValues, reduceIntoArray, results);
                    return when(promise, callback, errback, progressHandler);
                }
                function reduceIntoArray(current, val, i) {
                    current[i] = val;
                    return current;
                }
                function any(promisesOrValues, callback, errback, progressHandler) {
                    function unwrapSingleResult(val) {
                        return callback(val[0]);
                    }
                    return some(promisesOrValues, 1, unwrapSingleResult, errback, progressHandler);
                }
                function map(promisesOrValues, mapFunc) {
                    var results, i;
                    i = promisesOrValues.length;
                    results = allocateArray(i);
                    for (; i >= 0; --i) {
                        if (i in promisesOrValues) results[i] = when(promisesOrValues[i], mapFunc);
                    }
                    return reduce(results, reduceIntoArray, results);
                }
                function reduce(promisesOrValues, reduceFunc, initialValue) {
                    var total, args;
                    total = promisesOrValues.length;
                    args = [ function(current, val, i) {
                        return when(current, function(c) {
                            return when(val, function(value) {
                                return reduceFunc(c, value, i, total);
                            });
                        });
                    } ];
                    if (arguments.length >= 3) args.push(initialValue);
                    return promise(reduceArray.apply(promisesOrValues, args));
                }
                function chain(promiseOrValue, resolver, resolveValue) {
                    var useResolveValue = arguments.length > 2;
                    return when(promiseOrValue, function(val) {
                        if (useResolveValue) val = resolveValue;
                        resolver.resolve(val);
                        return val;
                    }, function(e) {
                        resolver.reject(e);
                        return rejected(e);
                    }, resolver.progress);
                }
                when.defer = defer;
                when.isPromise = isPromise;
                when.some = some;
                when.all = all;
                when.any = any;
                when.reduce = reduce;
                when.map = map;
                when.chain = chain;
                return when;
            });
        })(typeof define == "function" ? define : function(factory) {
            typeof module != "undefined" ? module.exports = factory() : this.when = factory();
        });
        return module.exports;
    }();
    (function(me, parser, when, undefined) {
        if (typeof parser.parse !== "function") {
            throw "No parser provided.";
        }
        function is(obj, type) {
            return Object.prototype.toString.call(obj).toLowerCase() == "[object " + type.toLowerCase() + "]";
        }
        var modules = {}, _errModules = null, _isServer = typeof window == "undefined", _extDepsCount = 0, _debug;
        var _plugins = {
            modularize: function modularizePlugin(vars) {
                function fn(globalVar) {
                    if (!me.hasOwnProperty(globalVar)) {
                        return 'No global "' + globalVar + '"';
                    }
                    modules[globalVar] = me[globalVar];
                    return true;
                }
                if (is(vars, "array")) {
                    for (var i = 0; i < vars.length; i++) {
                        fn(vars[i]);
                    }
                } else {
                    fn(vars);
                }
            },
            noGlobal: function noGlobalPlugin(vars) {
                var fn = function(globalVar) {
                    if (!me.hasOwnProperty(globalVar)) {
                        return 'No global "' + globalVar + '"';
                    }
                    delete me[globalVar];
                    return true;
                };
                if (is(vars, "array")) {
                    for (var i = 0; i < vars.length; i++) {
                        fn(vars[i]);
                    }
                } else {
                    fn(vars);
                }
            }
        };
        function _loaderWrappers(conf) {
            var name = conf.format;
            if (name === "commonJS") {
                return {
                    fn: function commonJSWrapper(arg) {
                        return conf.deps && conf.deps.hasOwnProperty(arg) ? conf.deps[arg] : require(arg);
                    },
                    name: "require"
                };
            } else if (name === "amd") {
                var wrapperName = "define";
                return {
                    name: wrapperName,
                    fn: function wrapperFn(name, deps, factory) {
                        var _n, _d, _f;
                        switch (arguments.length) {
                          case 1:
                            _n = conf.name;
                            _f = name;
                            break;
                          case 2:
                            _d = name;
                            _f = deps;
                            break;
                          default:
                            _n = name;
                            _d = deps;
                            _f = factory;
                        }
                        if (_d) {
                            var newDeps = {};
                            for (var i = 0, _l = _d.length; i < _l; i++) {
                                newDeps[_d[i]] = {
                                    format: "amd",
                                    ref: _d[i]
                                };
                            }
                            _d = newDeps;
                        }
                        var modConf = {};
                        _d && (modConf.import = _d);
                        _n && (modConf.name = _n);
                        _f && (modConf.fn = _f);
                        modConf.src = conf.src;
                        applyConfiguration(modConf, function applyCallback(parsedConf) {
                            throw new Error("AMD not handled yet");
                            loadModule(parsedConf);
                        });
                    }
                };
            }
        }
        function parse(declaration, conf) {
            function pluginDeclaration(decl) {
                var plugins = decl.split(";"), pluginRe = /^\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\!([a-zA-Z_$][0-9a-zA-Z_$]*)\s*$/;
                for (var i = 0; i < plugins.length; i++) {
                    if (!plugins[i]) {
                        continue;
                    }
                    var plugin = plugins[i], match = plugin.match(pluginRe);
                    if (match) {
                        var pluginName = match[1];
                        argument = match[2];
                        if (!_plugins[pluginName]) {
                            return 'Unknown plugin "' + pluginName + '"';
                        }
                        var pluginResult = _plugins[pluginName](argument);
                        if (is(pluginResult, "string") || !pluginResult) {
                            return pluginResult;
                        }
                    } else {
                        return false;
                    }
                }
                return true;
            }
            var moduleObj = conf || {}, isPlugin = pluginDeclaration(declaration);
            if (is(isPlugin, "string")) {
                return isPlugin;
            } else if (isPlugin) {
                return moduleObj;
            }
            try {
                var module = parser.parse(declaration);
                return module;
            } catch (e) {
                return "Invalid declaration \n" + e.message + "\nDeclaration: " + declaration;
            }
        }
        function xhr(url) {
            var deferred = when.defer(), http = "XMLHttpRequest" in me ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            http.open("GET", url, true);
            http.setRequestHeader("Accept", "application/javascript, text/javascript");
            http.onreadystatechange = function onReadyStateChange() {
                if (this.readyState == 4) {
                    if (/^20\d$/.test(this.status)) {
                        deferred.resolve(http);
                    } else {
                        deferred.reject(this.status);
                    }
                }
            };
            http.send();
            return deferred.promise;
        }
        function serverModule(parsedURL) {
            var defer = when.defer();
            var get = require(parsedURL.protocol.indexOf("https") !== -1 ? "https" : "http").get;
            var newURL = {
                host: parsedURL.host,
                path: parsedURL.pathname
            };
            var data = "";
            parsedURL.port && (newURL.port = parsedURL.port);
            get(newURL, function(res) {
                res.on("data", function(chunk) {
                    data += chunk;
                });
                res.on("end", function() {
                    defer.resolve(data);
                });
                res.on("error", function(msg) {
                    defer.reject(msg);
                });
            });
            return defer;
        }
        function _registerModule(module, src, name) {
            if (src) {
                var existingMod = modules[src];
                if (existingMod && !when.isPromise(existingMod)) {
                    return "Duplicating module " + src;
                }
                modules[src] = module;
            }
            if (name) {
                var existingMod = modules[name];
                if (existingMod && !when.isPromise(existingMod)) {
                    return "Duplicating module " + name;
                }
                modules[name] = module;
            }
        }
        function loadClientSideModule(moduleConf, contents) {
            var conf = moduleConf.imports || {};
            var module;
            var wrapperConf;
            conf.window = {};
            for (var i in window) {
                conf.window[i] = window[i];
            }
            var returns = moduleConf.exports ? "{" + moduleConf.exports.map(function(v) {
                return v.dest + ":(" + [ "window." + v.src, "this." + v.src, v.src ].join("||") + ")";
            }).join(",") + "}" : "{}";
            var moduleArgs = [];
            var argsName = [];
            for (var i in conf) {
                if (conf.hasOwnProperty(i)) {
                    argsName.push(i);
                    moduleArgs.push(conf[i]);
                }
            }
            if (moduleConf.format && moduleConf.format.length) {
                wrapperConf = _loaderWrappers(moduleConf);
                argsName.push(wrapperConf.name);
                moduleArgs.push(wrapperConf.fn);
            }
            if (_debug) {
                var script = document.createElement("script"), head = document.getElementsByTagName("head")[0];
                script.type = "text/javascript";
                var extDepIndex = _extDepsCount++;
                script.innerHTML = "(function runner (" + argsName.join(", ") + ") {\n" + contents + "\n;s6d[" + extDepIndex + "](" + returns + ");\n}).apply({}, s6d[" + extDepIndex + "]())";
                moduleConf.src && script.setAttribute("data-src", moduleConf.src);
                moduleConf.name && script.setAttribute("name", moduleConf.name);
                me.s6d[extDepIndex] = function(exports) {
                    if (exports) {
                        delete me.s6d[extDepIndex];
                        var _err = _registerModule(module, moduleConf._internals.src, moduleConf.name);
                        if (_err) {
                            return _err;
                        }
                    }
                    return me.s6d[extDepIndex];
                };
                head.appendChild(script);
            } else {
                var fn;
                if (contents.apply && contents.call) {
                    fn = contents;
                } else {
                    fn = Function.apply({}, argsName.concat([ contents + ";\nreturn " + returns ]));
                }
                module = fn.apply({}, moduleArgs);
                var _err = _registerModule(module, moduleConf._internals.src, moduleConf.name);
                if (_err) {
                    return _err;
                }
                return module;
            }
        }
        function loadServerSideModule(moduleConf, contents) {
            var module;
            var wrapperConf;
            var vm = require("vm");
            var context = moduleConf.imports || {};
            if (moduleConf.format && moduleConf.format.length) {
                wrapperConf = _loaderWrappers(moduleConf);
                context[wrapperConf.name] = wrapperConf.fn;
            }
            context.returns = {};
            context.console = console;
            context.exports = {};
            context.module = {
                exports: {}
            };
            context.require = function(arg) {
                if (context[arg]) {
                    return context[arg];
                }
                return require(arg);
            };
            var returnStatement = moduleConf.exports ? moduleConf.exports.map(function(v) {
                return "returns." + v.dest + " = " + v.src;
            }).join(";\n") : "";
            vm.runInNewContext(contents + ";\n" + returnStatement, context, moduleConf._internals.src + ".vm");
            module = context.returns;
            for (var i in context.exports) {
                if (context.exports.hasOwnProperty(i)) {
                    module[i] = context.exports[i];
                }
            }
            for (var i in context.module.exports) {
                if (context.module.exports.hasOwnProperty(i)) {
                    module[i] = context.module.exports[i];
                }
            }
            var _err = _registerModule(module, moduleConf._internals.src, moduleConf.name);
            if (_err) {
                return _err;
            }
            return module;
        }
        function loadModule(moduleConf, contents) {
            !moduleConf && (moduleConf = {});
            if (!_isServer) {
                return loadClientSideModule(moduleConf, contents);
            } else {
                return loadServerSideModule(moduleConf, contents);
            }
        }
        function applyConfiguration(conf) {
            var moduleConf = {};
            var confPromises = [];
            moduleConf._internals = conf._internals;
            function importLoader(declaration) {
                moduleConf.imports = moduleConf.imports || {};
                var _dep = modules[declaration.from.path];
                if (_dep) {
                    if (when.isPromise(_dep)) {
                        _dep.then(function(module) {
                            for (var i = 0, _l = declaration.vars.length; i < _l; i++) {
                                var _importName = declaration.vars[i];
                                moduleConf.imports[_importName] = module[_importName];
                            }
                        });
                        confPromises.push(_dep);
                    } else {
                        for (var i = 0, _l = declaration.vars.length; i < _l; i++) {
                            var _importName = declaration.vars[i];
                            moduleConf.imports[_importName] = _dep[_importName];
                        }
                    }
                } else {
                    var _p = _module(declaration.from.path, function(module) {
                        for (var i = 0, _l = declaration.vars.length; i < _l; i++) {
                            var _importName = declaration.vars[i];
                            moduleConf.imports[_importName] = module[_importName];
                        }
                    });
                    if (!modules[declaration.from.path]) {
                        modules[declaration.from.path] = _p;
                    }
                    if (when.isPromise(modules[declaration.from.path])) {
                        confPromises.push(_p);
                    }
                }
            }
            function exportLoader(declaration) {
                for (var i = 0, _l = declaration.length; i < _l; i++) {
                    moduleConf.exports = moduleConf.exports || [];
                    moduleConf.exports.push({
                        src: declaration[i],
                        dest: declaration[i]
                    });
                }
            }
            function moduleLoader(declaration) {
                moduleConf.name = conf.decl.id;
                if (declaration.expressions) {
                    for (var i = 0, _l = declaration.expressions.length; i < _l; i++) {
                        var expr = declaration.expressions[i];
                        if (expr.type === "export") {
                            exportLoader(expr.decl);
                        } else if (expr.type === "import") {
                            importLoader(expr.decl);
                        } else if (expr.type === "module") {
                            moduleLoader(expr.decl);
                        }
                    }
                } else {
                    moduleConf.imports = moduleConf.imports || {};
                    var ref = declaration.path || declaration.src || declaration.id;
                    var _mod = modules[ref];
                    if (_mod) {
                        if (when.isPromise(_mod)) {
                            _mod.then(function(module) {
                                moduleConf.imports[declaration.id] = module;
                                return module;
                            });
                            confPromises.push(_mod);
                        } else {
                            moduleConf.imports[declaration.id] = _mod;
                        }
                    } else if (declaration.path) {
                        var _p = _module(declaration.path, function(module) {
                            moduleConf.imports[declaration.id] = module;
                            return moduleConf;
                        });
                        if (!modules[declaration.path]) {
                            modules[declaration.path] = _p;
                        }
                        if (when.isPromise(modules[declaration.path])) {
                            confPromises.push(_p);
                        }
                    } else {
                        if (_isServer) {
                            var _dep;
                            try {
                                _dep = require(declaration.src);
                            } catch (e) {
                                throw new Error("The required module %1 doesn't exist".replace("%1", declaration.src));
                            }
                            moduleConf.imports[declaration.id] = _dep;
                        } else {
                            throw new Error("The required module %1 doesn't exist".replace("%1", declaration.src));
                        }
                    }
                }
            }
            if (conf.type === "module") {
                moduleConf.name = conf.decl.id;
                moduleLoader(conf.decl);
            } else if (conf.type === "export") {
                exportLoader(conf.decl);
            } else if (conf.type === "import") {
                importLoader(conf.decl);
            }
            var defer = when.all(confPromises).then(function() {
                return moduleConf;
            }, function() {
                return new Error("Error while loading " + moduleConf._internals.src);
            });
            return defer;
        }
        function _moduleSrc(conf) {
            var defer = when.defer(), moduleConf = conf || {}, rawText = conf.contents ? conf.contents : "", declaration = "";
            var comments = rawText.match(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg);
            if (!comments) {
                var module = loadModule({
                    _internals: {
                        src: conf.src
                    }
                }, rawText);
                if (typeof module === "string") {
                    return defer.reject(module);
                }
                return defer.resolve(module);
            }
            var split = comments[0].split("\n");
            for (var j = 0, _l2 = split.length; j < _l2; j++) {
                declaration += split[j].trim().replace(/(^\/\*+)|(\*+\/?)/, "");
            }
            if (declaration.length) {
                moduleConf = parse(declaration, moduleConf);
                if (is(moduleConf, "string")) {
                    defer.reject(moduleConf);
                } else {
                    var usedConf = moduleConf[0];
                    usedConf._internals = {
                        src: conf.src,
                        contents: rawText
                    };
                    when(applyConfiguration(usedConf)).then(function(moduleConf) {
                        var module = loadModule(moduleConf, moduleConf._internals.contents);
                        defer.resolve(module);
                        return module;
                    }, function(e) {
                        defer.reject(e);
                        return e;
                    });
                }
            } else {
                var module = loadModule({
                    _internals: {
                        src: conf.src
                    }
                }, rawText);
                defer.resolve(module);
                return module;
            }
            return defer.promise || defer;
        }
        function _serverPathDetection(uri) {
            var path;
            try {
                path = require.resolve(uri);
            } catch (e) {}
            try {
                path = !path ? require("fs").statSync(__dirname + "/" + uri).isFile() && __dirname + "/" + uri : path;
            } catch (e) {}
            try {
                path = !path ? require("fs").statSync(process.cwd() + "/" + uri).isFile() && process.cwd() + "/" + uri : path;
            } catch (e) {}
            return path;
        }
        function _module(moduleSrc, callback, errorFn) {
            if (modules.hasOwnProperty(moduleSrc)) {
                if (!when.isPromise(modules[moduleSrc])) {
                    callback(modules[moduleSrc]);
                }
                return modules[moduleSrc];
            }
            function _error(msg) {
                _errModules = _errModules || [];
                _errModules.indexOf(moduleSrc) === -1 && _errModules.push(moduleSrc);
                if (is(errorFn, "function")) {
                    errorFn();
                } else {
                    console && console.error("(" + moduleSrc + ") " + msg);
                    return new Error("(" + moduleSrc + ") " + msg);
                }
            }
            _error.origFn = errorFn;
            var modulePromise = when.defer();
            modulePromise.then(callback, _error);
            var moduleConf = is(moduleSrc, "string") ? {
                src: moduleSrc
            } : moduleSrc;
            !moduleConf.format && _isServer && (moduleConf.format = "commonJS");
            var uri = is(moduleSrc, "string") ? moduleSrc : moduleSrc.name;
            if (uri) {
                if (!_isServer) {
                    when(xhr(uri)).then(function xhrSuccess(res) {
                        var responseText = res.responseText;
                        moduleConf.contents = responseText;
                        when(_moduleSrc(moduleConf)).then(function(conf) {
                            modulePromise.resolve(conf);
                            return conf;
                        }, function(msg) {
                            modulePromise.reject(msg);
                        });
                    }, function xhrError(code) {
                        _error('Unable to fetch the module "' + moduleSrc + '" (status code: ' + code + ")");
                    });
                    return modulePromise.promise;
                } else {
                    var modPath, url = require("url"), parsedURL = url.parse(uri);
                    if (parsedURL.host) {
                        when(serverModule(parsedURL)).then(function(moduleSrc) {
                            moduleConf.contents = moduleSrc;
                            when(_moduleSrc(moduleConf)).then(function(conf) {
                                modulePromise.resolve(conf);
                                return conf;
                            }, function(msg) {
                                modulePromise.reject(msg);
                            });
                        }, function xhrError(msg) {
                            _error('Unable to fetch the module "' + uri + '" because: ' + msg);
                        });
                        return modulePromise.promise;
                    } else {
                        modPath = _serverPathDetection(uri);
                        if (!modPath) {
                            modulePromise.reject("Unable to locate file " + uri);
                            return modulePromise;
                        } else if (is(modPath, "object")) {
                            moduleConf.deps = moduleConf.deps || {};
                            moduleConf.deps[modPath.uri] = modPath.node_module;
                        } else {
                            try {
                                moduleConf.contents = require("fs").readFileSync(modPath, "utf-8");
                            } catch (e) {
                                modulePromise.reject(e.message);
                                return modulePromise;
                            }
                        }
                        when(_moduleSrc(moduleConf)).then(function(conf) {
                            modulePromise.resolve(conf);
                            return conf;
                        }, function(msg) {
                            modulePromise.reject(msg);
                        });
                        return modulePromise.promise || modulePromise;
                    }
                }
            } else {
                if (is(moduleSrc, "object")) {
                    when(_moduleSrc(moduleSrc)).then(function(conf) {
                        modulePromise.resolve(conf);
                        return conf;
                    }, function(msg) {
                        modulePromise.reject(msg);
                    });
                }
                return modulePromise;
            }
        }
        function initConfig(confs) {
            for (var i = 0; i < confs.length; i++) {
                var confStr = confs[i];
                var conf;
                if (is(JSON, "object")) {
                    conf = JSON.parse(confStr);
                } else {
                    var confFn = new Function("return " + confStr);
                    conf = confFn();
                }
                for (var prop in conf) {
                    if (!conf.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (prop in _plugins) {
                        _plugins[prop](conf[prop]);
                    } else if (prop == "debug") {
                        _debug = conf[prop];
                    }
                }
            }
        }
        function initModules(modules) {
            for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                var moduleSrc = module.getAttribute("data-src");
                moduleSrc && !modules.hasOwnProperty(moduleSrc) && _module(moduleSrc);
                !moduleSrc && module.innerHTML && _moduleSrc({
                    contents: module.innerHTML
                });
            }
        }
        !_isServer && me.addEventListener && me.addEventListener("load", function onReady() {
            var confs = [];
            var modules = [];
            for (var i = 0; i < document.scripts.length; i++) {
                var script = document.scripts[i], srcAttr = script.getAttribute("type");
                if (srcAttr == "text/shepherd-js") {
                    modules.push(script);
                } else if (srcAttr == "text/shepherd-js/config") {
                    confs.push(script.innerHTML.trim());
                }
            }
            initConfig(confs);
            initModules(modules);
        });
        if (typeof MINIFY == "undefined") {
            var _errCb;
            me.s6d = function(modulePath, cb) {
                if (is(modulePath, "object")) {
                    initConfig([ modulePath ]);
                } else {
                    _module(modulePath, cb, _errCb);
                }
            };
            me.s6d.src = function(moduleSrc, cb) {
                _moduleSrc({
                    contents: moduleSrc
                }, cb, _errCb);
            };
            me.s6d.get = function(moduleName) {
                if (moduleName) {
                    return modules[moduleName];
                } else {
                    return modules;
                }
            };
            me.s6d.error = function(cb) {
                if (arguments.length === 0) {
                    return _errModules;
                }
                _errCb = cb;
            };
            me.s6d.reset = function() {
                _errCb = undefined;
                modules = {};
                _errModules = null;
            };
            if (_isServer) {
                exports = module.exports = me.s6d;
            }
        }
    })(this, harmonyParser, when);
})();