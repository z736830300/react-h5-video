import React,{Component} from 'react'

class VideoPlayer extends Component{
	constructor(props){
		super(props);
		this.state = {
			pause:true,
			currentTime:'0:00',
			duration:'0:00',
			volume:'1.0',
			progress:'0',
			headPos:'0',
			offVolume:false,
			volumeProgress:'100%',
			fullscreen:false,
			showPlayBtn:true,
			showControlBar:false
		};
	};
	componentDidMount(){
		let self = this;
		var myVideo = document.getElementById('myVideo');
		self.timer = null;
		window.onresize = function(){
			if(!self.checkFull() && self.state.fullscreen) {
				self.f11Key();
			}
		}
	};
	componentWillReceiveProps(nextProps){
		if(this.props.video.video_url !== nextProps.video.video_url){
			if(!myVideo.paused){
				myVideo.pause();
			}
			if(this.timer){
				clearInterval(this.timer);
				this.timer = null;
			}
			if(this.timeTask){
				clearTimeout(this.timeTask);
				this.timeTask = null;
			}
			// reset the player
			myVideo.src = nextProps.video.video_url;
			myVideo.volume = 1.0;
			myVideo.muted = false;
			this.setState({
				pause:true,
				currentTime:'0:00',
				duration:'0:00',
				volume:'1.0',
				progress:'0',
				headPos:'0',
				offVolume:false,
				volumeProgress:'100%',
				fullscreen:false,
				showPlayBtn:true,
				showControlBar:false
			});
		}
	};
	componentWillUnmount(){
		if(this.timer){
			clearInterval(this.timer);
			this.timer = null;
		}
		if(this.timeTask){
			clearTimeout(this.timeTask);
			this.timeTask = null;
		}
	};
	checkFull (){
		let isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
		if(isFull === undefined) isFull = false;
		return isFull;
	};
	playPause(){
		let self = this;
		if(myVideo.paused){
			myVideo.play();
			self.setState({
				showPlayBtn:false,
				showControlBar:true,
				pause:false,
				duration:Math.floor((myVideo.duration)/60)+":"+((myVideo.duration)%60/100).toFixed(2).slice(-2)
			});
			self.timeTask = setTimeout(function () {
				self.setState({showControlBar: false});
				clearTimeout(self.timeTask);
				self.timeTask = null;
			}, 3000);
			self.timer = setInterval(function(){
				if(myVideo){
					self.setState({
						currentTime:Math.floor((myVideo.currentTime)/60)+":"+((myVideo.currentTime)%60/100).toFixed(2).slice(-2),
						progress: (myVideo.currentTime / myVideo.duration) * 100 + '%',
						headPos:(myVideo.currentTime / myVideo.duration) * 100 - 0.45 + '%'
					});
				}
			},50);

		}else{
			myVideo.pause();
			if(self.timer){
				clearInterval(self.timer);
				self.timer = null;
			}
			this.setState({pause:true, showControlBar:true});
		}
	};
	resetPlay(event){
		let self = this;
		if(self.timer){
			clearInterval(self.timer);
			self.timer = null;
		}
		let container = document.getElementsByClassName('videos-player')[0];
		let container_offset_left = container.offsetLeft;
		let total_width = event.target.parentNode.offsetWidth;
		let scale = (event.clientX - container_offset_left) / total_width;
		myVideo.currentTime =  scale * myVideo.duration;
		self.timer = setInterval(function(){
			self.setState({
				currentTime:Math.floor((myVideo.currentTime)/60)+":"+((myVideo.currentTime)%60/100).toFixed(2).slice(-2),
				progress: Math.min((myVideo.currentTime / myVideo.duration) * 100 , 100)+ '%',
				headPos:(myVideo.currentTime / myVideo.duration) * 100 - 0.45 + '%'
			});
		},50);
	};
	handleVolume(){
		this.setState({
			volumeProgress : this.state.offVolume ? (this.state.volume.indexOf('%') > -1 ? this.state.volume :this.state.volume * 100 + '%') : '0' ,
			offVolume : !this.state.offVolume
		});
		myVideo.muted = !this.state.offVolume;
		myVideo.volume = this.state.offVolume === false ? '0': (this.state.volume.indexOf('%') > -1 ? this.state.volume.replace('%','')/100 :this.state.volume);
	};
	resetVolume(event){
		let container_offset_left = document.getElementsByClassName('vjs-volume-control')[0].offsetLeft;
		let content_left = document.getElementsByClassName('videos-player')[0].offsetLeft;
		let total_width = event.currentTarget.offsetWidth;
		let scale = (event.clientX - container_offset_left - content_left - 2) / total_width;
		this.setState({
			offVolume : scale === 0,
			volumeProgress: Math.min(scale * 100, 100) + '%',
			volume: Math.min(scale * 100, 100) + '%'
		});
		myVideo.muted = scale === 0;
		myVideo.volume = Math.min(scale, 1.0);
	};
	f11Key(){
		if(this.state.fullscreen){
			this.setState({fullscreen:false});
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			return
		}
		let navigatorName = "Microsoft Internet Explorer";
		if( window.navigator.appName === navigatorName ){
			let WsShell = new ActiveXObject('WScript.Shell');
			WsShell.SendKeys('{F11}');
		}else{
			let de = document.getElementsByClassName('videos-player')[0];
			if (de.requestFullscreen) {
				de.requestFullscreen();
			} else if (de.mozRequestFullScreen) {
				de.mozRequestFullScreen();
			} else if (de.webkitRequestFullScreen) {
				de.webkitRequestFullScreen();
			}else if (de.msRequestFullscreen) {
				de.msRequestFullscreen();
			}
		}
		this.setState({fullscreen:!this.state.fullscreen});
	};
	toggleControlBar(){
		let self = this;
		if(self.state.showPlayBtn){
			self.setState({showControlBar:false});
			return
		}
		if(self.state.pause ) {
			return
		}
		if(!self.state.showControlBar){
			self.setState({showControlBar:true});
			return
		}
		self.timeTask = setTimeout(function () {
			if(!self.state.pause){
				self.setState({showControlBar: false});
			}
			clearTimeout(self.timeTask);
			self.timeTask = null;
		}, 3000);
	};
	render(){
		const {video} = this.props;
		return(
			<div className={this.state.fullscreen ? 'videos-player asset fullscreen':'videos-player asset'}>
				<video width="100%" height="100%" poster="none" id="myVideo" onClick={this.playPause.bind(this)} onMouseMove={ this.toggleControlBar.bind(this)} onMouseLeave={this.toggleControlBar.bind(this)}>
					<source src={video.video_url} type="video/mp4"/>
				</video>
				<div className="vjs-big-play-button" onClick={this.playPause.bind(this)}  style={{display: this.state.showPlayBtn ? 'block':'none'}}>
					<span><i className="fa fa-caret-right"/></span>
				</div>
				<div className="vjs-control-bar" style={{visibility: this.state.progress === '100%' || this.state.showControlBar ? 'visible':'hidden',opacity: this.state.progress || this.state.showControlBar ? 1:0}}>
					<div className="vjs-play-control vjs-control vjs-paused" onClick={this.playPause.bind(this)} >
						<i className={ this.state.progress === '100%' ||this.state.pause ? 'fa fa-caret-right':'fa fa-pause'} />
					</div>
					<div className="vjs-current-time vjs-time-controls vjs-control">
						<span className="vjs-control-text">{this.state.currentTime}</span>
					</div>
					<div className="vjs-time-divider">
						<span>/</span>
					</div>
					<div className="vjs-duration-time vjs-time-controls vjs-control">
						<span>{this.state.duration}</span>
					</div>
					<div className="vjs-progress-control vjs-control" >
						<div className="vjs-progress-holder vjs-slider"  onClick={this.resetPlay.bind(this)}>
							<div className="vjs-play-progress" style={{width: this.state.progress}}/>
							<div className="vjs-seek-handle vjs-slider-handle" style={{left: this.state.headPos}} ><i className="fa fa-stop" /></div>
						</div>
					</div>
					<div className="vjs-fullscreen-control vjs-control" onClick={this.f11Key.bind(this)}>
						<i className={this.state.fullscreen ? 'fa fa-compress': 'fa fa-expand'}/>
					</div>
					<div className="vjs-volume-control vjs-control">
						<div className="vjs-volume-bar vjs-slider" onClick={this.resetVolume.bind(this)}>
							<div className="vjs-volume-level" style={{width:this.state.volumeProgress}} />
							<div className="vjs-volume-handle vjs-slider-handle" style={{left:parseInt(this.state.volumeProgress)- 5 + '%',top:'-2px' }}><i className="fa fa-stop" /></div>
						</div>
					</div>
					<div className="vjs-mute-control vjs-control" onClick={this.handleVolume.bind(this)}><i className={this.state.offVolume === true ? 'fa fa-volume-off':'fa fa-volume-up'}/></div>
				</div>
			</div>
		)
	}
}
export default VideoPlayer;