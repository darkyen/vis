import ifBlock from './if';
import whileBlock from './while';
import arithBlocks from './arithematic';
import setBlock from './set';
// with this new spec
// the code for a program should be
// the same as old 

let blocks =  [
	ifBlock,
	setBlock,
	// whileBlock,
	... arithBlocks
]

export default blocks;
