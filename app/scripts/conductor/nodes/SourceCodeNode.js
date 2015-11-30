import {def, Child, ChildArray} from '../builder';

// Everything extends from this it acts like a base
// and supports very important things like comments
// and path, the path is a special value which stores
// the current path the code block is at which helps
// generating source maps.

// our source maps map range of text -> path for now
// which is not the best possible maps but should do
// although the most optimum would be path -> path.
export default def({
	name: 'SourceCodeNode',
	childTypes: [
		Child('path').ofType(String).defaultsTo(''),
		Child('comments').ofType(String).defaultsTo('')
	]
});
