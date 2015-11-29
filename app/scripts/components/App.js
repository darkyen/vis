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
					<Locations
						hash={true}
					>
						<Location path="/" handler={HomeScreen} />
						<Location path="/project/new/" handler={CreateProjectPage}></Location>
						<Location path="/project/:fileName/" handler={IDE}></Location>
						<Location path="/project/:fileName/edit/" handler={IDE}></Location>
					</Locations>
				</div>;
	}
}

export default App;
