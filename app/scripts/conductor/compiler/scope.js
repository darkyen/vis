import _ from 'lodash';

class Scope{

	constructor(parentScope){
		this.values = {};
		// the 4 spaces thing
		// makes code much more readable
		// :P 
		if( parentScope instanceof Scope ){
			_.assign(this.values, parentScope.values);
		}
	}

	exists(varName){
		return !!this.values[varName];
	}

	declare(varName, data_type){
		this.values[varName] = true;
	}
}

function createScope(parentScope){
	return new Scope(parentScope);
}


export default {createScope};