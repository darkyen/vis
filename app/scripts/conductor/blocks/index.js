import ifBlock from './if';
import whileBlock from './while';
import arithBlocks from './arithematic';
import setBlock from './set';
import callBlock from './call';
import importBlock from './import';
import printBlock from './print';
import methodBlock from './method';
// with this new spec
// the code for a program should be
// the same as old

let blocks =  [
	ifBlock,
	setBlock,
	printBlock,
	// callBlock,
	whileBlock,
	methodBlock,
	// importBlock,
	... arithBlocks
]

export default blocks;
