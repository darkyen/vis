import {def, Child, ChildArray} from '../builder';
import Statement from './Statement';
import Expression from './Expression';

export default def({
	name: 'WhileStatement',
	extend: Statement,
	childTypes: [
		Child('condition').ofType(Expression),
		ChildArray('body').ofType(Statement),
	],
});
