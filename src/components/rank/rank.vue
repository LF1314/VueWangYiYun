
<template>
   <div class="rankwraper wraper-hook">
          <div class="content">
                   <ul v-if='showrank'>
                       <li class="rankitem" v-for="(rank,index) in ranklist" :key= 'index' @click="rankdetail(rank.playlist.id)">
                            <div class="rankicon">
                                <img :src="rank.playlist.coverImgUrl" alt="" width="100%">
                            </div>
                            <div class="ranksongs">
                                  <ul>
                                      <li v-if="rank.playlist.tracks" v-for="(ranksing , index ) in rank.playlist.tracks.slice(0,3)" :key='index'>
                                          <p>
                                              <span>{{index+1}}.</span>
                                              <span>{{ranksing.name}}</span>
                                              <span>-</span>
                                              <span>{{ranksing.ar[0].name}}</span>
                                          </p>
                                      </li>
                                  </ul>
                            </div>
                       </li>
                   </ul>
          </div>
        <div class="musiclist" :class="showmuscilist ? 'songactive' : ''">
                <router-view></router-view>
      </div>
   </div>
</template>
<script>
   import BScroll from 'better-scroll'
    export default{
        name:'rank',
        data(){
            return{
                showrank:false,
                ranklist:[],
          
                showmuscilist:false
            }
        }
        ,
        methods:{
              _scrollcon(){
            const rankwraper = document.querySelector('.wraper-hook')
              this.wrapercoll = new BScroll(rankwraper,{
                probeType:3,
                 click:true,
            })
       },
            //获取所有的排行列表
            getranklist(){
                let i =0
                let arr = []
                
                let _this = this
               function getallrank(){
                     _this.$axios.get(`/api/top/list?idx=${i}`).then(res=>{
                         arr.push(res.data)
                         _this.ranklist = arr
                         _this.showrank = true
                         if(i < 23){
                             i++
                             getallrank()
                         }
                         else{
                            //  console.log(_this.ranklist) 
                            _this.$store.commit('SETRANKLIST',_this.ranklist)
                             return false
                          
                         }
                     })
               }
               getallrank()
            },
            //跳转到播放排行详情页面
            rankdetail(id){
               this.$router.push(`/rank/${id}`)
               this.showmuscilist= true
            }
        },
        watch:{
           $route(val){
               console.log(val)
                if(val.name == 'rank'){
                    this.showmuscilist = false
                }else{
                    this.showmuscilist = true
                }
           }
        },
        created(){
              if(this.$route.params.id){
          this.showmuscilist = true
      }
            if(this.$store.state.ranklist[0].playlist.id)
            {
       
                this.ranklist = this.$store.state.ranklist
                this.showrank = true
            }else{
                 this.showrank = false
                this.getranklist()
            }
           
            this.$nextTick(()=>{
                this._scrollcon()
            })
        }
    }
</script>
<style scoped lang='scss'>
    .rankwraper{
          position: absolute;
          top: 96px;
          left: 0;
          bottom: 0;
          width: 100%;
          background-color: #f2f2f2;
          overflow: hidden;

    }
    
    .rankitem{
        display: flex;
        padding: 13px;
        margin-top: 5px;
        width: 100%;
        .rankicon{
            width: 100px;
            height: 100px;
            border-radius: 5px;
            overflow: hidden;
            flex: 0 0 100px;
        }
        .ranksongs{
            flex: 1;
            margin-left: 20px;
            li{
                height: 32px;
                line-height: 32px;
                font-size: 13px;
                color: #666;
                span:nth-of-type(1){
                    display: inline-block;
                    margin-right: 2px;

                }
            }
        }
    }
    .musiclist{
    position: fixed;
    top: 0px;
    z-index: 1000;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    transition: all .3s linear;
    opacity: 0;
    transform: translateX(100%);
    
}
.songactive{
    transform: translate3d(0,0,0);
    opacity: 1;
}
</style>