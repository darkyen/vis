import Node from './Node';
import {NODE_TYPES} from '../core';
import {builders} from 'ast-types';

export default class VoidValue extends Node{
	constructor(value){
		super(NODE_TYPES.VOID);
	}

	__compile(){
		try{
			throw new Error('some error');
		}catch(e){
			//console.warn('You are trying to compile a void, void values are converted to null in js', e.stack);
		}
		return builders.literal(null);
	}

	__serialize(){
		return {
			value: null
		};
	}

};
