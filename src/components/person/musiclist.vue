//私人音乐列表页面
<template>
    <div class="person_music_list">
          <div v-if="newlist.id">
                 <div>
                    <div class="listimg">
                        <img :src="newlist.coverImgUrl" width="100%" alt="">
                    </div>
                    <div class="musiclistcontnt">
                           <ul>
                               <li class="list_item" v-for="(song,index) in newlist.tracks" :key="index">
                                    <div class="listcontent" @click="jumptoplaymysong(song.id)">
                                        <div class="list_item_img">
                                            <img :src="song.al.picUrl" height="100%" alt="">     
                                        </div>
                                        <div class="song_other_messsage">
                                            <p>
                                                {{song.al.name}}
                                            </p>
                                            <p>
                                                {{song.name}}
                                            </p>
        
                                        </div>
                                    </div>
                                    <div v-if="song.mv" class="lookingmv">
                                           <mu-button flat color="secondary">MV</mu-button>
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
        name:'personlist',
        props:{
            playlist:{
               type:Object
            }
        },

        computed:{
            newlist(){
                return this.playlist;
            }
        },
        methods:{
            jumptoplaymysong(id){
                this.$router.push(`/person/songlist/${id}`)
                this.$emit('changpersonlist',false)
            }
        }
    }
</script>

<style scoped lang='scss'>

.musiclistcontnt{
    position: relative;
    top: -150px;
    background-color: #fff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    .list_item{
        margin-top: 10px;
        height: 70px;
        padding-top: 10px;
        padding-bottom: 10px;
      
        display: flex;
        padding-left: 20px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: .2);
        .listcontent{
            flex: 0 0 260px;
            display: flex;
        }
        .list_item_img{
            height: 50px;
            flex: 0 0 50px;
            overflow: hidden;
            border-radius: 4px;
            vertical-align: top;
        }
        .song_other_messsage{
           flex: 0 0 200px;
           margin-left: 10px;
           p{
               font-size: 12px;
               color: #666;
               overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                line-height: 25px;    
                max-height: 25px;
                -webkit-line-clamp: 1;
           }

        }
        .lookingmv{
            flex: 1;
        }

    }
}
</style>



















