
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {

}

const mutations = {
    User(state, value) {
        state.userinfo = value

    }
}

const state = {
    userinfo: {

    },
}

const store = new Vuex.Store({
    actions,
    mutations,
    state
})

export default store