import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';
import {namedTypes, builders} from 'ast-types';

let blockDef =  (props, compiledProps, parentScope) => {
	let {fnName, fnArgsValue} = compiledProps;
	// console.log(compiledProps, fnArgsValue);
	return builders.expressionStatement(
		builders.callExpression(fnName, fnArgsValue)
	);
};

let propTypes  = {
	fnName: {
		nodeTypes  : [NODE_TYPES.IDENTIFIER],
		blockTypes : [BLOCK_TYPES.VALUE, BLOCK_TYPES.OBJECT]
	},

	fnArgsValue: {
		blockType: [BLOCK_TYPES.VALUE],
		nodeTypes: [NODE_TYPES.LIST],
		joinBy: ', '
	}
};

let blockStruct = (props) => {
	let {fnName, fnArgsValue} = props;
	return  <div className="call-block flex flex--horizontal flex--items-center">
				<div className="text">call</div>
				{fnName}
				<div className="call-block__arguments flex flex--horizontal flex--items-center parenthesis">{fnArgsValue}</div>
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
	execTypes   : [EXEC_TYPES.SYNC, EXEC_TYPES.ASYNC]
};

let ifBlockSpec = def(spec, propTypes, blockDef, blockStruct);
export default ifBlockSpec;
