// 播放音乐组件
<template>  
    <div class="playmusicwraper">
       播放音乐组件
    </div>
</template>
<script>
import player from 'vue-aplayer'
export default {
    props:{
         musiclist:[],
         songlist:[]
    },
    name:'playmusic',
    components:{
        player
    },
    data(){
        return{

        }
    }
}
</script>
<style scoped lang = 'scss'>
    
</style>