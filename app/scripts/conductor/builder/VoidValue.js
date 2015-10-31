import Node from './Node';
import {NODE_TYPES} from '../core';

export default class VoidValue extends Node{
	constructor(value){
		super(NODE_TYPES.VOID);
	}

	__serialize(){
		return {
			value: null
		};
	}

};