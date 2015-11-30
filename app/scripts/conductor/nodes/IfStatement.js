import {def, Child, ChildArray} from '../builder';
import Statement from './Statement';
import Expression from './Expression';

// If statement has a condition which is
// tested and allows the flow of control
// to change as a result.

export default def({
	name: 'IfStatement',
	extend: Statement,
	childTypes: [
		Child('condition').ofType(Expression),
		ChildArray('consequent').ofType(Statement),
	],
});
