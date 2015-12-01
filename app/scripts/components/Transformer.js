import {Component} from 'react';
// Converts 1.5 V voltage in your RAM to 20000000MV !

// Not really just a simple Higher order component which
// takes a ClassTypeMap and converts the Component into
// a component which you can just pass the arrayfied version
// but will convert it to nice prop name's

const Transformer = (ASTClass) => {
    function transform(inputArr){
        let out = {};
        for( let childType of ASTClass.childTypes ){
            let {idx, name} = childType;
            // +1 because of the shift.
            out[name] = inputArr[idx + 1];
        }
        out.validity = inputArr.validity;
        return out;
    }

    function updateProp(name, value){
        console.log("You need to merge this to actionCreators");
    }

    function addChild(child){
        console.log("You need to update this to pipe it to the actionCreator");
    }

    const helpers = {addChild, updateProp};
    return (Component) => class extends Component {
        displayName = `Transformer(${ASTClass.typeName})`;
        render(){
            let propObjs = transform(this.props.node);
            return <Component
                {...this.props}
                {...propObjs}
                {...helpers}
            />;
        }
    }
}
