import React, {Component} from 'react';
import MDL from 'react-mdl';
import ValueBlock from './ValueBlock';
import classNames from 'classnames';
import Block from './Block';
import blockActions from '../actions/blockActions';

@Block('SetVariable', {
	oprClassDef: '$val',
	oprName: '$set'
})
class SetVariableBlock extends Component{
	handleChange(updatedText){
		blockActions.updateBlockMeta({
			name: updatedText
		}, this.props.path);
	}
	render(){
		let className = classNames("set-variable-block", {
		}, this.props.className);
		return  <ValueBlock className={className}>
					<div className="block-text">set</div>
					<div className="block-input-container">
						<MDL.Textfield onChange={this.handleChange.bind(this)} value={this.props.name} label="var-name" />
					</div>
					<div className="block-text">to</div>
					<div className="block-input-container">
						{this.props.value}
					</div>
				</ValueBlock>;
	}
}

export default SetVariableBlock;