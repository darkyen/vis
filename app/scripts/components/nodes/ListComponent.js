import React from 'react';
import NodeComponent from './NodeComponent';
import joinPath from '../../conductor/utils/joinPath';

export default class ListComponent extends React.Component{
	render(){
		let {path, node} = this.props;
		return  <div className="list">
					{node.nodes.map((node, index) => {
						return <NodeComponent path={joinPath(path, index)} node={node} />
					})}
				</div>
	}
}