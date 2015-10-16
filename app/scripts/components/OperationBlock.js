import React, {Component} from 'react';
import Block from './Block';
import classNames from 'classnames';

class OperationBlock extends Component{
	render(){
		let className = classNames("condition-block", {
			'condition-block--some-prop': this.props.thatProp
		});

		return  <div className={className} oprClassDef={"$arit"} {...this.props}>
					{this.props.children}
				</div>;
	}
}

export default OperationBlock;