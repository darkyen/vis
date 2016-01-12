import {def, Child, ChildArray} from '../builder';
import Expression from './Statement';

// a literal is a notation for representing a fixed value in source code

// a literal can be of type String, Boolean, Number or Bytes
// Where Bytes is a Uint8Array in javascript of a given size
// @TODO: Implement Bytes

export default def({
    name: 'Literal',
    extend: Expression,
    childTypes: [
        Child('value').ofType(String, Number, Boolean).cannotBeEmpty()
    ],
});
