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
    firebase.database().ref('/treeIndex/' + profile.id).once('value').then(function (treesRef) {
      treesRef = treesRef.val();
      var trees = {};
      if (!treesRef) {
        commit(types.LOAD_TREE_DATA_FAILURE);
        return;
      }
      treesRef.forEach((treeRef, index) => {
        firebase.database().ref(treeRef.treePath).on('value', function (treeData) {
          treeData = treeData.val();
          commit(types.UPDATE_TREE_SYNC, { treeData, treeRef });
        });
      });
    });
  },
  loadTreeRootProfile({ commit, state }, { profile, treeName }) {
    commit(types.LOAD_TREE_ROOT_PROFILE, { profile, treeName });
    commit(types.ATTACH_TREE_TO_MEMBER, profile.email);
  },
  saveTreeDataInStorage({ commit, state }, profile) {
    commit(types.SAVE_TREE_DATA_ON_CHANGE, profile);
  },
  attachTreeToMember({ commit, state }, email) {
    commit(types.ATTACH_TREE_TO_MEMBER, email);
  },
  addParent({ commit, state }, member) {
    commit(types.ADD_PARENT, member);
  },
  deleteTree({ commit, state }, profile) {
    commit(types.DELETE_TREE, profile);
  },
  setTree({ commit, state }, treeName) {
    commit(types.SET_TREE, treeName);
  },
  openTree({ commit, state }, ref) {
    firebase.database().ref(ref.treePath).once('value').then(function (treeData) {
      var treeData = treeData.val();
      commit(types.OPEN_TREE, { treeData, ref });
    });
  },
  loadMemberTreesReferences({ commit, state }, member) {
    if (member.email) {
      var email = member.email.replace(/\./g, "");
      firebase.database().ref('/treeIndex/' + email).once('value').then(function (treesRef) {
        treesRef = treesRef.val();
        commit(types.LOAD_MEMBER_TREES_REFERENCE, { member, treesRef });
      });
    }
  }
}

const mutations = {
  [types.LOAD_TREE_DATA](state, treeName) {
    // state.treeData = null;
    // state.trees = null;
  },
  [types.LOAD_TREE_DATA_SUCCESS](state, treeData) {
    state.trees = treeData;
    // Vue.set(state, "trees", treeData);
    var treeId = Object.keys(treeData)[0];
    if (!state.selectedTreeName) {
      state.selectedTreeName = treeId;
    }
    if (treeData[treeId] && !treeData[treeId].children) {
      Vue.set(treeData[treeId], 'children', []);
    }
    // Vue.set(state, "treeData", treeData[treeId]);
  },
  [types.LOAD_TREE_DATA_FAILURE](state, profile) {

  },
  [types.UPDATE_TREE_SYNC](state, { treeData, treeRef }) {
    if (!treeData) {
      return;
    }
    var treeId = treeRef.treeName;
    if (!state.trees) {
      state.trees = {};
    }
    if (!state.selectedTreeName) {
      state.selectedTreeName = treeId;
    }
    if (treeData[treeId] && !treeData[treeId].children) {
      Vue.set(treeData[treeId], 'children', []);
    }
    state.treeData = treeData;
    Vue.set(state.trees, treeRef.treeName, treeData);
  },
  [types.LOAD_TREE_ROOT_PROFILE](state, { profile, treeName }) {
    state.selectedTreeName = treeName;
    profile.id = profile.id || new Date().getTime();
    state.treeData = {
      partners: [profile],
      children: [],
      id: profile.id
    }
    if (!state.trees) {
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
  [types.ATTACH_TREE_TO_MEMBER](state, email) {
    if (email) {
      email = email.replace(/\./g, "");
      var ref = firebase.database().ref('/treeIndex/' + email);

      ref.once('value').then(function (snapshot) {
        var trees = snapshot.val() || [];
        var treePath = "/treeData/" + state.treeData.id + "/" + state.selectedTreeName;
        if (trees.indexOf(treePath) == -1) {
          trees.push({
            treeName: state.selectedTreeName,
            treePath: treePath
          });
        }
        ref.set(trees);
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
  [types.SET_TREE](state, treeName) {
    state.selectedTreeName = treeName;
    Vue.set(state, 'treeData', state.trees[treeName]);
  },
  [types.OPEN_TREE](state, { treeData, ref }) {
    state.selectedTreeName = ref.treeName;

    if (treeData && !treeData.children) {
      Vue.set(treeData, 'children', []);
    }
    
    state.treeData = treeData;
    Vue.set(state.trees, state.selectedTreeName, treeData);
  },
  [types.LOAD_MEMBER_TREES_REFERENCE](state, { member, treesRef }) {
    if (treesRef) {
      Vue.set(member, 'treesRef', []);
      treesRef.forEach((treeRef, index) => {
        if (state.selectedTreeName != treeRef.treeName) {
          if (!member.treesRef) {
            Vue.set(member, 'treesRef', []);
            member.treesRef.push(treeRef);
          } else {
            member.treesRef.push(treeRef);
          }
        }
      });
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}