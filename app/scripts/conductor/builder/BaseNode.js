import {Child} from './Child';
import {ChildArray} from './ChildArray';
import Validity from './Validity';
import getCtrOf from '../utils/getConstructorOf';
import {isBaseInstance} from '../utils/types';
// Basenode is the class from which all the spec-nodes are defined
// This houses hidden properties from the nodes and also manages
// validity all the derived classes barely assign the methods
// and declare a static prop on them.
function convertChildToArr(child){
    if( Array.isArray(child) ){
        return child.map(convertChildToArr);
    }

    if( isBaseInstance(child) ){
        return child;
    }

    return child.toArr();
};

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
        const compiledChildren = children.map(convertChildToArr);
        this.arrView = [nodeName, ...compiledChildren];
        this.arrView['validity'] = Validity.merge(
            ...this.__validities
        );
	}

    toString(){
        return `[${this.toArr().toString()}]`;
    }

	toArr(){
		return this.arrView;
	}

    __assignAndValidate(childTypes, childValues){
        let childTypeLen = childTypes.length;
        let childType, idx, emptyValue, childValue;
        for( let i = 0; i < childTypeLen; i++ ){
            childType = childTypes[i];
            idx = childType.idx;
            emptyValue = childType.emptyValue;
            childValue = childValues[idx];
            this.children[idx] = childValue || emptyValue;
            this.__validities[idx] = childType.validate(childValue);
        }
        // this.__updateCache();
    }

    // can clone any node with new props
    cloneNode(newPropMap={}){
    	const {nodeName, children} = this;
    	const keys = Object.keys(newPropMap);
        const Ctr = getCtrOf(this);
        const keyLen = keys.length;
        let chIdx, aIdx, key;
        for( let i = 0; i < keyLen; i++ ){
            key = keys[i];
            [chIdx, aIdx] = key.split(':');
            if( aIdx ){
                children[chIdx][aIdx] = newPropMap[key];
                continue;
            }
            children[chIdx] = newPropMap[key];
        }

    	return new Ctr(...children);
    }

    // the new path spec uses two symbols . and :
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
