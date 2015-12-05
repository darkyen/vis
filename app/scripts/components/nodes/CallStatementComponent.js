import React, {Component} from 'react';
import Transformer from '../Transformer';
import CallStatement from '../../conductor/nodes/CallStatement';
import createNodeComponent from './createNodeComponent';
import ParameterComponent from './ParameterComponent';
import {Textfield} from 'react-mdl';

@Transformer(CallStatement)
class CallStatementComponent extends Component{
    render(){
        const {name, parameters} = this.props;
        return  <div className="statement call-statement">
                    <div className="text">call</div>
                    <div className="call-statement__name">
                        {createNodeComponent(name)}
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
