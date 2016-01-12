import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
import LambdaExpression from './LambdaExpression';

// Binary Expression is an Expression like ones
// for maths, how they differ from LogicalExpressions
// is that the operands are not evaluated as Booleans

const validOperators = [
    "==", "!=", "===", "!==",
    "+", "-", "*", "/", "%",
];

// We follow python way of doing things where
// Number(x) + String(y) throws an error thus
// we rely on explicit type conversion throw
// otherwise.

export default def({
    name: 'BinaryExpression',
    extend: Expression,
    childTypes: [
        Child('operator').ofType(String).isOneOf(...validOperators),
        // Since this supports Expression Literal, Identifiers
        // can also go inside here, @TODO: Should we mention
        // Identifier and Expression Explicitely here because
        // Lamba Expression cannot go in here imagine
        // foo + (lambda k : 3 * k)
        Child('right').ofType(Expression).cannotBeEmpty()
            .notOfType(LambdaExpression),
        Child('left').ofType(Expression).cannotBeEmpty()
            .notOfType(LambdaExpression)
    ]
});
