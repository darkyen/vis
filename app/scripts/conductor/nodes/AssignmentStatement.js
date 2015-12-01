import {def, Child, ChildArray} from '../builder';
import Identifier from './Identifier';
import Expression from './Expression';
import Statement from './Statement';
// Assigment Statement is a statement where
// you use a statement to assign something
// to something else.

// @TODO: Discuss it with @AwalGarg and @lila
// If this is too complex, we might in future
// make different blocks and making Assignment
// an abstract class for instance the pattern
// change x by 4
// and drop the patterns like *=, /=, -=
// only a few operators are valid so far

const validOperators = [
    "=", "+=", "-=",
    //  "*=", "/=", "%=" is turned off to keep
    // consistency because how would you explain
    // set x to left over of when divided by 5 ?
    // it would be better set x to ( x % 5 )
];


// Defines the following patterns
// set x to 5

// increment x by 10
// decrement x by 10

// alternatively increment & decrement can be
// expressed by change x by (someNumber) where
// the behavior depends on the sign.



// we do not support chaining of Assignment
// so far but maybe we can add that in future.
export default def({
    name: 'AssignmentStatement',
    extend: Statement,
    childTypes: [
        Child('operator').ofType(String).isOneOf(...validOperators),
        Child('right').ofType(Expression),
        Child('left').ofType(Identifier)
    ]
});
