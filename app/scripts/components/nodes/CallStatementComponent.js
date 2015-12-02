import React, {Component} from 'react';
import Transformer from '../Transformer';
import CallStatement from '../../conductor/nodes/CallStatement';
import NodeComponent from './NodeComponent';
import ParameterComponent from './ParameterComponent';
import {Textfield} from 'react-mdl';

@Transformer(CallStatement)
class CallStatementComponent extends Component{
    render(){
        const {name, parameters} = this.props;
        return  <div className="statement call-statement">
                    <div className="text">call</div>
                    <div className="call-statement__name">
                        <NodeComponent
                            node={name}
                        />
                    </div>
                    <div className="call-statement__parameters text text--with-paranthesis">
                        <ParameterComponent
                            list={parameters}
                        />
                    </div>
                </div>;
    }
};

export default CallStatementComponent;
