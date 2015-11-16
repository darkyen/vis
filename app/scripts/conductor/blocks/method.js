import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES, EXEC_TYPES} from '../core';
import def from '../def';
import React from 'react';
import {namedTypes, builders} from 'ast-types';

let blockDef =  (props, compiledProps, parentScope) => {
	return builders.functionDeclaration(
		compiledProps.fnName,
        [compiledProps.fnArgs],
		builders.blockStatement(compiledProps.body),
        false,
        false
	);
};

let blockMeta  = {
    fnName: {
        nodeTypes:  [NODE_TYPES.IDENTIFIER],
    },
	fnArgs: {
        nodeTypes:  [NODE_TYPES.IDENTIFIER],
	},
	body: {
		nodeTypes: [NODE_TYPES.LIST],
	}
};

let blockStruct = function(props){
	let {fnArgs, fnName, body} = props;
	return  <div className="def-block def-block--method">
				<div className="def-block__declaration block__part block__part--horizontal-expansion">
					<div className="text">define</div>
					{fnName}
                    <div className="def-block__arguments parenthesis">
                        {fnArgs}
                    </div>
				</div>
				<div className="def-block__body block__neck">
					<div className="block__neck-jewellary"></div>
					<div className="block__neck-children-container">
						{body}
					</div>
				</div>
				<div className="block__part"></div>
			</div>;
}

let spec = {
	// Give this a readable name if seems good enough
	blockName     : '$if',

	// What kind of output we provide ?
	blockType   : BLOCK_TYPES.DECLARATION,
};

export default def(spec, blockMeta, blockDef, blockStruct);
