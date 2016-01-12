import React, {Component} from 'react';
import {
	Locations,
	Location,
	NotFound
} from 'react-router-component';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import IDE from './IDE';
import HomeScreen from './HomeScreen';
import CreateProjectPage from './CreateProjectPage';
import userActions from '../actions/userActions';
import AppHeader from './UI/Header';

@DragDropContext(HTML5Backend)
class App extends Component{
	requestCurtain(opts){
		this.refs.curtainManager.animate(opts);
	}

	componentDidMount(){
		userActions.login();
	}

	render(){
		return  <div className="app">
							<AppHeader
								className="app__header"
							>
								<div className="header__row">
									<div className="header__controls">
										<button className="button">></button>
									</div>
									<div className="header__expand app__header-info">

									</div>
									<div className="header__controls">
										<button className="button">=</button>
									</div>
								</div>
							</AppHeader>
							<div className="app__content">
								<Locations
									hash={true}
								>
									<Location path="/" handler={HomeScreen} />
									<Location path="/project/new/" handler={CreateProjectPage}></Location>
									<Location path="/project/:fileName/" handler={IDE}></Location>
									<Location path="/project/:fileName/edit/" handler={IDE}></Location>
								</Locations>
							</div>
						</div>;
	}
}

export default App;
