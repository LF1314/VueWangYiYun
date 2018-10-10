//侧边导航栏
<template>
    <div class="navbar-wraper" >
        <div class="nav-header">
             <div class="person" v-if="$store.state.userinfo.avatarUrl">
                 <div class="personimg">
                       <img :src="$store.state.userinfo.avatarUrl" width="100%" alt="">
                 </div>
                 <div class="personmessage">
                    <span>{{$store.state.userinfo.nickname}}</span>
                    <i class="dengji">LV{{leav}}</i>
                    <span class="listensong">累计听歌<strong>{{listensng}}</strong>首</span>
                 </div>
             </div>

             <div  class="notlogin" v-else>
                  <div class="touxing">

                  </div>
                  <div>
                       <span class="tixing">嗨！你还没登陆呢</span>
                       <mu-button color="secondary" @click="JUMPTLOAGON">点击登陆</mu-button>
                  </div>
             </div>

        </div>
    </div>
</template>
<script>
export default
{
    name:'navbarleft',
   
    data(){
       return{
           leav:0,
           listensng:0
       }
    },
    methods:{
        // 获取详细信息
        getuserdetail(){
            let uid = this.$store.state.userinfo.userId
            this.$axios.get('/api/user/detail',{uid}).then(res=>{
                console.log(res)
                this.leav = res.data.level
                this.listensng = res.data.listenSongs
            })
        },
        JUMPTLOAGON(){
            this.$emit('changenav',false)
            this.$router.push('/login')
            
        }
    },
    created(){
        if(this.$store.state.userinfo.avatarUrl){
         this.getuserdetail()
        }
       
    }
}
    
</script>

<style scoped lang = 'scss'>
.navbar-wraper{
  width: 100%;
 .nav-header{
     width: 100%;
     background-color: rgba(0, 0, 0, .8);
     height: 130px;
     padding: 10px;
     .person{
         display: inline-block;
         text-align: center;
         height: 100%;
         .personimg{
             height: 70px;
             width: 70px;
             background-color: #f2f2f2;
             border-radius: 50%;
             overflow: hidden;
             ;
         }
         .personmessage{
             margin-top: 10px;
             font-size: 18px;
             color: #f1f1f1;
             .dengji{
                display: inline-block;
                padding: 4px;
                border: 1px solid #666;
                border-radius: 4px;
                font-size: 12px;
                margin-left: 10px;
                margin-right: 10px;
             }
             .listensong{
                 font-size: 11px;
             }

         }
     }
     .notlogin{
         height: 100%;
         color: #fff;
         font-size: 15px;
         line-height: 30px;
         .touxing{
             height: 70px;
             width: 70px;
             border-radius: 50%;
             background-color: #f2f2f2;
         }
         .tixing{
             display: inline-block;
             margin-right: 10px;
         }
         
     }
     

 }
}
</style>
