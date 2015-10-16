import React, {Component, PropTypes} from 'react'; 
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import classNames from 'classnames';
import blockActions from '../actions/blockActions'; 
const blockTarget = {
	drop(props, monitor){
		// dropped on a chaild
		if( monitor.didDrop() ){
			return;
		}
		blockActions.dropBlock(monitor.getItem(), props.path);
	}
};

function blockDropCollect(connect, monitor){
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

@DropTarget(ItemTypes.BLOCKS.BLOCK , blockTarget, blockDropCollect)
class BlockDropZone extends Component{
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		acceptScriptBlock: PropTypes.bool,
		acceptValue: PropTypes.bool,
		acceptAll: PropTypes.bool,
		isOver: PropTypes.bool.isRequired,
		path: PropTypes.string.isRequired
	}

	render(){
		const {connectDropTarget, isOver} = this.props;
		let className = classNames('block-drop-zone',{
			'block-drop-zone--script': this.props.acceptScriptBlock,
			'block-drop-zone--value': this.props.acceptValue,
			'block-drop-zone--all': this.props.acceptAll
		}, this.props.className);

		return  connectDropTarget(<div className={className}>
					{this.props.children}
				</div>);
	}
}

export default BlockDropZone;