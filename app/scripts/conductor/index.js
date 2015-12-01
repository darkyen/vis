import ASTNodes from './nodes';
import builder from './builder';
const namedBuilders = {};

for(let ASTNode of ASTNodes ){
	namedBuilders[`create${ASTNode.typeName}`] =
	 	(...args) => new ASTNode(...args);
}


// should updatedValue only be primitive type ?
// in that case how do we add new methods ?
// do we create a new way of doing things ?
// over updateDeep being the core API for all
// operations.
function updateNodeAtPath(root, updatedValue){
	const parts   = path.split('.').reverse();
	root.updateDeep(parts, updatedValue);
}

export default {
	builder,
	ASTNodes,
	namedBuilders,
	updateNodeAtPath
};
