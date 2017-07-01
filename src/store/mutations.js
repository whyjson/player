
const state={
	musicData:[],
	isPlaying:false,
	DOM: {},
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    }
};

const mutations={
	play(state,val){
		state.isPlaying = val;
	}
}

export default{
	state,
	mutations
}
