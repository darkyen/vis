import localForage from 'localforage';
import blockDispatcher from '../dispatchers/Dispatcher';
import {Store} from 'flux/utils';

class ProjectStore extends Store{
    // In memory keep a list of all files you have
    // this json is small so just keep em ?
    constructor(props){
        super(props);
    }

    createNewFile(){
    }

    listFiles(){

    }

    __onDispatch(action){
    }

    getState(){
        return {
            files: []
        };
    }
}

export default new ProjectStore(blockDispatcher);
