import React, {Component} from 'react';
import {
	Locations,
	Location,
	NotFound
} from 'react-router-component';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import IDE from './IDE';

@DragDropContext(HTML5Backend)
class App extends Component{
	requestCurtain(opts){
		this.refs.curtainManager.animate(opts);
	}
	render(){
		return  <div className="app">
					<Locations
						hash={true}
					>
						<Location path="/" handler={IDE}></Location>
					</Locations>
				</div>;
	}
}

export default App;
