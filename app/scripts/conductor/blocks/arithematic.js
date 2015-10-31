import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES} from '../core';
import def from '../def';
import basicOperations from '../basicOperations';
import React from 'react';

let arithBlocks = basicOperations.map(function(spec){

	let arithBlockDefStr, arithBlockStruct, blockMeta;

	let blockSpec = {
		blockName  : spec.operatorName,
		blockType  : BLOCK_TYPES.VALUE,
		dataTypes  : spec.returns
	};


	if( spec.operands !== 1 ){

		arithBlockDefStr = `($operand1 ${spec.operator} $operand2)`;
		arithBlockStruct =  (props) => {
			let {operand1, operand2} = props;
			return  <div className="arith-block flex flex--horizontal flex--items-center">
						{operand1}
						<div className="text">{spec.message}</div>
						{operand2}
					</div>;
		}

		blockMeta  = {
			operand1: {
				nodeTypes:  [NODE_TYPES.IDENTIFIER, NODE_TYPES.LITERAL, NODE_TYPES.BLOCK],
				blockTypes: [BLOCK_TYPES.VALUE],
				dataTypes:  [DATA_TYPES.NUMBER, DATA_TYPES.STRING, DATA_TYPES.BOOLEAN] 
			},
			operand2: {
				nodeTypes:  [NODE_TYPES.IDENTIFIER, NODE_TYPES.LITERAL, NODE_TYPES.BLOCK],
				blockTypes: [BLOCK_TYPES.VALUE],
				dataTypes:  [DATA_TYPES.NUMBER, DATA_TYPES.STRING, DATA_TYPES.BOOLEAN] 
			}
		};
	}else if(spec.operands === 1 ){
		arithBlockDefStr =  `( ${spec.operator} + $operand )`;
		arithBlockStruct =  (props)=>{
			let {operand} = props;
			return  <div className="arith-block flex flex-horizontal flex--items-center">
						<div className="text">{spec.message}</div>
						{operand}
					</div>
		}
		blockMeta  = {
			operand: {
				nodeTypes:  [NODE_TYPES.IDENTIFIER, NODE_TYPES.LITERAL, NODE_TYPES.BLOCK],
				blockTypes: [BLOCK_TYPES.VALUE],
				dataTypes:  [DATA_TYPES.NUMBER, DATA_TYPES.STRING, DATA_TYPES.BOOLEAN] 
			}
		};
	}else{
		throw new Error('Unknown number of operands');
	}

	let arithBlockDef = (blockMetaValues, parentScope) => {
		return arithBlockDefStr;
	}

	return def(blockSpec, blockMeta, arithBlockDef, arithBlockStruct);
});


export default arithBlocks;