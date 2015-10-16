import React, {Component} from 'react';

// Handles the drag and super drop shit too
import ValueBlock from './ValueBlock';
import {Textfield} from 'react-mdl';
import Block from './Block';

@Block('ConstantBlock', {oprClassDef: '$val', oprName: '$cns' })
class ConstantBlock extends Component{
	render(){
		return  <ValueBlock className={this.props.className}>
					<Textfield label={'foo-bar'} value={this.props.value} onChange={ ()=>{} } />
				</ValueBlock>
	}
}

export default ConstantBlock;