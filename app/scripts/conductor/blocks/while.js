import {BLOCK_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';
let blockMeta  = {
	condition: BLOCK_TYPES.VALUE,
	body: BLOCK_TYPES.FLOW
};


let whileBlockDef =  function(blockMetaValues){
	return 'while( $condition ){\n$body\n}';
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
