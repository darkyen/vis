import _ from 'lodash';
import dispatcher from '../dispatchers/Dispatcher';
import Project from '../conductor/builder/Project';

export default {
	createProject(metaData){
		let file = new Project(metaData);
		dispatcher.dispatch({
			type: 'ide-load',
			file: file
		});
	},

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
