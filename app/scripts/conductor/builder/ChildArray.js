import Child from './Child';
export default class ChildArray extends Child{
	constructor(name){
		super(name);
		this.notEmpty();
        // Set this ?
        // and this is constant
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
		return elements.all(element => super(element));
	}
}
