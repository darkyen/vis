import React,{Component} from 'react';
import BlockDropZone from './BlockDropZone';
import ScriptBlock from './ScriptBlock';
import classNames from 'classnames';

class EventBlock extends Component{
	render(){
		let className = classNames("event-block control-block", {

		}, this.props.className);

		return  <ScriptBlock 
					className={className} 
					header={this.props.title}
				>
					<BlockDropZone 
						acceptScriptBlock={true} 
					/>
				</ScriptBlock>
	}
}

export default EventBlock;