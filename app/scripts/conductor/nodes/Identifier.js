import {def, Child, ChildArray} from '../builder';
import Validity from '../builder/Validity';
import Expression from './Statement';
// TLDR; Identifiers are our variables

// An identifier is a name that identifies (that is,
// labels the identity of) either a unique object or
// a unique class of objects, where the "object" or
// class may be an idea, physical [countable] object
// (or class thereof), or physical [noncountable]
// substance (or class thereof).

// fuck.
export default def({
    name: 'Identifier',
    extend: Expression,
    childTypes: [
        Child('name').ofType(String)
            .cannotBeEmpty()
            .addTest( (name) => {
                return new Validity((/^[$A-Z_][0-9A-Z_$]*$/i).test(name),
                'Cannot have spaces or special characters in identifiers');
            })
    ],
});
