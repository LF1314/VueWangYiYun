//音乐列表页面
<template>
  <div>
             <!-- 头部导航栏 -->
              <div class="headertitle" :class="msg > 262 ? 'todo' : ''">
                  <p>
                      <span class="icon" @click="gobackpath">&lt;</span>
                      <span>{{msg >262 ? musiclist.playlist.name : meta}}</span> 
                  </p>
              </div>
        <div class="musicwraper wraper-music-hook"   >
         <div class="content" >
          <div v-if="showimg">
          
              <!-- 头部图片 -->
              <div class="headrimg">
                  <div class="imgss" >
                      <img   :src="musiclist.playlist.coverImgUrl" alt="" width="100%" height="100%">
                  </div>
                  <div class="message">
                      <h2>{{musiclist.playlist.name}}</h2>
                      <p><span>收听<span>{{Math.round(musiclist.playlist.playCount/10000)}}万</span></span></p>
                  </div>
              </div>
              <!-- 歌曲列表 -->
               <div class="musiclistwraper">
                    <div class="musicontent">
                        <div class="musicheader">
                            <span class="playicon"></span>
                            <span>播放全部</span>
                            <span>(共{{musiclist.playlist.tracks.length}}首)</span>
                        </div>
                       <ul>
                           <li class="musicitem" v-for="(song,index) in musiclist.playlist.tracks" :key="index" @click="jumplay(song)">
                               <div class="musicindex">
                                   {{index+1}}
                               </div>
                               <div class="itemmessage">
                                 <p class="songname">{{song.name}} </p>
                                 <p class="songavatar"><span v-for="(ava ,index) in song.ar" :key="index">
                                     {{ava.name}}</span></p>
                               </div>
                           </li>
                       </ul>
                    </div>
               </div>
          </div>
         </div>
    </div>
  </div>
</template>
<script>
 import BScroll from 'better-scroll'
 import Vue from 'vue'
export default {
    name:'musiclist',
    data(){
        return{
            historypath:'',
            showimg:false,
            meta:'',
            musicid:'',
            musiclist:{},
            name:'',
            a:''
       
        }
    },
    computed:{
        msg(){
            this.$nextTick(()=>{
                 this.wrapercoll.on('scroll',(pbs)=>{
                  this.a  = Math.abs(Math.round(pbs.y))    
             })
            })
              return this.a    
        }
    },
      created(){
        this.musicid = this.$route.params.id
        this.name = this.$route.name
        this.historypath = this.$route.matched[0].path
        this.meta = this.$route.meta
        this.getidfmessage()
        // console.log(this.$route)
        this.$nextTick(()=>{
            this._scrollcon()
        })
        
    },
    methods:{
        //播放音乐
        jumplay(song){
            this.$store.commit('SETMUSICLIST',[])
            this.$store.commit('SETSONG',{})
            let obj = {}
            obj.id = song.id
            obj.title = song.name
            obj.artist = song.ar[0].name
            obj.pic = song.al.picUrl
           this.$axios.get('/api/music/url',{id:song.id}).then(res=>{
               obj.src = res.data.data[0].url
            //    console.log(obj)
               this.$store.commit('SETSONG',obj)
            
           })
        },
        //返回上一级路由
        gobackpath(){
            this.$router.push(this.historypath)
        },
         _scrollcon(){
            const musicwraper = document.querySelector('.wraper-music-hook')
            this.wrapercoll = new BScroll(musicwraper,{
                probeType:3,
                 click:true,
            })
       },
        //获取歌单详细信息
        getmucislist(){
             this.$store.commit('SETSONGLIST',[])
            this.$axios.get(`/api/playlist/detail`,{id:this.musicid}).then(res=>{
                console.log(res.data)
                this.musiclist = res.data
                this.$store.commit('SETSONGLIST',res.data.playlist.tracks )
                this.showimg = true
               
            })
        },
        //获取单个排行所有信息
        getrankdetail(){
          this.$store.commit('SETSONGLIST',[])
      this.$store.state.ranklist.forEach(el=>{
          if(el.playlist.id == this.musicid){
              this.musiclist = el
               this.$store.commit('SETSONGLIST',el.playlist.tracks )
               this.showimg = true
          }
      })
         console.log(this.musiclist,this.musicid)
        },
     getidfmessage(){
            switch(this.name){
                case 'musiclist':
                this.getmucislist();
                break;
                case 'ranklist':
                this.getrankdetail();
                break;
                default:
                break;
            }
        }
        },
        //获取不同信息
    
    }
  


</script>
<style scoped lang = 'scss'>
   .headertitle{
           z-index: 888;
           height: 40px;
           line-height: 40px;
           font-size: 16px;
           font-weight: 600;
           padding-left: 8px;
           color: #dde7dd;
           position: absolute;
           top: 0;
           left: 0;
           background-color:rgba(0, 0, 0,0) ;;
           width: 100%;
           transition: all .4s linear;
           p {
               span{
                   display: inline-block;
                   margin-right: 5px;
               }
           }

       }
       .todo{
           background-color: rgba(212, 68, 57,.9);
           font-weight: normal;
       }
    .musicwraper{
       position: absolute;
       top: 0;
       bottom: 0;
       width: 100%;
       overflow: hidden;
     
    
       .headrimg{
           height: 350px;
           z-index:777;
         position: relative;
         .message{
             position: absolute;
             bottom: 30%;
             left: 20PX;
             color: #FFF;
             P{
                 font-size: 14PX;
                 margin-top: 5px;
             }

         }
       }
       .musiclistwraper{
           
           margin-top: -90px;
           background-color: #f1f1f1;
           border-top-left-radius: 10px;
           border-top-right-radius: 10px;
           width: 100%;
         
           z-index: 800;
           position: relative;
           padding-top: 10px;
           /* 单个音乐信息 */
           .musicheader{
               height: 40px;
               line-height: 40px;
                 border-bottom: 1px solid rgba(0,0,0,.2);
           }
           .musicitem{
               margin-top: 10px;
               border-bottom: 1px solid rgba(0,0,0,.2);
               display: flex;
               height: 56px;
               .musicindex{
                   height: 100%;
                   line-height: 56px;
                   text-align: center;
                   flex: 0 0 56px;
                   width: 56px;
               }
               .itemmessage{
                  height: 100%;
                  line-height: 28px;
                  .songname{
                    font-size: 16px;
                    color: #333;
                  }
                  .songavatar{
                      font-size: 12px;
                      color: #666;
                  }
               }
           }
       }

    }
</style>