import _ from 'lodash';
import dispatcher from '../dispatchers/Dispatcher';

let blockActions = {
	dropBlock(item, path){
		let type = 'block-dropped';
		let payload = null;

		if( item.isDummy !== true ){
			payload = {
				blockPath: item.path,
				dropPath:  path
			}
		}else{
			payload = _.assign({
				dropPath: path
			}, item.spec);
		}
		// console.log(item);
		dispatcher.dispatch({type, payload});
	},

	updateBlockMeta(meta, path){
		console.log(meta, path);
		let type = 'block-updated';
		let payload = {meta, path};
		dispatcher.dispatch({type, payload});
	}
};

export default blockActions;