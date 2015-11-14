import _ from 'lodash';
import {builder} from '../conductor';
import blockDispatcher from '../dispatchers/Dispatcher';
import {Store} from 'flux/utils';
import escodegen from 'escodegen';
import Runner from '../conductor/runnable/runner';

let {File} = builder;

class FileStore extends Store{

	constructor(dispatcher){
		super(dispatcher);

		this.runner = new Runner();
		this.code = '';
		this.output = '';

		if( localStorage.currentFile ){
			this.file = new File(localStorage.currentFile);
			return;
		}

		this.file = new File();

	}

	handleOutput({output}){
		this.output = output;
		this.__emitChange();
	}

	handleError({error}){
		this.output = error.message;
		this.__emitChange();
	}

	onBlockCreated({blockType, blockName, dropPath}){
		this.file.insertBlockAtPath({blockType, blockName}, dropPath);
		this.__emitChange();
	}

	onBlockMoved({removalPath, dropPath}){
		this.file.moveNode(removalPath, dropPath);
		this.__emitChange();
	}

	onCompileRequested(){
		this.code = escodegen.generate(this.file.getAST());
		this.runner.setCode(this.code);
		this.output = 'Running code ...';
		this.__emitChange();
	}

	onIdentifierUpdated({value, path}){
		this.file.updateIdentifierAtPath(value, path);
		this.__emitChange();
	}

	onLiteralUpdated({value, path}){
		this.file.updateLiteralAtPath(value, path);
		this.__emitChange();
	}

	__onDispatch(action){
			/* do nothing */
		// console.log('dispatcher heared', action);
		let {type, payload} = action;
		switch(type){
			case 'block-created':
				this.onBlockCreated(payload);
				this.onCompileRequested(payload);
			break;

			case 'block-moved':
				this.onBlockMoved(payload);
				this.onCompileRequested(payload);
			break;

			case 'identifier-updated':
				this.onIdentifierUpdated(payload);
				this.onCompileRequested(payload);
			break;

			case 'literal-updated':
				this.onLiteralUpdated(payload);
				this.onCompileRequested(payload);
			break;

			case 'ide-compile':
				this.onCompileRequested(payload);
			break;

			case 'code-output':
				this.handleOutput(payload);
			break;

			case 'code-error':
				this.handleError(payload);
			break;

			default:
				throw new Error('Unsupported event');
			break;
		}
	}

	getState(){
		let file = this.file.toObject();
		localStorage.currentFile = JSON.stringify(file);
		let output = this.output;
		let code = this.code;
		return {file, output, code};
	}
}

let fileStore = new FileStore(blockDispatcher);
export default fileStore;
