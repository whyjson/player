<template>
  <transition name="showRouter">
  	
  	<div class="demo-refresh-container">
  		<div class="block"></div>
	    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
		  <mu-list>
				<mu-list-item v-for="(item, index) of musicData" :title="((index+1)+ '.' +  item.name)"  :key="item.id" disabled>
				  <mu-avatar slot="leftAvatar" v-bind:src="item.musicImgSrc" @click="toggleMusic(index)" />
				  <mu-icon value="delete" slot="right" @click="del(index)" />
				  <mu-divider />
				</mu-list-item>
				  
			</mu-list>
		</div>
    
  </transition>
</template>

<script>
import Vue from 'vue'
export default {
	data () {
    const list = []
    for (let i = 0; i < 10; i++) {
      list.push('item' + (i + 1))
    }
    return {
      list,
      num: 10,
      refreshing: false,
      trigger: null
    }
  },
  beforeCreate(){
  	this.$store.commit("showFooter",true);
  	this.$store.commit("showHeader",true);
  },
  mounted () {
		this.trigger = this.$el
  },
  computed: {
		musicData() {

      return this.$store.state.musicData;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    isShowFooter() {
      return this.$store.state.isShowFooter;
    }
  },
  watch: {
		musicData: {
      handler(val, oldVal) {
        localStorage.musics = JSON.stringify(val);
      },
      deep: true
    }
  },
  
  methods: {
		toggleMusic(index) {
      if (this.$store.state.audio.index === index) {
        this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause();
        this.$store.commit('play', !this.isPlaying);
      } else {
        this.DOM.audio.play();
        this.$store.commit('play', true);
      }
      this.$store.commit('toggleMusic', index);

    },
    del(index) {
      this.$store.commit('del', index);
    },
    refresh () {
      this.refreshing = true
      setTimeout(() => {
        const list = []
        for (let i = this.num; i < this.num + 10; i++) {
          list.push('item' + (i + 1))
        }
        this.list = list
        this.num += 10
        this.refreshing = false
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  .block{
  	width: 100%;
  	height: 50px;
  }
</style>
