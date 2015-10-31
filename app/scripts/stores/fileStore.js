import _ from 'lodash';
import {builder} from '../conductor';
import blockDispatcher from '../dispatchers/Dispatcher';
import {Store} from 'flux/utils';

let {File} = builder;

class FileStore extends Store{
	constructor(dispatcher){
		super(dispatcher);
		this.file = new File();
	}


	onBlockDropped({oprClassDef, oprName, dropPath}){
		console.log(oprClassDef, oprName);

		let node = _.cloneDeep(blockDefSpec[oprClassDef][oprName]);
		
		if( !node ){
			throw new Error("Block not defined " + oprClassDef + " " + oprName );
		}
		this.setNodeAtPath(node, dropPath);
		console.log('changed');
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
		console.log('dispatcher heared', action);
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