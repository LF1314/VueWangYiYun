<template>
     <div class="myperlist_wraper">
         <div class="inner" v-if="ishow">
             <ul>
                 <li class="peritem" v-for="(play ,index) in playlist" :key="index" @click="chaangeplaylist(play.id)">
                     <div class="listimg">
                        <img :src="play.coverImgUrl"  width="100%" alt="">
                     </div>
                     <div class="playmessage">
                          <p class="name">
                             {{play.name}}
                          </p>
                          <p class="playcount">
                              <span>共{{play.trackCount}}首</span>  <span> 播放次数{{play.playCount}}</span>
                          </p>
                          <p class="nickname">
                             {{play.creator.nickname}}
                          </p>
                     </div>
                 </li>
             </ul>

         </div>
         <div>
           <router-view></router-view>
         </div>
         <div class="musiclistplaymusic now" :class="showplaylist ? 'active' : ''">
              <div class="content_playlist">
                  <div>
                      <personlist :playlist='musicplaylist' @changpersonlist='changpersonlist'> </personlist>
                  </div>   
              </div>
               <div class="closeplaylist">
                        <img :src="close" alt="" @click="changeshowplay">
               </div>
         </div>
     </div>
</template>
<script>
import Bscroll from 'better-scroll'
import close from '../../../static/img/close.png'
export default {
  name: "perlist",
  data() {
    return {
      close,
      playlist: [],
      musicplaylist:{},
      ishow: false,
      showplaylist:false
    };
  },
  components: {
    personlist: () => import("./musiclist.vue")
  },
  methods: {
    //接收子元素传的参
    changpersonlist(val){
      // console.log(val)
      this.showplaylist = val
    },
     //个人音乐播放列表滚动区域
     _palyscroll(){
        let playwraper = document.querySelector('.content_playlist')
        const scroll = new Bscroll(playwraper,{
          probetype:3,
          click:true
        })
     },
      chaangeplaylist(id){
         this.$axios.get(`/api/playlist/detail`,{id}).then(res=>{
             console.log(res)
             this.musicplaylist = res.data.playlist
             this.$store.commit('SETPERSONMUSICLIST',res.data.playlist)
             this.showplaylist = true
         })
         
      },
    getuserplaylist() {
      let uid = this.$store.state.userinfo.userId;
      this.$axios.get("/api/user/playlist", { uid }).then(res => {
        console.log(res);
        this.playlist = res.data.playlist;
         
        this.ishow = true;
      });
    },
    changeshowplay(){
        this.showplaylist = !this.showplaylist;
    }
  },
  created() {
    this.getuserplaylist();
    this.$nextTick(()=>{
      this._palyscroll()
    })
  }
};
</script>


<style scoped lang='scss'>
  .now{
      transform: translateY(-100%);
  }
  .active{
  transform: translate3d(0,0,0);
  }
.musiclistplaymusic {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all .3s linear;
  background-color: #fff;
  padding-bottom: 44px;
  .content_playlist{
  position: absolute;
  top: 0;
  bottom:0;
  left: 0;
  right: 0;
  overflow: hidden;
  }
  .closeplaylist{
      height: 44px;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background-color: #fff;
      text-align: center;
      box-shadow: 0 -4px 4px rgba(0, 0, 0, .3);
     
      img{
         margin-top: 4px;
      }
  }

 
}
.peritem {
  display: flex;
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  padding-left: 10px;
  box-shadow: 0 4px 4px rgba($color: #000000, $alpha: 0.1);
  .listimg {
    flex: 0 0 70px;
    height: 70px;
    width: 70px;
    border-radius: 3px;
    overflow: hidden;
  }
  .playmessage {
    flex: 1;
    margin-left: 10px;
    .name {
      font-size: 15px;
      color: #222;
    }
    .playcount {
      font-size: 14px;
      color: #333;
    }
    .nickname {
      font-size: 12px;
      color: #666;
    }
    p {
      line-height: 23px;
    }
  }
}
</style>
