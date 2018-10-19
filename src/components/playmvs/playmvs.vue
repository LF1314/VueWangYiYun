<template>
<div class="playmvs_wraper">
     <div class="header_nav">
         <span @click="backto">&lt;</span>
         <span>歌手</span>
     </div>
     <!-- 用来挂载视屏播放器 -->
    <div id="player"></div>
    <div class="singermessage">
        <div class="avatarimg">
            <img :src="videomessage.cover" alt="" width="100%" height="100%">
        </div>  
        <div class="avatarmessage">
            <p class="one">{{videomessage.artistName}}</p>
            <p class="one">{{videomessage.briefDesc}}</p>
            <p class="one">{{videomessage.desc}}</p>
        </div>
    </div>
     <div class="mv_wraper mv_hook">
       <ul class="mvlist_wraper" >
           <li class="mv-item" v-for="(mv,index) in mvs" :key="index" @click="changemv(mv.id)">
               <div>
                   <div class="mvimg">
                          <img :src="mv.imgurl" alt="" width="100%">
                   </div>
                   <div class="mv_message">
                          <p class="one">{{mv.name}}</p>
                          <p class="one">{{mv.artistName}}</p>
                          <p>{{mv.publishTime}}</p>
                   </div>
               </div>
           </li>
       </ul>
    </div>
</div>
    
</template>
<script>
import Bscroll from 'better-scroll'
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';
    export default{
        name:'playmvs',
        data(){
            return{
             videomessage:{},
             mvs:[]
            }
        },
        methods:{
            backto(){
              this.$router.push('/singer')
            },
            _scroll(){
                  const mvsc = document.querySelector('.mv_hook') 
                  this.mvscroll = new Bscroll(mvsc,{
                      probeType:3,
                      click :true
                  })
            },
            //实例化一个视屏播放器
            addmvplayer(video){
                this.db = new DPlayer({
                       container: document.getElementById('player'),
                        autoplay: true,
                        theme: '#b7daff',
                        loop: true,
                        lang: 'zh-cn',
                        screenshot: true,
                        hotkey: true,
                        preload: 'auto',
                        volume: 0.7,
                        mutex: true,
                        video
                })
            },
            //获取mv播放链接
            getmv(id){
                let video = {}
                   this.$axios.get(`/api/mv`,{mvid:id}).then(res=>{
                       this.videomessage = res.data.data
                    //    console.log(res.data.data)
                       video.url= this.videomessage.brs[1080]
                       video.pic = this.videomessage.cover
                       video.type = 'auto'
                      this.addmvplayer(video)
                    
                   }) 
            }
            ,
            //更换mv
            changemv(id){
                 let video = {}
                   this.$axios.get(`/api/mv`,{mvid:id}).then(res=>{
                       this.videomessage = res.data.data
                    //    console.log(res.data.data)
                       video.url= this.videomessage.brs[1080]
                       video.pic = this.videomessage.cover
                       video.type = 'auto'
                       this.db.switchVideo(video)
                       this.db.play()
                 
                   }) 
            }
        },
        created(){
            this.$nextTick(()=>{
                this._scroll()
            })
            let id = this.$route.params.id
            this.getmv(id)
            if(this.$store.state.mvlist[0]){
                this.mvs = this.$store.state.mvlist
                // console.log(this.mvs)
            }
            
        },
        beforeDestroy(){
            this.db.destroy()
        }
    }

</script>

<style scoped lang = 'scss'>
.header_nav{
    height: 40px;
    line-height: 40px;
    color: #222;
    background-color: #f2f2f2;
    font-weight: 500;
     font-size: 17px;
     span{
         display: inline-block;
         margin-left: 10px;
     }
    
}

.playmvs_wraper{
    background-color: #fff;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index:1004;

}
.singermessage{
    margin-top: 20px;
    display: flex;
    .avatarimg{
        flex: 0 0 100px;
        height: 70px;
        overflow: hidden;
        border-radius: 4px;

    }
  .avatarmessage{
       margin-left: 20px;
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        p{
            width: 100%;
            line-height: 20px;
        }
    }
}
.one{
     overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
}
#player{
    width: 100%;

}
.mv_wraper{
  position: absolute;
    top: 360px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;;
}
.mvlist_wraper{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  
    .mv-item{
        width: 30%;
          margin-bottom: 20px;
          .mvimg{
              border-radius: 5px;
              overflow: hidden;
          }
    }
}

</style>
