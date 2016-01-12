import {def, Child, ChildArray} from '../builder';
import SourceCodeNode from './SourceCodeNode';

// Statement class is used to express Statements
// to make subclasses like Patterns and Expressions
// learn't this trick from AST-Types repository
// https://github.com/benjamn/ast-types/blob/master/def/core.js
export default def({
	name: 'Statement',
	extend: SourceCodeNode
});
