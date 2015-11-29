import blockDispatcher from '../dispatchers/Dispatcher';
import {Store} from 'flux/utils';
import _ from 'lodash';

class UserStore extends Store{
    // In memory keep a list of all files you have
    // this json is small so just keep em ?

    constructor(props){
        super(props);
        this.__clearAll();
    }

    __clearAll(){
        this.__clearLogin();
        this.__clearProfile();
        this.__clearError();
    }

    __clearLogin(){
        this.isLoggedIn = false;
        this.isAttemptingLogin  = false;
        this.isAttemptingLogout = false;
    }

    __clearProfile(){
        this.profile = {};
    }

    __clearError(){
        this.hasError = false;
        this.error = null;
    }

    handleLoginRequest(){
        this.__clearAll();
        this.isAttemptingLogin = true;
        this.__emitChange();
    }

    handleLogoutRequest(){
        this.__clearAll();
        this.isAttemptingLogout = true;
        this.__emitChange();
    }

    handleLoginComplete({userProfile}){
        this.__clearAll();
        this.isLoggedIn = true;
        this.profile    = userProfile;
        this.__emitChange();
    }

    handleProfileUpdated({userProfile}){
        this.profile = userProfile;
        this.__emitChange();
    }

    handleAuthError({error}){
        this.hasError = true;
        this.error = error;
        this.__emitChange();
    }

    handleLogoutComplete(){
        this.__clearAll();
        this.__emitChange();
    }

    __onDispatch({type, payload}){
        switch(type){

            case 'user-login-attempted':
                this.handleLoginRequest(payload);
            break;

            case 'user-login-error':
                this.handleAuthError(payload);
            break;

            case 'user-login-complete':
                this.handleLoginComplete(payload);
            break;

            case 'user-logout-requested':
                this.handleLogoutRequest(payload);
            break;

            case 'user-logout-complete':
                this.handleLogoutComplete(payload);
            break;

            case 'user-profile-update':
                this.handleProfileUpdated(payload);
            break;
        }
    }

    getState(){
        let obj = _.assign({}, this);
        return obj;
    }
}

export default new UserStore(blockDispatcher);
