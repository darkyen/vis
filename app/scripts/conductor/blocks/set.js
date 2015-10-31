import {BLOCK_TYPES, NODE_TYPES, DATA_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';

let blockDef =  (props, parentScope) => {
	let {varName, varValue} = props; 
	let dec = [varName, '=', varName, ';'];
	if( !parentScope.exists(varName) ){
		parentScope.declare(varName, varValue);
		dec.unshift('let');
	}
	return dec.join(' ');
};

let blockMeta  = {
	varName: {
		nodeTypes:  [NODE_TYPES.IDENTIFIER],
	},
	varValue: {
		nodeTypes  :  [NODE_TYPES.IDENTIFIER, NODE_TYPES.LITERAL, NODE_TYPES.BLOCK],
		blockTypes :  BLOCK_TYPES.ALL,
		dataTypes  :  DATA_TYPES.ALL 
	},
};

let blockStruct = (props) => {
	let {varName, varValue} = props;
	return  <div className="set-block flex flex--horizontal flex--items-center">
				<div className="text">set</div>
				{varName}
				<div className="text">to</div>
				{varValue}
			</div>
}


let spec = {
	// Give this a readable name if seems good enough
	blockName   : '$set',

	// What kind of output we provide ?
	blockType   : BLOCK_TYPES.FLOW,
};

export default def(spec, blockMeta, blockDef, blockStruct);
