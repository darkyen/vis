import {NODE_TYPES, BLOCK_TYPES, EXEC_TYPES, DATA_TYPES} from '../core';
import def from '../def';
import React from 'react';
import {namedTypes, builders} from 'ast-types';


let blockMeta  = {
	condition: {
		nodeTypes : [NODE_TYPES.BLOCK, NODE_TYPES.VOID],
		blockTypes: [BLOCK_TYPES.VALUE],
		dataTypes: DATA_TYPES.ALL
	},
	body: {
		nodeTypes: [NODE_TYPES.LIST],
	}
};


let whileBlockDef =  function(props, compiledProps, parentScope){
	return builders.whileStatement(
		compiledProps.condition,
		builders.blockStatement(compiledProps.body)
	);
}

let whileBlockStruct = (props) => {
	let {condition, body} = props;
	return  <div className="while-block">
				<div className="while-block__condition block__part flex flex--horizontal flex--items-center">
					<div className="text">while</div>
					{condition}
				</div>
				<div className="while-block__body block__part">
					{body}
				</div>
			</div>;
};


let spec = {
	// Give this a readable name if seems good enough
	blockName     : '$while',
	// What kind of output we provide ?
	blockType   : BLOCK_TYPES.FLOW
};

export default def(spec, blockMeta, whileBlockDef, whileBlockStruct);
