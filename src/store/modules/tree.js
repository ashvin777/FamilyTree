import * as types from '../mutation-types'

const state = {
  treeData: null
}

const getters = {
  getTreeData: state => state.treeData
}

const actions = {
  loadTreeData({ commit, state }, profile){
    commit(types.LOAD_TREE_DATA);
    var treeData = JSON.parse(localStorage.getItem("TREE_DATA"));
    if(treeData){
      commit(types.LOAD_TREE_DATA_SUCCESS, { treeData });
    } else{
      commit(types.LOAD_TREE_DATA_FAILURE, profile);
    }
  },
  saveTreeDataInStorage({ commit, state}){
    commit(types.SAVE_TREE_DATA_ON_CHANGE);
  },
  addParent({ commit, state }, member) {
    commit(types.ADD_PARENT, member);
  }
}

const mutations = {
  [types.LOAD_TREE_DATA](state, treeData){
    state.treeData = null;
  },
  [types.LOAD_TREE_DATA_SUCCESS](state, treeData){
    state.treeData = treeData.treeData;
  },
  [types.LOAD_TREE_DATA_FAILURE](state, profile){
    state.treeData = {};
    state.treeData.partners = [];
    state.treeData.children = [];
    state.treeData.partners.push(profile);
    localStorage.setItem("TREE_DATA", JSON.stringify(state.treeData));
  },
  [types.SAVE_TREE_DATA_ON_CHANGE](state){
    localStorage.setItem("TREE_DATA", JSON.stringify(state.treeData));
  },
  [types.ADD_PARENT](state, member){
    state.treeData = {
      id: new Date().getTime(),
      children : [state.treeData],
      partners: []
    };
    member.id = new Date().getTime();
    state.treeData.partners.push(member);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}