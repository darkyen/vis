import {def, Child, ChildArray} from '../builder';
import Expression from './Expression';

// None Expression is used to denote NOTHING
// in our language !!
// huraah !

export default def({
    name: 'NoneExpression',
    // An expression is not and cannot be used as a statement
    extend: Expression
});
