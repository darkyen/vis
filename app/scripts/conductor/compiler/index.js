import _ from 'lodash';
import core from '../core';
import {createScope} from './scope';
import getBlockSpec from '../utils/getBlockSpec';

let {
	NODE_TYPES,
	DATA_TYPES,
	DECL_TYPES,
	EXEC_TYPES,
	BLOCK_TYPES
} = core;

class Compiler{	
	constructor(lang = 'js'){
		this.loadAdapter(lang);
		this.blocks = {};
	}
	
	loadAdapter(lang){
		this.lang = {
			preferedSpaces: 4,
			lineJoiner: '\n',
			spacer: ' ',
		};
		console.warn('Not implemented');
	}

	// Set the supported block / block type for
	// this type of compilation -- block types 
	// are required for props and stuff 
		
	// Just get a block to compile
	getBlock(blockType, blockName){
		return getBlockSpec(blockType, blockName);
	}
	
	// Compiles a literal value
	compileLiteral(node, parentScope){
		return node.value;
	}

	// Compiles an Identifier 
	compileIdentifier(node, parentScope){
		return node.identifierName;
	}

	// Compiles a list / sequence of nodes
	compileList(node, parentScope){
		return node.nodes.map( n => this.compileNode(n, parentScope) );
	}

	// Compile each node
	compileNode(node, parentScope){
		let buffer = '';
		// create child scope here
		if( node.createsChildScope === true ){
			parentScope = createScope(parentScope);
		}

		switch(node.nodeType){
			case NODE_TYPES.LIST:
				buffer = this.compileList(node, parentScope);
			break;

			case NODE_TYPES.BLOCK:
				buffer = this.compileBlock(node, parentScope);
			break;
			
			case NODE_TYPES.LITERAL:
				buffer = this.compileLiteral(node, parentScope);
			break;
			
			case NODE_TYPES.IDENTIFIER:
				buffer = this.compileIdentifier(node, parentScope	);
			break;
			default: 
				throw new Error(`Node type ${node.nodeType} not supported`)
			break;
		}
		return buffer;
	}
	

	// Compile an extensible block
	// The block spec is defined with $varibles
	// ie varaibles which are essentially props
	// are declared by a preceeding $.

	// These $variables are simply replaced when
	// the block is compiled

	compileBlock(node, parentScope){
		let {props, identifier} = node;
		let {blockType, blockName} = identifier;
		let {spec, propTypes, definition} = this.getBlock(blockType, blockName);
		if( spec.createsChildScope === true ){
			parentScope = createScope(parentScope);
		}

		let compiledProps = _.reduce(propTypes, (newProps, propType, propName) => {
			newProps[propName] = this.compileNode( props[propName], parentScope );
			return newProps;
		} ,{});

		definition = definition(compiledProps, parentScope);
		let buffer = definition, key, value;

		for(let propName in compiledProps ){
			key   = '$' + key;
			value = compiledProps[propName];
			buffer = buffer.replace(key, value);
		}

		return buffer;
	}

	// Entry point to compile the file
	compile(root){
		let globalScope = createScope();
		return this.compileNode(root, globalScope);
	}
};


export default new Compiler('js');