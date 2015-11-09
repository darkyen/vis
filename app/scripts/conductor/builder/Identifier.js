import Node from './Node';
import {NODE_TYPES} from '../core';
import {namedTypes, builders} from 'ast-types';

export default class Identifier extends Node{
	constructor(value){
		super(NODE_TYPES.IDENTIFIER);
		this.updateIdentifier(value);
	}
	
	__serialize(){
		return {
			identifierName: this.getIdentiferName()
		};
	}
	
	__compile(){
		return builders.identifier(this.getIdentiferName());
	}

	updateIdentifier(value){
		this.identifierName = value;		
	}

	getIdentiferName(){
		return this.identifierName;
	}
} 