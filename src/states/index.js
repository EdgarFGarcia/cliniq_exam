import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import UserData from '../modules/states/data.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        udata:          UserData
    },
    plugins: [createPersistedState()]
})

export default store