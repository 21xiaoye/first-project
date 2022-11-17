import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import user from './user/user'
import shoppings from './shopping/shoppings'

export default new Vuex.Store({
    modules: {
        user,
        shoppings
    }
})