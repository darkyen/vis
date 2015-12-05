import React, {Component} from 'react';
import Transformer from '../Transformer';
import BinaryExpression from '../../conductor/nodes/BinaryExpression';
import createNodeComponent from './createNodeComponent';
import {Textfield} from 'react-mdl';

@Transformer(BinaryExpression)
class BinaryExpressionComponent extends Component{
    render(){
        const {left, operator, right} = this.props;
        return  <div className="expression binary-expression">
                    <div className="binary-expression__left">
                        {createNodeComponent(left)}
                    </div>
                    <div className="binary-expression__operator text">
                        {operator}
                    </div>
                    <div className="binary-expression__right">
                        {createNodeComponent(right)}
                    </div>
                </div>;
    }
};

export default BinaryExpressionComponent;
