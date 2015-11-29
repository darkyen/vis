import {def, Child, ChildArray} from '../builder';
// Everything extends from this
export default def({
	name: 'SourceCodeNode',
	childTypes: [
		Child('path').ofType(String).defaultsTo(''),
		Child('comments').ofType(String).defaultsTo('')
	]
});
