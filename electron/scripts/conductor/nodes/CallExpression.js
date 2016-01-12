import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
import Identifier from './Identifier';
import Statement from './Statement';

// Used to call a function or method
// which may should return a value
// if not the value returned by this
// should be considered as undefined.


// @TODO: implement a mixin like field
// such that you could re-use Declaration
// of child-types.

export default def({
	name: 'CallExpression',
	extend: Expression,
    childTypes: [
        Child('name').ofType(Identifier).cannotBeEmpty(),
        ChildArray('parameters').ofType(Expression),
    ]
});
