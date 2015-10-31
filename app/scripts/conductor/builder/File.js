import _ from 'lodash';
import List from './List';
import {NODE_TYPES, BLOCK_TYPES} from '../core';

class File{
	constructor(fileString){
		if( typeof fileString === 'string' ){
			this.__load(JSON.parse(fileString));
		}else{
			this.__create();
		}
	}

	getNodeAtPath(parts){
		
		if( typeof parts === 'string' ){
			parts = parts.split('.');
		}

		if( parts[0] !== '$' ){
			throw new Error('Only absolute paths supported so-far');
		}
		
		// this still looks ugly
		parts.shift();
		let node = this.code;

		while(parts.length && node){
			let part = parts.shift();
			switch(node.nodeType){
				case NODE_TYPES.FLOW: 
				case NODE_TYPES.BLOCK:
					node = node.getProp(part)
				break;
				default:
					throw new Error('Only List and Block Nodes can have children');
				break;
			}
		}

		return node;
	}

	__create(){
		let _root = new List({
			propType:{
				nodeTypes:  [NODE_TYPES.BLOCK],
				blockTypes: [BLOCK_TYPES.FLOW, BLOCK_TYPES.DECLARATION],
			}
		});

		this.__load({
			name: 'New File',
			codeVersion: '0.0.1',
			code: _root,
			dependencies: {}
		});
	}
	
	__load({codeVersion, code, dependencies, name}){
		this.dependencies = dependencies;
		this.codeVersion  = codeVersion;
		this.code 		  = code;
		this.name 		  = name;
	}

	toObject(){
		let {codeVersion, code, dependencies, name} = this;
		return {codeVersion, code, dependencies, name};
	}

	toJSON(){
		return JSON.stringify(this.toObject());
	}
}

export default File;