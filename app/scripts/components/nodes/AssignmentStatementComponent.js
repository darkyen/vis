import React, {Component} from 'react';
import Transformer from '../Transformer';
import AssignmentStatement from '../../conductor/nodes/AssignmentStatement';
import NodeComponent from './NodeComponent';
import {Textfield} from 'react-mdl';

@Transformer(AssignmentStatement)
class AssignmentStatementComponent extends Component{
    render(){
        const {left, operator, right} = this.props;
        return  <div className="statement assignment-statement">
                    <div className="assignment-statement__left">
                        <NodeComponent node={left} />
                    </div>
                    <div className="assignment-statement__operator text">
                        {operator}
                    </div>
                    <div className="assignment-statement__right">
                        <NodeComponent node={right} />
                    </div>
                </div>;
    }
};

export default AssignmentStatementComponent;
