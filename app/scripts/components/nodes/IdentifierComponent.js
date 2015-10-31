import React from 'react';
import {Textfield} from 'react-mdl';
import {updateIdentifier} from '../../actions/blockActions';

class IdentifierComponent extends React.Component{
	render(){
		let path 		   = this.props.path;
		let identifierNode = this.props.node; 
		
		return  <input
					className="field field--identifier"
            		// onChange={e => updateIdentifier(e.target.value, path)}
            		// value={identifierNode.identifierName}
            		label="Variable"
        		/>;
	}
};

export default IdentifierComponent;