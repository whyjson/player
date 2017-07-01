<template>
  <transition name="showRouter">
    <div class="music-list">

      <div v-for="(item, index) of musicData" class="music-item">
        <span @click="toggleMusic(index)" class="music-name">{{ (index+1) + '.&nbsp; ' + item.name}}</span>
        <span v-on:click="del(index)" class="del-icon"></span>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    musicData() {

      return this.$store.state.musicData;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.music-list {
  	padding:4px 4px 40px 4px;

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
  }
</style>
