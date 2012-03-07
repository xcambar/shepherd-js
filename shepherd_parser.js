/* Jison generated parser */
var shepherd_parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"EOF":4,"ProgramElement":5,"ModuleDeclaration":6,"ImportDeclaration":7,"ExportDeclaration":8,"ModuleSpecifier":9,"Path":10,"String":11,"module":12,"Id":13,"at":14,"SEMICOLON":15,"IS":16,"ImportSource":17,"OPEN_BRACE":18,"ModuleBody":19,"CLOSE_BRACE":20,"from":21,"import":22,"ImportSpecifierSet":23,"WILDCARD":24,"ImportSpecifier":25,"ImportSpecifierNext":26,"COMMA":27,"COLON":28,"export":29,"ExportSpecifierSet":30,"ExportSpecifierSetNext":31,"ExportSpecifier":32,"ExportSpecifierNext":33,"ModuleElement":34,"PERIOD":35,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",11:"String",12:"module",13:"Id",14:"at",15:"SEMICOLON",16:"IS",18:"OPEN_BRACE",20:"CLOSE_BRACE",21:"from",22:"import",24:"WILDCARD",27:"COMMA",28:"COLON",29:"export",35:"PERIOD"},
productions_: [0,[3,1],[3,2],[5,1],[5,1],[5,1],[9,1],[9,1],[6,5],[6,5],[6,5],[17,1],[17,3],[7,5],[23,1],[23,1],[23,4],[26,3],[26,0],[25,1],[25,3],[8,4],[31,3],[31,0],[30,4],[30,1],[30,1],[32,1],[32,3],[33,3],[33,0],[19,2],[19,2],[19,0],[34,1],[34,1],[10,1],[10,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return {}
break;
case 2:return $$[$0-1]
break;
case 3:this.$ = {type: 'module', decl: $$[$0]};
break;
case 4:this.$ = {type: 'import', decl: $$[$0]};
break;
case 5:this.$ = {type: 'export', decl: $$[$0]};
break;
case 6:this.$ = {type: 'module', path: $$[$0]}
break;
case 7:this.$ = {type: 'uri', path: $$[$0]}
break;
case 8:this.$ = {id: $$[$0-3], path: $$[$0-1]}
break;
case 9:this.$ = {id: $$[$0-3], src: $$[$0-1]}
break;
case 10:this.$ = {id: $$[$0-3], contents: $$[$0-1]}
break;
case 11:this.$ = $$[$0]
break;
case 12:var out = {id: $$[$0-2]}; out[$$[$0].type] = $$[$0].path; this.$ = out;
break;
case 13:var out = {specifiers: $$[$0-3]}; out[$$[$0-1].type] = $$[$0-1].path; this.$ = out;
break;
case 14:this.$ = $$[$0]
break;
case 15:this.$ = $$[$0]
break;
case 16: this.$ = [$$[$0-2]].concat($$[$0-1])
break;
case 17:this.$ = [$$[$0-1]].concat($$[$0]);
break;
case 19:this.$ = $$[$0]
break;
case 20:this.$ = {remote: $$[$0-2], local: $$[$0]}
break;
case 21:this.$ = (typeof $$[$0-1] != 'undefined' ? $$[$0-2].concat($$[$0-1]) : $$[$0-2]);
break;
case 22:this.$ = (typeof $$[$0] != 'undefined' ? $$[$0-1].concat($$[$0]) : $$[$0-1]);
break;
case 24:this.$ = (typeof $$[$0-1] != 'undefined' ? [$$[$0-2]].concat($$[$0-1]) : [$$[$0-2]]);
break;
case 25:this.$ = [$$[$0]];
break;
case 26:this.$ = [$$[$0]];
break;
case 27:this.$ = $$[$0];
break;
case 28:this.$ = {local: $$[$0-2], remote: $$[$0]};
break;
case 29:this.$ = (typeof $$[$0] != 'undefined' ? [$$[$0-1]].concat($$[$0]) : [$$[$0-1]]);
break;
case 31: this.$ = {type: 'module', decl : $$[$0-1]}
break;
case 32: this.$ = {type: 'import', decl : $$[$0-1]}
break;
case 33:this.$ = null
break;
case 34:this.$ = $$[$0]
break;
case 35:this.$ = $$[$0]
break;
case 36:this.$ = $$[$0]
break;
case 37:this.$ = $$[$0-2] + '.' + $$[$0]
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:6,12:[1,7],22:[1,8],29:[1,9]},{1:[3]},{1:[2,1]},{4:[1,10]},{4:[2,3]},{4:[2,4]},{4:[2,5]},{13:[1,11]},{13:[1,13],18:[1,15],23:12,24:[1,14]},{13:[1,18],18:[1,17],24:[1,19],30:16},{1:[2,2]},{14:[1,20],16:[1,21],18:[1,22]},{21:[1,23]},{21:[2,14]},{21:[2,15]},{13:[1,25],25:24},{15:[2,23],27:[1,27],31:26},{13:[1,29],32:28},{15:[2,25],27:[2,25]},{15:[2,26],27:[2,26]},{11:[1,30]},{13:[1,32],17:31},{6:34,7:35,12:[1,7],19:33,20:[2,33],22:[1,8]},{9:36,10:37,11:[1,38],13:[1,39]},{20:[2,18],26:40,27:[1,41]},{20:[2,19],27:[2,19],28:[1,42]},{15:[1,43]},{13:[1,18],18:[1,17],24:[1,19],30:44},{20:[2,30],27:[1,46],33:45},{20:[2,27],27:[2,27],28:[1,47]},{15:[1,48]},{15:[1,49]},{15:[2,11],21:[1,50]},{20:[1,51]},{6:34,7:35,12:[1,7],19:52,20:[2,33],22:[1,8]},{6:34,7:35,12:[1,7],19:53,20:[2,33],22:[1,8]},{15:[1,54]},{15:[2,6]},{15:[2,7]},{15:[2,36],20:[2,36],27:[2,36],35:[1,55]},{20:[1,56]},{13:[1,25],25:57},{10:58,13:[1,39]},{4:[2,21]},{15:[2,23],27:[1,27],31:59},{20:[1,60]},{13:[1,29],32:61},{10:62,13:[1,39]},{4:[2,8],12:[2,8],20:[2,8],22:[2,8]},{4:[2,9],12:[2,9],20:[2,9],22:[2,9]},{9:63,10:37,11:[1,38],13:[1,39]},{4:[2,10],12:[2,10],20:[2,10],22:[2,10]},{20:[2,31]},{20:[2,32]},{4:[2,13],12:[2,13],20:[2,13],22:[2,13]},{10:64,13:[1,39]},{21:[2,16]},{20:[2,18],26:65,27:[1,41]},{20:[2,20],27:[2,20]},{15:[2,22]},{15:[2,24],27:[2,24]},{20:[2,30],27:[1,46],33:66},{20:[2,28],27:[2,28]},{15:[2,12]},{15:[2,37],20:[2,37],27:[2,37]},{20:[2,17]},{20:[2,29]}],
defaultActions: {2:[2,1],4:[2,3],5:[2,4],6:[2,5],10:[2,2],13:[2,14],14:[2,15],37:[2,6],38:[2,7],43:[2,21],52:[2,31],53:[2,32],56:[2,16],59:[2,22],63:[2,12],65:[2,17],66:[2,29]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
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
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:
break;
case 3:return "SEMICOLON";
break;
case 4:return "COLON";
break;
case 5:return "OPEN_BRACE";
break;
case 6:return "CLOSE_BRACE";
break;
case 7:return "module";
break;
case 8:return "import";
break;
case 9:return "export";
break;
case 10:return 14;
break;
case 11:return 16;
break;
case 12:return 21;
break;
case 13:return "WILDCARD";
break;
case 14:return 27;
break;
case 15:return 35;
break;
case 16:return "Id";
break;
case 17:return "String";
break;
case 18:return "String";
break;
case 19:return 4;
break;
}
};
lexer.rules = [/^\n+/,/^\s+/,/^\t+/,/^;/,/^:/,/^\{/,/^\}/,/^module\b/,/^import\b/,/^export\b/,/^at\b/,/^is\b/,/^from\b/,/^\*/,/^,/,/^\./,/^[a-zA-Z_$][0-9a-zA-Z_$]*/,/^'.+'/,/^".+"/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = shepherd_parser;
exports.parse = function () { return shepherd_parser.parse.apply(shepherd_parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}