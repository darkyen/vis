import React, {Component} from 'react';
import Transformer from '../Transformer';
import BinaryExpression from '../../conductor/nodes/BinaryExpression';
import NodeComponent from './NodeComponent';
import {Textfield} from 'react-mdl';

@Transformer(BinaryExpression)
class BinaryExpressionComponent extends Component{
    render(){
        const {left, operator, right} = this.props;
        return  <div className="expression binary-expression">
                    <div className="binary-expression__left">
                        <NodeComponent node={left} />
                    </div>
                    <div className="binary-expression__operator text">
                        {operator}
                    </div>
                    <div className="binary-expression__right">
                        <NodeComponent node={right} />
                    </div>
                </div>;
    }
};

export default BinaryExpressionComponent;
