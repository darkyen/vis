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
        Prop('operator').ofType(String).isOneOf(...validOperators),
        Prop('right').ofType(Expression),
        Prop('left').ofType(Expression)
    ]
});
