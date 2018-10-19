// 个人听歌中心

<template>
    <div class="person_listen_wraper" :class="show ? 'active' : 'now'">
         
           <div class="bgdiv">
              <img v-if="playingsong.al" :src="playingsong.al.picUrl" width="100%" height="99%" alt="">
           </div>
          <div class="listen_inner">
              <div class="listen_header" >
                       <img  src="./backcc.png" alt="" @click="jumptoperson"> 
              </div>
          </div>
          <div class="playingsongmessage">
                <p>
                    {{playingsong.name}}
                </p>
                <p>
                    {{playingsong.ar[0].name}}
                </p>
          </div>
          <div class="plaingsongimg" id="antionimg">
               <div class="plainginner">
                    <img :src="playingsong.al.picUrl" width="100%" alt="">
               </div>
          </div>
               <!-- 播放音乐组件 -->
          <div class="playmusic_component">
               <personmusic :firstid='fistid' :songindex='songindex' @changsong='changsong'></personmusic> 
          </div>
    </div>
</template>
<script>
import personmusic from '../musiccomponents/playmusic'
export default
{
    name:'mysong',
    components:{
    personmusic
    },
    data(){
        return{
            songindex:0,
            fistid:'',
            show:true,
            playingsong:{}
        }
    },
    methods:{

        //改变当前音乐的播放背景
        changsong(val){
             this.playingsong =   this.$store.state.personmusiclist.tracks[val]  
        },
        //调整到个人中心
        jumptoperson(){
            this.show =false
           setTimeout(()=>{
                this.$router.push('/person/songlist')
           },500)
        }

    },
    created(){
        this.show = true
        this.fistid = this.$route.params.id
        console.log(this.fistid)
        this.$store.state.personmusiclist.tracks.forEach((currentItem,index) => {
            if(this.fistid == currentItem.id){
                this.bgimgurl = currentItem.al.picUrl
                this.playingsong = currentItem
                this.songindex = index
            }
        });
    }
}
    
</script>

<style scoped lang = 'scss'>

#antionimg{
  animation: animation1 20s infinite linear;
}
@keyframes animation1{
   from{
       transform: rotateZ(0)
   }
   to{
       transform: rotateZ(360deg)
   }
}

.now{
transform: translateY(100%);
}
.active{
    transform: translate3d(0,0,0)
}
.person_listen_wraper{
    position: absolute;
    top:0;
    bottom: 0;
    width: 100%;
    background: inherit;
    transition: all .5s linear;
    .bgdiv{
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          background-color: rgb(205, 216, 226);
          z-index: -1;
         img{
           filter: blur(11px)
         }
    }
    .listen_header{
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        font-size: 17px;
        color: red;
        span{
            display: inline-block;
            margin-left:32%;
         }

        img{
            vertical-align: middle;
        }
    }
    .playingsongmessage{
        margin-top: 20px;
        font-size: 20px;
        height: 60px;
        line-height: 30px;
        color: rgb(229, 233, 29);
        p{
            text-align: center;
         
        }
        
    }
    .plaingsongimg{
        box-sizing: border-box;
        background-color: #999393;
        height: 280px;
        width: 280px;
        padding: 20px;
        border-radius: 50%;
        margin: 50px auto;
        
        .plainginner{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        overflow: hidden;
        }
        
    }
    .playmusic_component{
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
}
}

</style>
