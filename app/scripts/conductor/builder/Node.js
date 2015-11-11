import _ from 'lodash';
import {NODE_TYPES} from '../core';
import measureString from '../utils/measureString';
import createScope from '../utils/createScope';

export default class Node{
	constructor(type, nodeSpec = {}){
		if(!NODE_TYPES[type]){
			throw new Error(`Unknown node type ${type}`);
		}
		this.nodeType = type;
		this.createsChildScope = nodeSpec.createsChildScope || false;
	}

	__serialize(){
		throw new Error('Every subclass must implement this');
	}

	__compile(){
		throw new Error('Every subclass must implement this method');
	}

	serialize(){
		// actual serialize function
		return _.assign(this.__serialize(), {
			nodeType: this.nodeType,
		});
	}

	compile(parentScope){

		// create child scope here
		if( this.createsChildScope === true ){
			parentScope = createScope(parentScope);
		}

		// this.measurements = measureString(buffer);
		return this.__compile(parentScope);
	}
}
