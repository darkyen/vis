import _ from 'lodash';
import {NODE_TYPES} from '../core';
import measureString from '../utils/measureString';
import createScope from '../utils/createScope';

export default class Node{
	constructor(type, nodeSpec = {}){
		if(!NODE_TYPES[type]){
			throw new Error(`Unknown node type ${type}`);
		}
		this.createsChildScope = nodeSpec.createsChildScope || false;
		this.nodeType = type;
	}

	__serialize(){
		throw new Error('Every subclass must implement __serialize');
	}

	__compile(){
		throw new Error('Every subclass must implement __compile');
	}

	__deserialize(){
		throw new Error('Every subclass must implement __deserialize');
	}

	// actual serialize function
	// uses the node to serialize the data,
	// and adds the variables in scope to it.
	serialize(parentScope = createScope()){
		if( this.createsChildScope === true ){
			parentScope = createScope(parentScope);
		}
		return _.assign(this.__serialize(parentScope), {
			nodeType: this.nodeType,
		});
	}

	compile(parentScope){
		if( this.createsChildScope === true ){
			parentScope = createScope(parentScope);
		}
		return this.__compile(parentScope);
	}
}
