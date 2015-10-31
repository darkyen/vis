import React, {Component} from 'react';
import classNames from 'classnames';

class SideBar extends Component{
	render(){

		return 	<div className="sidebar">
					<header className="sidebar__header">Blocks</header>
					<div className="sidebar__content">
						<div className="block-list">
							{this.props.children}
						</div>
					</div>
					<footer className="sidebar__footer"></footer>
				</div>;
	
	}
}

export default SideBar;