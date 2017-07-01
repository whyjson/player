<template>
	<transition name="fade">
		<div id='foot'>
    <mu-bottom-nav :value="bottomVal" shift @change="handleChange" >
	    <mu-bottom-nav-item value="movies" title="My" icon="person" to="/home"/>
	    <mu-bottom-nav-item value="music" title="Find" icon="music_note" to="/playing" @click="changeFooter"/>
		</mu-bottom-nav>
  </div>
	</transition>
  
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    handleChange (val) {
      this.$store.commit("changeBottom",val);
    },
    changeFooter(){
    	this.$store.commit("showFooter",false);
    }
  },
  computed:{
  	bottomVal(){
  		return this.$store.state.bottomVal
  	},
  	isShowFooter(){
  		return this.$store.state.isShowFooter
  	},
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#foot{
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>
