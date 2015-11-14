import React, {Component} from 'react';
import _ from 'lodash';
import MDL from 'react-mdl';
import SideBar from './SideBar';
import {Container} from 'flux/utils';
import CodeEditor from './CodeEditor';
import CodeRunner from './CodeRunner';
import fileStore from '../stores/fileStore';
import NodeComponent from './nodes/NodeComponent';
import {compiler, blocks, builder} from '../conductor';
import {compileAndRun} from '../actions/ideActions';

class IDE extends Component{
	constructor(props){
		super(props);
		this.__creatorBlocks = blocks.map((def) => {
			return (new builder.Block(def)).serialize();
		});
	}

	renderAvailableScriptBlocks(){
		return this.__creatorBlocks.map((node, index) => {
			return <NodeComponent
				key={"blk" + index}
				node={node}
				isDummy={true}
			/>;
		});
	}

	compileAndRun(){
		compileAndRun();
	}

	render(){
		return 	<MDL.Layout
					className="mdl-layout--no-drawer-button"
					fixedHeader={true}
				>
					<MDL.Header
						seamed={true}
						title={this.props.file.name}
						style={{color: 'white'}}
					>
                        <MDL.Navigation>
                            <button
								onClick={e => this.compileAndRun()}
							>Run</button>
                        </MDL.Navigation>
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
