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
                    EOF: 4,
                    ProgramElement: 5,
                    ModuleDeclaration: 6,
                    ImportDeclaration: 7,
                    ExportDeclaration: 8,
                    ModuleSpecifier: 9,
                    Path: 10,
                    String: 11,
                    module: 12,
                    Id: 13,
                    at: 14,
                    SEMICOLON: 15,
                    IS: 16,
                    ImportSource: 17,
                    OPEN_BRACE: 18,
                    ModuleBody: 19,
                    CLOSE_BRACE: 20,
                    from: 21,
                    "import": 22,
                    ImportSpecifierSet: 23,
                    WILDCARD: 24,
                    ImportSpecifier: 25,
                    ImportSpecifierNext: 26,
                    COMMA: 27,
                    COLON: 28,
                    "export": 29,
                    ExportSpecifierSet: 30,
                    ExportSpecifierSetNext: 31,
                    ExportSpecifier: 32,
                    ExportSpecifierNext: 33,
                    ModuleElement: 34,
                    PERIOD: 35,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    4: "EOF",
                    11: "String",
                    12: "module",
                    13: "Id",
                    14: "at",
                    15: "SEMICOLON",
                    16: "IS",
                    18: "OPEN_BRACE",
                    20: "CLOSE_BRACE",
                    21: "from",
                    22: "import",
                    24: "WILDCARD",
                    27: "COMMA",
                    28: "COLON",
                    29: "export",
                    35: "PERIOD"
                },
                productions_: [ 0, [ 3, 1 ], [ 3, 2 ], [ 5, 1 ], [ 5, 1 ], [ 5, 1 ], [ 9, 1 ], [ 9, 1 ], [ 6, 5 ], [ 6, 5 ], [ 6, 5 ], [ 17, 1 ], [ 17, 3 ], [ 7, 5 ], [ 23, 1 ], [ 23, 1 ], [ 23, 4 ], [ 26, 3 ], [ 26, 0 ], [ 25, 1 ], [ 25, 3 ], [ 8, 4 ], [ 31, 3 ], [ 31, 0 ], [ 30, 4 ], [ 30, 1 ], [ 30, 1 ], [ 30, 3 ], [ 32, 1 ], [ 32, 3 ], [ 33, 3 ], [ 33, 0 ], [ 19, 2 ], [ 19, 2 ], [ 19, 2 ], [ 19, 0 ], [ 34, 1 ], [ 34, 1 ], [ 10, 1 ], [ 10, 3 ] ],
                performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
                    var $0 = $$.length - 1;
                    switch (yystate) {
                      case 1:
                        return {};
                        break;
                      case 2:
                        return $$[$0 - 1];
                        break;
                      case 3:
                        this.$ = {
                            type: "module",
                            decl: $$[$0]
                        };
                        break;
                      case 4:
                        this.$ = {
                            type: "import",
                            decl: $$[$0]
                        };
                        break;
                      case 5:
                        this.$ = {
                            type: "export",
                            decl: $$[$0]
                        };
                        break;
                      case 6:
                        this.$ = {
                            type: "module",
                            path: $$[$0]
                        };
                        break;
                      case 7:
                        this.$ = {
                            type: "uri",
                            path: $$[$0].replace(/^['"]/, "").replace(/['"]$/, "")
                        };
                        break;
                      case 8:
                        this.$ = {
                            id: $$[$0 - 3],
                            path: $$[$0 - 1]
                        };
                        break;
                      case 9:
                        this.$ = {
                            id: $$[$0 - 3],
                            src: $$[$0 - 1]
                        };
                        break;
                      case 10:
                        this.$ = {
                            id: $$[$0 - 3],
                            expressions: $$[$0 - 1]
                        };
                        break;
                      case 11:
                        this.$ = $$[$0];
                        break;
                      case 12:
                        var out = {
                            id: $$[$0 - 2]
                        };
                        out[$$[$0].type] = $$[$0].path;
                        this.$ = out;
                        break;
                      case 13:
                        this.$ = {
                            from: $$[$0 - 1],
                            vars: $$[$0 - 3]
                        };
                        break;
                      case 14:
                        this.$ = [ $$[$0] ];
                        break;
                      case 15:
                        this.$ = [ $$[$0] ];
                        break;
                      case 16:
                        this.$ = [ $$[$0 - 2] ].concat($$[$0 - 1]);
                        break;
                      case 17:
                        this.$ = typeof $$[$0] != "undefined" ? [ $$[$0 - 1] ].concat($$[$0]) : $$[$0 - 1];
                        break;
                      case 19:
                        this.$ = $$[$0];
                        break;
                      case 20:
                        this.$ = {
                            remote: $$[$0 - 2],
                            local: $$[$0]
                        };
                        break;
                      case 21:
                        this.$ = typeof $$[$0 - 1] != "undefined" ? $$[$0 - 2].concat($$[$0 - 1]) : $$[$0 - 2];
                        break;
                      case 22:
                        this.$ = typeof $$[$0] != "undefined" ? $$[$0 - 1].concat($$[$0]) : $$[$0 - 1];
                        break;
                      case 24:
                        this.$ = typeof $$[$0 - 1] != "undefined" ? [ $$[$0 - 2] ].concat($$[$0 - 1]) : [ $$[$0 - 2] ];
                        break;
                      case 25:
                        this.$ = [ $$[$0] ];
                        break;
                      case 26:
                        this.$ = [ $$[$0] ];
                        break;
                      case 27:
                        this.$ = [ {
                            from: $$[$0]
                        } ];
                        break;
                      case 28:
                        this.$ = $$[$0];
                        break;
                      case 29:
                        this.$ = {
                            local: $$[$0 - 2],
                            remote: $$[$0]
                        };
                        break;
                      case 30:
                        this.$ = typeof $$[$0] != "undefined" ? [ $$[$0 - 1] ].concat($$[$0]) : [ $$[$0 - 1] ];
                        break;
                      case 32:
                        this.$ = [ {
                            type: "module",
                            decl: $$[$0 - 1]
                        } ].concat($$[$0]);
                        break;
                      case 33:
                        this.$ = [ {
                            type: "import",
                            decl: $$[$0 - 1]
                        } ].concat($$[$0]);
                        break;
                      case 34:
                        this.$ = [ {
                            type: "export",
                            decl: $$[$0 - 1]
                        } ].concat($$[$0]);
                        break;
                      case 35:
                        this.$ = [];
                        break;
                      case 36:
                        this.$ = $$[$0];
                        break;
                      case 37:
                        this.$ = $$[$0];
                        break;
                      case 38:
                        this.$ = $$[$0];
                        break;
                      case 39:
                        this.$ = $$[$0 - 2] + "." + $$[$0];
                        break;
                    }
                },
                table: [ {
                    3: 1,
                    4: [ 1, 2 ],
                    5: 3,
                    6: 4,
                    7: 5,
                    8: 6,
                    12: [ 1, 7 ],
                    22: [ 1, 8 ],
                    29: [ 1, 9 ]
                }, {
                    1: [ 3 ]
                }, {
                    1: [ 2, 1 ]
                }, {
                    4: [ 1, 10 ]
                }, {
                    4: [ 2, 3 ]
                }, {
                    4: [ 2, 4 ]
                }, {
                    4: [ 2, 5 ]
                }, {
                    13: [ 1, 11 ]
                }, {
                    13: [ 1, 13 ],
                    18: [ 1, 15 ],
                    23: 12,
                    24: [ 1, 14 ]
                }, {
                    13: [ 1, 18 ],
                    18: [ 1, 17 ],
                    24: [ 1, 19 ],
                    30: 16
                }, {
                    1: [ 2, 2 ]
                }, {
                    14: [ 1, 20 ],
                    16: [ 1, 21 ],
                    18: [ 1, 22 ]
                }, {
                    21: [ 1, 23 ]
                }, {
                    21: [ 2, 14 ]
                }, {
                    21: [ 2, 15 ]
                }, {
                    13: [ 1, 25 ],
                    25: 24
                }, {
                    15: [ 2, 23 ],
                    27: [ 1, 27 ],
                    31: 26
                }, {
                    13: [ 1, 29 ],
                    32: 28
                }, {
                    15: [ 2, 25 ],
                    27: [ 2, 25 ]
                }, {
                    15: [ 2, 26 ],
                    21: [ 1, 30 ],
                    27: [ 2, 26 ]
                }, {
                    11: [ 1, 31 ]
                }, {
                    13: [ 1, 33 ],
                    17: 32
                }, {
                    6: 35,
                    7: 36,
                    8: 37,
                    12: [ 1, 7 ],
                    19: 34,
                    20: [ 2, 35 ],
                    22: [ 1, 8 ],
                    29: [ 1, 9 ]
                }, {
                    9: 38,
                    10: 39,
                    11: [ 1, 40 ],
                    13: [ 1, 41 ]
                }, {
                    20: [ 2, 18 ],
                    26: 42,
                    27: [ 1, 43 ]
                }, {
                    20: [ 2, 19 ],
                    27: [ 2, 19 ],
                    28: [ 1, 44 ]
                }, {
                    15: [ 1, 45 ]
                }, {
                    13: [ 1, 18 ],
                    18: [ 1, 17 ],
                    24: [ 1, 19 ],
                    30: 46
                }, {
                    20: [ 2, 31 ],
                    27: [ 1, 48 ],
                    33: 47
                }, {
                    20: [ 2, 28 ],
                    27: [ 2, 28 ],
                    28: [ 1, 49 ]
                }, {
                    10: 50,
                    13: [ 1, 41 ]
                }, {
                    15: [ 1, 51 ]
                }, {
                    15: [ 1, 52 ]
                }, {
                    15: [ 2, 11 ],
                    21: [ 1, 53 ]
                }, {
                    20: [ 1, 54 ]
                }, {
                    6: 35,
                    7: 36,
                    8: 37,
                    12: [ 1, 7 ],
                    19: 55,
                    20: [ 2, 35 ],
                    22: [ 1, 8 ],
                    29: [ 1, 9 ]
                }, {
                    6: 35,
                    7: 36,
                    8: 37,
                    12: [ 1, 7 ],
                    19: 56,
                    20: [ 2, 35 ],
                    22: [ 1, 8 ],
                    29: [ 1, 9 ]
                }, {
                    6: 35,
                    7: 36,
                    8: 37,
                    12: [ 1, 7 ],
                    19: 57,
                    20: [ 2, 35 ],
                    22: [ 1, 8 ],
                    29: [ 1, 9 ]
                }, {
                    15: [ 1, 58 ]
                }, {
                    15: [ 2, 6 ]
                }, {
                    15: [ 2, 7 ]
                }, {
                    15: [ 2, 38 ],
                    20: [ 2, 38 ],
                    27: [ 2, 38 ],
                    35: [ 1, 59 ]
                }, {
                    20: [ 1, 60 ]
                }, {
                    13: [ 1, 25 ],
                    25: 61
                }, {
                    10: 62,
                    13: [ 1, 41 ]
                }, {
                    4: [ 2, 21 ],
                    12: [ 2, 21 ],
                    20: [ 2, 21 ],
                    22: [ 2, 21 ],
                    29: [ 2, 21 ]
                }, {
                    15: [ 2, 23 ],
                    27: [ 1, 27 ],
                    31: 63
                }, {
                    20: [ 1, 64 ]
                }, {
                    13: [ 1, 29 ],
                    32: 65
                }, {
                    10: 66,
                    13: [ 1, 41 ]
                }, {
                    15: [ 2, 27 ],
                    27: [ 2, 27 ]
                }, {
                    4: [ 2, 8 ],
                    12: [ 2, 8 ],
                    20: [ 2, 8 ],
                    22: [ 2, 8 ],
                    29: [ 2, 8 ]
                }, {
                    4: [ 2, 9 ],
                    12: [ 2, 9 ],
                    20: [ 2, 9 ],
                    22: [ 2, 9 ],
                    29: [ 2, 9 ]
                }, {
                    9: 67,
                    10: 39,
                    11: [ 1, 40 ],
                    13: [ 1, 41 ]
                }, {
                    4: [ 2, 10 ],
                    12: [ 2, 10 ],
                    20: [ 2, 10 ],
                    22: [ 2, 10 ],
                    29: [ 2, 10 ]
                }, {
                    20: [ 2, 32 ]
                }, {
                    20: [ 2, 33 ]
                }, {
                    20: [ 2, 34 ]
                }, {
                    4: [ 2, 13 ],
                    12: [ 2, 13 ],
                    20: [ 2, 13 ],
                    22: [ 2, 13 ],
                    29: [ 2, 13 ]
                }, {
                    10: 68,
                    13: [ 1, 41 ]
                }, {
                    21: [ 2, 16 ]
                }, {
                    20: [ 2, 18 ],
                    26: 69,
                    27: [ 1, 43 ]
                }, {
                    20: [ 2, 20 ],
                    27: [ 2, 20 ]
                }, {
                    15: [ 2, 22 ]
                }, {
                    15: [ 2, 24 ],
                    27: [ 2, 24 ]
                }, {
                    20: [ 2, 31 ],
                    27: [ 1, 48 ],
                    33: 70
                }, {
                    20: [ 2, 29 ],
                    27: [ 2, 29 ]
                }, {
                    15: [ 2, 12 ]
                }, {
                    15: [ 2, 39 ],
                    20: [ 2, 39 ],
                    27: [ 2, 39 ]
                }, {
                    20: [ 2, 17 ]
                }, {
                    20: [ 2, 30 ]
                } ],
                defaultActions: {
                    2: [ 2, 1 ],
                    4: [ 2, 3 ],
                    5: [ 2, 4 ],
                    6: [ 2, 5 ],
                    10: [ 2, 2 ],
                    13: [ 2, 14 ],
                    14: [ 2, 15 ],
                    39: [ 2, 6 ],
                    40: [ 2, 7 ],
                    55: [ 2, 32 ],
                    56: [ 2, 33 ],
                    57: [ 2, 34 ],
                    60: [ 2, 16 ],
                    63: [ 2, 22 ],
                    67: [ 2, 12 ],
                    69: [ 2, 17 ],
                    70: [ 2, 30 ]
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
                        return 14;
                        break;
                      case 11:
                        return 16;
                        break;
                      case 12:
                        return 21;
                        break;
                      case 13:
                        return "WILDCARD";
                        break;
                      case 14:
                        return 27;
                        break;
                      case 15:
                        return 35;
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
                        return 4;
                        break;
                    }
                };
                lexer.rules = [ /^\n+/, /^\s+/, /^\t+/, /^;/, /^:/, /^\{/, /^\}/, /^module\b/, /^import\b/, /^export\b/, /^at\b/, /^is\b/, /^from\b/, /^\*/, /^,/, /^\./, /^[a-zA-Z_$][0-9a-zA-Z_$]*/, /^'.+'/, /^".+"/, /^$/ ];
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
    (function(me, parser) {
        if (typeof parser.parse !== "function") {
            throw "No parser provided.";
        }
        var is = function(obj, type) {
            return Object.prototype.toString.call(obj).toLowerCase() == "[object " + type.toLowerCase() + "]";
        };
        var undefined = arguments[arguments.length];
        var modules = {}, _errCb, _errModules = null, _isServer = typeof window == "undefined", _extDepsCount = 0, _debug;
        var _plugins = {
            modularize: function(vars) {
                var fn = function(globalVar) {
                    if (!me.hasOwnProperty(globalVar)) {
                        return 'No global "' + globalVar + '"';
                    }
                    modules[globalVar] = me[globalVar];
                    return true;
                };
                if (is(vars, "array")) {
                    for (var i = 0; i < vars.length; i++) {
                        fn(vars[i]);
                    }
                } else {
                    fn(vars);
                }
            },
            noGlobal: function(vars) {
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
        var _loaderWrappers = function(conf) {
            var name = conf.format;
            if (name === "commonJS") {
                return {
                    fn: function(arg) {
                        return conf.deps && conf.deps.hasOwnProperty(arg) ? conf.deps[arg] : require(arg);
                    },
                    name: "require"
                };
            } else if (name === "amd") {
                var wrapperFn = function(name, deps, factory) {
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
                        var deps = {};
                        for (var i = 0, _l = _d.length; i < _l; i++) {
                            deps[_d[i]] = {
                                format: "amd",
                                ref: _d[i]
                            };
                        }
                        _d = deps;
                    }
                    var modConf = {};
                    _d && (modConf.import = _d);
                    _n && (modConf.name = _n);
                    _f && (modConf.fn = _f);
                    modConf.src = conf.src;
                    applyConfiguration(modConf, function(parsedConf) {
                        loadModule(parsedConf);
                    });
                };
                var wrapperName = "define";
                return {
                    fn: wrapperFn,
                    name: wrapperName
                };
            }
        };
        function parse(declaration, conf) {
            function pluginDeclaration(decl, conf) {
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
            var moduleObj = conf || {}, isPlugin = pluginDeclaration(declaration, moduleObj);
            if (is(isPlugin, "string")) {
                return isPlugin;
            } else if (isPlugin) {
                return moduleObj;
            }
            try {
                var module = parser.parse(declaration);
                if (typeof MINIFY == "undefined") {
                    console.log(module);
                }
                return _module;
            } catch (e) {
                return "Invalid declaration \n" + e.message + "\nDeclaration: " + declaration;
            }
        }
        var xhr = function(o) {
            var http = "XMLHttpRequest" in me ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            http.open("GET", o.url, true);
            http.setRequestHeader("Accept", "application/javascript, text/javascript");
            http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (/^20\d$/.test(this.status)) {
                        o.success && o.success(http);
                        o.complete && o.complete(http);
                    } else {
                        o.error && o.error(http);
                        o.complete && o.complete(http);
                    }
                }
            };
            http.send();
        };
        var _handleExports = function(module, moduleConf, callback) {
            moduleConf.src && (modules[moduleConf.src] = module);
            if (moduleConf.hasOwnProperty("name")) {
                moduleConf.name && (modules[moduleConf.name] = module);
            } else {
                for (var i in module) {
                    if (module.hasOwnProperty(i)) {
                        modules[i] = module[i];
                    }
                }
            }
            if (is(callback, "function")) {
                callback(module || {});
            }
        };
        var loadModule = function(moduleConf, callback) {
            !moduleConf && (moduleConf = {});
            var conf = moduleConf.deps || {};
            var module;
            var wrapperConf;
            if (!_isServer) {
                conf.window = {
                    document: window.document,
                    navigator: window.navigator,
                    location: window.location
                };
                var returns = moduleConf.export ? "{" + moduleConf.export.map(function(v) {
                    return v.dest + ":" + v.src;
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
                    script.innerHTML = "(function (" + argsName.join(", ") + ") {\n" + moduleConf.contents + "\n;s6d[" + extDepIndex + "](" + returns + ");\n}).apply({}, s6d[" + extDepIndex + "]())";
                    moduleConf.src && script.setAttribute("data-src", moduleConf.src);
                    moduleConf.name && script.setAttribute("name", moduleConf.name);
                    me.s6d[extDepIndex] = function(exports) {
                        if (exports) {
                            delete me.s6d[extDepIndex];
                            _handleExports(exports, moduleConf, callback);
                            return;
                        }
                        return moduleArgs;
                    };
                    head.appendChild(script);
                } else {
                    var fn = moduleConf.fn || Function.apply({}, argsName.concat([ moduleConf.contents + ";\nreturn " + returns ]));
                    module = fn.apply({}, moduleArgs);
                    _handleExports(module, moduleConf, callback);
                }
            } else {
                var vm = require("vm");
                var context = conf;
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
                var returnStatement = moduleConf.export ? moduleConf.export.map(function(v) {
                    return "returns." + v.dest + " = " + v.src;
                }).join(";\n") : "";
                vm.runInNewContext(moduleConf.contents + ";\n" + returnStatement, context, moduleConf.src + ".vm");
                module = context.returns;
                for (var i in context.exports) {
                    if (context.exports.hasOwnProperty(i)) {
                        console.log('Exporting "' + i + '" from the exports variable.');
                        module[i] = context.exports[i];
                    }
                }
                for (var i in context.module.exports) {
                    if (context.module.exports.hasOwnProperty(i)) {
                        console.log('Exporting "' + i + '" from the module.exports variable.');
                        module[i] = context.module.exports[i];
                    }
                }
                _handleExports(module, moduleConf, callback);
            }
        };
        var applyConfiguration = function(conf, callback, errorFn) {
            var depsPool = function() {
                var _c = 0;
                for (var i in conf.import) {
                    conf.import.hasOwnProperty(i) && _c++;
                }
                for (var i in conf.modules) {
                    conf.modules.hasOwnProperty(i) && _c++;
                }
                for (var i in conf.modulesByURI) {
                    conf.modulesByURI.hasOwnProperty(i) && _c++;
                }
                return function() {
                    !--_c && callback(conf);
                };
            }();
            var importsLoader = function(name, ref) {
                if (modules[ref.ref]) {
                    conf.deps[name] = modules[ref.ref][i];
                    depsPool();
                } else {
                    _module({
                        name: ref.ref || name,
                        format: ref.format
                    }, function(module) {
                        conf.deps[name] = module[name || ref.ref];
                        depsPool();
                    }, errorFn);
                }
            };
            var modulesLoader = function(name, ref) {
                if (modules[ref]) {
                    conf.deps[name] = modules[ref];
                    depsPool();
                } else {
                    _module(ref || name, function(module) {
                        conf.deps[name] = module;
                        depsPool();
                    }, errorFn);
                }
            };
            var modulesLoaderByRef = function(name, ref) {
                var mod = modules[ref];
                if (!mod) {
                    if (_isServer) {
                        mod = modules[ref] = require(ref);
                    } else {
                        throw new Error("Unable to load the module " + name);
                    }
                }
                conf.deps[name] = mod;
                depsPool();
            };
            conf.deps = {};
            for (var i in conf.import) {
                conf.import.hasOwnProperty(i) && importsLoader(i, conf.import[i]);
            }
            for (var i in conf.modules) {
                conf.modules.hasOwnProperty(i) && modulesLoaderByRef(i, conf.modules[i]);
            }
            for (var i in conf.modulesByURI) {
                conf.modulesByURI.hasOwnProperty(i) && modulesLoader(i, conf.modulesByURI[i]);
            }
            if (!conf.import && !conf.modules && !conf.modulesByURI) {
                return callback(conf);
            }
        };
        var _moduleSrc = function(conf, callback, errorFn) {
            var moduleConf = conf || {}, callback = callback || function() {}, errorFn = errorFn || function() {}, rawText = conf.contents ? conf.contents : [], text = rawText.split("\n"), declaration = [], endComment = false, inComment = false;
            var declaration = "";
            var comments = rawText.match(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg);
            if (!comments) {
                return loadModule(moduleConf, callback);
            }
            var split = comments[0].split("\n");
            for (var j = 0, _l2 = split.length; j < _l2; j++) {
                declaration += split[j].trim().replace(/(^\/\*+)|(\*+\/?)/, "");
            }
            if (declaration.length) {
                moduleConf = parse(declaration, moduleConf);
                if (is(moduleConf, "string")) {
                    errorFn(moduleConf);
                } else {
                    applyConfiguration(moduleConf, function(parsedConf) {
                        loadModule(parsedConf, callback);
                    }, errorFn.origFn);
                }
            } else {
                loadModule(moduleConf, callback);
            }
        };
        var _serverPathDetection = function(uri) {
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
        };
        var _module = function(moduleSrc, callback, errorFn) {
            var _error = function(msg) {
                _errModules = _errModules || [];
                _errModules.indexOf(moduleSrc) === -1 && _errModules.push(moduleSrc);
                if (is(errorFn, "function")) {
                    errorFn();
                } else {
                    throw new Error("(" + moduleSrc + ") " + msg);
                }
            };
            _error.origFn = errorFn;
            var moduleConf = is(moduleSrc, "string") ? {
                src: moduleSrc
            } : moduleSrc;
            !moduleConf.format && _isServer && (moduleConf.format = "commonJS");
            var uri = is(moduleSrc, "string") ? moduleSrc : moduleSrc.name;
            if (uri) {
                !_isServer && xhr({
                    url: uri,
                    error: function() {
                        _error('Unable to fetch the module "' + moduleSrc + '"');
                    },
                    success: function(res) {
                        var responseText = res.responseText;
                        moduleConf.contents = responseText;
                        _moduleSrc(moduleConf, callback, _error);
                    }
                });
                if (_isServer) {
                    var modPath, url = require("url"), parsedURL = url.parse(uri);
                    if (parsedURL.host) {
                        var get = require(parsedURL.protocol.indexOf("https") !== -1 ? "https" : "http").get;
                        var newURL = {
                            host: parsedURL.host,
                            path: parsedURL.pathname
                        };
                        parsedURL.port && (newURL.port = parsedURL.port);
                        get(newURL, function(res) {
                            var data = "";
                            res.on("data", function(chunk) {
                                data += chunk;
                            });
                            res.on("end", function() {
                                moduleConf.contents = data;
                                _moduleSrc(moduleConf, callback, _error);
                            });
                            res.on("error", _error);
                        });
                    } else {
                        var modPath = _serverPathDetection(uri);
                        if (!modPath) {
                            _error("Unable to locate file " + uri);
                            return;
                        } else if (is(modPath, "object")) {
                            moduleConf.deps = moduleConf.deps || {};
                            moduleConf.deps[modPath.uri] = modPath.node_module;
                        } else {
                            try {
                                moduleConf.contents = require("fs").readFileSync(modPath, "utf-8");
                            } catch (e) {
                                _error(e.message);
                                return;
                            }
                        }
                        _moduleSrc(moduleConf, callback, _error);
                    }
                }
            } else {
                is(moduleSrc, "object") && _moduleSrc(moduleSrc, callback, _error);
            }
        };
        var initConfig = function(confs) {
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
        };
        var initModules = function(modules) {
            for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                var moduleSrc = module.getAttribute("data-src");
                moduleSrc && !modules.hasOwnProperty(moduleSrc) && _module(moduleSrc);
                !moduleSrc && module.innerHTML && _moduleSrc({
                    contents: module.innerHTML
                });
            }
        };
        !_isServer && me.addEventListener && me.addEventListener("load", function() {
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
                return modules[moduleName];
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
    })(this, harmonyParser);
})();