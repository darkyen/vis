import Node from './Node';
import {NODE_TYPES} from '../core';

export default class VoidValue extends Node{
	constructor(value){
		super(NODE_TYPES.VOID);
	}
	
	__compile(){
		throw new Error('You cannot compile void');
	}

	__serialize(){
		return {
			value: null
		};
	}

};