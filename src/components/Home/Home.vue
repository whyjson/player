<template>
  <transition name="showRouter">
  	<div class="home">
  		<div class="block"></div>
    	<swiper :options="swiperOption"  ref="mySwiper">  
	      <swiper-slide v-for="item in banners" :key="item.index">  
	      	<img :src="item" width="100%" height="200" />
	      </swiper-slide>  
	      <div class="swiper-pagination" slot="pagination"></div>  
    	</swiper> 
    	<div class="home_news">
    		
    	</div>
    </div> 
  </transition>
   
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {  
    return {  
      swiperOption: {  
		      notNextTick: true,  
		      pagination: '.swiper-pagination',  
		      slidesPerView: 'auto',  
		      centeredSlides: true,  
		      paginationClickable: true,  
		      spaceBetween: 30,  
		      onSlideChangeEnd: swiper => {  
		           								this.page = swiper.realIndex+1;  
		                        	this.index = swiper.realIndex;  
                    				}  
      	},
      	banners:[
      		require('../../assets/banner1.png'),
      		require('../../assets/banner2.png'),
      		require('../../assets/banner3.png'),
      		require('../../assets/banner4.png'),
      		require('../../assets/banner5.png'),
      		require('../../assets/banner6.png'),
      		require('../../assets/banner7.png')
      	]
    }  
  }, 
  beforeCreate(){
  	this.$store.commit("showFooter",true);
  	this.$store.commit("showHeader",true);
  },
  created(){
  	
  },
	computed: {  
	  swiper() {  
		  return this.$refs.mySwiper.swiper;  
		},
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
	mounted () {  
    this.swiper.slideTo(0, 0, false);  
 	},
  components: {  
    swiper,  
    swiperSlide  
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home{

	
	.block{
		width: 100%;
		height: 50px;
	}
}
</style>
