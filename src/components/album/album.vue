
<template>
    <div class="album_wraper">
         <ul v-if="ishow" class="listwraper">
             <li class="album_item" v-for="(album,index) in hotAlbums" :key="index">
                 <div class="Item_inner">
                       <div class="albumimg">
                            <img :src="album.picUrl" alt="" width="100%" height="100%">
                       </div>
                       <div class="albummesage">
                             <p class="compony">{{album.name}}</p>
                             <p class="compony">{{album.company}}</p>
                          
                       </div>
                 </div>
             </li>
         </ul>
    </div>
</template>

<script>
export default {
  name:'album',
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
             hotAlbums:[],
             ishow:false
          }
    },
    methods:{
        //获取专辑列表
        getalbums(){
            this.$axios.get(`/api/artist/album`,{id:this.id}).then(res=>{
                // console.log(res.data.hotAlbums)
                this.hotAlbums = res.data.hotAlbums
                this.ishow = true
            })
        }
    },
    created(){
        this.getalbums()
    }
  
}
</script>

<style scoped lang = 'scss'>
.listwraper{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.album_item{
 
    width: 30%;
    .Item_inner{
        font-size: 13px;
        text-align: center;
        margin-bottom: 20px;
    }
    .compony{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
