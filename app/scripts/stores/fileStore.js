import _ from 'lodash';
import blockDispatcher from '../dispatchers/Dispatcher';
import {Store} from 'flux/utils';
import basicOperations from '../lib/basicOperations';

let blockDefSpec = {
	'$ctrl': {
		'$if': {
			oprClassDef: '$ctrl',
			oprName: '$if',
			meta: {
				condition: {},
				body: []
			}
		}
	},
	'$val':{
		'$cns': {
			oprClassDef: '$val',
			oprName: '$cns',
			meta:{
				value: 1
			}
		},
		'$set': {
			oprClassDef: '$val',
			oprName: '$set',
			meta: {
				name: '',
				value: {}
			}
		}
	},
	'$arit': {}
};

basicOperations.forEach(spec => {
	blockDefSpec['$arit'][spec.operator] = {
		oprClassDef: '$arit',
		oprName: spec.operator,
		meta: {
			operands: []
		}
	}
});

class FileStore extends Store{
	constructor(dispatcher){
		super(dispatcher);
		let fileData = localStorage.currentFile;
		if( fileData ){
			this.file = this.loadFile(fileData);
			return;
		}
		this.file = this.newFile();
	}
	loadFile(fileData){
		return JSON.parse(fileData);
	}
	newFile(){
		return {
			name: 'New File',
			code: [],
			packages: {
				npm: {},
				services: {},
				cylon: {}
			}
		};
	}
	
	getNodeAtPath(path){
		let parts = path.split('.');
		if( parts[0] !== '$' ){
			throw new Error('Only absolute paths supported so-far');
		}
		
		parts.shift();
		
		// yes this is ugly
		// yes future self you wrote this
		// yes future self you were really
		// this stupid when doing so
		//
		// the only reason this following code
		// was written was excitement to finish the
		// job.

		return parts.reduce((obj, part) => {
			console.log(obj, part);
			if( !obj || ( !Array.isArray(obj) && !obj.meta)){
				return null;
			}
			return Array.isArray(obj)?obj[part]:obj.meta[part];
		}, this.file.code);
	}
	
	setNodeAtPath(node, path){
		let parts = path.split('.');
		let insertionPoint = parts.pop();
		let insertionParent = this.getNodeAtPath(parts.join('.'));

		if( !insertionParent ){
			throw new Error('Do not know, Where to insert ?');
		}

		if( Array.isArray(insertionParent) ){
			insertionParent[insertionPoint] = node;
			return;
		}

		insertionParent.meta[insertionPoint] = node;
	}

	onBlockDropped({oprClassDef, oprName, dropPath}){
		console.log(oprClassDef, oprName);

		let node = _.cloneDeep(blockDefSpec[oprClassDef][oprName]);
		
		if( !node ){
			throw new Error("Block not defined " + oprClassDef + " " + oprName );
		}
		this.setNodeAtPath(node, dropPath);
		this.__emitChange();
	}

	onBlockMoved(){

	}

	onBlockUpdated({meta, path}){
		let node = this.getNodeAtPath(path);
		_.assign(node.meta, meta);
		this.__emitChange();
	}
	__onDispatch(action){
			/* do nothing */
		let {type, payload} = action;
		switch(type){
			case 'block-dropped': 
				this.onBlockDropped(payload);
				break;
			case 'block-moved': 
				this.onBlockMoved(payload);
				break;
			case 'block-updated':
				this.onBlockUpdated(payload);
				break;
			default:
				throw new Error('Unsupported event');
				break;
		}
	}

	getState(){
		localStorage.currentFile = JSON.stringify(this.file);
		return _.cloneDeep(this.file);
	}
}

let fileStore = new FileStore(blockDispatcher);
console.log(fileStore);

export default fileStore;