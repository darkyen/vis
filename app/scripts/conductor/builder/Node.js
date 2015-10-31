import _ from 'lodash';
import {NODE_TYPES} from '../core';

export default class Node{
	constructor(type){
		if(!NODE_TYPES[type]){
			throw new Error(`Unknown node type ${type}`);
		}
		this.nodeType = type;
	}
	
	__serialize(){
		throw new Error('Every subclass must implement this');
	}

	serialize(){
		// actual serialize function
		return _.assign(this.__serialize(), { 
			nodeType: this.nodeType
		});
	}
}