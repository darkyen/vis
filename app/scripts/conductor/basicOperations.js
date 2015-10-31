import {DATA_TYPES} from './core';

export default [
	{
		message: '+',
		operatorName: '$add',
		operator: '+',
		tooltip: 'add',
		returns: [DATA_TYPES.NUMBER, DATA_TYPES.STRING]
	},{
		message: '-',
		operatorName: '$sub',
		operator: '-',
		tooltip: 'substraction',
		returns: [DATA_TYPES.NUMBER, DATA_TYPES.STRING]
	},{
		message: '÷',
		operatorName: '$div',
		operator: '/',
		tooltip: 'division',
		returns: [DATA_TYPES.NUMBER, DATA_TYPES.STRING]
	},{
		message: 'x',
		operatorName: '$mul',
		operator: '*',
		tooltip: 'multiply',
		returns: [DATA_TYPES.NUMBER, DATA_TYPES.STRING]
	},{
		message: 'mod',
		operatorName: '$mod',
		operator: '%',
		tooltip: 'remainder',
		returns: [DATA_TYPES.NUMBER, DATA_TYPES.STRING]
	},{
		message: 'Negate',
		operatorName: '$not',
		operator: '!',
		tooltip: 'remainder',
		operands: 1,
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: 'equals to',
		operatorName: '$eq',
		operator: '==',
		tooltip: 'Equals to',
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: 'identical to',
		operatorName: '$ide',
		operator: '===',
		tooltip: 'Identical to',
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: 'and',
		operatorName: '$and',
		operator: '&&',
		tooltip: 'and',
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: 'or',
		operatorName: '$or',
		operator: '||',
		tooltip: 'or',
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: '>',
		operatorName: '$gt',
		operator: '>',
		tooltip: 'Greater than',
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: '<',
		operatorName: '$lt',
		operator: '<',
		tooltip: 'Less than',
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: '>=',
		operatorName: '$gte',
		operator: '>=',
		tooltip: 'Greater than Equal',
		returns: [DATA_TYPES.BOOLEAN]
	},{
		message: '<=',
		operatorName: '$lte',
		operator: '<=',
		tooltip: 'Less than Equal',
		returns: [DATA_TYPES.BOOLEAN]
	}
];
