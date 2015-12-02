import React, {Component} from 'react';
import Transformer from '../Transformer';
import ClassDeclaration from '../../conductor/nodes/ClassDeclaration';
import NodeComponent from './NodeComponent';
import ParameterComponent from './ParameterComponent';

function ClassProperty(prop){
    return  <div className="class-property">
            </div>
}

function ClassMethod(prop){
    
}

@Transformer(ClassDeclaration)
class ClassDeclarationComponent extends Component{
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

export default ClassDeclarationComponent;
