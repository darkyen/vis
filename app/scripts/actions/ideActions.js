import _ from 'lodash';
import dispatcher from '../dispatchers/Dispatcher';

export default {
	compileAndRun(){
		dispatcher.dispatch({
			type: 'ide-compile',
			payload: {}
		})
	},

	errorOccured(error){
		dispatcher.dispatch({
			type: 'code-error',
			payload: {error}
		});
	},

	outputOccured(output){
		dispatcher.dispatch({
			type: 'code-output',
			payload: {output}
		})
	}
};
