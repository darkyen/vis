import React, {Component} from 'react';
import MDL from 'react-mdl';
import SideBar from './SideBar';
import CodeEditor from './CodeEditor';
import CodeRunner from './CodeRunner';
import MathematicalOperationBlock from './MathematicalOperationBlock';
import blockSpec from './blockSpec';
import {Container} from 'flux/utils';
import fileStore from '../stores/fileStore';
import _ from 'lodash';

class IDE extends Component{
	renderAvailableScriptBlocks(){
		return 	<ul className="block-list">
					{_.values(blockSpec).map($class => {
						return _.values($class).map(BlockComponentClass => {
						// console.log('classnaime', BlockComponentClass);
						return  <BlockComponentClass 
									isDummy={true} 
								/>
						})
					})}
				</ul>;
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
                    	<CodeEditor code={this.props.file.code}></CodeEditor>
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