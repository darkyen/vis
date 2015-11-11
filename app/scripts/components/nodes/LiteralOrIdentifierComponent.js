import React from 'react';
import {Textfield} from 'react-mdl';
import {NODE_TYPES} from '../../conductor/core';
import {updateLiteralOrIdentifier} from '../../actions/blockActions';
import {debounce} from 'core-decorators';
import classNames from 'classNames';
import _ from 'lodash';

class LiteralOrIdentifierField extends React.Component{
	@debounce(300)
	updateValue(e){
        let value = e.target.value;
        let {nodeType} = this.props.node;
        let path = this.props.path;

        // figure out the update routine to call
        // using super smart calculation
        updateLiteralOrIdentifier(value, path);
	}

    @debounce(300)
    updateNodeType(e){
        console.log(e.target.value);
        let value = e;
    }

	render(){
		let {node, path} = this.props;
        let {nodeType} = node;
        let value = nodeType === NODE_TYPES.LITERAL ? node.value : node.name;
        let dataType  = node.type;

        let className = classNames('field', {
            'field--identifier': nodeType === NODE_TYPES.IDENTIFIER,
            'field--literal': nodeType === NODE_TYPES.LITERAL
        });

		return  <div className={className}>
                    <input
                        key={path}
    					className="field__input"
                		onChange={e => this.updateValue(e)}
                		defaultValue={value}
                		label="Constant"
            		/>
                </div>;
	}
};

export default LiteralOrIdentifierField;
