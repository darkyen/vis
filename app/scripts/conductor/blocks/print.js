import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';
import {namedTypes, builders} from 'ast-types';

let blockDef =  (props, compiledProps, parentScope) => {
	let {fnArgsValue} = compiledProps;
	// console.log(compiledProps, fnArgsValue);
    // temp hack to make things work
    let b = {
        "type": "CallExpression",
        "callee": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
                "type": "Identifier",
                "name": "console"
            },
            "property": {
                "type": "Identifier",
                "name": "log"
            }
        },
        "arguments": [fnArgsValue]
    };
	return builders.expressionStatement(b);
};

let propTypes  = {
	fnArgsValue: {
        nodeTypes:  [NODE_TYPES.IDENTIFIER, NODE_TYPES.LITERAL, NODE_TYPES.BLOCK],
        dataTypes:  [DATA_TYPES.NUMBER, DATA_TYPES.STRING, DATA_TYPES.BOOLEAN],
        blockTypes: [BLOCK_TYPES.VALUE],
	}
};

let blockStruct = (props) => {
	let {fnName, fnArgsValue} = props;
	return  <div className="call-block flex flex--horizontal flex--items-center">
				<div className="text">print</div>
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
