import React, {Component} from 'react';
import Transformer from '../Transformer';
import IfStatement from '../../conductor/nodes/IfStatement';
import NodeComponent from './NodeComponent';

@Transformer(IfStatement)
class IfStatementComponent extends Component{
    render(){
        const {condition, consequent, alternate} = this.props;
        return  <div className="if-block">
                    <div className="if-block__condition">
                        <div className="text">if</div>
                        <NodeComponent node={condition} />
                    </div>
                    <div className="if-block__consequent">
                        <NodeComponent node={consequent} />
                    </div>
                    <div className="if-block__alternate">
                        <div className="text">else</div>
                        <NodeComponent node={consequent} />
                    </div>
                </div>;
    }
};

export default IfStatementComponent;
