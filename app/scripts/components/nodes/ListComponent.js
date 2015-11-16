import React from 'react';
import NodeComponent from './NodeComponent';
import joinPath from '../../conductor/utils/joinPath';
import BlockDropZone from '../BlockDropZone';

export default class ListComponent extends React.Component{
	render(){
		let {path, node} = this.props;
		let {propType} = node.listSpec;

		return  <div className="list">
					<BlockDropZone
						valuePropType={propType}
						path={joinPath(path, node.nodes.length)}
					>
						{node.nodes.map((node, index) => {
							let currPath = joinPath(path, index);
							return  <div>
										<NodeComponent
											path={currPath}
											node={node}
										/>
									</div>;
						})}
					</BlockDropZone>
				</div>
	}
}
