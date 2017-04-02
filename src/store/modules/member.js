import * as types from '../mutation-types'

const state = {
  selectedMember: null
}

const getters = {
  getSelectedMember: state => state.selectedMember
}

const actions = {
  setSelectedMember({ commit, state }, member){
    commit(types.SET_SELECTED_MEMBER, member);
  },
  addChild({ commit, state }, child){
    commit(types.ADD_CHILDREN, child);
  }
}

const mutations = {
  [types.SET_SELECTED_MEMBER](state, member){
    state.selectedMember = member;
  },
  [types.ADD_CHILDREN](state, child){
    state.selectedMember.children.push(child);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}