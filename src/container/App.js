import React,{Component} from 'react'
import VideoPlayer from '../component/VideoPlayer'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			videoIndex:'0',
			currentVideoPage:1,
			videoList:[
				{
					thumbnail_url:"https://s1.sonkwo.com/Fqyf11NU4fu5H2i9MHRbtKJ9-g9B",
					video_url:"https://s1.sonkwo.com/ls-KzR9iZO8zIu3AtVvD0yeGJhZV"
				},
				{
					thumbnail_url:"https://s1.sonkwo.com/Fk6zWYLZbRJPRIKughU6PxYO3Uvk",
					video_url:"https://s1.sonkwo.com/lsbNFh2DbWB2D8r4Q3pJADRHLb9W"
				},
				{
					thumbnail_url:"https://s1.sonkwo.com/FtAc7VJuyQkrDHqdL275PMRbKVlY",
					video_url:"https://s1.sonkwo.com/lgxNw3-kn0uWxu3WjZo6s4WPYN64"
				},
				{
					thumbnail_url:"https://s1.sonkwo.com/FjgfHYJhraiX1AFCqy_72qCx49-G",
					video_url:"https://s1.sonkwo.com/lpQoOHJ2Mtzq48YRqwfPRGOR4v8O"
				},
				{
					thumbnail_url:"https://s1.sonkwo.com/Fqs49btPjQwAARdvTUXiXf1gZ4IU",
					video_url:	"https://s1.sonkwo.com/lrYOjCRcYGww17nnXJ4MLAuquAy0"
				}
			]
		}
		this.handleClick = this.handleClick.bind(this);
		this.changePage = this.changePage.bind(this);
	};

	handleClick(event){
		let target = event.currentTarget;
		let index = target.getAttribute('data-index');
		this.setState({videoIndex : index});
	};
	changePage(page){
		if(page === 0){
			return
		}
		this.setState({currentVideoPage:page});
	};
	render(){
		let top;
		if(this.state.currentVideoPage === 1){
			top = '0px';
		}else{
			top = 4 * (this.state.currentVideoPage - 1) * 71 + (this.state.currentVideoPage - 1) * 4 * 8 + 'px';
		}
		return(
			<div className="container">
				<h3><i className="fa fa-video-camera" />React Video Player</h3>
				<div style={{background:'#959595'}}>
					<div className="game-assets">
						<div id="video-assets">
						<VideoPlayer video={this.state.videoList[this.state.videoIndex]}/>
							<div className="asset-select-container">
								<div className="slider-top" onClick={()=> this.changePage(Math.max(this.state.currentVideoPage - 1,1))}>
									<i className="fa fa-angle-up"/>
								</div>
								<div className="asset-list-block">
									<div className="asset-list" style={{top: '-' + top}}>
										{
											this.state.videoList.map((item, index) => {
												return(
													<div className={index + '' === this.state.videoIndex? 'asset-item active' :'asset-item'} key={index} data-index={index}  onClick={this.handleClick}>
														<img src={item.thumbnail_url + '?imageView2/1/w/110/h/67'}/>
													</div>
												)
											})
										}
									</div>
								</div>
								<div className="slider-bottom" onClick={()=> this.changePage(Math.min(this.state.currentVideoPage + 1, Math.ceil(this.state.videoList.length / 4)))}>
									<i className="fa fa-angle-down"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};
export default App