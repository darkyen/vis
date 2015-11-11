import Node from './Node';
import {NODE_TYPES, DATA_TYPES} from '../core';
import {namedTypes, builders} from 'ast-types';

function computeDataType(datum){
	if( +datum == datum ){
		return DATA_TYPES.NUMBER;
	}

	if( datum === 'true' || datum === 'false' ){
		return DATA_TYPES.BOOLEAN;
	}
	// this one is obvious
	return DATA_TYPES.STRING;
}

export default class Literal extends Node{
	constructor(value){
		super(NODE_TYPES.LITERAL);
		this.__value = value;
		this.__type = computeDataType(value);
	}

	__serialize(){
		return {
			value: this.getValue(),
			type:  this.getType()
		};
	}

	__compile(){
		let value = this.getValue();
		let type  = this.getType();

		if( type === DATA_TYPES.NUMBER ){
			value = +value;
		}

		if( type === DATA_TYPES.BOOLEAN ){
			value = (value == 'true');
		}

		if( type === DATA_TYPES.STRING ){
			// remove the qoutes
			value = value.substr(1, value.length - 2);
		}

		return builders.literal(value);
	}

	getValue(){
		return this.__value;
	}

	getType(){
		return this.__type;
	}
};
