<template>
  <div class="personcneter_wraper">
     <div class="header">
          <div class="peronhead">
               <div class="useravatart">
                <img :src="$store.state.userinfo.avatarUrl" width='100%' alt="">
               </div>
                <div class="usermessage">
                    <p>{{$store.state.userinfo.nickname}}</p>
                    <p><i></i></p>
                </div>
          </div>
          <div class="othermessage">
              <div class="mycollect">
                    <p>累计听歌{{listensng}}</p>
                    <i>  LV{{level}} </i>
              </div>
              <div class="othermessage1">
                 <p>创建于{{createday}}</p>
              </div>
          </div>
          <div class="backtoindex" @click="jumptoindex">
              <img :src="back" alt="" width="100%">
          </div>
    </div>
     <div class="personnavbar">
                <div>
                   <router-link to="/person/songlist"> 歌单</router-link>
                </div>
                <div>
                   <router-link to="/person/collect">  收藏</router-link>  
                </div>
                <div>
                   <router-link to="/person/aboutme">  关于我</router-link>  
                </div>
     </div>

     <div class="router-wraper">
         <div class="route-content">
             <router-view></router-view>
        </div> 
     </div> 
  
  </div>   
</template>
    
<script>
import back from  '../../../static/img/back.png'
import {settime} from '../../untils/untils.js'
export default {
  name: "personcenter",
  data(){
  return{
    back,
    level:0,
    listenSongs:0,
    createday:0,
  }
  },

 
  created() {
    this.getuser();
    if(this.$store.state.userdetail.level){
       this.level = this.$store.state.userdetail.level
      this.listensng = this.$store.state.userdetail.listenSongs
      this.createday = settime(this.$store.state.userdetail.createTime)
    }
  },
  methods:{
    //跳转到首页面
    jumptoindex(){
      this.$router.push('/recommend')
    },
      // 获取用户的所有信息
    getuser() {
      this.$axios.get("/api/user/subcount").then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang ='scss'>
.personnavbar {
  width: 100%;
  height: 46px;
  line-height: 46px;
  display: flex;
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  div {
    flex: 1;
    height: 46px;
    text-align: center;
     .router-link-active{
         color: rgb(64, 202, 145);
         font-size: 14px;
     }
     .othermessage{
       font-size: 12px;
     }
  }
}
.peronhead {
  height: 120px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.personcneter_wraper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1003;
  .header {
    padding: 10px;
    height: 200px;
    font-size: 0;
    position: relative;
    background: linear-gradient(red, rgb(151, 29, 90), rgb(45, 86, 163));
    .backtoindex{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;
      overflow: hidden;;
    }
    .othermessage{
      margin-top: 10px;
      color: #fff;
      display: flex;
      line-height: 24px;
      justify-content: space-between;
      .mycollect{
        font-size: 13px;
        i{
          display: inline-block;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          background-color: #fff;
          color: #333;
          box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
          width: 36px;
          text-align: center;
        }
      }
      .othermessage1{
        font-size: 12px;
     
      }

    }
  }
  .useravatart {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
    .img {
      width: 100%;
    }
  }
  .usermessage {
    display: inline-block;
    font-size: 15px;
    color: #f2f2f2;

    vertical-align: top;
    margin-left: 20px;
    padding: 20px;
  }
}
</style>
