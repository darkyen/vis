import ASTNodes from './nodes';
import builder from './builder';
const namedBuilders = {};

for(let ASTNode of ASTNodes ){

	namedBuilders[`create${ASTNode.typeName}`] = (...args) => {
		return new ASTNode(...args);
	};

}

// can clone any node with new props
function cloneNode(newPropMap={}){
	const {nodeName, children} = this;
	const keys = Object.keys(newPropMap);
	keys.forEach(key => {
		const [chIdx, aIdx] = key.split(':');
		if( aIdx ){
			children[chIdx] = children[chIdx].slice(0);
			children[chIdx][aIdx] = newPropMap[key];
			return;
		}
		children[chIdx] = newPropMap[key];
	});
	return new this.prototype.constructor(...children);
}

// the new path spec
// . and :
// . denotes nodes children
// : denotes nodes children's children
// @TODO move this to BaseNode
function updateDeep(parts, updatedNode){
	const nodeAddress = parts.pop();
	// need to visit even further
	if(parts.length){
		const [chIdx, aIdx] = nodeAddress.split(':');
		const ownerNode = aIdx?this.children[chIdx][aIdx]:this.children[chIdx];
		updatedNode = updateDeep(ownerNode, parts, updatedNode);
	}

	return cloneNode(node, {
		[nodeAddress]: updatedNode
	});
};

function updatePath(path, newNode){
	let parts = path.split('.').reverse();
	updateDeep(root, parts, updatedValue);
}

export default {
	builder,
	ASTNodes,
	namedBuilders,
	cloneNode
};
