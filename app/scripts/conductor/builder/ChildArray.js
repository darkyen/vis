import {Child} from './Child';
import Validity from './Validity';
import _ from 'lodash';

class ChildArray extends Child{
	constructor(name){
		super(name);
		this.cannotBeEmpty();
        this.addTest((elements) => {
            return new Validity(Array.isArray(elements),
                `${name} should always be an array`);
        })
		this.emptyValue = [];
	}

	defaultsTo(){
		throw new Error(`Array's can't have emptyValue their empty value is []`)
	}

    validate(elements){
        const validities = _.flatten(elements.map(
            (el, idx) => this.tests.map(
                (test) => {
                    validity = test(el);
                    validity.reason = `${idx} : validity.reason`
                }
            );
        ));
        return Validity.merge(...validities);
	}
}

    // This is rarely used
// mostly the pattern is to do
// Child instead of new Child
export {ChildArray};

export default function CreateChildArray(...args){
    return new ChildArray(...args);
}
