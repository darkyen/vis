import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';

let blockDef =  (blockMetaValues, parentScope) => {
	return 'if( $condition ){\n$body\n}';
};

let propTypes  = {
	fnName: {
		nodeTypes  : [NODE_TYPES.IDENTIFIER],
		blockTypes : [BLOCK_TYPES.VALUE, BLOCK_TYPES.OBJECT]
	},

	fnArgsValue: {
		nodeTypes: [NODE_TYPES.LIST]
		blockType: [BLOCK_TYPES.VALUE],
	}
};

let blockStruct = (props) => {
	let {fnName, fnArgsValue} = props;
	return  <div className="call-block flex flex--horizontal">
				<div className="field">{fnName}</div>
				<div className="field field--with-parenthesis">{fnArgsValue}</div>
			</div>;
}


let spec = {
	// Give this a readable name if seems good enough
	blockName     : '$call',

	// What kind of output we provide ?
	blockType   : BLOCK_TYPES.FLOW,

	// This can be synchronous as well
	// as asynchronous use the deep search to figure out
	// which type is this going to be
	execTypes   : [FLOW_TYPES.SYNC, FLOW_TYPES.ASYNC]
};

let ifBlockSpec = def(spec, propTypes, blockDef, blockStruct);
export default ifBlockSpec;