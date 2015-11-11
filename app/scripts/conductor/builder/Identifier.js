import Node from './Node';
import {NODE_TYPES} from '../core';
import {namedTypes, builders} from 'ast-types';

/* Used to handle identifiers
 * @class Identifier
 */

export default class Identifier extends Node{
	constructor(name, type){
		super(NODE_TYPES.IDENTIFIER);
		this.__name = name;
		this.__type = type;
	}

	__serialize(){
		return {
			name: this.getIdentiferName(),
			type: this.getIdentiferType(),
		};
	}

	__compile(){
		return builders.identifier(this.getIdentiferName());
	}

	getIdentiferName(){
		return this.__name;
	}

	getIdentiferType(){
		return this.__type;
	}
}
