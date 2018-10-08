import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend/recommend'
import musiclist from '@/components/musiclist/musiclist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
     redirect:'/recommend'
    },
    {
      // 推荐路由
     path:'/recommend',
     name:'recommend',
     component:recommend,
     children:[
       {
         path:'/recommend/:id',
         name:'musiclist',
         meta:'歌单',
         component:musiclist
       }
     ]

    },
    {
      //排行路由
      path:"/rank",
      name:'rank',
      component:()=>import ('@/components/rank/rank'),
      children:[
             {
               path:'/rank/:id',
               name:'ranklist',
               meta:'排行',
               component:musiclist
             }
      ]

    },
    {
      //歌手路由
      path:"/singer",
      name:'singer',
      component:()=>import ('@/components/singer/singer')
    },
    {
      // 歌手详情页面
      path:'/singer/:id',
      name:'singerdetail',
      redirect:'/singer/artists/:id',
      component:()=>import ('@/components/singerdetail/singerdetail'),
      children:[
        {
          path:'/singer/artists/:id',
          name:"artists",
          component:()=>import ('@/components/artists/artists')
        },
        {
          path:'album',
          name:'album',
          component:()=>import('@/components/album/album')
        },
        {
          path:'mvlist',
          name:'mvlist',
          component:()=>import('@/components/mvlist/mvlist')
        }
      ]
    },
   //播发mv页面
   {
     path:'/playmv/:id',
     name:'playmv',
     component:()=>import('@/components/playmvs/playmvs')
   }

  ]
})
