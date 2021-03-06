import React, {Component} from 'react';
import BlockDropZone from './BlockDropZone';
import blockActions from '../actions/blockActions';

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
						path={"$.0"}
					>
						<NodeComponent path="$" node={file.code}/>
					</BlockDropZone>

					<footer className="code-editor__footer"></footer>
				</div>

	}
}

export default CodeEditor;
