import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
import Identifier from './Identifier';
import Statement from './Statement';

// Used to call a function or method
// which may not return a value or the
// return value is silently ignored.

export default def({
	name: 'CallStatement',
	extend: Statement,
    childTypes: [
        Child('name').ofType(Identifier).cannotBeEmpty(),
        ChildArray('parameters').ofType(Expression),
    ]
});
