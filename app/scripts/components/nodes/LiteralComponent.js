import React, {Component} from 'react';
import Transformer from '../Transformer';
import Identifier from '../../conductor/nodes/Identifier';
import NodeComponent from './NodeComponent';
import {Textfield} from 'react-mdl';

@Transformer(Identifier)
class LiteralComponent extends Component{
    render(){
        const {value, updateProp} = this.props;
        return  <div className="literal">
                    <input
                        onChange={e => updateProp('value', e.target.value)}
                        placeHolder="Literal Value"
                        className="literal__input"
                        value={value}
                    />
                </div>;
    }
};

export default LiteralComponent;
