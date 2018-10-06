import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(vuex)

const state = {
    songlist:[],
    musiclist:[]
}

const store = new vuex.Store({
    state,
    mutations:{
      'SETSONGLIST'(state,uploade){
          state.songlist = uploade
      }  ,
      'SETMUSICLIST'(state,uploade){
          state.musiclist = uploade
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


















