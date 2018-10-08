// 歌手分类页面

<template>
    <div class="singgerwraper">
        <div class="narbarwraper wraper-hook">
            <div class="narbarcontent">
                    <ul>
                        <li v-for="(catagry, index) in singerclass" :key="index" class="cataryitem"
                         :class="index ==currentindex ? 'active' :''"
                         @click="change(index)"
                         >
                          <span>  {{catagry.name}}</span>
                        </li>
                    </ul>
            </div>     
        </div>
        <div class="singwarper singer-hook">
            <div class="singercontent">
               <ul  class="ul-hook">
                   <li class="singer_wrpaer_item" 
                   v-for="(singers,index) in singerlist" :key="index"
                  >
                        <div class="singer_type">
                              {{singers.name}}
                        </div>
                        <ul>
                            <li class="singer_item"
                             v-for="(singer,index) in singers.artists" :key='index'
                              @click="singertail(singer.id)"
                             >
                                <div class="singer_avatar">
                                    <img :src="singer.img1v1Url" alt="头像" width='100%'>   
                                </div>
                                <div class="singerdesc">
                                    <span>{{singer.name}}</span>
                                </div>
                            </li>
                        </ul>
                   </li>
               </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Bscroll from 'better-scroll'

export default {
    name:'singer',
    data(){
        return{
            singerclass:[
                {name:'入驻歌手 ',cagary:5001},
                {name:'华语男歌手' ,cagary:1001},
                {name:'华语女歌手' ,cagary:1002},
                {name:'华语组合/乐队' ,cagary:1003},
                {name:'欧美男歌手' ,cagary:2001},
                {name:'欧美女歌手 ',cagary:2002},
                {name:'欧美组合/乐队' ,cagary:2003},
                {name:'日本男歌手 ',cagary:6001},
                {name:'日本女歌手 ',cagary:6002},
                {name:'日本组合/乐队' ,cagary:6003},
                {name:'韩国男歌手',cagary:7001},
                {name:'韩国女歌手' ,cagary:7002},
                {name:'韩国组合/乐队 ',cagary:7003},
                {name:'其他男歌手' ,cagary:4001},
                {name:'其他女歌手' ,cagary:4002},
                {name:'/乐队' ,cagary:4003}
            ],
            singerlist:[],
            heightlist:[],
            showsinger:false,
            scrlly:0
        }
    },
    computed:{
             currentindex(){
        for (let i = 0; i < this.heightlist.length; i++) {
        let h1 = this.heightlist[i];
        let h2 = this.heightlist[i + 1];
        if (!h2 || (this.scrlly >= h1 && this.scrlly < h2)) {
          return i;
        }
      }
    }
    }
,
    methods:{
        //跳转到歌手详情页面
        singertail(id){
       this.$router.push(`/singer/${id}`)
        },
        change(index){
            let lis = [...document.getElementsByClassName('singer_wrpaer_item')]
            let elment = lis[index]
            this.singerscoll.scrollToElement(elment, 500);
        }
        ,
         getmenueheight() {
            let heights = 0;
            this.heightlist.push(heights);
            let list = [...document.getElementsByClassName("singer_wrpaer_item")];
            // console.log(list);
            list.forEach((item, index) => {
            heights += item.clientHeight;
            this.heightlist.push(heights);
      
      });
    
    },
        _Bscroll(){
            const croll = document.querySelector('.wraper-hook')
            const singscoll = document.querySelector('.singer-hook')
           
            this.navbarscroll = new Bscroll(croll,{
              probeType:3,
              click:true,
            }),
            this.singerscoll = new Bscroll(singscoll,{
                probeType:3,
                click:true
            })
               this.singerscoll.on('scroll',pbs=>{
                           let y = Math.abs(Math.round(pbs.y))
                           this.scrlly = y
                           
                       })
            
        },
        //获取歌手详情
        getsingerlist(){
            let _this =this
            let i =0;
               function getsinger(){
                   let name = _this.singerclass[i].name
                   let cat = _this.singerclass[i].cagary
                 _this.$axios.get(`/api/artist/list?cat=${cat}`).then(res=>{
                     res.data.name = name;
                     _this.singerlist.push(res.data)
                    //  console.log(_this.singerlist)
                      if(i  < _this.singerclass.length-1){
                          i++
                          getsinger()
                      }else{
                         
                       
                        _this.getmenueheight()
                      }
                 })
               }
               getsinger()
        }
    },
    created(){
        this.$nextTick(()=>{
              this._Bscroll()
        })
        this.getsingerlist()
    }
}
</script>
<style scoped lang='scss'>
 .singgerwraper{
     position: absolute;
     top: 92px;
      width: 100%;
      bottom: 0;
      left: 0;
      display: flex;
      .narbarwraper{
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background-color: #f2f2f2;
          width: 100px;
          flex: 0 0 100px;;
          overflow: hidden;
          .active{
              color: #222;
              background-color: #fff;
              border: none;
          }
          .cataryitem{
             height: 56px;
             padding: 10px;
             box-sizing: border-box;
             display: table;
             width: 100%;
             border-bottom: 1px solid rgba(0, 0, 0, .1);
             span{
                 display: table-cell
             }
          }

      }
      .singwarper{
          position: absolute;
          left: 100px;
          background-color: #f9f9f9;
          top: 0;
          flex: 1;
          bottom: 0;
          right: 0;
          overflow: hidden;
      }
 }
.singer_wrpaer_item{
    padding: 5px;
    .singer_type{
        height: 46px;
        line-height: 46px;
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }
    .singer_item{
        display: flex;
        padding: 4px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        .singer_avatar{
            width: 50px;
            flex: 0 0 50px;
            height: 50px;
            border-radius: 5px;
            overflow: hidden;
        }
        .singerdesc{
            height: 50px;
            line-height: 50px;
            flex: 1;
            margin-left: 40px;
            font-size: 14px;
            color: #666;
        }
    }
}
</style>