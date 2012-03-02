/* 
   StringLiteral: quoted string representing a path/URL (NB: Unused here)
   Path: unquoted path to a (sub)module, the module may be native or already loaded
   String: quoted string. May indicate a path in the filesystem, on a server, an URL or ???
   Id: ASCII Identifier (Unicode upgrade will wait)
   
   BUGS:
    * Doesn't accept import a from b.c.d;
    * conflicts with braces
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
"."                         return ".";
"*"                         return "WILDCARD";
","                         return 'COMMA';
"."                         return 'PERIOD';
[a-zA-Z_$][0-9a-zA-Z_$]*    return "Id";
\".+\"                      return "String";
\'.+\'                      return "String";
<<EOF>>                     return 'EOF';

/lex

%start Program
%%
  
Program
  : ProgramElement Program
    {console.log($$)}
  | EOF
  | 
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
    {$$ = $4}
  ;
  
ImportSource
  : Id
    {$$ = $1}
  | Id from ModuleSpecifier
    {$$ = {path: $1, module: $3}}
  ;
  
ImportDeclaration
  : import ImportSpecifierSet from ModuleSpecifier SEMICOLON
    {$$ = {type: 'import', specifiers: $2, from: $4}}
  ;
  
ImportSpecifierSet
  : Id
    {$$ = $1}
  | WILDCARD
    {$$ = $1}
  | OPEN_BRACE ImportSpecifier ImportSpecifierNext CLOSE_BRACE SEMICOLON
    { $$ = [$2, $3]}
  ;
  
ImportSpecifierNext
  : COMMA ImportSpecifier
    {$$ = $2}
  |
  ;
  
ImportSpecifier
  : Id
    {$$ = $1}
  | Id COLON Path
    {$$ = {local: $1, remote: $3}}
  ;
  
ModuleBody
  :
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
    {$$ = $1 + '.' + $2}
  ;
  