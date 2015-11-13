import _ from 'lodash';
import {NODE_TYPES, BLOCK_TYPES} from '../core';
import getBlockSpec from '../utils/getBlockSpec';
import createScope from '../utils/createScope';
import {builders, namedTypes} from 'ast-types';
import Identifier from './Identifier';
import Literal from './Literal';
import List from './List';
import Block from './Block';
import VoidValue from './VoidValue';
import joinPath from '../utils/joinPath';

class File{
	constructor(fileString){
		if( typeof fileString === 'string' ){
			let fileObject = JSON.parse(fileString);
			this.__load(fileObject);
			this.loadFromObject(fileObject.code, '$');
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
				case NODE_TYPES.LIST:
				case NODE_TYPES.BLOCK:
					node = node.getPath(part)
				break;
				default:
					throw new Error('Only List and Block Nodes can have children');
				break;
			}
		}

		return node;
	}

	insertNodeAtPath(node, path){
		// Insert at root ?
		if( path === '$' ){
			this.code = node;
			return;
		}
		console.log(path);
		let parts = path.split('.');
		// path to parent
		let insertionPropName = parts.pop();
		let parentNode   = this.getNodeAtPath(parts);
		parentNode.mountProp(insertionPropName, node);
	}

	removeNodeAtPath(node, path){
		if( path === '$' ){
			throw new Error('You cannot remove the rootc');
		}
	}

	insertListAtPath(listSpec, path){
		let node = new List(listSpec);
		this.insertNodeAtPath(node, path);
	}

	insertBlockAtPath({blockType, blockName}, path){
		let spec  = getBlockSpec(blockType, blockName);
		let node  = new Block(spec);
		this.insertNodeAtPath(node, path);
	}

	insertVoidAtPath(path){
		let node = new VoidValue();
		this.insertNodeAtPath(node, path);
	}

	updateIdentifierAtPath(value, path){
		let node = new Identifier(value);
		this.insertNodeAtPath(node, path);
	}

	updateLiteralAtPath(value, path){
		let node = new Literal(value);
		this.insertNodeAtPath(node, path);
	}

	__create(){
		this.__load({
			name: 'New File',
			codeVersion: '0.0.1',
			dependencies: {}
		});
	}

	__load({codeVersion, code, dependencies, name}){
		let _root = new List({
			propType:{
				nodeTypes:  [NODE_TYPES.BLOCK],
				blockTypes: [BLOCK_TYPES.FLOW, BLOCK_TYPES.DECLARATION],
			}
		});

		this.dependencies = dependencies;
		this.codeVersion  = codeVersion;
		this.code 		  = _root;
		this.name 		  = name;
	}

	toObject(){
		let {codeVersion, code, dependencies, name} = this;
		code = code.serialize();
		return {codeVersion, code, dependencies, name};
	}

	/*
	 * builds a file from object
	 */

	loadFromObject(node, path){
		switch(node.nodeType){

			case NODE_TYPES.IDENTIFIER:
				this.updateIdentifierAtPath(node.name, path);
			break;

			case NODE_TYPES.LITERAL:
				this.updateLiteralAtPath(node.value, path);
			break;

			case NODE_TYPES.BLOCK:
				this.insertBlockAtPath(node.identifier, path);
				_.forEach(node.props, (nodeValue, propName) => {
						this.loadFromObject(nodeValue, joinPath(path, propName));
				});
			break;

			case NODE_TYPES.LIST:
				this.insertListAtPath(node.listSpec, path);
				_.forEach(node.nodes, (nodeValue, propIndex) => {
						this.loadFromObject(nodeValue, joinPath(path, propIndex));
				});
			break;

			case NODE_TYPES.VOID:
				this.insertVoidAtPath(path);
			break;

			default:
				console.log(node);
				throw new Error('Unknown block type');
			break;
		}


	}


	getAST(){
		let scope = createScope();
		return builders.program(this.code.compile(scope));
	}
}

export default File;
