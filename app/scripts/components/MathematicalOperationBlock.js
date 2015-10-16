import React, {Component} from 'react';
import OperationBlock from './OperationBlock';
import BlockDropZone from './BlockDropZone';
import Block from './Block';

let createMathematicalBlock = (spec) => 
	Block(spec.message, {
		oprClassDef: '$arit',
		oprName: spec.operator
	})(
	class extends Component{
		static displayName = 'MathmeticalBlock(' + spec.message + ')';

		render(){
			// console.log(spec);
			let operands = this.props.operands || [];
			let path = this.props.path;

			if( spec.operands && spec.operands === 1 ){
				return  <OperationBlock>
							<div className="condition-block__title">
								{spec.message}
							</div>
							<BlockDropZone 
								path={this.props.joinPath('operands','0')} acceptValue={true} 
							>{operands[0]}</BlockDropZone> 
						</OperationBlock>;
			}

			return  <OperationBlock>
						<BlockDropZone 
							path={this.props.joinPath('operands', 0)} acceptValue={true} 
						>{operands[0]}</BlockDropZone> 
						<div className="condition-block__title">
							{spec.message}
						</div>
						<BlockDropZone 
							path={this.props.joinPath('operands', 1)} acceptValue={true} 
						>{operands[1]}</BlockDropZone> 
					</OperationBlock>;
		}
	})

export default createMathematicalBlock;