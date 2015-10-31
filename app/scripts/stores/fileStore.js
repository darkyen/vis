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


	onBlockCreated({blockType, blockName, dropPath}){
		this.file.insertBlockAtPath({blockType, blockName}, dropPath);
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
			case 'block-created': 
				this.onBlockCreated(payload);
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
		let state = this.file.toObject();
		localStorage.currentFile = JSON.stringify(state);
		console.log(state);
		return state;
	}
}

let fileStore = new FileStore(blockDispatcher);
export default fileStore;