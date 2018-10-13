<template>
  <div id="app">
    <!-- 顶部导航栏如下 -->
   <div class="wraper">
      <div class="headertitle">
       <mu-appbar style="width: 100%;" color="#D44439" 
       >
          <mu-button icon slot="left" @click="changeshownav">
            <mu-icon value="mu"></mu-icon>
          </mu-button>
          DONGWEIMUSIC
          <mu-button flat slot="right" @click="jumptologin"
          v-if="!$store.state.userinfo.nickname"
          >LOGIN</mu-button>
          <div v-else class="personavatart" @click="changeheight">
              <img :src="$store.state.userinfo.avatarUrl" width="100%" alt="">
              <div class="imgmenu loginout-hook">
                    <div @click="jumptoperson">个人中心</div>
                    <div @click="logout">退出登录</div>
              </div>
          </div>
        </mu-appbar>
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
      <div class="nav_left_wraper" :class="shownavleft ? 'navactive' : ''">
          <navbarleft @changenav='changenav'></navbarleft>
      </div>
       <div class="mengcheng" v-if="shownavleft" @click="changeshownav"> 
            
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
    musicPlay:musicplay,
    navbarleft:()=>import('./components/navmenu/navmenu.vue')
  },
  data(){
    return {
      showplayer:false,
      shownavleft:false
    }
  },
  methods:{
    changeshownav(){
       this.shownavleft = !this.shownavleft;
    },
    jumptologin(){
      this.$router.push('/login')
    }
    ,
    changenav(val){
       console.log(val)
        this.shownavleft = val
    }
    ,
    changeheight(){
      let dd = document.querySelector('.loginout-hook')
      if(dd.style.height !='0px'){
        dd.style.height = '0px'
      }else
      dd.style.height = '100px'
    },
    jumptoperson(){
      this.$router.push('/person/songlist')
    },
    //退出登录
    logout(){
           this.$store.commit('SETUSERINFO',{})
       
    }
  }


}
</script>

<style lang='scss' scoped>/*  */
// 侧边导航栏样式
.nav_left_wraper{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80%;
  background-color: #fff;
  z-index: 1003;
  transform: translateX(-100%);
  transition: transform .4s linear;
}
.navactive{
  transform: translate3d(0,0,0)
}
.mengcheng{
   position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
  
  z-index: 1002;
}
 .personavatart{
   margin-top: 8px;
   height: 44px;
   width: 44px;
   float: right;
   border-radius: 50%;
   overflow: hidden;
   .imgmenu{
     right: 0px;
     top:48px;
     width: 70px;
     color: #333;
     background-color: #fff;
     position: absolute;
     font-size: 12px;
     text-align: center;
     border-radius: 5px;
     z-index:20;
     height: 0;
     overflow: hidden;
     transition: all .3s linear;
     div{
       height: 50px;
     }
     
   }
 }
  .headertitle{
    height: 46px;
    line-height: 46px;
    color: #fff;
    font-size: 15px;
   font-weight: 600;
    text-align: center;
    background-color: #D44439;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) ;
    .mu-appbar-title ,.mu-icon-button{
      font-size: 15px;
    }
    .mu-appbar{
      height: 46px;
        color: #fff;
    font-size: 15px;
   font-weight: 600;
    }
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
    z-index: 1000;
    background-color: #fff;
  }
</style>
