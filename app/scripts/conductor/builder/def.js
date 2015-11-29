import BaseNode from './BaseNode';
import {readonly} from 'core-decorators';

export default function def({name, childTypes=[], extend = BaseNode}){
	// childNameHashMap is there for making the search thing
	// not needed returns a class you can create an instanceof
	const BaseType = extend;
	const offset   = BaseType.childTypes.length;
	if( !name ){
		throw new Error('name must be defined');
	}
	childTypes.forEach((childType, idx){
		childType.idx = idx + offset;
	});

	return class extends BaseType{
		// statics help only in defining the class name or stuff
		@readonly
		static name = name;

		// helps with finding childtypes
		@readonly
		static childTypes = BaseType.childTypes.concat(childTypes);

		// this constructor is more or less
		// a wrapper function the name is hack
		// the name is a lie, the name is name
		constructor(name=name, parent){
			super(name, parent);
			this.__createSettersAndGetters(childTypes);
			this.__initializeDefaults(childTypes);
		}
	}
};
