import _ from 'lodash';
import Node from './Node';
import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES} from '../core';
import {namedTypes, builders} from 'ast-types';

class List extends Node{
	constructor(listSpec = {
		propType: {
			nodeTypes: [NODE_TYPES.BLOCK],
			blockTypes: [BLOCK_TYPES.FLOW, BLOCK_TYPES.DECLARATION]
		}
	}){
		super(NODE_TYPES.LIST, listSpec);
		// The props here are an array.
		this.propType = listSpec.propType;
		this.nodes = [];
	}

	getPath(path){
		return this.nodes[path];
	}

	mountProp(propIndex = this.nodes.length, propValue){
		//
		if( propIndex < 0 ){
			propIndex = 0;
		}

		if( propIndex > this.nodes.length ){
			propIndex = this.nodes.length;
		}

		// could be anything actually !
		if( !(propValue instanceof Node) ){
			throw new Error(`Propvalue ${propName} must be an instance of Node`);
		}

		let {propType} = this;
		// console.log(propType, propValue);

		if( !_.contains(propType.nodeTypes, propValue.nodeType) ){
			throw new Error('Cannot mount accepted Node types does not match node-type of mountee node');
		}

		if( propValue.nodeType !== NODE_TYPES.BLOCK ){
			// now lets do a quick check for block type
			throw new Error('Cannot mount accepted node-type is not block');
		}

		if( !_.contains(propType.blockTypes, propValue.getBlockType()) ){
			throw new Error('Cannot mount accepted block types does not match block type of mountee node');
		}

		// and now lets see if we have a dataType
		if( propType.blockType === BLOCK_TYPES.VALUE && !!(_.intersection(propType.dataTypes, propValue.getDataTypes()).length) ){
			throw new Error('Cannot mount becasue the accepted data-type does not include the dataTypes of this block');
		}

		let currentMountedProp = propValue[propIndex];
		this.nodes[propIndex]  = propValue;

		return currentMountedProp;
	}

	__compile(parentScope){
		return this.nodes.map( n => n.compile(parentScope) );
	}

	__serialize(){
		return {
			listSpec: {
				propType: this.propType
			},
			nodes: this.nodes.map((node) => {
				return node.serialize();
			})
		};
	}
}

export default List;
