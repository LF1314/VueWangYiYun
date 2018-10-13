//自己封装播放音乐的组件

<template>
    <div class="music_wraper">
         <div class="music_inner">
             <audio id="myselfaudio"
             :src="musiclist[0]" 
              autoplay
              @ended="overPlay"
             ></audio>
              <div class="music_statue">
                 <img src="./auto.png" alt="">
              </div>
              <div class="music_left" @click="playBefore">
                  <img src="./right11.png" alt="">
              </div>
              <div class="music_stop" v-if="autioplayshow" @click="playAudio">
                  <img src="./stop.png" alt="">
              </div>
              <div v-else @click="pauseAudio">
                     <img src="./start.png" alt="">
              </div>
              <div class="music_right" @click="playNext">
                  <img src="./left11.png" alt="">
              </div>
              <div class="music_list" @click="changesonglsit">
                  <img src="./listt.png" alt="">
              </div>

         </div>
         <div class="songlist_wraper" :class="showsonglist ? 'songlist_action' : 'now'">
              <div class="songlsit_inner">
                    <div class="headermenu_list">
                          <div class="delsongss">
                               <img src="./delsong.png" alt="">
                               <span>清空歌单</span>
                          </div>
                          <div class="close" @click="changesonglsit">
                               <img src="./close.png" alt="">   
                          </div>
                    </div>
                    <div class="songs_list">
                        <ul>
                            <li class="song_list_item" v-for="(song, index) in songlist" :key="index">
                                <div class="indexx">
                                    <span>{{index + 1}}</span>
                                </div>
                                <div class="song_namess">
                                     <span>{{song.name}}</span>
                                </div>
                                <div class="singer-name">
                                     <span>{{song.ar[0].name}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
              </div>
         </div>
    </div>
</template>
<script>

export default{
    name:'playmusic',
    //props接收用户传过来的音乐列表
    props:{
        firstid:{
            type:String
        },
        songindex:{
            type:Number
        }
    },
    data(){
        //初始化音乐列表
        return{    
            firsturl:'', 
            autioplayshow:false,
            songlist:[],
            musiclist:[],
            songindexs:0,
            showsonglist:false
        }
    },

    // 设置音乐播发的相关方法
    methods:{
          //播放音乐
          playAudio(){
               this.autioplayshow = false;
               let audio = document.getElementById('myselfaudio');
               audio.play()
          },
          //暂停音乐
           pauseAudio(){
                this.autioplayshow = true
                let audio = document.getElementById('myselfaudio')
                console.log(audio.src)
                audio.pause()
           },
           //当前音乐播放结束后
           overPlay(){
               let audio = document.getElementById('myselfaudio')
               if(this.songindexs < this.songlist.length-1)
               {
                   this.songindexs +=1;
               }else{
                   this.songindexs = 0
               }
                this.$emit('changsong',this.songindexs)
               let songid = this.songlist[this.songindexs].id
                 this.$axios.get('/api/music/url',{id:songid}).then(res=>{
                 console.log(res.data.data[0].url)
                
                 audio.src = res.data.data[0].url       
             })
           },
           //播放上首歌曲
           playBefore(){
                let audio = document.getElementById('myselfaudio')
                if(this.songindexs ==0){
                    
                   this.songindexs = this.songlist.length-1
                    this.$emit('changsong',this.songindexs)
                   let songid = this.songlist[this.songindexs].id
                     this.$axios.get('/api/music/url',{id:songid}).then(res=>{
                    // console.log(res.data.data[0].url)
                     audio.src = res.data.data[0].url       
                  })
                }else{
                     this.songindexs -=1
                      this.$emit('changsong',this.songindexs)
                     let songid = this.songlist[this.songindexs].id
                     this.$axios.get('/api/music/url',{id:songid}).then(res=>{
                    // console.log(res.data.data[0].url)
                     audio.src = res.data.data[0].url       
                  })
                }
           },
           //播放下首music
           playNext(){

                 let audio = document.getElementById('myselfaudio')
                if(this.songindexs == this.songlist.length-1){
                     this.songindexs = 0; 
                      this.$emit('changsong',this.songindexs)
                     let songid = this.songlist[this.songindexs].id
                     this.$axios.get('/api/music/url',{id:songid}).then(res=>{
                    // console.log(res.data.data[0].url)
                     audio.src = res.data.data[0].url       
                  })
                  
                }else{
                         this.songindexs +=1
                          this.$emit('changsong',this.songindexs)
                         let songid = this.songlist[this.songindexs].id
                         this.$axios.get('/api/music/url',{id:songid}).then(res=>{
                        //  console.log(res.data.data[0].url)
                         audio.src = res.data.data[0].url       
                      })
                }
           },
           //改变是否显示songlist
           changesonglsit(){
             this.showsonglist = !this.showsonglist
           }
           
           
    
    }
    //从store取回歌单
    ,
    created(){
        this.songlist = this.$store.state.personmusiclist.tracks
        this.songindexs = this.songindex
        // console.log(this.songlist)
          this.$axios.get('/api/music/url',{id:this.firstid}).then(res=>{
                // console.log(res.data.data[0].url)
             this.musiclist.unshift(res.data.data[0].url) 
             
             })
    }
}
    
</script>

<style scoped lang= 'scss'>

.music_wraper{
    position: relative;
    margin-top: 30px;
    height: 70px;
    line-height: 70px;
    box-shadow: 0 -4px 5px rgba($color: #000000, $alpha: .3)
}
.music_inner{
    display: flex;
    div {
        flex: 1;
        text-align: center;
        img{
            vertical-align: middle;
        }
    }
}
#myselfaudio{
    display: block;
}
.songlist_wraper{
    /* height: 300px; */
    width:100%;
    position: absolute;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 80px;
    overflow: hidden;
    transition: all .3s linear;
    .songlsit_inner{
         .headermenu_list{
           height: 36px;
           line-height: 36px;
           display: flex;
           box-shadow: 0 2px 2px rgba($color: #000000, $alpha: .1);
           .delsongss , .close{
               flex: 1;
               font-size: 12px;
               img{
                 vertical-align: top;        
               }
               span{
                   display: inline-block;
                   color: #999;
                  
               }
           }
           .delsongss{
               text-align: left;
              
           }
           .close{
               text-align: right;
             
              
           }
         }
    }
}
.now{
     height: 0px;
}
.songlist_action{
    height: 400px;
}
.song_list_item{
    height: 50px;
    width: 100%;
    display:flex;
    .indexx{
        flex: 0 0 50px;
    }
    .song_namess{
        flex: 1;
    }
    .singer-name{
        flex: 1;
    }

    div{
        text-align: center;
        height: 50px;
        line-height: 50px;
        overflow: hidden; 
  
    }
}
</style>
