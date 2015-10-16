import React from 'react';
import IfBlock from './IfBlock';
import basicOperations from '../lib/basicOperations';
import createMathematicalBlock from './MathematicalOperationBlock';
import SetVariableBlock from './SetVariableBlock';
import ValueBlock from './ValueBlock';
import ConstantBlock from './ConstantBlock';

// This is for UI blocks
let blocks = {
	'$ctrl': {
		'$if': IfBlock
	},
	'$val':{
		'$set': SetVariableBlock,
		'$cns': ConstantBlock
	}
};


blocks['$arit'] = basicOperations.reduce((obj, blockSpec) => {
	obj[blockSpec.operator] = createMathematicalBlock(blockSpec);
	return obj;
}, {});

export default blocks;