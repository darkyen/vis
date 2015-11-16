import {NODE_TYPES, BLOCK_TYPES, DATA_TYPES} from '../core';
import def from '../def';
import basicOperations from '../basicOperations';
import React from 'react';
import {namedTypes, builders} from 'ast-types';

let arithBlocks = basicOperations.map(function(spec){

	let arithBlockStruct, blockMeta, arithBlockDef;

	let blockSpec = {
		blockName  : spec.operatorName,
		blockType  : BLOCK_TYPES.VALUE,
		dataTypes  : spec.returns
	};


	if( spec.operands !== 1 ){

		arithBlockDef = (props, compiledProps, parentScope) => {
			let {operand1, operand2} = compiledProps;
			let exprType = spec.exprType || 'binaryExpression';
			return builders[exprType](spec.operator, operand1, operand2);
		}

		arithBlockStruct =  (props) => {
			let {operand1, operand2} = props;
			return  <div className="arith-block">
						<div className="block__part block__part--horizontal-expansion">
							{operand1}
							<div className="text">{spec.message}</div>
							{operand2}
						</div>
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

		arithBlockDef = (props, compiledProps, parentScope) => {

			let {operand} = compiledProps;
			return builders.unaryExpression(spec.operator, operand);

		}

		arithBlockStruct =  (props)=>{
			let {operand} = props;
			return  <div className="arith-block flex flex-horizontal flex--items-center">
						<div className="block__part block__part--horizontal-expansion">
							<div className="text">{spec.message}</div>
							{operand}
						</div>
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

	return def(blockSpec, blockMeta, arithBlockDef, arithBlockStruct);
});


export default arithBlocks;
