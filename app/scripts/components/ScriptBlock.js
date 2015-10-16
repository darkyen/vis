import React, {Component} from 'react';
import classNames from 'classnames';

class ScriptBlock extends Component{
	render(){
		let className = classNames("script-block",{
			'script-block--with-scope': this.props.withScope
		}, this.props.className);

		return 	<div {...this.props} className={className}>
					<div className="script-block__header">
						{this.props.header}
					</div>
					<div className="script-block__children">
						{this.props.children}
					</div>
					<div className="script-block__footer">
						{this.props.footer}
					</div>
				</div>;
	}
}

export default ScriptBlock;