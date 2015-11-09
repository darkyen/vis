import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import {BLOCK_TYPES} from '../../conductor/core';
import joinPath from '../../conductor/utils/joinPath'
import NodeComponent from './NodeComponent';
import BlockDropZone from '../BlockDropZone';
import {blocks} from '../../conductor/';
import {DragSource} from 'react-dnd';
import ItemTypes from '../../constants/ItemTypes';
import getBlockSpec from '../../conductor/utils/getBlockSpec';

// The following function Handles solely the ui part of the block equation
// For the compiler visit conductor.js and look at create interpreter

const blockSource = {
	beginDrag(props, monitor, component){
		let {blockType, blockName} = props.node.identifier;
		return {
			spec: getBlockSpec(blockType, blockName).spec,
			isDummy: props.isDummy,
			path: props.path
		};
	}
};


function blockCollect(connect, monitor){
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

@DragSource(ItemTypes.BLOCKS.BLOCK, blockSource, blockCollect)
class BlockComponent extends Component{
	render(){
		let {node, path, connectDragSource} = this.props;
		let {blockType, blockName} = node.identifier;
		let blockProps = node.props;

		let {renderer, propTypes}  = getBlockSpec(blockType, blockName);

		let className = classNames('block', {
			'block--decl'  : blockType === BLOCK_TYPES.DECLARATION,
			'block--value' : blockType === BLOCK_TYPES.VALUE,
			'block--flow'  : blockType === BLOCK_TYPES.FLOW,
		});
		
		let blockPropValues = _.reduce(blockProps, (newPropValues, propValueNode, propName) => {
			let propType = propTypes[propName];
			let dropPath = joinPath(path, propName);

			newPropValues[propName] = 	<BlockDropZone valuePropType={propType} path={dropPath}>
											<NodeComponent 
												node={propValueNode} 
												path={dropPath} 
											></NodeComponent>
										</BlockDropZone>;
			return newPropValues;
		}, {});

		return  connectDragSource(<div className={className}>
					{renderer(blockPropValues)}
				</div>);
	}
}

export default BlockComponent;