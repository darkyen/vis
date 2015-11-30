import {def, Child, ChildArray} from '../builder';
import SourceCodeNode from './SourceCodeNode';

// Expression class is used to express Expressions
// to make subclasses like Logical, Binary, Unary Expressions
// Etc learn't this trick from AST-Types repository
// https://github.com/benjamn/ast-types/blob/master/def/core.js

export default def({
    name: 'Expression',
    // An expression is not and cannot be used as a statement
    extend: SourceCodeNode
});
