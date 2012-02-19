%lex
%%

\n+                         {}
\s+                         {}
\t+                         {}
";"                         return ";";
"{"                         return "OPEN_BRACE";
"}"                         return "CLOSE_BRACE";
"module"                    return "module";
"import"                    return "import";
"export"                    return "export";
"at"                        return 'at';
"="                         return 'EQUALS';
"from"                      return 'from';
[a-zA-Z_$][0-9a-zA-Z_$]*    return "Id";
\".+\"                      return "Path";
"."                         return ".";
<<EOF>>                     return 'EOF';

/lex

%start expressions
%%

expressions
  : Program EOF
    {console.log('Done')}
  | EOF
  ;
  
Program
  : ProgramElement
  | Program ProgramElement
  ;
  
ProgramElement
  : ModuleDeclaration
    {console.log('module declaration');}
  ;
  
ModuleDeclaration
  : module Id at Path
    {console.log('declaring module ' + $2 + ' from module at path: ' + $4);}
  | module Id EQUALS ImportSource
    {console.log('declaring module ' + $2 + ' equals import source: ' + $4);}
  | module Id OPEN_BRACE CLOSE_BRACE
  ;
  
ModuleSpecifier
  : Path
  | StringLiteral
  ;
  
StringLiteral
  : Id
  | Id.StringLiteral
  ;
  
ImportSource
  : Path
    {console.log('Import source: ' + $1);}
  | Path from ModuleSpecifier
    {console.log('Import source: ' + Path + ' from ' + $3);}
  ;
  