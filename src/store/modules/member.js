import * as types from '../mutation-types'

const state = {
  selectedMember: null,
  selectedNode: null,
  selectedNewMember: null,
  selectedParent: null
}

const getters = {
  getSelectedMember: state => state.selectedMember,
  getSelectedNode: state => state.selectedNode,
  getSelectedNewMember: state => state.selectedNewMember
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
  addChild({ commit, state }, member) {
    commit(types.ADD_CHILDREN, member);
  },
  addSpouse({ commit, state }, member) {
    commit(types.ADD_SPOUSE, member);
  },
  addBrother({ commit, state }, member) {
    commit(types.ADD_BROTHER, member);
  },
  deleteMember({ commit, state }, member) {
    commit(types.DELETE_MEMBER, member);
  },
  updateMemberProperty({ commit, state }, obj) {
    commit(types.UPDATE_MEMBER_PROPERTY, obj);
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
    member = {
      name: member.name,
      email: member.email,
      phoneNumber: member.phoneNumber
    };
    state.selectedNewMember = member;
  },
  [types.ADD_CHILDREN](state, member) {
    var obj = {};
    obj.partners = [];
    obj.children = [];
    obj.id = new Date().getTime();
    member.id = new Date().getTime();
    obj.partners.push(member);
    state.selectedNode.children.push(obj);
  },
  [types.ADD_SPOUSE](state, member) {
    member.id = new Date().getTime();
    state.selectedNode.partners.push(member);
  },
  [types.ADD_BROTHER](state, member) {
    var obj = {};
    obj.partners = [];
    obj.children = [];
    obj.id = new Date().getTime();
    member.id = new Date().getTime();
    obj.partners.push(member);
    state.selectedParent.children.push(obj);
  },
  [types.UPDATE_MEMBER_PROPERTY](state, obj) {
    state.selectedNewMember[obj.prop] = obj.value;
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