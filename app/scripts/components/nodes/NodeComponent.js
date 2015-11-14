import React from 'react';
import {NODE_TYPES} from '../../conductor/core';

// import IdentifierComponent from './IdentifierComponent';
// import LiteralComponent from './LiteralComponent';
import LiteralOrIdentifierComponent from './LiteralOrIdentifierComponent';
import BlockComponent from './BlockComponent';
import ListComponent from './ListComponent';
import VoidComponent from './VoidComponent';

class NodeComponent extends React.Component{
	render(){
		let {node} = this.props;
		let renderedNode = '';

		if( node === null ){
			return <div></div>;
		}

		// console.log(node);

		switch(node.nodeType){

			case NODE_TYPES.LIST:
				renderedNode = <ListComponent {...this.props} />;
			break;

			case NODE_TYPES.BLOCK:
				renderedNode = <BlockComponent {...this.props} />;
			break;

			case NODE_TYPES.LITERAL:
			case NODE_TYPES.IDENTIFIER:
				renderedNode = <LiteralOrIdentifierComponent {...this.props} />;
			break;

			case NODE_TYPES.VOID:
				renderedNode = <VoidComponent {...this.pros} />
			break;

			default:
				throw new Error(`nodeType ${node.nodeType} not supported`);
			break;

		}

		return renderedNode;

	}
}

export default NodeComponent;
