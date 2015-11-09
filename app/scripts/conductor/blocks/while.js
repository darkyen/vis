import {NODE_TYPES, BLOCK_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';
import {namedTypes, builders} from 'ast-types';


let blockMeta  = {
	condition: {
		nodeTypes : [NODE_TYPES.BLOCK, NODE_TYPES.VOID], 
		blockTypes: [BLOCK_TYPES.VALUE]
	},
	body: {
		nodeTypes: [NODE_TYPES.LIST],
	}
};


let whileBlockDef =  function(props, compiledProps){
	return builders.ifStatement(compiledProps.condition, builders.blockStatement(compiledProps.body));
}

let whileBlockStruct = (props) => {
	let {condition, body} = props;
	return  <div className="while-block">
				<div className="while-block__condition-wrapper flex flex--horizontal">
					<div className="text">while</div> 
					<div className="while-block__condition-container">{condition}</div>
				</div>
				<div className="while-block__body-wrapper">
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
