<template>
  <div id="app">
    <!-- 顶部导航栏如下 -->
   <div class="wraper">
      <div class="headertitle">
          <h3>DONGWEIMUSIC</h3>  
    </div>
    <div class="tarbar">
      <div class="tuijian">
       <router-link to="/recommend">  推荐</router-link>
      </div>
      <div class="tuijian">
        <router-link to="/rank"> 排行</router-link>
      </div>
      <div class="tuijian">
        <router-link to="/singer"> 歌手</router-link>
      </div>
    </div>
   </div>
    <router-view/>
    <div class="musicplay">
         <div>
              
         </div>
         <music-play></music-play>
    </div>
  </div>
</template>

<script>
import musicplay from './components/playmusic/playmusic'
export default {
  name: 'App',
  components:{
    musicPlay:musicplay
  },
  data(){
    return {
      showplayer:false
    }
  }


}
</script>

<style lang='scss' scoped>/*  */

  .headertitle{
    height: 46px;
    line-height: 46px;
    color: #fff;
    font-size: 15px;
   font-weight: 600;
    text-align: center;
    background-color: #D44439;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) 
  }
  .tarbar{
   display: flex;
   height: 164px;
   line-height: 44px;
   background-color: #D44439;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
   div{
     flex:1;
     text-align: center;
     color: #fff;
   }
    a{
      text-decoration: none;
    }
   .router-link-active
   {
       display: inline-block;
       padding-bottom: 2px;
       font-size: 17px;
       font-weight: 500;
       color: #FFE680;
       text-decoration: 2px solid #fff;
   }
  }
  //音乐播放组件
  .musicplay{
    position: fixed;
    
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 990;
    background-color: #fff;
  }
</style>
