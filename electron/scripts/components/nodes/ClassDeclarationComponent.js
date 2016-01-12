import React, {Component} from 'react';
import Transformer from '../Transformer';
import ClassDeclaration from '../../conductor/nodes/ClassDeclaration';
import createNodeComponent from './createNodeComponent';
import ParameterComponent from './ParameterComponent';

function ClassProperty(prop){
    let {name, value} = prop;
    return  <div className="class-property">
                <div className="class-property__name">
                    {createNodeComponent(name)}
                </div>
                <div className="class-property__value">
                    {createNodeComponent(value)}
                </div>
            </div>;
}

function ClassMethod(prop){
    let {name, arguments, body} = prop;
    return  <div className="class-method">
                <div className="class-method__definition">
                    <div className="text">def</div>
                    <div className="class-method__name">
                        {createNodeComponent(name)}
                    </div>
                </div>
                <div className="class-method__body">
                    {createNodeComponent(body)}
                </div>
            </div>;
}

@Transformer(ClassDeclaration)
class ClassDeclarationComponent extends Component{
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

export default ClassDeclarationComponent;
