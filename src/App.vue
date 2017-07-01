<template>
  <div id="app">
    <heads v-show="isShowHeader"></heads>
    <drawer v-show="isShowHeader"></drawer>
    <music-play v-show="isShowFooter"></music-play>
    <router-view></router-view>
    
    <foot v-show="isShowFooter"></foot>
    <audio v-bind:src="audio.src || (musicData[0]&&musicData[0].src) || defaultSrc" v-bind:autoplay="isPlaying" ref="audio"></audio>
 		
  </div>
</template>

<script>
import head from './components/Header/Header.vue'
import foot from './components/Footer/Footer.vue'
import play from './components/Play/Play.vue'
import drawer from './components/Drawer/Drawer.vue'

export default {
  name: 'app',
  beforeCreate () {
  	this.$store.dispatch('getData');
  },
  mounted(){
  	this.$store.commit('findDOM', {name: 'audio', dom: this.$refs.audio});
  },
  components: {
    foot: foot,
    heads: head,
    musicPlay:play,
    drawer:drawer,
  },
  computed: {
    audio() {
      return this.$store.state.audio;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    musicData() {
      return this.$store.state.musicData;
    },
    isShowFooter() {
    	return this.$store.state.isShowFooter;
    },
    isShowHeader() {
    	return this.$store.state.isShowHeader;
    }
  },
  data() {
    return {
      defaultSrc: 'http://ws.stream.qqmusic.qq.com/5026333.m4a?fromtag=46'
    };
  },
}
</script>

<style>
@import "./common/style/base.scss";
.showRouter-enter-active {
  transition: all .4s ease;
}
.showRouter-leave-active {
  transition: all 0 ease;
}
.showRouter-enter, .showRouter-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}
</style>
