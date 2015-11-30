import {def, Child, ChildArray} from '../builder';
import Expression from './Statement';

// TLDR; Identifiers are our variables

// An identifier is a name that identifies (that is,
// labels the identity of) either a unique object or
// a unique class of objects, where the "object" or
// class may be an idea, physical [countable] object
// (or class thereof), or physical [noncountable]
// substance (or class thereof).

export default def({
    name: 'Identifier',
    extend: Expression
    childTypes: [
        Child('name').ofType(String)
            .addChecker( (name) => {
                return (/^[$A-Z_][0-9A-Z_$]*$/i).test(name)
            })
    ],
});
