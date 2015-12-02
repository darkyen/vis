import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
import LambdaExpression from './LambdaExpression';

// @TODO: Document this.

const validOperators = [
    "!"
];

export default def({
    name: 'UnaryExpression',
    extend: Expression,
    childTypes: [
        Child('operator').ofType(String).isOneOf(...validOperators),
        Child('operand').ofType(Expression).cannotBeEmpty()
            .notOfType(LambdaExpression)
    ]
});
