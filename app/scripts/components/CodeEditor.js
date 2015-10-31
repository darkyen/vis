import React, {Component} from 'react';
import BlockDropZone from './BlockDropZone';
import blockActions from '../actions/blockActions';
import NodeComponent from './nodes/NodeComponent';
import {NODE_TYPES, BLOCK_TYPES} from '../conductor/core';

let topLevelPropTypes = {
	nodeTypes:  [NODE_TYPES.BLOCK],
	blockTypes: [BLOCK_TYPES.FLOW, BLOCK_TYPES.DECLARATION],
};

class CodeEditor extends Component{
	constructor(props){
		// krypton props !
		super(props);
	}
	/* Renders a node */
	
	render(){
		let {file} = this.props;
		return 	<div className="code-editor">
					<header className="code-editor__header">Code</header>
					<BlockDropZone 
						className="code-editor__content" 
						valuePropType={topLevelPropTypes}
						path={"$"}
					>
						<NodeComponent path="$" node={file.code}/>
					</BlockDropZone>

					<footer className="code-editor__footer"></footer>
				</div>
			
	}
}

export default CodeEditor;