import {readonly} from 'core-decorators';
// Basenode is the class from which all the spec-nodes are defined
class BaseNode {

	static childTypes = [];

	constructor(nodeName, parent){
		this.nodeName = nodeName;
		this.__parent = parent;
		this.arrView  = [];
	}

	// this manages a cache
	__updateCache(){
		const {nodeName} = this;
		this.arrView = [
			nodeName,
			...this.children
		];
	}

	@readonly
	children = [];

	set parent(node){
		if( !(node instanceof BaseNode) && node !== null ){
			throw new Error(
				`node is not an instance of ${BaseNode}` +
				`varDump : ${node.nodeType}`
			)
		}
		this.__parent = node;
	}

	get parent(){
		return this.__parent;
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

	removeChild(childName){
		console.warn(
			`Attempted to remove ${childName} ` +
			`from ${this.name}that does not exist`
		);
	}

	// Mounts a child and checks for childType
	__mountChild(childType, prop){
		if( !childType.isValid(prop) ){
			throw new Error(
				`Cannot mount ${childType.propName}` +
				`in ${this.nodeName} varDump ` +
				`: ${JSON.stringify(prop)}`
			);
		}
		this.children[childType.idx] = prop;
		prop.parent = this;
	}

	// Set to default value
	__unmountChild(idx){
		let prop = this.children[idx];
		this.children[idx] = propTypes[idx].emptyValue;
		prop.parent = null;
	}

	__define({set, get}){
		Object.defineProperty(this, name, {
			writable : false,
			enumerable: true,
			set, get
		});

	}

	// Converts the Prop Index Notation
	// Creates a Getter and Setter
	__createSettersAndGetters(childTypes){
		childTypes.forEach((childType) => {
			const {name, idx} = childType;
			if( childType instanceof ChildArray ){
                // @TODO:
                // Arrays should have differrent way of doing things
                throw new Error('Not implemented')
			}
            this.__define({
                set(value){
                    if( this.children[idx] ){
                        this.__removeChild(idx);
                    }
                    this.__mountChild(childType, value);
                },
                get(){
                    this.children[idx];
                }
            })
            return;
		});
	}

	// intialize default values
	__initializeDefaults(childTypes){
		childTypes.forEach((childType) => {
			let {emptyValue, idx} = childType;
			this.children[idx] = emptyValue;
		});
		this.__updateCache();
	}

};


export default BaseNode;
