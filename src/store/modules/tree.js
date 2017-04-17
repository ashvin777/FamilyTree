import * as types from '../mutation-types'
import Vue from 'vue';

const state = {
  treeData: null,
  selectedTreeName: null,
  trees: null
}

const getters = {
  getTreeData: state => state.treeData,
  getSelectedTreeName: state => state.selectedTreeName,
  getTrees: state => state.trees
}

const actions = {
  loadTreeData({ commit, state }, profile) {
    commit(types.LOAD_TREE_DATA);
    firebase.database().ref('/treeData/' + profile.googleId).once('value').then(function (snapshot) {
      if (snapshot.val()) {
        var treeData = snapshot.val();
        commit(types.LOAD_TREE_DATA_SUCCESS, treeData);
      } else {
        commit(types.LOAD_TREE_DATA_FAILURE, profile);
      }
    });
  },
  loadTreeRootProfile({ commit, state }, { profile, treeName }) {
    commit(types.LOAD_TREE_ROOT_PROFILE, { profile, treeName });
  },
  saveTreeDataInStorage({ commit, state }, profile) {
    commit(types.SAVE_TREE_DATA_ON_CHANGE, profile);
  },
  addParent({ commit, state }, member) {
    commit(types.ADD_PARENT, member);
  },
  deleteTree({ commit, state }, profile) {
    commit(types.DELETE_TREE, profile);
  },
  setTree({ commit, state }, treeName){
    commit(types.SET_TREE, treeName);
  }
}

const mutations = {
  [types.LOAD_TREE_DATA](state, treeName) {
    state.treeData = null;
    state.trees = null;
  },
  [types.LOAD_TREE_DATA_SUCCESS](state, treeData) {
    state.trees = treeData;
    var treeId = Object.keys(treeData)[0];
    if (!state.selectedTreeName) {
      state.selectedTreeName = treeId;
    }
    if (!treeData[treeId].children) {
      treeData[treeId].children = [];
    }
    state.treeData = treeData[treeId];
  },
  [types.LOAD_TREE_DATA_FAILURE](state, profile) {

  },
  [types.LOAD_TREE_ROOT_PROFILE](state, { profile, treeName }) {
    state.selectedTreeName = treeName;
    profile.id = profile.googleId || new Date().getTime();
    state.treeData = {
      partners: [profile],
      children: [],
      id: new Date().getTime()
    }
    if( !state.trees ){
      Vue.set(state, 'trees', {});
      Vue.set(state.trees, state.selectedTreeName, state.treeData);
    } else {
      Vue.set(state.trees, state.selectedTreeName, state.treeData);
    }
    
  },
  [types.SAVE_TREE_DATA_ON_CHANGE](state, profile) {
    if (state.trees && profile.id) {
      setTimeout(function () {
        firebase.database().ref('/treeData/' + profile.id).set(state.trees);
      });
    }
  },
  [types.ADD_PARENT](state, member) {
    state.treeData = {
      id: new Date().getTime(),
      children: [state.treeData],
      partners: []
    };
    member.id = new Date().getTime();
    state.treeData.partners.push(member);
  },
  [types.DELETE_TREE](state, profile) {
    state.treeData = null;
    firebase.database().ref('/treeData/' + profile.id + "/" + state.selectedTreeName).set(null);
  },
  [types.SET_TREE](state, treeName){
    state.selectedTreeName = treeName;
    state.treeData = state.trees[treeName];
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}