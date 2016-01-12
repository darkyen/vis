import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper';

class ReactSwiper extends Component{
	componentDidMount(){
		let el = React.findDOMNode(this.refs.swiper, );
		let portProps = {};
		console.log('Creating a swiper');

		if( this.props.hasPagination ){
			portProps.pagination = '.swiper-pagination';
		}

		if( this.props.updateProgress ){
			portProps.onProgress = (e,p) => this._updateProgress(e, p);
		}

		this._scroller = new Swiper(el, Object.assign(this.props.opts, portProps));
		if( this.props.onMountComplete ){
			this.props.onMountComplete(this._scroller);
		}

	}

	_updateProgress(s, p){
		// console.log(p);
		// console.log('wtf?', s.slides.eq(s.activeIndex)[0].progress);
	}

	render(){
		let pagination = {};
		if( this.props.hasPagination === true ){
			pagination = <div className="swiper-pagination"></div>;
		}

		return 	<div ref="swiper" className="swiper-container">
					<div className="swiper-wrapper">
						{React.Children.map(this.props.children, (el, idx) => {
							if( this._scroller ) {
								// console.log(this._scroller);
								el.props.isActive = (idx === this._scroller.activeIndex);
							}else{
								el.props.isActive = idx === 0;
							}

							return  <div className="swiper-slide" key={idx}>
										{el}
									</div>;
						})}
					</div>
					{pagination}
				</div>;
	}
}

export default ReactSwiper;
