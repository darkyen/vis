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

	function getChildTypeByIdx(idx){
		return childTypes[idx - offset];
	}

	class TempClass extends BaseType{
		// statics help only in defining the class name or stuff
		static typeName = name;

		// helps with finding childtypes
		static childTypes = BaseType.childTypes.concat(childTypes);

		// @TODO: Make the constructor
		// lighter

		// expose constructor
		constructor(...childValues){
			let appChildTypes = childTypes;
			super(...childValues);
            this.nodeName = name;
			// is called with values
			if( childValues[0] instanceof BaseNode ){
				appChildTypes = Object.keys(childValues[1])
					.map(getChildTypeByIdx).filter(Boolean)
				childValues   = childValues[1];
			}
        	this.__assignAndValidate(appChildTypes, childValues);
		}
	}

	return TempClass;
};


// Identifier.createFrom(id, [c,h,i,l,d,r,e,n])
// createIdentifier(...props);
