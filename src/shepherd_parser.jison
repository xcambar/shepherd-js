/*
   Copyright (c) 2012, Xavier Cambar
   Licensed under the MIT License (see LICENSE for details)
   
   Sources of inspiration (among others)
   @see http://wiki.ecmascript.org/doku.php?id=harmony:modules for parsing and use case reference
   @see http://addyosmani.com/writing-modular-js/
   
   
   StringLiteral: quoted string representing a path/URL (NB: Unused here)
   Path: unquoted path to a (sub)module, the module may be native or already loaded
   String: quoted string. May indicate a path in the filesystem, on a server, an URL or ???
   Id: ASCII Identifier (Unicode upgrade will wait)
   
   
   
   Grammer parsed (up to date by the 200120208 from http://wiki.ecmascript.org/doku.php?id=harmony:modules)
   ========================================================================================================
   
   Program        ::= ProgramElement*
   ProgramElement ::= Statement
                   |  VariableDeclaration
                   |  FunctionDeclaration
                   |  ImportDeclaration
                   |  ExportDeclaration
                   |  ModuleDeclaration

   ModuleSpecifier   ::= StringLiteral | Path
   ModuleDeclaration ::= "module" Id "at" String ";"                                      /** Can only a file path / URI. What else ? **/
                      |  "module" Id "is" ImportSource ";"
                      |  "module" Id "{" ModuleBody "}"

   ImportSource       ::=   Id ("from" ModuleSpecifier)?
   ImportDeclaration  ::=   "import" ImportSpecifierSet "from" ModuleSpecifier ";"
   ImportSpecifierSet ::=   Id
                       |    "*"
                       |    "{" ImportSpecifier ("," ImportSpecifier)* "}"
   ImportSpecifier    ::=   Id (":" Id)?

   ExportDeclaration  ::=  "export" ExportSpecifierSet ("," ExportSpecifierSet)* ";"
                       |   "export" VariableDeclaration
                       |   "export" FunctionDeclaration
                       |   "export" ModuleDeclaration

   ExportSpecifierSet ::=  "{" ExportSpecifier ("," ExportSpecifier)* "}"
                       |   Id ("," Id)*
                       |   "*" ("from" Path)?
   ExportSpecifier    ::=  Id (":" Path)?

   ModuleBody    ::= ModuleElement*
   ModuleElement ::= Statement
                  |  VariableDeclaration
                  |  FunctionDeclaration
                  |  ModuleDeclaration
                  |  ImportDeclaration
                  |  ExportDeclaration
*/
 
 
%lex
%%

\n+                         {}
\s+                         {}
\t+                         {}
";"                         return "SEMICOLON";
":"                         return "COLON";
"{"                         return "OPEN_BRACE";
"}"                         return "CLOSE_BRACE";
"module"                    return "module";
"import"                    return "import";
"export"                    return "export";
"at"                        return 'at';
"is"                        return 'IS';
"from"                      return 'from';
"*"                         return "WILDCARD";
","                         return 'COMMA';
"."                         return 'PERIOD';
[a-zA-Z_$][0-9a-zA-Z_$]*    return "Id";
\'.+\'                      return "String";
\".+\"                      return "String";
<<EOF>>                     return 'EOF';

/lex

%start Program
%%
  
Program
  : EOF
    { return {}}
  | ProgramElement EOF
    {return $1}
  ;
  
ProgramElement
  : ModuleDeclaration
    {$$ = {type: 'module', decl: $1};}
  | ImportDeclaration
    {$$ = {type: 'import', decl: $1};}
  ;
  
ModuleSpecifier
  : Path
    {$$ = $1}
  | String
    {$$ = $1}
  ;
  
ModuleDeclaration
  : module Id at String SEMICOLON
    {$$ = {id: $2, path: $4}}
  | module Id IS ImportSource SEMICOLON
    {$$ = {id: $2, src: $4}}
  | module Id OPEN_BRACE ModuleBody CLOSE_BRACE
    {$$ = {id: $2, contents: $4}}
  ;
  
ImportSource
  : Id
    {$$ = $1}
  | Id from ModuleSpecifier
    {$$ = {id: $1, module: $3}}
  ;
  
ImportDeclaration
  : import ImportSpecifierSet from ModuleSpecifier SEMICOLON
    {$$ = {specifiers: $2, module: $4}}
  ;
  
ImportSpecifierSet
  : Id
    {$$ = $1}
  | WILDCARD
    {$$ = $1}
  | OPEN_BRACE ImportSpecifierNext CLOSE_BRACE
    { $$ = $2}
  ;
  
ImportSpecifierNext
  : ImportSpecifier COMMA ImportSpecifierNext
    {$$ = [$1].concat($3)}
  | ImportSpecifier
    {$$ = $1}
  | 
  ;
  
ImportSpecifier
  : Id
    {$$ = $1}
  | Id COLON Path
    {$$ = {remote: $1, local: $3}}
  ;
  
ModuleBody
  : ModuleDeclaration ModuleBody
    { $$ = {type: 'module', decl : $1}}
  | ImportDeclaration ModuleBody
    { $$ = {type: 'import', decl : $1}}
  | 
    {$$ = null}
  ;
  
ModuleElement
  : ModuleDeclaration
    {$$ = $1}
  | ImportDeclaration
    {$$ = $1}
  ;
  
Path
  : Id
    {$$ = $1}
  | Id PERIOD Path
    {$$ = $1 + '.' + $3}
  ;
  