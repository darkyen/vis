import Node from './Node';
import {NODE_TYPES} from '../core';

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

	updateIdentifier(value){
		this.identifierName = value;		
	}

	getIdentiferName(){
		return this.identifierName;
	}
} 