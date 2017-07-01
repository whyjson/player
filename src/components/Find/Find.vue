<template>
  <transition name="showRouter">
  	<div class="find" id="find" ref="find">
	  	<div class="find_back">
	  		<div class="find_search">
		  		<input type="text" v-model="keywords" @focus="inputFocus" v-bind:class="{'input-focus': isShowHot}" placeholder="请输入关键字"/>
		  		<div v-show="!isShowHot" class="find_btn" @click="toSearch(keywords)">搜索</div>
		  		<div v-show="!isShowHot" class="find_btn" @click="showHot">取消</div>
		  	</div>
		  	
		  	<div v-if="isShowHot" class="hot">
	        <div class="hot_search">热门搜索</div>
	        <div class="keywords">
	        	<mu-raised-button label="Primary" class="demo-raised-button" v-for="item of hotKeywords"  :key="item.id" v-text="item" @click="toSearch(item)" primary/>
	          <!--<div v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keyword"></div>-->
	        </div>
	      </div>
	      <div v-show="isLoading" class="find_loading">
	      	<mu-circular-progress  :size="20"/>
	      	
	      </div>
	      <mu-list v-if="!isShowHot">
					<mu-list-item v-for="(item, index) of musicList" :key="item.id" :title="strDecode(item.fsong)" :describeText="item.f.split('|')[3]&&strDecode(item.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名'" >
					  <mu-avatar slot="leftAvatar" @click="playMusic(index, (item.f.split('|')[3]&&strDecode(item.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名')+' - '+strDecode(item.fsong), item.f.split('|')[0], item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg')" v-bind:src="item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg'" />
					  <mu-icon value="add" slot="right"/>
					  <mu-divider />
					</mu-list-item>
					  
				</mu-list>
	      
	      
	      
	  	</div>
	  	
	  </div>
  </transition>
</template>

<script>
import "../../assets/jquery-1.8.3.min.js"
export default {
  data(){
  	return {
  		keywords: '',
  		hotKeywords: [],
  		findBg:require("../../assets/find_bg.jpg"),
  		musicList: [],
  		isShowHot: true,
  		playIndex: '',
      isLoading: false,
  	}
  },
  beforeCreate(){
  	this.$store.commit("showFooter",false);
  },
  created() {
    this.axios.get('/api/hot')
      .then(res => {
        this.hotKeywords = res.data;
      });
      
  },
  mounted(){
  	this.$refs.find.style.minHeight=document.body.clientHeight+1150+"px";
  	this.$refs.find.style.backgroundImage="url("+this.findBg+")";	
  },
  computed:{
  	musicData() {
      return this.$store.state.musicData;
   },
   isShowFooter(){
  		return this.$store.state.isShowFooter
  	},
  },
  watch: {
    musicData: {
      handler(val, oldVal) {
        localStorage.musics = JSON.stringify(val);
      },
      deep: true
     }
   },
   methods:{
    toSearch(keywords) {
	     if (keywords.trim()) {
	       this.isShowHot = false;
	       this.playIndex = null;
	       this.isLoading = true;
	       this.keywords = keywords;
	       this.axios.get('/api//search/100/' + keywords)
          .then(res => res.data.data.song)
          .then(song => {
            this.musicList = song.list;
            this.isLoading = false;
          })
	      }
	   },
	  playMusic(index, name, src, imgSrc) {
      src = 'http://ws.stream.qqmusic.qq.com/'+src+'.m4a?fromtag=46';
      this.$store.commit('playMusic', {name: name, src: src, imgSrc: imgSrc});
//    this.$store.commit('addMusic', {name: name, src: src, musicImgSrc: imgSrc});
      this.playIndex = index;
    },
    
	  inputFocus() {
      if (this.keywords.trim()) {
        return;
      }
      else {
        this.isShowHot = false;
        this.musicList = [];
      }
    },
    showHot(){
    	this.isShowHot=!this.isShowHot;
    	this.keywords = "";
    },
    strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    },
    scrollLoad(){
    	alert()
    }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.find{
	background-size:cover ;
	background-position:center center; 
	background-attachment: fixed;
	
	.find_back{
		width: 100%;
		height: 100%;
		/*background: rgba(0,0,0,0.4);*/
		.find_search{
			width: 100%;
			height: 50px;
			padding: 20px 0;
			display: flex;
			justify-content: space-around;
			& input{
				width:60%;
				padding:0 0 0 10px;
				outline: none;
				height: 30px;
				border: 1px solid #999;
				border-radius:5px;
			}
			.input-focus{
				width: 85%;
			}
			.find_btn{
				font-size:16px ;
				width: 50px;
				height: 30px;
				border: 1px solid #999;
				text-align: center;
				line-height: 30px;
				background: #ccc;
				border-radius:5px;
				cursor: pointer;
			}
		}
		.hot{
			
      flex: 8;
      padding: 10px;
      
      .hot_search{
      	color: #fff;
      	padding: 0 0 0 20px;
      }
      .keywords {
        display: flex;
        flex-wrap: wrap;

        padding: 16px;
        justify-content: space-around;
        .demo-raised-button {
          margin-top: 10px;
        }
        div {
          text-align: center;
          width: 25%;
          padding: 5px;
          border: 1px solid gray;
          margin-right: 8%;
          margin-bottom: 10px;
          border-radius: 20px;
          cursor: pointer;
          background: #CCCCCC;
        }
        div:nth-of-type(1) {
          border-color: purple;
          box-shadow: none;
          color: purple;

        }
      }
    
		}
		.find_loading{
			width: 20px;
			height: 20px;
			margin:10px auto;
		}
    .mu-item-title {
    	font-size:20px ;
      color: #fff;
    }
	}
	
}
</style>
