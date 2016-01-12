import React, {Component} from 'react';
import Transformer from '../Transformer';
import IfExpression from '../../conductor/nodes/IfExpression';
import NodeComponent from './NodeComponent';

@Transformer(IfExpression)
class IfStatementComponent extends Component{
    render(){
        const {condition, consequent, alternate} = this.props;
        return  <div className="if-statement">
                    <div className="if-statement__consequent">
                        <NodeComponent node={consequent} />
                    </div>
                    <div className="text">if</div>
                    <div className="if-statement__condition">
                        <NodeComponent node={condition} />
                    </div>
                    <div className="text">else</div>
                    <div className="if-statement__alternate">
                        <NodeComponent node={consequent} />
                    </div>
                </div>;
    }
};

export default IfStatementComponent;
