//歌手单曲列表
<template>
    <div class="artis_wraper">
         <ul>
             <li class="artis_item" v-for="(song ,index) in singer.hotSongs" :key="index">
                     <div class="songimg">
                          <img :src="song.al.picUrl" alt="" width="100%" height="100%">
                     </div>
                     <div class="song_message">
                           <p>{{song.name}}</p>
                           <p><span>{{song.ar[0].name}}</span></p>
                     </div>
             </li>
         </ul>
    </div>
</template>
<script>
export default{
    name:'artists',
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
            
          }
    },
 created(){

 }
}
    
</script>
<style scoped lang='scss'>
.artis_wraper{
    padding: 0 10px 0px 10px;
}
.artis_item{
    display: flex;
    margin-top: 10px;
    .songimg{
        flex:0 0 70px;
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 3px;
        ;
    }
    .song_message{
        font-size: 14px;
        color: #666;
        line-height: 35px;
        margin-left: 30px;
        flex: 1;
    }
}
</style>
