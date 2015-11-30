import {def, Child, ChildArray} from '../builder';
import Statement from './Statement';

// Declaration class is used to express Declarations
// to make subclasses like FunctionDeclaration, LambdaDeclaration
// Etc learn't this trick from AST-Types repository
// https://github.com/benjamn/ast-types/blob/master/def/core.js

export default def({
    name: 'Declaration',
    extend: Statement
});
