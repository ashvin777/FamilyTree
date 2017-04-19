import * as types from '../mutation-types'
import Vue from "vue";

const state = {
  selectedMember: null,
  selectedNode: null,
  selectedNewMember: null,
  selectedParent: null
}

const getters = {
  getSelectedMember: state => state.selectedMember,
  getSelectedNode: state => state.selectedNode,
  getSelectedNewMember: state => state.selectedNewMember,
  getSelectedParent: state => state.selectedParent
}

const actions = {
  setSelectedMember({ commit, state }, node) {
    commit(types.SET_SELECTED_MEMBER, node);
  },
  setSelectedMembersParent({ commit, state }, parent) {
    commit(types.SET_SELECTED_MEMBERS_PARENT, parent);
  },
  setSelectedNewMember({ commit, state }, member) {
    commit(types.SET_SELECTED_NEW_MEMBER, member);
  },
  extendSelectedNewMember({ commit, state }) {
    commit(types.EXTEND_SELECTED_NEW_MEMBER);
  },
  addChild({ commit, state }, member) {
    commit(types.ADD_CHILDREN, member);
  },
  addSpouse({ commit, state }, member) {
    commit(types.ADD_SPOUSE, member);
  },
  addSibling({ commit, state }, member) {
    commit(types.ADD_SIBLING, member);
  },
  deleteMember({ commit, state }, member) {
    commit(types.DELETE_MEMBER, member);
  },
  updateMemberProperty({ commit, state }, obj) {
    commit(types.UPDATE_MEMBER_PROPERTY, obj);
  },
  updateSelectedMember({ commit, state }, member) {
    commit(types.UPDATE_EXISTING_MEMBER, member);
  }
}

const mutations = {
  [types.SET_SELECTED_MEMBER](state, node) {
    state.selectedMember = node.member;
    state.selectedNode = node.model;
  },
  [types.SET_SELECTED_MEMBERS_PARENT](state, parent) {
    state.selectedParent = parent;
  },
  [types.SET_SELECTED_NEW_MEMBER](state, member) {
    state.selectedNewMember = member;
  },
  [types.EXTEND_SELECTED_NEW_MEMBER](state) {
    if (state.selectedNewMember) {
      Vue.set(state.selectedNewMember, "name", state.selectedNewMember.name || '');
      Vue.set(state.selectedNewMember, "email", state.selectedNewMember.email || '');
      Vue.set(state.selectedNewMember, "gender", state.selectedNewMember.gender || '');
      Vue.set(state.selectedNewMember, "image", state.selectedNewMember.image || '');
      Vue.set(state.selectedNewMember, "dob", state.selectedNewMember.dob || '');
      Vue.set(state.selectedNewMember, "phoneNumber", state.selectedNewMember.phoneNumber || '');
      Vue.set(state.selectedNewMember, "spouseId", state.selectedNewMember.spouseId || '');
      Vue.set(state.selectedNewMember, "googleId", state.selectedNewMember.googleId || '');
      Vue.set(state.selectedNewMember, "id", state.selectedNewMember.id || '');
      Vue.set(state.selectedNewMember, "parentId", state.selectedNewMember.parentId || '');
    }
  },
  [types.ADD_CHILDREN](state, member) {
    var obj = {};
    obj.partners = [];
    obj.children = [];
    obj.id = new Date().getTime();
    member.id = new Date().getTime();
    member.parentId = state.selectedNode.id;
    obj.partners.push(member);
    if (!state.selectedNode.children) {
      Vue.set(state.selectedNode, "children", []);
    }
    state.selectedNode.children.push(obj);
    Vue.set(state, 'selectedNode', state.selectedNode);
  },
  [types.ADD_SPOUSE](state, member) {
    member.id = new Date().getTime();
    member.parentId = '';
    state.selectedNode.partners.push(member);
  },
  [types.ADD_SIBLING](state, member) {
    var obj = {};
    obj.partners = [];
    obj.children = [];
    obj.id = new Date().getTime();
    member.id = new Date().getTime();
    member.parentId = state.selectedParent ? state.selectedParent.id : null;
    obj.partners.push(member);
    if (!state.selectedNode.children) {
      Vue.set(state.selectedNode, "children", []);
    }
    state.selectedParent.children.push(obj);
  },
  [types.UPDATE_MEMBER_PROPERTY](state, obj) {
    Vue.set(state.selectedNewMember, obj.prop, obj.value);
  },
  [types.UPDATE_EXISTING_MEMBER](state, member) {
    Object.keys(member).forEach(function (key) {
      Vue.set(state.selectedNewMember, key, member[key]);
    });
  },
  [types.DELETE_MEMBER](state, member) {
    if (state.selectedParent) {
      state.selectedParent.children.forEach((child, index) => {
        if (child.id == state.selectedNode.id) {
          //delete only partner if more than 1 partners added
          if (child.partners.length > 1) {
            child.partners.forEach((partner, i) => {
              if (partner.id == member.id) {
                child.partners.splice(i, 1);
              }
            });
          } else {
            state.selectedParent.children.splice(index, 1);
          }
        }
      });
    } else {
      //if there is no parent
      if (state.selectedNode.partners.length > 1) {
        state.selectedNode.partners.forEach((partner, i) => {
          if (partner.id == member.id) {
            state.selectedNode.partners.splice(i, 1);
          }
        });
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}