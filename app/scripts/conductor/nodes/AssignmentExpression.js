import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
// Binary Expression is an Expression
// like ones for maths

// only a few operators are valid so far
// @TODO extend them ?
let validOperators = [
    "==", "!=", "===", "!==",
    "+", "-", "*", "/", "%",
];

export default def({
    name: 'AssignmentExpression',
    extend: Expression,
    childTypes: [
        Prop('operator').ofType(String).isOneOf(...validOperators),
        Prop('right').ofType(Expression),
        Prop('left').ofType(Expression)
    ]
});
