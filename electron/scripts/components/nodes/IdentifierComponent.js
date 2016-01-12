import React, {Component} from 'react';
import Transformer from '../Transformer';
import Identifier from '../../conductor/nodes/Identifier';
import NodeComponent from './NodeComponent';
import {Textfield} from 'react-mdl';

@Transformer(Identifier)
class IdentifierComponent extends Component{
    render(){
        const {name, updateProp} = this.props;
        return  <div className="identifier">
                    <input
                        className="identifier__input"
                        placeHolder="Variable Name"
                        onChange={e => updateProp('name', e.target.value)}
                        value={name}
                    />
                </div>;
    }
};

export default IdentifierComponent;
