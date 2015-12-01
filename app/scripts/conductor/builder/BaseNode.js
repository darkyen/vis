import {Child} from './Child';
import {ChildArray} from './ChildArray';
import Validity from './Validity';
// Basenode is the class from which all the spec-nodes are defined
class BaseNode {
    static typeName   = 'BaseNode';
	static childTypes = [];

	constructor(nodeName){
        // always valid !
        this.validity = new Validity(true, '');
		this.nodeName = nodeName;
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
	__mountChild(childType, childValue){

        let validity = childType.validate(childValue);
        // console.log('Validity :', validity);
        // console.log(`mounting ${childType.name} at idx: ${childType.idx} in ${this.nodeName}`)
        this.validity = validity;
        this.children[childType.idx] = childValue || childType.emptyValue;
        this.__updateCache();
	}

	__define({name, set, get}){
        // console.log(`Defining ${name} for object of type ${this.nodeName}`);
    	Object.defineProperty(this, name, {
			enumerable: true,
			set, get
		});
	}

	// Converts the Prop Index Notation
	// Creates a Getter and Setter
	__createSettersAndGetters(childTypes){
		childTypes.forEach((childType) => {
			const {name, idx, emptyValue} = childType;
			if( childType instanceof ChildArray ){
                // @TODO:
                // Arrays should have differrent way of doing things
                throw new Error('Not implemented')
			}
            this.__define({
                name,
                set(value){
                    this.__mountChild(childType, value);
                },
                get(){
                    return this.children[idx];
                }
            })
            return;
		});
	}

	// intialize default values
    // @TODO: This must follow the validation
    // route.
	__initializeDefaults(childTypes){
		childTypes.forEach((childType) => {
			let {emptyValue, idx} = childType;
			this.children[idx] = emptyValue;
		});
		this.__updateCache();
	}

};

export default BaseNode;
