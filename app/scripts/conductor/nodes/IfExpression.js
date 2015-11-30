import {def, Child} from '../builder';
import Expression from './Expression';
import LambdaExpression from './LambdaExpression';

// If Expression has a condition which is
// tested and allows the evaluation to be
// differentiated more like this or that
// but since we do not have trinaries we
// will have to make do with this, also
// this is like python.

export default def({
	name: 'IfExpression',
	extend: Expression,
	childTypes: [
		Child('condition').ofType(Expression)
            .notOfType(LambdaExpression),
		Child('consequent').ofType(Expression),
        Child('alternate').ofType(Expression)
	],
});
