import Node from './Node';
import {NODE_TYPES} from '../core';

export default class Literal extends Node{
	constructor(value){
		super(NODE_TYPES.LITERAL);
		this.setValue(value);
	}

	__serialize(){
		return {
			value: this.getValue() 
		};
	}

	setValue(value){
		this.value = value;		
	}

	getValue(){
		// Most likely is a number
		if( +this.value == this.value ){
			return +this.value;
		}
		
		// Most likely an object -- better to return :P
		return this.value;
	}
};