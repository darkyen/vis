import React from 'react';
import {Textfield} from 'react-mdl';
import {updateLiteral} from '../../actions/blockActions';

class VoidComponent extends React.Component{
	render(){
		let path = this.props.path;
		return  <div className="field"></div>;
	}
};

export default VoidComponent;
