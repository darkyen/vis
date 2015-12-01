import {Child} from './Child';

class ChildArray extends Child{
	constructor(name){
		super(name);
		this.cannotBeEmpty();
		this.emptyValue = [];
	}

	defaultsTo(){
		throw new Error(`Array's can't have emptyValue their empty value is []`)
	}

	validate(elements){
        if( ! Array.isArray(elements) ){
            throw new Error(
                `mountee at ${this.nodeName} must be an array`
            )
        }
		return elements.every(element => super.validate(element));
	}
}

    // This is rarely used
// mostly the pattern is to do
// Child instead of new Child
export {ChildArray};

export default function CreateChildArray(...args){
    return new ChildArray(...args);
}
