<template>
  <transition name="fade">
  	<div class="play" id="play_music_box" ref="play_music_box">
  	<div  class="play_box" :style="{backgroundImage: 'url('+(audio.musicImgSrc || (musicData[0]&&musicData[0].musicImgSrc))+')'}" ref="play">
  		<div class="play_bg">
  			<div class="play_time">
	  			{{totalTime}}
	  		</div>
	  		<div class="play_name">
	  			{{audio.name || (musicData[0]&&musicData[0].name)}}
	  		</div>
	  		<div @click="playMusic" class="play_btn">
	  			<i v-show="!isPlaying"  class="plays"></i>
	  			<i v-show="isPlaying" class="pause"></i>
	  		</div>
  		</div>
  	</div>
  </div>
  </transition>
</template>

<script>
import "../../assets/generate.js"
export default {
	data(){
		return {
			oW:"",
			oH:"",
			now: 0,
      nativeAudio: {},
      totalTime: '0:00',
		}
	},
	mounted(){
		var circle = $S("play_music_box").circular(130,10,{
        edgeColor:"#cccccc",
        lineColor:"#7E57C2"
    });
    
		this.$refs.play_music_box.addEventListener('touchstart',this.fn1,false);
		this.$refs.play_music_box.addEventListener('touchmove',this.fn2,false);
		this.$refs.play_music_box.addEventListener('touchend',this.fn3,false);
		
    this.nativeAudio = document.querySelector('audio');

    this.nativeAudio.addEventListener('play', () => {
      this.totalTime = this.transformTime(this.nativeAudio.duration);
      this.now = this.nativeAudio.currentTime;

      setInterval(() => {
        this.now = this.nativeAudio.currentTime;
        circle.size(this.now/this.nativeAudio.duration*100);
        if(this.now==this.nativeAudio.duration){
        	this.isPlaying=false;
        }
      }, 1000);
      
      this.now = this.nativeAudio.currentTime;

    });
    
  
	},
  methods:{
  	
  	fn1(ev){
		   var touches = ev.touches[0];
		   this.oW = touches.clientX - this.$refs.play_music_box.offsetLeft;
		   this.oH = touches.clientY - this.$refs.play_music_box.offsetTop;
		   //阻止页面的滑动默认事件
		   document.addEventListener("touchmove",this.defaultEvent,false);
	  },

   	fn2(ev){
		   var touches = ev.touches[0];
		   var oLeft = touches.clientX - this.oW;
		   var oTop = touches.clientY - this.oH;
		   if(oLeft < 0) {
		    oLeft = 0;
		   }else if(oLeft > document.documentElement.clientWidth - this.$refs.play.offsetWidth) {
		    oLeft = (document.documentElement.clientWidth - this.$refs.play.offsetWidth);
		   }
		   this.$refs.play_music_box.style.left = oLeft + "px";
		   this.$refs.play_music_box.style.top = oTop + "px";
		},
	  fn3(ev){
		  document.removeEventListener("touchmove",this.defaultEvent,false);
		},
	  defaultEvent(e) {
		  e.preventDefault();
		},
		playMusic(){
			this.$store.commit('play', !this.isPlaying);
			console.log(this.$store.state.isPlaying)
      !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
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
  computed: {
    audio() {
      return this.$store.state.audio;
    },
    musicData() {
      return this.$store.state.musicData;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    DOM() {
      return this.$store.state.DOM;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.play{
	position: fixed;
	top: 50px;
	z-index: 5;
	.play_box{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	/*border: 2px solid #7E57C2;*/
	box-sizing: border-box;
	position: absolute;
	top: 15px;
	left:15px;
	
	background-size: 100px 100px;
	.play_bg{
		width:100%;
		height: 100%;
		border-radius:50%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(255,255,255,0.5);
	}
	.play_btn{
		background:#7E57C2 ;
		width: 30px;
		height: 30px;
		border-radius:50%;
		position:absolute;
		left:50%;
		margin-left:-15px;
		bottom:0;
		i {
			display: inline-block;
			width: 30px;
			height: 30px;
			
			cursor: pointer;
			&.plays{
				background: url(../../assets/play.svg);
				background-size: contain;
			}
			&.pause{
				background: url(../../assets/pause.svg);
				background-size: contain;
			}
		}
		
	}
	.play_time{
		width:40px;
		height: 20px;
		border-radius: 50%;
		line-height: 20px;
		text-align: center;
		position: absolute;
		left: 50%;
		margin-left: -20px;
		top: 2px;
		/*border: 1px solid #7E57C2 ;*/
	}
	.play_name{
		width: 100%;
		height: 40px;
		position: absolute;
		top: 20px;
		font-size: 12px;
		text-align: center;
		padding: 0 5px;
	}
}
}

</style>
