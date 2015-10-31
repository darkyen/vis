import React, {Component, PropTypes} from 'react'; 
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import classNames from 'classnames';
import blockActions from '../actions/blockActions'; 
import _ from 'lodash';

const blockTarget = {
	drop(props, monitor){
		// dropped on a chaild
		if( monitor.didDrop() ){
			return;
		}
		blockActions.dropBlock(monitor.getItem(), props.path);
	},

	canDrop(props, monitor){
		
		let itemSpec = monitor.getItem().spec;
		let {valuePropType} = props;

		if( !_.contains(valuePropType.blockTypes, itemSpec.blockType) ){
			return false;
		}

		if( !_.contains(valuePropType.blockTypes, 'VALUE')  &&  _.intersection(valuePropType.dataTypes, itemSpec.dataTypes).length === 0 ){
			return false;
		}

		return true;
	}
};

function blockDropCollect(connect, monitor){
	return {
		connectDropTarget: connect.dropTarget(),
		canDrop: monitor.canDrop(),
		isOver: monitor.isOver({
			shallow: true
		})
	};
}

@DropTarget(ItemTypes.BLOCKS.BLOCK , blockTarget, blockDropCollect)
class BlockDropZone extends Component{
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		canDrop: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired,
		acceptScriptBlock: PropTypes.bool,
		path: PropTypes.string.isRequired,
		acceptValue: PropTypes.bool,
		acceptAll: PropTypes.bool,
	}

	render(){
		const {connectDropTarget, isOver, canDrop} = this.props;
		let className = classNames('block-drop-zone',{
			'block-drop-zone--script': this.props.acceptScriptBlock,
			'block-drop-zone--can-drop-here': isOver && canDrop,
			'block-drop-zone--value': this.props.acceptValue,
			'block-drop-zone--all': this.props.acceptAll,
		}, this.props.className);

		return  connectDropTarget(<div className={className}>
					{this.props.children}
				</div>);
	}
}

export default BlockDropZone;