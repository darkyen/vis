import {Child} from './Child';
import {ChildArray} from './ChildArray';
import Validity from './Validity';
// Basenode is the class from which all the spec-nodes are defined
class BaseNode {
    static typeName   = 'BaseNode';
	static childTypes = [];

	constructor(){
        // always valid !
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

	// @TODO: Implement path setter and getter
	// get path(){
	// 	return this.__parent ? this.__parent.getPath() : '$'
	// }

	// set path(t){
	// 	throw new Error('Cannot set path');
	// }
	// cached value

	toArr(){
		return this.arrView;
	}

	// Mounts a child and checks for childType
    // also updates validity, this validity can
    // be used by both the ast walker and the
    // ide to mark / throw issues.
	__mountChild(idx, childValue, emptyValue){
        this.children[idx] = childValue;
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
            let {idx, emptyValue} = childType.idx;
            this.__mountChild(idx, childValues[idx], emptyValue);
        });
        this.__updateCache();
    }

};

export default BaseNode;
