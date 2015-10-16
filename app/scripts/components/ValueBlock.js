import React, {Component} from 'react';
import classNames from 'classnames';

class ValueBlock extends Component{
	render(){
		let className = classNames("value-block",{
			'value-block--placeholder': React.Children.count(this.props.children) === 0
		}, this.props.className);
		return  <div className={className}>
					{this.props.children}
				</div>
	}
}

export default ValueBlock;