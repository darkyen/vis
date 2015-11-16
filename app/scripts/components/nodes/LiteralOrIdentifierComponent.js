import React from 'react';
import {Textfield} from 'react-mdl';
import {NODE_TYPES} from '../../conductor/core';
import {updateLiteralOrIdentifier} from '../../actions/blockActions';
import {debounce} from 'core-decorators';
import classNames from 'classNames';
import _ from 'lodash';

class ExpandableField extends React.Component{
	constructor(props){
		super(props);
		let {defaultValue} = this.props;
		this.state = {
			value: defaultValue
		};
	}

	onChange(e){
		this.setState({
			value: e.target.value
		});
		this.props.onChange && this.props.onChange(e);
	}

	render(){
		let {nodeType} = this.props;
		let className = classNames('expandable-field', {
			'expandable-field--identifier': nodeType === NODE_TYPES.IDENTIFIER,
			'expandable-field--literal': nodeType === NODE_TYPES.LITERAL,
		}, this.props.className);

		return  <div className={className}>
					<div className="expandable-field__hidden-field">
						{this.state.value}
					</div>
					<input
						className="expandable-field__input"
						onChange={e => this.onChange(e)}
						value={this.state.value}
					/>
				</div>;
	}
};

class LiteralOrIdentifierField extends React.Component{
	// figure out the update routine to call
	// using super smart calculation
	@debounce(300)
	updateValue(e){
        let value = e.target.value;
        let {nodeType} = this.props.node;
        let {path} = this.props;
        updateLiteralOrIdentifier(value, path);
	}

	render(){
		let {node, path} = this.props;
        let {nodeType} = node;
        let value = nodeType === NODE_TYPES.LITERAL ? node.value : node.name;
        let dataType  = node.type;

		return  <div className={'field'}>
                    <ExpandableField
					 	nodeType={nodeType}
                		onChange={e => this.updateValue(e)}
    					defaultValue={value}
                        key={path}
            		/>
                </div>;
	}
};

export default LiteralOrIdentifierField;
