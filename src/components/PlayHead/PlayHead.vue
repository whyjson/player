<template>
  <div id="play_head">
  	<div class="back" ref="back" @click="goRouter">
  		BACK
  	</div>
  	<div class="play_title">
  		{{audio.name||musicData[0].name}}
  	</div>
  	<div class="play_list">
  		<img @click="showMusicLists" src="../../assets/func.svg" alt="" />
  	</div>
  </div>
</template>

<script>
export default {
	data(){
		return {
			nativeAudio: {},
		}
	},
	mounted(){
		this.$refs.back.addEventListener("click",function(){
		},false)
	},
  computed:{
  	musicData() {
      return this.$store.state.musicData;
    },
  	audio(){
  		return this.$store.state.audio
  	},
  	isShowMusicList(){
  		return this.$store.state.isShowMusicList
  	}
  },
  methods:{
  	showMusicLists(){
  		this.$store.commit("showMusicList",!this.isShowMusicList)
  	},
  	goRouter(){
  		this.$router.push({path:"/home"});
//		this.$store.commit("changeBottom","movies");
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#play_head{
	width:100%;
	height: 50px;
	background: #7E57C2;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	color: #fff;
	line-height: 50px;
	font-size: 16px;
	.play_list{
		width: 20px;
		& img{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
