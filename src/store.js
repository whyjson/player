import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

 export default new Vuex.Store({
 	state:{
 		isOpen:false,
		musicData:[],
		isPlaying:false,
		isShowFooter:true,
		isShowHeader:true,
		isShowMusicList:false,
		DOM: {},
	    audio: {
	      name: '',
	      src: '',
	      musicImgSrc: '',
	      index: 0
	    },
	    bottomVal:"movies"
	},
	
	mutations:{
		play(state,val){
			state.isPlaying = val;
		},
		findDOM(state, payload) {
	      state.DOM[payload.name] = payload.dom;
	    },
	    showFooter(state, flag) {
	      state.isShowFooter = flag;
	    },
	    showHeader(state, flag) {
	      state.isShowHeader = flag;
	    },
	    showMusicList(state, flag) {
	      state.isShowMusicList = flag;
	    },
	    changeBottom(state, flag){
	    	state.bottomVal = flag;
	    },
	    showOpen(state, flag){
	    	state.isOpen = flag;
	    },
	    toggleMusic(state, index) {
	        state.audio.name = state.musicData[index].name;
	        state.audio.src = state.musicData[index].src;
	        state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
	        state.audio.index = index;
	    },
	     playMusic(state, payload) {
	      state.audio.name = payload.name;
	      state.audio.src = payload.src;
	      state.audio.musicImgSrc = payload.imgSrc;
	      state.isPlaying = true;
	    },
	    addMusic(state, song,callback) {
	      for (let music of state.musicData) {
	        if (JSON.stringify(music) === JSON.stringify(song)) {
	          return;
	        }
	      }
	      state.musicData.unshift(song);
	      if(callback){
	      	callback();
	      }
    	},
    	del(state, index) {
	      if (state.musicData.length === 0) {
	        return;
	      }
	      state.musicData.splice(index, 1);
	    },
	},
	actions:{
		getData({ commit,state }) {
		if (localStorage.musics !== '[]' && localStorage.musics) {
	        state.musicData = JSON.parse(localStorage.musics);
	        return;
	      }
	      return new Promise((resolve,reject) => {
	        Vue.axios.get('/api/music')
	            .then (res => {
	              if (res.data.errno === 0) {
	              	console.log(res);
	                state.musicData = res.data.data;
	                localStorage.musics = JSON.stringify(state.musicData);
	               
	              }
	            })
	        resolve();
	      });
	    }
	}
 	
 })
