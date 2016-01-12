import _ from 'lodash';
import dispatcher from '../dispatchers/Dispatcher';

// import {getBlockClass} from '../lib/getBlock';

async function createNewFile(){

}

// path spec
// 1.2.3.4.3.4.5.5.1.1.22.34
// Its simply 1 based index
// cause 0 is taken.


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
		let type = 'block-created';
		let payload = null;

		if( item.isDummy !== true ){
			type = 'block-moved';
			payload = {
				removalPath: item.path,
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

	updateLiteralOrIdentifier(value, path){
		// first lets figure out what the heck are
		// we going to update it as
		// is it a literal ?
		let type = 'identifier-updated', payload = {value, path};

		// number literal
		if( +value == value ){
			type = 'literal-updated';
		}

		if ( typeof value[0] === 'string' &&
			 value[0] === value[value.length - 1] &&
			 ( value[0] === '"' || value[0] === "'" ) ){
			// string literal
			type = 'literal-updated';
		}

		if( value === 'true' || value === 'false' ){
			// boolean
			type = 'literal-updated';
		}

		dispatcher.dispatch({type, payload});
	},

	// deprecated
	updateIdentifier(value, path){
		console.warn('deprecated method updateIdentifier in blockActions');
		let type    = 'identifier-updated';
		let payload = {value, path};
		// console.log(payload);
		dispatcher.dispatch({type, payload});
	},

	// deprecated
	updateLiteral(value, path){
		console.warn('deprecated method updateLiteral in blockActions');
		let type = 'literal-updated';
		let payload = {value, path};
		dispatcher.dispatch({type, payload});
	}

};

export default blockActions;
