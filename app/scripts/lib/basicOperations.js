export default [
	{
		message: '+',
		operator: '$add',
		tooltip: 'add',
		returnType: Number
	},{
		message: '-',
		operator: '$sub',
		tooltip: 'substraction',
		returnType: Number
	},{
		message: '÷',
		operator: '$div',
		tooltip: 'division',
		returnType: Number
	},{
		message: 'x',
		operator: '$mul',
		tooltip: 'multiply',
		returnType: Number
	},{
		message: 'mod',
		operator: '$mod',
		tooltip: 'remainder',
		returnType: Number
	},{
		message: 'Negate',
		operator: '$not',
		tooltip: 'remainder',
		operands: 1,
		returnType: Boolean
	},{
		message: 'equals to',
		operator: '$eq',
		tooltip: 'Equals to',
		returnType: Boolean
	},{
		message: 'identical to',
		operator: '$ide',
		tooltip: 'Identical to',
		returnType: Boolean
	},{
		message: 'and',
		operator: '$and',
		tooltip: 'and',
		returnType: Boolean
	},{
		message: 'or',
		operator: '$or',
		tooltip: 'or',
		returnType: Boolean
	},{
		message: '>',
		operator: '$gt',
		tooltip: 'Greater than',
		returnType: Boolean
	},{
		message: '<',
		operator: '$lt',
		tooltip: 'Less than',
		returnType: Boolean
	},{
		message: '>=',
		operator: '$gte',
		tooltip: 'Greater than',
		returnType: Boolean	
	},{
		message: '<=',
		operator: '$lte',
		tooltip: 'Greater than',
		returnType: Boolean	
	}
];
