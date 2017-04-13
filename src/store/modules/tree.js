import * as types from '../mutation-types'
import Vue from 'vue';

const state = {
  treeData: null
}

const getters = {
  getTreeData: state => state.treeData
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
    }, function () {
      commit(types.LOAD_TREE_DATA_FAILURE, profile);
    });
  },
  saveTreeDataInStorage({ commit, state }, profile) {
    commit(types.SAVE_TREE_DATA_ON_CHANGE, profile);
  },
  addParent({ commit, state }, member) {
    commit(types.ADD_PARENT, member);
  }
}

const mutations = {
  [types.LOAD_TREE_DATA](state, treeData) {
    state.treeData = null;
  },
  [types.LOAD_TREE_DATA_SUCCESS](state, treeData) {
    if (!treeData.children) {
      treeData.children = [];
    }
    state.treeData = treeData;
    // Vue.set(state, 'treeData', treeData);
  },
  [types.LOAD_TREE_DATA_FAILURE](state, profile) {
    profile.id = profile.googleId || new Date().getTime();
    state.treeData = {
      partners: [profile],
      children: [],
      id: new Date().getTime()
    }
  },
  [types.SAVE_TREE_DATA_ON_CHANGE](state, profile) {
    if (state.treeData && profile.id) {
      setTimeout(function () {
        firebase.database().ref('/treeData/' + profile.id).set(state.treeData);
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}