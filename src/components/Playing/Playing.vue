<template>
	<!--<transition name="fade">-->
		<div id="playing">
	  	<play-head ></play-head>
	  	<div ref="play_bg" class="play_bg" :style="{backgroundImage: 'url('+(audio.musicImgSrc || (musicData[0]&&musicData[0].musicImgSrc))+')'}"></div>
	  	<music-list v-show="isShowMusicList"></music-list>
	  	<play-foot ></play-foot>
	  </div>
	  
	<!--</transition>-->
</template>

<script>
import PlayFoot from '../PlayFooter/PlayFoot.vue'
import PlayHead from '../PlayHead/PlayHead.vue'
import MusicList from '../MusicList/MusicList.vue'
export default {
  beforeCreate(){
  	this.$store.commit("showFooter",false);
  	this.$store.commit("showHeader",false);
  },
  mounted(){
  	this.$refs.play_bg.style.height=document.body.clientHeight-50+"px";
  },
  computed: {
  	musicData(){
  		return this.$store.state.musicData
  	},
  	isShowFooter(){
  		return this.$store.state.isShowFooter
  	},
  	isShowMusicList(){
  		return this.$store.state.isShowMusicList
  	},
  	audio(){
  		return this.$store.state.audio
  	}
  },
  components:{
  	PlayFoot:PlayFoot,
		PlayHead:PlayHead,
		MusicList:MusicList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped > 
.play_bg{
	width: 100%;
	height:100%;
	background-size: 100% 100%;
}
.music-list{
	width:60%;
	height: 400px;
	position:absolute;
	top: 50px;
	right:0px;
	overflow: auto;
	background: rgba(255,255,255,0.5);
	border-radius:5px;
}
</style>
