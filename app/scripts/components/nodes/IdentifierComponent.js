import React from 'react';
import {Textfield} from 'react-mdl';
import {updateIdentifier} from '../../actions/blockActions';

class IdentifierComponent extends React.Component{
	render(){
		let path 		   = this.props.path;
		let identifierNode = this.props.node; 

		return  <input
            		onChange={e => updateIdentifier(e.target.value, path)}
            		value={identifierNode.identifierName}
					className="field field--identifier"
            		label="Variable"
        		/>;
	}
};

export default IdentifierComponent;