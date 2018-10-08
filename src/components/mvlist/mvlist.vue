//获取歌手mv
<template>
    <div class="mv_wraper">
       <ul class="mvlist_wraper" v-if="ishow">
           <li class="mv-item" v-for="(mv,index) in mvs" :key="index" @click="jumptomv(mv.id)">
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
</template>
<script>
export default {
    name:'mvlist',
      props:{
        singer:{
            type:Object
        },
        id:{
            type:String
        }
    },
 
    data(){
          return{
           mvs:[],
           ishow:false
          }
    },
    methods:{
        //获取歌手mv
      getmvlist(){
            this.$axios.get('/api/artist/mv',{id:this.id,limit:100}).then(res=>{
                console.log(res.data)
                this.mvs = res.data.mvs
                this.$store.commit('SETMVLIST',this.mvs)
                this.ishow =true
            })
      }
      //进入mv播放页面
      ,
      jumptomv(id){
        this.$router.push(`/playmv/${id}`)
      }
    },
       created(){
        this.getmvlist()
    }
}
</script>

<style scoped lang = 'scss'>
.mvlist_wraper{
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

.one{
      overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
}

</style>


