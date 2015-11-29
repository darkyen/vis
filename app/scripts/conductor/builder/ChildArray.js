import Child from './Child';
export default class ChildArray extends Child{
	constructor(name){
		super(name);
		this.notEmpty();
		this.emptyValue = [];
	}

	defaultsTo(){
		throw new Error(`Array's can't have emptyValue their empty value is []`)
	}

	validate(elements){
		return elements.all(element => super(element));
	}
}
