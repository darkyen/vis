import BaseNode from './BaseNode';

export default function def({name, childTypes=[], extend = BaseNode}){
	// childNameHashMap is there for making the search thing
	// not needed returns a class you can create an instanceof
	const BaseType = extend;
	const offset   = BaseType.childTypes.length;

    // Disable when compiling.
    console.log(`Extending ${BaseType.typeName} for ${name}`);

	if( !name ){
		throw new Error('name must be defined');
	}

	childTypes.forEach((childType, idx) => {
		childType.idx = idx + offset;
	});

	return class extends BaseType{
		// statics help only in defining the class name or stuff
		static typeName = name;

		// helps with finding childtypes
		static childTypes = BaseType.childTypes.concat(childTypes);

		// this constructor is more or less
		// a wrapper function the name is hack
		// the name is a lie, the name is name
        // ^the comment was written when I was
        // probably drunk.
		constructor(...childValues){
			super(...childValues);
            this.nodeName = name;
            this.__assignAndValidate(childTypes, childValues);
		}
	}
};


// Identifier.createFrom(id, [c,h,i,l,d,r,e,n])
// createIdentifier(...props);
