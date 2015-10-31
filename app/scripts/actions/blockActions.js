import _ from 'lodash';
import dispatcher from '../dispatchers/Dispatcher';

let blockActions = {

	
	// Method that updates ui and draws all the 
	// probable view positions. 
	
	// item - pathDef or spec
	// 		  of the object that is being
	//		  dragged around
	
	// path - path to thing that is being
	//		  hovered
	
	hoverBlock(item, path){
		let payload = {
			dropPath: path
		};
		payload = _.assign(payload, item.spec);	
		dispatcher.dispatch({
			type: 'block-hover',
			payload: payload
		})
	},

	// Drop blocks.
	dropBlock(item, path){
		let type = 'block-dropped';
		let payload = null;

		if( item.isDummy !== true ){
			type = 'block-moved';
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

	// Called when you update something inside 
	// a block.
	updateBlockMeta(meta, path){
		console.log(meta, path);
		let type	= 'block-updated';
		let payload = {meta, path};
		dispatcher.dispatch({type, payload});
	},

	updateIdentifier(value, path){
		let type    = '';
		let payload = {value, path};
		dispatcher.dispatch({type, payload});
	},

	updateLiteral(value, path){

	}

};

export default blockActions;