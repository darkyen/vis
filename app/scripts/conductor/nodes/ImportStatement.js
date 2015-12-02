import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
import Identifier from './Identifier';
import Statement from './Statement';

export default def({
	name: 'ImportStatement',
    // this allows it to be used as both an Expression
    // and a seperate defintion
	extend: Statement,
    childTypes: [
        Child('courier').ofType(Identifier).cannotBeEmpty(),
        Child('path').ofType(String),
        // do we need to support generator lambda ?
        // Child('isGenerator').ofType(Boolean)
        //     .defaultsTo(false),
        // do we need to support sync lamba
        // Child('isAsync').ofType(Boolean)
        //     .defaultsTo(false)
    ]
});
