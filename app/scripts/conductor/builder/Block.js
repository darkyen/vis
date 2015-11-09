import _ from 'lodash';
import core from '../core';
import Node from './Node';
import List from './List';
import Literal from './Literal';
import Identifier from './Identifier';
import VoidValue  from './VoidValue';
import createScope from '../utils/createScope';
import getBlockSpec from '../utils/getBlockSpec';
import {namedTypes, builders} from 'ast-types';

let {
	NODE_TYPES,
	DATA_TYPES,
	DECL_TYPES,
	EXEC_TYPES,
	BLOCK_TYPES
} = core;


export default class Block extends Node{
	constructor(blockData){
		super(NODE_TYPES.BLOCK, blockData);
		// _.assign(this, blockData.spec);

		if( ! blockData  ){
			throw new Error('Blockdata must be provided when initializing a block');
		}

		this.blockData = blockData;
		this.createProps();
	}
	/* maybe deprecated */
	__serializeNodeListOrNode(nodeOrNodeList){
		// Although this should never occur
		// but oh well
		if( Array.isArray(nodeOrNodeList) ){
			// Viva la recursion !
			return nodeOrNodeList.map(n => this.__serializeNodeListOrNode(n));
		}
		return nodeOrNodeList.serialize();
	}

	__compile(parentScope){
		let {props, blockData} = this;
		let {spec, definition} = blockData;

		let compiledProps = _.reduce(props, (propValues, prop, propName) => {
			// console.log(props[propName]);
			propValues[propName] = prop.compile(parentScope);
			return propValues;
		} ,{});

		return definition(props, compiledProps, parentScope);
	}

	__serialize(){
		
		let serializedProps = _.reduce(this.props, (result, prop, propName) => {
			result[propName] = prop.serialize();
			return result;
		},{});

		let {blockType, blockName} = this.blockData.spec;
		return {
			props: serializedProps,
			identifier: {blockType, blockName}
		};
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
		let propTypes = this.blockData.propTypes;
		let propNames = Object.keys(propTypes);
		propNames.forEach((propName) => {
			let propType  = propTypes[propName];
			let propValue = this.initializeDefaultProp(propType);
			// console.log(propName, propValue);
			this.mountProp(propName, propValue);
		});
	}
	
	getPath(path){
		return this.props[path];
	}
	
	getBlockType(){
		return this.blockData.spec.blockType;
	}

	getDataTypes(){
		return this.blockData.spec.dataTypes;
	}

	getExecTypes(){
		return this.blockData.spec.execTypes;
	}

	mountProp(propName, propValue){
		let {propTypes} = this.blockData;
		
		if( !propTypes[propName] ){
			throw new Error(`Cannot mount unknown prop ${propName}`);
		}

		// could be anything actually !
		if( !(propValue instanceof Node) ){
			throw new Error(`Propvalue ${propName} must be an instance of Node`);
		}

		let propType = propTypes[propName];

		if( !_.contains(propType.nodeTypes, propValue.nodeType) ){
			throw new Error('Cannot mount accepted Node types does not match node-type of mountee node');
		}
		
		if( propValue.nodeType === NODE_TYPES.BLOCK ){
			// now lets do a quick check for block type
			if( !_.contains(propType.blockTypes, propValue.getBlockType()) ){
				throw new Error('Cannot mount accepted block types does not match block type of mountee node');
			}

			// and now lets see if we have a dataType
			if( propType.blockType === BLOCK_TYPES.VALUE && !!(_.intersection(propType.dataTypes, propValue.getDataTypes()).length) ){
				throw new Error('Cannount mount becasue the accepted data-type does not include the dataTypes of this block');
			}

			// Rarely ever going to ever happen
			if( propType.blockType === BLOCK_TYPES.FLOW && !!(_.intersection(propType.execTypes, propValue.getExecTypes()).length) ){
				throw new Error('Cannot mount because exec types are incompatible');
			}
		}
		// finally just mount
		let currentValue = this.props[propName];
		this.props[propName] = propValue;
		
		return currentValue;
	}

}