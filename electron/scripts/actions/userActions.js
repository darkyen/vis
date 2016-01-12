import dispatcher from '../dispatchers/Dispatcher';
import localForage from 'localForage';
import Promise from 'bluebird';

export default {
    login(){
        dispatcher.dispatch({
            type: 'user-login-attempted',
        });
    },
    logout(){
        dispatcher.dispatch({
            type: 'user-logout-requested'
        });
    }
};
