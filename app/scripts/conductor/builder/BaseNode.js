import {Child} from './Child';
import {ChildArray} from './ChildArray';
import Validity from './Validity';

// Basenode is the class from which all the spec-nodes are defined
// This houses hidden properties from the nodes and also manages
// validity all the derived classes barely assign the methods
// and declare a static prop on them.
class BaseNode {
    static typeName   = 'BaseNode';
	static childTypes = [];

	constructor(){
		this.nodeName = 'BaseNode';
        this.__validities = [];
        this.children = [];
		this.arrView  = [];
	}

	// this manages a cache
	__updateCache(){
		const {nodeName, children} = this;
		this.arrView = [nodeName, ...children];
	}

    toString(){
        return `[${this.toArr().toString()}]`;
    }

	toArr(){
        this['validity'] = this.validity;
		return this.arrView;
	}

	// Mounts a child and checks for childType
    // also updates validity, this validity can
    // be used by both the ast walker and the
    // ide to mark / throw issues.
	__mountChild(idx, childValue, emptyValue){
        this.children[idx] = childValue || emptyValue;
	}

    __validateChildren(childTypes){
        for (const childType of childTypes ){
            const {idx} = childType;
            const childValue = this.children[childType.idx];
            this.__validities[idx] = childType.validate(childValue);
        };
    }

    get validity(){
        return Validity.merge(...this.__validities);
    }

    __assignAndValidate(childTypes, childValues){
        childTypes.forEach((childType) => {
            const {idx, emptyValue} = childType;
            this.__mountChild(idx, childValues[idx], emptyValue);
        });
        this.__updateCache();
    }

    // can clone any node with new props
    cloneNode(newPropMap={}){
    	const {nodeName, children} = this;
    	const keys = Object.keys(newPropMap);
    	keys.forEach(key => {
    		const [chIdx, aIdx] = key.split(':');
    		if( aIdx ){
    			children[chIdx][aIdx] = newPropMap[key];
    			return;
    		}
    		children[chIdx] = newPropMap[key];
    	});
    	return new this.prototype.constructor(...children);
    }

    // the new path spec
    // . and :
    // . denotes nodes children
    // : denotes nodes children's children
    // @TODO: maybe rename this to clone deep ?
    updateDeep(parts, updatedNode){
    	const nodeAddress = parts.pop();
    	// need to visit even further
    	if( parts.length ){
    		const [chIdx, aIdx] = nodeAddress.split(':');
    		const ownerNode = aIdx?this.children[chIdx][aIdx]:this.children[chIdx];
    		updatedNode = ownerNode.updateDeep(parts, updatedNode);
    	}

    	return this.cloneNode({
    		[nodeAddress]: updatedNode
    	});
    };

};

export default BaseNode;
