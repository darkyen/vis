import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';
import Identifier from './Identifier';
import Statement from './Statement';
import Declaration from './Declaration';


// Function Declaration is used to declare a function
export default def({
	name: 'FunctionDeclaration',
    // Functions may not be used as expressions so far
    // you must declare them or use lambda like python
	extend: Declaration,
    childTypes: [
        Child('name').ofType(Identifier),
        ChildArray('parameters').ofType(Identifier),
        ChildArray('defaults').ofType(Expression),
        ChildArray('body').ofType(Statement),
        Child('isGenerator').ofType(Boolean)
            .defaultsTo(false),
        Child('isAsync').ofType(Boolean)
            .defaultsTo(false)
    ]
});
