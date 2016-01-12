import React, {Component} from 'react';
import Transformer from '../Transformer';
import AssignmentStatement from '../../conductor/nodes/AssignmentStatement';
import {Textfield} from 'react-mdl';
import createNodeComponent from './createNodeComponent';

@Transformer(AssignmentStatement)
class AssignmentStatementComponent extends Component{
    render(){
        const {left, operator, right} = this.props;
        return  <div className="statement assignment-statement">
                    <div className="assignment-statement__left">
                        {createNodeComponent(left)}
                    </div>
                    <div className="assignment-statement__operator text">
                        {operator}
                    </div>
                    <div className="assignment-statement__right">
                        {createNodeComponent(right)}
                    </div>
                </div>;
    }
};

export default AssignmentStatementComponent;
