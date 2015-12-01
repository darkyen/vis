import ASTNodes from './nodes';
import builder from './builder';
const namedBuilders = {};

for(let ASTNode of ASTNodes ){
	namedBuilders[`create${ASTNode.typeName}`] = (...args) => {
		return new ASTNode(...args);
	};
}

export default {
	builder,
	ASTNodes,
	namedBuilders
};
