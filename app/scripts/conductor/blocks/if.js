import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';

let ifBlockDef =  (blockMetaValues, parentScope) => {
	return 'if( $condition ){\n$body\n}';
};

let blockMeta  = {
	condition: {
		nodeTypes : [NODE_TYPES.BLOCK, NODE_TYPES.VOID], 
		blockTypes: [BLOCK_TYPES.VALUE]
	},
	body: {
		nodeTypes: [NODE_TYPES.LIST],
	}
};

let ifBlockStruct = function(props){
	let {condition, body} = props;
	return  <div className="if-block">
				<div className="block__part flex flex--horizontal flex--items-center">
					<div className="text">if</div> 
					{condition}
				</div>
				<div className="block__part">
					{body}
				</div>
			</div>;
}

let spec = {
	// Give this a readable name if seems good enough
	blockName     : '$if',

	// What kind of output we provide ?
	blockType   : BLOCK_TYPES.FLOW,
};

export default def(spec, blockMeta, ifBlockDef, ifBlockStruct);