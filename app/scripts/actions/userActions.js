const AUTH0_URI   = 'vistest.auth0.com';
const AUTH0_TOKEN = 'Skn2sUvi4dtWdFRfeOcAeIPPTMcmMucf';
let lock = new Auth0Lock(AUTH0_TOKEN, AUTH0_URI);
import dispatcher from '../dispatchers/Dispatcher';
import localForage from 'localForage';
import Promise from 'bluebird';

// @deprecated
async function getProfile(userToken){
    return new Promise((resolve, reject) => {
        lock.getProfile(userToken, function(err, profile){
            if( err ){
                return reject(err);
            }
            resolve(profile);
        });
    });
}

async function tryLockLogin(){
    return new Promise((resolve, reject) => {
        lock.show((err, profile, id_token) => {
            if( err ){
                return reject(err);
            }
            resolve({
                userProfile: profile,
                userToken: id_token
            });
        });
    });
}

async function attemptLogin(){
    let localPromises = [
        localForage.getItem('userToken'),
        localForage.getItem('userProfile')
    ];

    let [userToken, userProfile] = await Promise.all(localPromises);

    if( !userToken ){
        // Try login
        try{
            let result = await tryLockLogin();

            let storePromises = [
                localForage.setItem('userToken', result.userToken),
                localForage.setItem('userProfile', result.userProfile)
            ];

            await Promise.all(storePromises);
            return dispatcher.dispatch({
                type: 'user-login-complete',
                payload: result
            });
        }catch(error){
            return dispatcher.dispatch({
                type: 'user-login-error',
                payload: {error}
            })
        }
    }

    // optimistally load profile from the database
    dispatcher.dispatch({
        type: 'user-login-complete',
        payload: {userToken, userProfile}
    });

    // now try to get profile asynchronously
    // if fails emit logout immediately

    try{
        userProfile = await getProfile(userToken);
        dispatcher.dispatch({
            type: 'user-profile-update',
            payload: {userProfile}
        });
    }catch(e){
        // custom error handling needed here
        console.error(e);
    }
}

async function attemptLogout(){
    await localForage.removeItem('userToken');
    dispatcher.dispatch({
        type: 'user-logout-complete'
    });
}

export default {
    login(){
        dispatcher.dispatch({
            type: 'user-login-attempted',
        });
        attemptLogin();
    },
    logout(){
        dispatcher.dispatch({
            type: 'user-logout-requested'
        });
        attemptLogout();
    }
};
