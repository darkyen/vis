// @TODO: maybe create a base function
// class which extends both of this, but
// the question must be asked how will we
// have multiple inheritance from Function
// and Expression ?

// Or maybe go like python ? For now we do this.
// where lambda is a minimal function definition that can be
// used inside an expression. Unlike FunctionDef,body holds a
//  single node.

import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
import Identifier from './Identifier';
import Statement from './Statement';
// Statement class is used to express Statements
// to make subclasses like Patterns and Expressions
// learn't this trick from AST-Types repository
// https://github.com/benjamn/ast-types/blob/master/def/core.js
export default def({
	name: 'LambdaExpression',
    // this allows it to be used as both an Expression
    // and a seperate defintion
	extend: Expression,
    childTypes: [
        ChildArray('parameters').ofType(Identifier),
        ChildArray('body').ofType(Statement),
        // do we need to support generator lambda ?
        // Child('isGenerator').ofType(Boolean)
        //     .defaultsTo(false),
        // do we need to support sync lamba
        // Child('isAsync').ofType(Boolean)
        //     .defaultsTo(false)
    ]
});
