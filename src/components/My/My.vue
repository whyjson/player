<template>
  <transition name="showRouter">
  	<div class="demo-refresh-container">
	    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
		  <mu-list>
				<mu-list-item v-for="(item, index) of musicData" :title="((index+1)+ '.' +  item.name)"  :key="item.id" disabled>
				  <mu-avatar slot="leftAvatar" v-bind:src="item.musicImgSrc" @click="toggleMusic(index)" />
				  <mu-icon value="delete" slot="right"/>
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
    	console.log(this.$store.state.DOM);
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
  /*.music-list {
    padding-top: 4px;
    padding-left: 4px;
    padding-right: 4px;
    // padding-bottom: 40px;
    flex:8;
    overflow: auto;
    .music-item + .music-item {
      border-top: 1px solid rgba(0, 0, 0, .1);
    }
    .music-item {
      // box-shadow: 0 0 1px #DD2C00;
      padding: 4px 6px 0 6px;
      position: relative;
      margin-bottom: 4px;
      border-radius: 5px;
      cursor: pointer;
      border: none;

      .music-img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      span.music-name {
        display: inline-block;
        width: 65%;
        vertical-align: top;
        margin-top: 15px;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        padding-bottom: 20px;
      }

      span.del-icon {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 20px;
        width: 20px;
        height: 20px;
        background: url('../../assets/del.svg');
        background-size: contain;
        cursor: pointer;
      }
    }
    .tips {
      text-align: center;
      margin: 12px auto;
      width: 200px;
      font-size: 80%;
      color: gray;
    }
  }*/
</style>
