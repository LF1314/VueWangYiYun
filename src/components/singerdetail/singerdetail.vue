//歌手详情页面
<template>
    <div class="singer_detail_wraper">
        <div class="detail_content">
            <div class="header_nav">
            <span @click="jumptosinger">&lt;</span>
            <span>歌手</span>
                     
            </div>
             <div class="singer_imgwraper">
                             <img v-if="singermessage.artist" :src="singermessage.artist.picUrl" width="100%" alt=""> 
                             <div class="player_desc">
                                    <p v-if="singermessage.artist">{{singermessage.artist.name}}</p>
                             </div> 
             </div>
             <div class="navbar">
                 <div>
                    <router-link :to="{name:'artists'}"> 单曲</router-link>
                 </div>
                 <div>
                    <router-link :to="{name:'album'}"> 专辑</router-link>
                 </div>
                 <div>
                    <router-link :to="{name:'mvlist'}"> mv</router-link>
                 </div>
             </div>
             <div class="singer_desc_wraper singer_hook" >
                  <div class="singer_desc_content">
                       <router-view :singer ='singermessage' :id='singerid'></router-view>
                  </div>
             </div>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
    export default{
        name:'singerdetail',
        data(){
            return{
               singermessage:{},
               singerid:'',
            }
        },
        methods:{
            _bscoll(){
                const scroll = document.querySelector('.singer_hook')
                this.singscroll = new Bscroll(scroll,{
                    probType:3,
                    click:true
                })
            }
            ,
            jumptosinger(){
                this.$router.push('/singer')
            },
            //获取歌手单曲信息
            getmessage(){

                this.$axios.get(`/api/artists`,{id:this.singerid}).then(res=>{
                    this.singermessage = res.data
                    // console.log(this.singermessage)
                })
            }
        },
        created(){
          this.singerid = this.$route.params.id
            this.getmessage()
            this.$nextTick(()=>{
                this._bscoll()
            })
        }
    }
</script>

<style scoped lang = 'scss'>
.singer_detail_wraper{
    position: absolute;
    top: 0;
    bottom: 0;
    width : 100% ;
    background-color: #fff;
 .detail_content{
   
        .header_nav{
         height: 40px;
         line-height: 40px;
         color: #666;
         font-size: 18px;
         font-weight: 600;
         padding-left: 3px;
         background-color: #f2f3f2;
    } 
 .singer_imgwraper{
     position: relative;
     height: 304px;
     .player_desc{
         position: absolute;
         bottom: 120px;
         left: 0;
         width: 100%;
        
         font-size: 20px;
         color: #666;
         font-weight: 600;
     }
 }
    .navbar{
        display: flex;
        height: 46px;
        width: 100%;
        line-height: 46px;
        position: relative;
        top: -100px;
        background-color: #f2f2f2;
        div {
            flex: 1;
            text-align: center;
            a{
                text-decoration: none;
                font-size: 15px;
                color: #666;
            }
       
            .router-link-active{
                font-size: 18px;
                color:rgb(158, 97, 167)
            }
        }
    }
    .singer_desc_wraper{
        position: absolute;
        bottom: 0;
        left: 0;
        top: 289px;
        width: 100%;
        background-color: #fff;
        overflow: hidden;

    }
 }

}
</style>

































