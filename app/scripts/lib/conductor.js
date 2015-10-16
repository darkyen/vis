import _ from 'lodash';

// Well the spaces thing is just for formatting
// the scope is actually a block so you know
// its all good --- promise !

// future self -- at this point you were a blithering
// monkey who barely knows how to type

// PS you will someday hate writing this line
// PPS nevermind.
function createChildScope(parentScope){
	return _.assign({}, parentScope, {
		spaces: parentScope.spaces + 4
	});
}


// // Convert a condition -- simple
// // just convert the arithematic condition
// // which exists or if not just convert whatever
// // you get to a boolean
// function convertNestedArithematicEquation(node, parentScope){
// 	let type = node.oprClassDef;
	
// 	if( type !== '$arit' ){
// 		return node.meta.operands.map((def) =>{
// 			return convertNode(def, parentScope)
// 		});
// 	}

// }

// Input is a valid lineJson
// define lineJSON structure
/* 
	{
		oprClassDef: $VALID_OPERATION_CLASS
		oprName:$VALID_OPERATION
		meta: {
	
		}
	}
*/

// Underlying algorithm is

// 1. Find Class of line
// 2. Find the Converter function
// 3. Execute Converter Function
// 4. Return

function convertNode(node, parentScope){
	console.log(node);
	let {oprClassDef, oprName} =  node;
	let oprDict = operationClasses[oprClassDef];

	if( !oprDict ){
		throw new Error('Unknown Operation class ' + oprClassDef);
	}

	let oprFn = oprDict[oprName];
	
	if( !oprName ){
		throw new Error('Unknown Operation in class', oprClass, 'by name', oprName);
	}
	
	return oprFn(node, parentScope);
}


function convertBlock(lines, parentScope, scopeVars){
	let currentScope = createChildScope(parentScope);
	if( scopeVars !== undefined ){
		scopeVars.forEach(varName => {
			currentScope.variableExists[varName] = true
		}); 
	}

	return lines.map( line => {
		return convertNode(line, currentScope);
	}).join(';\n');
}

function convertIfScript(ifDef, parentScope){
	return   'if(' +  convertCondition(ifDef.condition) + '){\n'
		   +   	 convertBlock(ifDef.body, parentScope)
		   + '}\n';
}

function convertIfElseScript(ifDef, parentScope){
	return   'if(' +  convertCondition(ifDef.condition) + '){\n'
		   +   	 convertBlock(ifDef.ifBody, parentScope)
		   + '}else{\n'
		   		 convertBlock(ifDef.elseBody, parentScope)
		   + '}\n';
}

function convertElseIfScript(ifDef, parentScope){
	throw new Error('Not supported');
}

function setValue(varDef, parentScope){
	let line = [varDef.meta.name, '=' , getValue(varDef.meta.value, parentScope), '\n'];
	if( parentScope.variableExists[varDef.meta.name] === undefined ){
		parentScope.variableExists[varDef.meta.name] = true;
		line.unshift('let');
	}
	return line.join(' ');
}	

// Recursively mine and generate an equation
// The error thrown at this point will be removed
// in future as we will have source maps.
function getValue(varDef, parentScope){
	// Throw error here if cannot find variable in the parent scope
	if( varDef.oprClassDef === '$arit' ){
		/* Wtf ? */
		return convertNode(varDef, parentScope);
	}

	// Raw variable names are noted as $val
	// convention must be followed
	if( varDef.oprClassDef === '$val' ){
				
		if( varDef.oprName === '$que' ){
			if( parentScope.variableExists[varDef.meta.name] === undefined){
				throw new Error('Error variable being accessed does not exist in the current scope', );
			}
			return executeQuery(varDef, parentScope);
		}

		if( varDef.oprName === '$var' ){
			if( parentScope.variableExists[varDef.meta.name] === undefined){
				throw new Error('Error variable being accessed does not exist in the current scope', );
			}
			return varDef.meta.name;
		}

		if( varDef.oprName === '$cns' ){
			return varDef.meta.value;
		}

	}
}

function declareFnBody(fnBody, parentScope){
	convertBlock(fnBody, parentScope);
}

function declareFnArguments(argumentList){
	return argumentList.join(' ,');
}

// TBD Later
function declareConstructor(){
	return  'constructor(' + classDict.constructorArgs.join(', ') + '){'
		 		classDict.extends? ('super(' + classDict.super.constructorArgs.join(', ') + ');') : '' 
			'}\n';
}

// TBD Later
function declareClass(classDict){
	return 'class '+ classDict.name + classDict.super?(' extends ' + classDict.super.name ): '' + ' {'
		   		+ classDict.functions.map(fnDef => declareFunction(fnDef)).join('\n')
		   + '}\n';
}

// TBD NOW
function declareFunction(fnDef, parentScope){
	return  'function ' + fnDef.name + ' (' +
				declareFnArguments(fnDef.arguments)
		  + '){' +
				declareFnBody(fnDef.body, parentScope, fnDef.arguments)
		  + '}\n';
}

function declareLambda(lambdaDef){
	return '(' + declareFnArguments( lambdaDef.arguments ) + ') => '
			   + lambdaDef.isBlock ? '{' + declareFnBody( lambdaDef.body ) + '}' : 
			   	 convertLine(lambdaDef.body); 
}

// Get arithematic operands
// as transformable straight refs.
function getArithematicOperandsFromLine(operandNum, node, parentScope){
	let operands = [];
	
	if( operandNum === 1 ){
		let operandDef = node.meta.operands[0];
		operands.push(getValue(operandDef, parentScope));
	}
	
	if( operandNum === 2 ){
		let loperandDef = node.meta.operands[0];
		let roperandDef = node.meta.operands[1];
		operands.push( getValue(loperandDef, parentScope) );
		operands.push( getValue(roperandDef, parentScope) );
	}

	return operands;
}

// Generate arithmatic converter
function genArthConver(operands, operator){

	if( operands == 1 ){
		return (line, parentScope) => {
			let [operand] = getArithematicOperandsFromLine(operands, line, parentScope);
			return ['(', operator, operand, ')'].join('')
		};
	}
	
	if( operands == 2){
		return (line, parentScope) => {
			let [loperand, roperand] = getArithematicOperandsFromLine(operands, line, parentScope);
			return ['(', loperand, operator, roperand, ')'].join(' ');
		}
	}

	throw new Error('Only 1 or 2 operands are supported so far');
}

function executeProcedure(callDef, parentScope){
	let fnName = callDef.meta.name;
	if( parentScope.variableExists[fnName] === undefined ){
		console.warn('Function is not defined yet');
	}
	let argumentList = callDef.meta.argumentNames;
	let argumentValues = argumentList.map( def => getValue(def) );
	return fnName + '(' + argumentValues + ');\n'
}

function executeQuery(queryDef, parentScope){
	let fnName = queryDef.meta.name;
	if( parentScope.variableExists[fnName] === undefined ){
		console.warn('Function is not defined yet');
	}
	let argumentList = queryDef.meta.argumentNames;
	let argumentValues = argumentList.map( def => getValue(def) );
	return fnName + '(' + argumentValues + ')';	
}

function getNativeValue(){
	/* for native bindings */
	throw new Error('No bindings found');
}

function executeNativeProcedure(){
	throw new Error('No bindings found');
}

let native_dict = {

};

let arithematic_dict = {
	'$mul': genArthConver(2,'*'),
	'$sub': genArthConver(2,'-'),
	'$add': genArthConver(2,'+'),
	'$div': genArthConver(2,'/'),
	'$mod': genArthConver(2,'%'),
	'$not': genArthConver(1,'!'),
	'$and': genArthConver(2,'&&'),
	'$ide': genArthConver(2,'==='),
	'$gte': genArthConver(2,'>='),
	'$lte': genArthConver(2,'<='),
	'$eq':  genArthConver(2,'=='),
	'$or':  genArthConver(2,'||'),
	'$gt':  genArthConver(2,'>'),
	'$lt':  genArthConver(2,'<'),
};

let control_dict = {
	'$if':  convertIfScript,
	'$ife': convertIfElseScript,
//	'$eli': convert_elif_script,
	'$exe': executeProcedure,
	'$exn': executeNativeProcedure
};

let values_dict = {
	'$def': declareFunction,
	'$nat': getNativeValue,
	'$del': declareLambda,
	'$dec': declareClass,
	'$que': executeQuery,
	'$cns': getValue,
	'$get': getValue,
	'$var': getValue,
	'$set': setValue,
};

let operationClasses = {
	'$arit': arithematic_dict,
	'$ctrl': control_dict,
	'$val': values_dict,
	'$nat': native_dict
};

function convert(code){
	let scope = {spaces: 0, variableExists: {}};

	if( !Array.isArray(code) ){
		code = [code];
	}

	return convertBlock(code, scope);
}

export default convert;	