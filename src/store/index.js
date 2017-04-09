import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// import facebook from "./modules/facebook"
import tree from "./modules/tree"
import member from "./modules/member"
import google from "./modules/google"

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    tree,
    member,
    google
  },
  strict: debug
});