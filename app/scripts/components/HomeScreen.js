import React, {Component} from 'react';
import {Container} from 'flux/utils';
import projectStore from '../stores/projectStore';

import MDL, {Card, Button} from 'react-mdl';

import Promise from 'bluebird';
import superagent from 'superagent';
import SuperPromise from 'superagent-promise';

import userStore from '../stores/userStore';
import userActions from '../actions/userActions';

import conductor from '../conductor';
import NodeComponent from './nodes/NodeComponent';


let superPromise = SuperPromise(superagent, Promise);

class PackageCard extends Component{
    render(){
        return  <Card>

                </Card>;
    }
}

class PackageExtendedCard extends Component{

}

class PackageCreatorCard extends Component{
    render(){
        return <Card></Card>;
    }
}

class ModuleSearch extends Component {
    constructor(p){
        super(p);
        this.state = {files: []};
    }
    render(){
        return <div className="module-search">
                    <div className="module-search__search-bar">
                        <MDL.Textfield label="Search"/>
                    </div>
                    <div className="module-search__module-list">
                        {(this.props.files || this.state.files ).map( pkg => {
                            return <PackageCard key={pkg.uuid} {...pkg} />
                        })}
                    </div>
               </div>
    }
}

let SignInButton = (props) => {
    let loginWaitArrow = 'Login';
    let {isAttemptingLogin} = props;
    if( isAttemptingLogin ){
        loginWaitArrow = <MDL.Spinner />
    }
    return <MDL.Button onClick={userActions.login} disabled={isAttemptingLogin}>{loginWaitArrow}</MDL.Button>
};

class UserProfile extends Component{
    render(){

        let {userState} = this.props;
        let {profile} = userState;

        if( !userState.isLoggedIn ){
            return <SignInButton isAttemptingLogin={userState.isAttemptingLogin}/>
        }
        // We don't need them for now
        // <div className="user-profile__details">
        //     <h3 className="user-profile__name mdl-typography--body-1">
        //         {profile.name}
        //     </h3>
        //     <h3 className="user-profile__email mdl-typography--caption">
        //         {profile.email}
        //     </h3>
        // </div>
        return  <div className="user-profile">
                    <div className="user-profile__image-container">
                        <img
                            onClick={userActions.logout}
                            className="user-profile__image"
                            src={profile.picture}
                        />
                    </div>
                </div>;
    }
}

class UserProfileContainer extends Component {
    static getStores(){
        return [userStore];
    }

    static calculateState(prevState){
        return {
            user: userStore.getState()
        }
    }

    render(){
        let userState = this.state.user;
        return <UserProfile userState={userState} />
    }
}

class SearchBarComponent extends Component{
    render(){
        return <MDL.Textfield label="Search" />;
    }
}

const MountableUserProfileComponent = Container.create(UserProfileContainer);
const n = conductor.namedBuilders.createIfStatement();
class HomePage extends Component{
    constructor(p){
        super(p);
        this.state = {files: []};
    }
    render(){
        return <MDL.Layout className="home-page">
                <MDL.Header className="home-page" seamed={true}>
                    <MDL.HeaderRow title={"Vis"}>
                        <MDL.Navigation>
                            <a href="http://github.com/darkyen/vis/">Getting Started</a>
                            <a href="http://github.com/darkyen/vis/issues/">Report A Bug</a>
                            <a href="http://github.com/darkyen/vis/">About</a>
                        </MDL.Navigation>
                        <div className="mdl-layout-spacer"></div>
                        <MountableUserProfileComponent />
                    </MDL.HeaderRow>
                </MDL.Header>
                <MDL.Content>
                    <MDL.FABButton className="home-page__add-fab" ripple>
                        <MDL.Icon name="add" />
                    </MDL.FABButton>
                    <NodeComponent node={n.toArr()}/>
                </MDL.Content>
               </MDL.Layout>;
    }
}


class HomePageContainer extends Component{
    static getStores(){
		return [projectStore];
	}

	static calculateState(prevState){
		// console.log("State ", prevState, fileStore.getState());
		return projectStore.getState();
	}
    render(){
        return <HomePage files={this.state.files} />
    }
}

export default HomePage;
