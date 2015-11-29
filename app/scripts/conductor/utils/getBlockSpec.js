import blocks from '../blocks';

let blockSpecMap = [].reduce( (blockMap, blockSpec) => {
	let {blockType, blockName} = blockSpec.spec;
	blockMap[blockType] = blockMap[blockType] || {};
	blockMap[blockType][blockName] = blockSpec;
	return blockMap;
}, {});

let getBlockSpec = (blockType, blockName) =>{
	if( !blockSpecMap[blockType] ){
		throw new Error(`blockType ${blockType}is not in the dictionary`);
	}

	if( !blockSpecMap[blockType][blockName] ){
		throw new Error(`blockType ${blockType} does not contain ${blockName}`);
	}

	return blockSpecMap[blockType][blockName];
}


export default getBlockSpec;
