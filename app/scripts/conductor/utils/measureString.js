/**
 * Measures a string in x and y direction 
 * by counting \n for y and max(width of each line)
 * to count the width of all the lines.
 * @method 
 * @param {string} inputString - The string to measure
 * @param {string} children - The bunch of children to add up
 */
export default function measureString(inputCodeList){
	let lines = inputString.split('\n');
	let width 	= lines.reduce((maxLen, line) => Math.max(maxLen, line.length), -Infinity);
	let height  = lines.length;
	return {height, width};
}