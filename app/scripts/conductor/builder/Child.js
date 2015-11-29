export default class Child{
	constructor(name){
		this.name = name;
		this.checkers = [];
	}

	addTest(test){
		this.checkers.push(test);
		return this;
	}

	// Not chainable
	validate(el){
		return this.checkers.all(
			p => p(el)
		);
	}

	// Accepts types as variadic arguments
	// and checks if the function follows
	// any of the following given ones
	// prop.ofType(Foo)
	// prop.ofType(Bar, Bar)
	ofType(...tClassNames){
		return this.addTest((obj) => tClassNames.some(
			tClassName => obj.nodeType === tClassName
		));
	}

	//  Declares that the prop must be one of the
	//  the passed values. By convention it uses
	//  `Object.is` to compare values
	//	```
	//		prop.isOneOf('woo');
	//		prop.isOneOf('hello', 'world');
	//		prop.isOneOf(...possibleValues);
	//	```
	isOneOf(...posVals){
		return this.addTest((obj) => posVals.some(
			posVal => Object.is(posVal, obj)
		));
	}

	defaultsTo(value){
		this.emptyValue = value;
		return this;
	}

	// defines that the can't be empty
	// prop.cannotBeEmpty();
	cannotBeEmpty(){
		return this.addTest((obj) => !!obj);
	}
}
