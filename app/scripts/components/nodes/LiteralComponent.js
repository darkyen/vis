import React from 'react';
import {Textfield} from 'react-mdl';
import {updateLiteral} from '../../actions/blockActions';

class IdentifierComponent extends React.Component{
	render(){
		let {node, path} = this.props;		
		return  <input
					className="field field--literal"
            		// onChange={value => updateLiteral(value, path)}
            		// value={node.value}
            		label="Variable"
        		/>;
	}
};

export default IdentifierComponent;