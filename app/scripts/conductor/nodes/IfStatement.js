import {def, Child, ChildArray} from '../builder';
import SourceCodeNode from './SourceCodeNode';
import Expression from './Expression';

export default def({
	name: 'IfStatement',
	extend: Statement,
	childTypes: [
		Child('condition').ofType(Expression),
		ChildArray('consequent').ofType(Statement),
	],
});
