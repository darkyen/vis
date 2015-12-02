import React, {Component} from 'react';
import Transformer from '../Transformer';
import CallExpression from '../../conductor/nodes/CallExpression';
import NodeComponent from './NodeComponent';
import ParameterComponent from './ParameterComponent';
import {Textfield} from 'react-mdl';

@Transformer(CallExpression)
class CallExpressionComponent extends Component{
    render(){
        const {name, parameters} = this.props;
        return  <div className="expression call-expression">
                    <div className="text">call</div>
                    <div className="call-expression__name">
                        <NodeComponent
                            node={name}
                        />
                    </div>
                    <div className="call-expression__parameters text text--with-paranthesis">
                        <ParameterComponent
                            list={parameters}
                        />
                    </div>
                </div>;
    }
};

export default CallExpressionComponent;
