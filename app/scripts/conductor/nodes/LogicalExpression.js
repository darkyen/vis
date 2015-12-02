import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';

// Logical Expression are Expressions
// which convert the operands to Boolean
// before evaluating the resultant.
const validOperators = ['&&', '||'];

export default def({
    name: 'LogicalExpression',
    extend: Expression,
    childTypes: [
        Child('operator').ofType(String).isOneOf(...validOperators),
        Child('right').ofType(Expression).cannotBeEmpty(),
        Child('left').ofType(Expression).cannotBeEmpty()
    ]
});
