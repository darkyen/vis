import Enum from '../lib/Enum';

const NODE_TYPES  = new Enum('IDENTIFIER', 'BLOCK', 'LIST', 'LITERAL', 'VOID');
const BLOCK_TYPES = new Enum('DECLARATION', 'VALUE', 'FLOW');
const DATA_TYPES  = new Enum('STRING', 'NUMBER', 'BOOLEAN', 'OBJECT', 'ARRAY', 'METHOD', 'QUERY', 'CLASS');
const DECL_TYPES  = new Enum('METHOD', 'QUERY', 'CLASS');
const EXEC_TYPES  = new Enum('ASYNC', 'SYNC');

// FLOW corresponds to the basic data types
export default {NODE_TYPES, DATA_TYPES, DECL_TYPES, EXEC_TYPES, BLOCK_TYPES};