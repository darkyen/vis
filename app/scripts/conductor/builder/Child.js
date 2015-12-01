import Validity from './Validity';
import {isInstance} from '../utils/types';

class Child{
	constructor(name){
		this.name = name;
		this.tests = [];
	}

	addTest(check){
        this.tests.push(check);
		return this;
	}

	// Not chainable
	validate(el){
        let validities = this.tests.map(
            test => test(el)
        );
        return Validity.merge(...validities);
	}

	// Accepts types as variadic arguments
	// and checks if the function follows
	// any of the following given ones
	// prop.ofType(Foo)
	// prop.ofType(Bar, Bar)
	ofType(...AllowedClasses){
        let validTypeNames = AllowedClasses.map(
            TClass => TClass.typeName || TClass.name
        ).join(' or ');

		return this.addTest((obj) => {
            let isObjectOfValidType = AllowedClasses.some(
                AllowedClass => isInstance(obj, AllowedClass)
            );
            return new Validity(isObjectOfValidType,
                `${this.name} can only be type ${validTypeNames}`);
        });
	}

    notOfType(...NotAllowedClasses){
        let inValidTypeNames = NotAllowedClasses.map(
            TClass => TClass.typeName || TClass.name
        ).join(' or ');

        return this.addTest((obj) => {
            let blamedClassName = '';
            for(let NotAllowedClass of NotAllowedClasses){
                if( isInstance(obj, NotAllowedClass) ){
                    blamedClassName = NotAllowedClass.typeName || NotAllowedClass.name;
                    break;
                }
            }

            return new Validity(!!blamedClassName,
                `${this.name} cannot be of type ${blamedClassName}`);
        });
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
		return this.addTest((obj) => {
            let isObjOneOfPosVals = posVals.some(
                posVal => Object.is(posVal, obj)
            );
            return new Validity(isObjectOfValidType,
                `${this.name} can only be one of ${posVals.join(', ')}`);
        }, 'isOneOf');
	}

    isNoneOf(...imposVals){
        return this.addTest((obj) => {
            let isImposs = '';
            for(let imposVal of imposVals ){
                if( Object.is(imposVal, obj) ){
                    isImposs = true;
                    break;
                }
            }
            return new Validity(isImposs,
                `${this.name} cannot be ${obj}`);
        });
    }

	defaultsTo(value){
		this.emptyValue = value;
		return this;
	}

	// defines that the can't be empty
	// prop.cannotBeEmpty();
	cannotBeEmpty(){
		return this.addTest((obj) => {
            return new Validity(!!obj,
                `${this.name} cannot be empty`);
        });
	}
}

export {Child};
export default function CreateChild(...args){
    return new Child(...args);
}
