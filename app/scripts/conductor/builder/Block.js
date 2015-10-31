import _ from 'lodash';
import core from '../core';
import Node from './Node';
import List from './List';
import Literal from './Literal';
import Identifier from './Identifier';
import VoidValue  from './VoidValue';

let {
	NODE_TYPES,
	DATA_TYPES,
	DECL_TYPES,
	EXEC_TYPES,
	BLOCK_TYPES
} = core;



export default class Block extends Node{
	constructor(blockData){
		super(NODE_TYPES.BLOCK);
		_.assign(this, blockData.spec);

		if( ! blockData  ){
			throw new Error('Blockdata must be provided when initializing a block');
		}

		this.propTypes  = blockData.propTypes;
		this.renderer  = blockData.renderer;
		this.createProps();
	}
	
	__serializeNodeListOrNode(nodeOrNodeList){
		// Although this should never occur
		// but oh well
		if( Array.isArray(nodeOrNodeList) ){
			// Viva la recursion !
			return nodeOrNodeList.map(n => this.__serializeNodeListOrNode(n));
		}
		return nodeOrNodeList.serialize();
	}

	__serialize(){
		
		let serializedProps = _.reduce(this.props, (result, prop, propName) => {
			result[propName] = prop.serialize();
			return result;
		},{});

		let {blockType, blockName} = this;
		return {
			props: serializedProps,
			identifier: {
				blockType,
				blockName
			}
		}
	}

	initializeDefaultProp(propType){
		// If this supports both 
		if( _.contains(propType.nodeTypes, NODE_TYPES.LITERAL) ){
			return new Literal('');
		}

		if( _.contains(propType.nodeTypes, NODE_TYPES.IDENTIFIER) ){
			return new Identifier('');			
		}
		
		if( _.contains(propType.nodeTypes, NODE_TYPES.LIST) ){
			return new List();
		}

		if( _.contains(propType.blockTypes, BLOCK_TYPES.VALUE) ){
			return new VoidValue();
		}

		return null;
	}


	createProps(){

		// initialize all the props,
		// with appropiate defaults 
		this.props = {};
		let propNames = Object.keys(this.propTypes);
		propNames.forEach((propName) => {
			let propType  = this.propTypes[propName];
			let propValue = this.initializeDefaultProp(propType);
			// console.log(propName, propValue);
			this.mountProp(propName, propValue);
		});
	}
	
	getPath(path){
		return this.props[path];
	}

	mountProp(propName, propValue){
		if( !this.propTypes[propName] ){
			throw new Error(`Cannot mount unknown prop ${propName}`);
		}

		// could be anything actually !
		if( !(propValue instanceof Node) ){
			throw new Error(`Propvalue ${propName} must be an instance of Node`);
		}

		let propType = this.propTypes[propName];

		if( !_.contains(propType.nodeTypes, propValue.nodeType) ){
			throw new Error('Cannot mount accepted Node types does not match node-type of mountee node');
		}
		
		if( propValue.nodeType === NODE_TYPES.BLOCK ){
			// now lets do a quick check for block type
			if( !_.contains(propType.blockTypes, propValue.blockType) ){
				throw new Error('Cannot mount accepted block types does not match block type of mountee node');
			}

			// and now lets see if we have a dataType
			if( propType.blockType === BLOCK_TYPES.VALUE && !!(_.intersection(propType.dataTypes, propValue.dataTypes).length) ){
				throw new Error('Cannount mount becasue the accepted data-type does not include the dataTypes of this block');
			}

			// Rarely ever going to ever happen
			if( propType.blockType === BLOCK_TYPES.FLOW && !!(_.intersection(propType.execTypes, propValue.execTypes).length) ){
				throw new Error('Cannot mount because exec types are incompatible');
			}
		}
		// finally just mount
		let currentValue = this.props[propName];
		this.props[propName] = propValue;
		
		return currentValue;
	}

}