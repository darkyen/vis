import React, {Component} from 'react';
import BlockDropZone from './BlockDropZone';
import IfBlock from './IfBlock';
import blockClassMap from './blockSpec';
import blockActions from '../actions/blockActions';

class CodeEditor extends Component{
	constructor(props){
		// krypton props !
		super(props);
	}
	/* Renders a node */
	renderNode(node, path){
		// console.log('redNode');
		let {oprClassDef, oprName} = node;
		if( !oprClassDef ){
			return node;
		}
		if( ! blockClassMap[oprClassDef] ) {
			console.log(node);
			throw new Error('Class Not found ' + oprClassDef);
		}
		if( ! blockClassMap[oprClassDef][oprName] ){
			throw new Error('Operation not found ' + oprClassDef + '>' + oprName);
		}

		let BlockName = blockClassMap[oprClassDef][oprName];
		let blockProps = Object.keys(node.meta).reduce((obj, propName) => {
			obj[propName] = this.redirectCompilation(node.meta[propName], [path, propName].join('.'));
			return obj;
		}, {});
		return 	<BlockName 
					path={path} 
					{...blockProps} 
				/>;
	}

	/* Renders a block */
	renderBlock(block, pathName){
		// console.log('redBloc');
		return block.map( (node, index) => this.renderNode(node, [pathName, index].join('.') ));
	}

	redirectCompilation(blockOrNode, path){
		// console.log('borc', blockOrNode);
		console.log('redComp', blockOrNode);
		return Array.isArray(blockOrNode) ? 
				this.renderBlock(blockOrNode, path): 
				this.renderNode(blockOrNode, path) 
	}

	/* Renders the entire code */
	renderCode(code){
		console.log('rc');
		return code.map(
			(blockOrNode, index) => this.redirectCompilation(blockOrNode, ['$', index].join('.'))
		);
	}

	render(){
		return 	<div className="code-editor">
					<header className="code-editor__header">Code</header>
					<BlockDropZone 
						className="code-editor__content" 
						acceptAll={true}
						path={"$.0"}
					>{this.renderCode(this.props.code)}</BlockDropZone>
					<footer className="code-editor__footer"></footer>
				</div>
			
	}
}

export default CodeEditor;