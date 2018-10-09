
// 推荐组件
<template>
  <div>
        <div class="recommendwraper wraper-hook" >
          <!-- 轮播图部分 -->
        <div class="content">
            <div class="op">
                <div class="bannerwraper">
                    <mu-carousel hide-controls >
                        <mu-carousel-item v-for="(banner,index) in banners" :key ='index'>
                            <img :src="banner.picUrl" alt="" width="100%">
                        </mu-carousel-item>
                       
                    </mu-carousel>
                </div> 
        
            </div> 
            <div class="fenlei">
                <div class="recommon">
                <h4 class="titled">
                    推荐歌单
                </h4>
                <ul class="resongs">
                    <li class="reitem" v-for="(song,index) in recommsings" :key="index" @click="jumptomusiclist(song.id)">
                        <div class="imgs">
                            <div class="songicon">
                                <img :src="song.picUrl" alt="" width="100%" height="100%">
                            </div>
                            <div class="listen">
                                <span class="erji"></span>
                                <span>收听{{Math.round(song.playCount/10000)}}万</span>
                            </div>
                        </div>
                        <div class="songdesc">
                            <p>{{song.name}}</p>
                        </div>
                    </li>
                </ul>
                </div>
                <div class="newsong">
                <h4 class="titled">
                    推荐歌曲
                </h4>
                       <ul>
                           <li class="newitem" v-for="(item , index) in newsong" :key="index">
                              <div class="newicon">
                               <img v-show="item.song" :src="item.song.album.blurPicUrl" alt="" width="100%">
                              </div>
                              <p class="newavatrt">{{item.name}}</p>
                              <p class="newdesc"><span v-show="item.song" v-for="(art,index) in item.song.album.artists" :key="index">{{art.name}}</span></p>
                           </li>
                       </ul>
                </div>
            </div>     
        </div>     
    </div>
      <div class="musiclist" :class="showmuscilist ? 'songactive' : ''">
                <router-view></router-view>
      </div>
  </div>
</template>
<script>
 import BScroll from 'better-scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
   name:"recommend" ,
   
   components:{
    swiper,
    swiperSlide
   },
   data(){
       return{
           showmuscilist:false,
           banners:[],
           recommsings:[],
           newsong:[],
       }
   },
   watch:{
          $route(val){
             
             if(val.params.id){
                 this.showmuscilist = true
             }else{
                 this.showmuscilist = false
             }
          }
   },
   methods:{
       //跳转到音乐列表页面
       jumptomusiclist(id){
            this.$router.push(`/recommend/${id}`)
          
       },
       //实例化一个滑动窗口
       _scrollcon(){
            const wraper = document.querySelector('.wraper-hook')
            let wrapercoll = new BScroll(wraper,{
                probeType:3,
                 click:true,
            })
       },
    //    获取推荐页面轮播图列表如下
    getbanner(){
        this.$axios.get('/api/banner').then(res=>{
            // console.log(res)
            this.banners = res.data.banners
        })

    },
    //获取歌单列表
    getsong(){
        this.$axios.get('/api/personalized').then(res=>{
            
            this.recommsings = res.data.result
        })
    },
    //获取推荐歌曲
    getnewsong(){
        this.$axios.get('/api/personalized/newsong').then(res=>{
        
            this.newsong =res.data.result
        })
    }
  
   },
 
   
   created(){
   
      if(this.$route.params.id){
          this.showmuscilist = true
      }
       this.getbanner();
       this.getsong();
       this.getnewsong()
       this.$nextTick(()=>{
           this._scrollcon()
       })
   }
}
</script>
<style lang="scss" scoped>
.titled{
    font-size: 15px;
    color: #222;
    font-weight: 600;
    line-height: 20px;
    padding-top: 10px;
}
.content{
    width: 100%;
    background-color: #fff;
}
.bannerwraper{
    padding: 0 10px;
     background-color: #D44439;
    .mu-carousel{
        height: 195px;;
    }
    img{
         height: 100%;
         border-radius: 3px;
         position: relative;
    }
}
.fenlei{

    padding: 10px 10px 56px 10px;
}
.resongs{
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    .reitem{
        width: 30%;
        flex: 0 0 30%;  
        margin-top: 12px;
        .imgs{
              position: relative;
              .listen{
                  position: absolute;
                  right: 0;
                  top: 0;
                  color: #fff;
                  font-size: 13px;
              }
        }
        p{
            text-align: left;
            font-size: 10px;
            color: #666;
           
        }
    }
}
.recommendwraper{
    width: 100%;
    position: absolute;
    top: 92px;
    bottom: 0;
    overflow: hidden;
}
//推荐新曲
.newsong{
    ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top:12px;
        
    }
    ul li:nth-of-type(10){
        display: none;
    }
 .newitem{
     flex: 0 0 30%;
     margin-top: 12px;
     .newavatrt{
         
         font-size: 12px;
         color: #333;
     }
     .newdesc{
         font-size: 10px;
         color: #666;
     }
 }
}
//查看音乐列表页面
.musiclist{
    position: fixed;
    top: 0px;
    z-index: 1000;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    transition: all .3s linear;
    opacity: 0;
    transform: translateX(100%);
    
}
.songactive{
    transform: translate3d(0, 0,0);
    opacity: 1;
}
</style>
