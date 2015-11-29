import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
// Binary Expression is an Expression
// like ones for maths

let validOperators = [
    "==", "!=", "===", "!==",
    "+", "-", "*", "/", "%",
];

export default def({
    name: 'BinaryExpression',
    extend: Expression,
    childTypes: [
        Prop('operator').ofType(String).isOneOf(...validOperators),
        Prop('right').ofType(Expression),
        Prop('left').ofType(Expression)
    ]
});
