import React, {Component} from 'react';
import _ from 'lodash';
import MDL from 'react-mdl';
import SideBar from './SideBar';
import {Container} from 'flux/utils';
import CodeEditor from './CodeEditor';
import CodeRunner from './CodeRunner';
import fileStore from '../stores/fileStore';
// import {compiler, blocks, builder} from '../conductor';
import {compileAndRun} from '../actions/ideActions';
import conductor from '../conductor';
window.conductor = conductor;

setTimeout(function(){
	console.time('10000 create');
	var wa, i;
	var c = conductor.namedBuilders.createIdentifier;
	for(i = 0; i < 10000; i ++ ){
	   wa = c('', '', 'woo');
	}
	console.timeEnd('10000 create');

	console.time('10000 clones');
	for(i = 0; i < 10000; i ++ ){
	   wa = wa.cloneNode({
		   2: 'baz'
	   });
	}
	console.timeEnd('10000 clones');
}, 5000);

class IDE extends Component{
	constructor(props){
		super(props);
		this.__creatorBlocks = blocks.map((def) => {
			return (new builder.Block(def)).serialize();
		});
		setTimeout(compileAndRun, 1000);
	}

	renderAvailableScriptBlocks(){
		return this.__creatorBlocks.map((node, index) => {
			return  <div>
						<NodeComponent
							key={"blk" + index}
							node={node}
							isDummy={true}
						/>
					</div>;
		});
	}

	compileAndRun(){
		compileAndRun();
	}

	render(){
		// <button
		//
		// >Run</button>
		return 	<MDL.Layout
					className="mdl-layout--no-drawer-button"
					fixedHeader={true}
				>
					<MDL.Header
						seamed={true}
						title={this.props.file.name}
						style={{color: 'white'}}
					>
						<MDL.Button
							accent={true}
							onClick={e => this.compileAndRun()}
						>Run</MDL.Button>
                    </MDL.Header>
                    <MDL.Content
						className="ide"
					>
                    	<SideBar>
							{this.renderAvailableScriptBlocks()}
						</SideBar>
                    	<CodeEditor
							file={this.props.file}
						/>
                    	<CodeRunner
							code={this.props.code}
							output={this.props.output}
						/>
                    </MDL.Content>
				</MDL.Layout>;
	}
}

class IDEContainer extends Component{
	static getStores(){
		return [fileStore];
	}

	static calculateState(prevState){
		// console.log("State ", prevState, fileStore.getState());
		return fileStore.getState();
	}
	render(){
		return <IDE
			{...this.state}
		/>;
	}
}

export default Container.create(IDEContainer);
