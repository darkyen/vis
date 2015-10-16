import React, {Component} from 'react';
import ScriptBlock from './ScriptBlock';
import Block from './Block';
import BlockDropZone from './BlockDropZone';

@Block('If', {oprClassDef: '$ctrl', oprName: '$if'})
class IfBlock extends Component{
	static defaultProps = {
		body: [],
		codition: {}
	};

	render(){
		let condition = <div className="if-block__condition-container">
							<div className="if-block__title">if</div>
							<BlockDropZone 
								path={this.props.joinPath('condition')} 
								acceptValue={true}
							>{this.props.condition}</BlockDropZone>
						</div>;

		return  <ScriptBlock
					className="if-block control-block" 
					header={condition}
				><BlockDropZone 
					path={this.props.joinPath('body', this.props.body.length)}
					acceptScriptBlock={true} 
				>{this.props.body}</BlockDropZone>
				</ScriptBlock>;
	}
}

export default IfBlock;