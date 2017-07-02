<template>
	<div id='head'>
		<div class="headers">
			<div class="right" >
				<i v-show="isShowFooter" @click="goRouter" class="search"></i>
				<span @click="goHome" v-show="!isShowFooter">BACK</span>
			</div>
			<span>whySong</span>
			
			<div class="left" @click="toggle">
				<i class="search"></i>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  	goRouter(){
  		this.$router.push({path:"/find"});
  	},
  	goHome(){
  		this.$router.push({path:"/home"});
  	},
  	toggle () {
      this.$store.commit("showOpen",!this.open);
    }
  },
  computed:{
  	isShowFooter(){
  		return this.$store.state.isShowFooter
  	},
  	open(){
  		return this.$store.state.isOpen
  	}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.headers {
	width: 100%;
	height: 50px;
	background: #7E57C2;
	text-align: center;
	color: white;
	font-size: 20px;
	line-height: 50px;
	display: flex;
	justify-content: space-between;
	z-index: 99999999999;
	position: fixed;
	top: 0px;
	.left {
		float: left;
		width: 50px;
		height: 50px;
		padding:10px 0 0 0;
		i {
			display: inline-block;
			width: 30px;
			height: 30px;
			background: url(../../assets/func.svg) no-repeat;
			background-size: contain;
			cursor: pointer;
		}
	}
	.right {
		float: right;
		width: 50px;
		height: 50px;
		padding:10px 0 0 0;
		line-height: 30px;
		i {
			display: inline-block;
			width: 30px;
			height: 30px;
			background: url(../../assets/search.svg) no-repeat;
			background-size: contain;
			cursor: pointer;
		}
	}
}
</style>
