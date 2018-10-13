import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(vuex)
const state = {
    songlist:[],
    musiclist:[],
    // 当前播放音乐的信息
    plaingsong:{},
    //存取排行所有信息
    ranklist:[],
    //存储当前播放mvli列表
    mvlist:[],
    userinfo:{},
    userdetail:{},
    //存储个人的音乐列表
    personmusiclist:{}
}

const store = new vuex.Store({
    state,
    mutations:{
    'SETPERSONMUSICLIST'(state,uploade){
          state.personmusiclist = uploade
    },

      'SETSONGLIST'(state,uploade){
          state.songlist = uploade
      }  ,
      'SETMUSICLIST'(state,uploade){
          state.musiclist = uploade
      },
      'SETSONG'(state,uploade){
          state.plaingsong = uploade
      }
      ,
      'SETRANKLIST'(state,uploade){
        state.ranklist = uploade
      },
      'SETMVLIST'(state,uploade){
          state.mvlist = uploade
      },
      'SETUSERINFO'(state,uploade){
         state.userinfo = uploade
      },
    //   存取用户详细信息
     'SETUSEDETAIL'(state,uploade){
         state.userdetail = uploade
     }
    },
    plugins: [
        createPersistedState({
          storage: {
            getItem: key => localStorage.getItem(key),
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) =>
            localStorage.setItem(key, value),
            removeItem: key => localStorage.removeItem(key),
          },
        }),
      ], 
})

export default store


















