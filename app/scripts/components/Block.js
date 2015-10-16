import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import classNames from 'classnames';
import conductor from '../lib/conductor';
import joinGlobalPath from '../lib/joinPath';

const blockSource = {
	beginDrag(props, monitor, component){
		return {
			spec: component.getSpec(),
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

let Block = function(blockName, blockSpec){
	return (ComponentClass) => {
		return DragSource(ItemTypes.BLOCKS.BLOCK, blockSource, blockCollect)(
		class extends Component{
			static displayName = 'Block(' + blockName + ')'
			static propTypes = {
				connectDragSource: PropTypes.func.isRequired,
				isDragging: PropTypes.bool.isRequired
			}

			compileAndLog(){
				let node = {
					oprClassDef: this.props.oprClassDef,
					oprName: this.props.oprName,
					meta: this.props.meta
				};
				// console.log(conductor(node));
			}
			
			getSpec(){
				return blockSpec;
			}

			joinPath(...frag){
				return joinGlobalPath(this.props.path, ...frag);
			}

			render(){
				const {connectDragSource, isDragging} = this.props;
				let className = classNames("block", this.props.className);

				return  connectDragSource(<ComponentClass 
							onClick={e => this.compileAndLog(e)} 
							{...this.props}
							className={className}
							joinPath={this.joinPath.bind(this)}
						>{this.props.children}</ComponentClass>);
			}
		})
	}
}

export default Block;