// 播放音乐组件
<template>  
    <div class="playmusicwraper">
          <aplayer  
          autoplay
          v-if="ishow"
          :list='songs'
          :music="musics"
          repeat-all
          :play = 'playsic'
          list-max-height= '300px'
/>
<span>{{songlist}}</span>
    </div>
</template>
<script>
import Aplayer from 'vue-aplayer'
import Vue from 'vue'
export default {
    name:'playmusic',
    components:{
          Aplayer
    },
    data(){
        return{
        obj:{},
        songs:[
            this.$store.state.plaingsong
        ]

        }
    },
    methods:{
       playsic(eve){
           console.log(eve)
       }
    },
    created(){
        if(this.$store.state.musiclist[0]){
            this.songs = this.$store.state.musiclist
        }
    },
    computed:{
        musics(){
           if(this.$store.state.plaingsong){
                return this.$store.state.plaingsong
                this.ishow = true
            }else{
                this.ishow = false     
            }
        },
        ishow(){
            if(this.$store.state.plaingsong.title){
                return true
            }else{
                return false
            }
        },
       songlist(){
            let arr = []
            if(this.$store.state.songlist[0]){
           for(let i = 0;i< this.$store.state.songlist.length ;i ++){
               let obj = {}
            obj.id = this.$store.state.songlist[i].id
            obj.title = this.$store.state.songlist[i].name
            obj.artist = this.$store.state.songlist[i].ar[0].name
            obj.pic = this.$store.state.songlist[i].al.picUrl
            arr.push(obj)
           }
             let _this = this
             let j =0;
             //获取歌曲src
           function getsrc(){
            if(arr.length){
                  _this.$axios.get('/api/music/url',{id:arr[j].id}).then(res=>{
                Vue.set(arr[j],'src',res.data.data[0].url)
                 if(j < arr.length-1){
                     j++;
                     getsrc()
                 }else{
                     _this.songs = arr
                     _this.$store.commit('SETMUSICLIST',arr)
                     return 0
                 }
           })   
            }
           }
                getsrc()
            
            }
           
         
     
                    }


}
}
</script>
<style scoped lang = 'scss'>
    .playmusicwraper{
        position: relative;
    }
</style>