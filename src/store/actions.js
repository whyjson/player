import Vue from 'vue'
export default {
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

//		Vue.axios.get('/api/music')
//	      	.then (res => {
//	        	if (res.data.errno === 0) {
//      		state.musicData = res.data.musicData;   
//	        	}
//	    	});





    
  

    }
}
