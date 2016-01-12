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
        Child('courier').ofType(Identifier)
            .cannotBeEmpty(),
    ]
});
