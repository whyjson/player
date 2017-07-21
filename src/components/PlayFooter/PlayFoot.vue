<template>
  <div id="playing_foot">
  	<div class="playing_operations">
  		<div class="playing_operation">
  			<img @click="playPrev" src="../../assets/prev.svg" alt="" />
  		</div>
  		<div class="playing_operation">
  			<img @click="playMusic" v-show="!isPlaying" src="../../assets/play.svg" alt="" />
  			<img @click="playMusic" v-show="isPlaying" src="../../assets/pause.svg" alt="" />
  		</div>
  		<div class="playing_operation">
  			<img @click="playNext" src="../../assets/next.svg" alt="" />
  		</div>
  	</div>
  	<div class="playing_bar">
  		<span>{{transformTime(this.now)}}</span>
  		<div class="progress">
  			<div class="bar" ref="bar"></div>
  		</div>
  		<span>{{this.totalTime}}</span>
  	</div>
  </div>
</template>

<script>
export default {
	data(){
		return {
			nativeAudio: {},
      totalTime: '0:00',
      backgroundBg:"url",
      now: 0,
		}
	},
	mounted(){
		let interval = "";
		this.nativeAudio = document.querySelector('audio');
		if(this.isPlaying){
			this.totalTime = this.transformTime(this.nativeAudio.duration);
			interval = setInterval(() => {
        this.now = this.nativeAudio.currentTime;
        if(this.now==this.nativeAudio.duration){
        	this.isPlaying=false;
        }

        if(!this.isShowFooter){

        	this.$refs.bar.style.left=this.now/this.nativeAudio.duration*100+"%";
        }
        
      }, 1000);
		}else {
			clearInterval(interval);
			interval = null;
		}
		this.nativeAudio.addEventListener('play', () => {
      this.totalTime = this.transformTime(this.nativeAudio.duration);
      this.now = this.nativeAudio.currentTime;
			if(!interval){
				interval = setInterval(() => {
	        this.now = this.nativeAudio.currentTime;
	        if(this.now==this.nativeAudio.duration){
	        	this.isPlaying=false;
	        }
	
	        if(!this.isShowFooter){
	
	        	this.$refs.bar.style.left=this.now/this.nativeAudio.duration*100+"%";
	        }
	        
	      }, 1000);
			}
      
      
      this.now = this.nativeAudio.currentTime;

    });
	},
	methods:{
		playMusic(){
			this.$store.commit('play', !this.isPlaying);
      !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
		},
		playNext(){
			let index = 0;
			if(this.$store.state.audio.index+1==this.$store.state.musicData.length){
				index = 0;
			}else{
				index =this.$store.state.audio.index+1;
			}
			this.DOM.audio.play();
      this.$store.commit('play', true);
			this.$store.commit('toggleMusic', index);
			
		},
		playPrev(){
			let index = 0;
			if(this.$store.state.audio.index-1==-1){
				index = this.$store.state.musicData.length-1;
			}else{
				index =this.$store.state.audio.index-1;
			}
			this.DOM.audio.play();
      this.$store.commit('play', true);
			this.$store.commit('toggleMusic', index);
			
		},
		transformTime(seconds) {
      let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length == 1 ? ('0' + m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1 ? ('0' + s) : s;
      return m + ':' + s;
    }
	},
  computed:{
  	DOM() {
      return this.$store.state.DOM;
    },
  	isPlaying(){
  		return this.$store.state.isPlaying
  	},
  	audio(){
  		return this.$store.state.audio;
  	},
  	isShowFooter(){
  		return this.$store.state.isShowFooter
  	},
  },
  watch: {
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#playing_foot{
	width: 100%;
	height:100px;
	background: #7E57C2;
	position: fixed;
	bottom: 0;
	left: 0;
	.playing_operations{
		padding: 10px 0 0 0;
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		.playing_operation{
			width: 50px;
			height:50px;
			position: relative;
			& img{
				width: 100%;
				height:100%;
				position: absolute;
			}
		}
	}
	.playing_bar{
		width: 90%;
		height: 40px;
		margin: auto;
		overflow: hidden;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		span{
			line-height: 40px;
			color: #fff;
		}
		.progress{
			width: 70%;
			height: 100%;
			position: relative;
			overflow: hidden;
			.bar{
				width: 4px;
				height: 10px;
				background: #fff;
				position: absolute;
				top: 15px;
				left: 0;
				/*padding: 3px;*/
				/*border-right:2px solid #fff;*/
			}
			.bar::before{
							content: "";
              position: absolute;
              left: -1000px;
              top: 3px;
              width: 1000px;
              height: 4px;
              background-color: #0371FA;
			}
			.bar::after {
              content: "";
              position: absolute;
              left: 0;
              top: 3px;
              width: 1000px;
              height: 4px;
              background-color: white;
            }
		}
		
	}
}
</style>
