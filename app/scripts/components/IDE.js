import React, {Component} from 'react';
import _ from 'lodash';
import MDL from 'react-mdl';
import SideBar from './SideBar';
import {Container} from 'flux/utils';
import CodeEditor from './CodeEditor';
import CodeRunner from './CodeRunner';
import fileStore from '../stores/fileStore';
import NodeComponent from './nodes/NodeComponent';
import {blocks, builder} from '../conductor';

class IDE extends Component{

	constructor(props){
		super(props);
		this.__creatorBlocks = blocks.map((def)=>{
			return (new builder.Block(def)).serialize();
		});
	}

	renderAvailableScriptBlocks(){
		return this.__creatorBlocks.map((node) => {
			return <NodeComponent node={node} isDummy={true}/>
		});
	}

	render(){
		return 	<MDL.Layout className="mdl-layout--no-drawer-button" fixedHeader={true}>
					<MDL.Header seamed={true} title={this.props.file.name} style={{color: 'white'}}>
                        <MDL.Navigation>
                            <a href="">Run</a>
                        </MDL.Navigation>
                    </MDL.Header>
                    <MDL.Content className="ide">
                    	<SideBar>
                    		{this.renderAvailableScriptBlocks()}
                    	</SideBar>
                    	<CodeEditor file={this.props.file}></CodeEditor>
                    	<CodeRunner></CodeRunner>
                    </MDL.Content>
				</MDL.Layout>;	
	}
}

class IDEContainer extends Component{
	static getStores(){
		return [fileStore];
	}	

	static calculateState(prevState){
		console.log("State ", prevState, fileStore.getState());
		return {
			file: fileStore.getState()
		};
	}
	render(){
		return <IDE file={this.state.file} />
	}
}

export default Container.create(IDEContainer);