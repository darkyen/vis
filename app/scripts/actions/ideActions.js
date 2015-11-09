import _ from 'lodash';
import dispatcher from '../dispatchers/Dispatcher';

export default {
	compileAndRun(){
		dispatcher.dispatch({
			type: 'ide-compile',
			payload: {}
		})
	}
};