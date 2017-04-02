import FacebookApi from "../../api/facebook-api"
import * as types from '../mutation-types'

const state = {
  fbStatus: "",
  friends : [],
  profile: null
}

const getters = {
  getFriends: state => state.friends,
  getFBStatus: state => state.fbStatus,
  getProfile: state => state.profile
}

const actions = {
  loadSDK({ commit, state }){
    commit(types.LOAD_FACEBOOK_SDK);
    FacebookApi.init(
      () => {
        commit(types.LOAD_FACEBOOK_SDK_SUCCESS);
      },
      () => commit(types.LOAD_FACEBOOK_SDK_FAILURE)
    );
  },
  login({ commit, state }){
    commit(types.FACEBOOK_LOGIN);
    FacebookApi.login(
      (status) => commit(types.FACEBOOK_LOGIN_SUCCESS, { status }),
      (status) => commit(types.FACEBOOK_LOGIN_FAILURE, { status })
    );
  },
  loadFriends({ commit, state }){
    commit(types.LOAD_FACEBOOK_FRIENDS);
    FacebookApi.getFriends(
      (friends) => commit(types.LOAD_FACEBOOK_FRIENDS_SUCCESS, { friends }),
      () => commit(types.LOAD_FACEBOOK_FRIENDS_FAILURE)
    );
  },
  loadProfile({ commit, state }){
    commit(types.LOAD_FACEBOOK_PROFILE);
    FacebookApi.getProfile(
      (profile) => commit(types.LOAD_FACEBOOK_PROFILE_SUCCESS, { profile }),
      () => commit(types.LOAD_FACEBOOK_PROFILE_FAILURE)
    );
  }
}

const mutations = {
  [types.LOAD_FACEBOOK_SDK] (state) {
    state.fbStatus = "sdk:loading";
  },
  [types.LOAD_FACEBOOK_SDK_SUCCESS](state){
    state.fbStatus = "sdk:loaded";
  },
  [types.LOAD_FACEBOOK_SDK_FAILURE](state){
    state.fbStatus = "sdk:failed";
  },
  [types.FACEBOOK_LOGIN](state){
    state.fbStatus = "login:loading";
  },
  [types.FACEBOOK_LOGIN_SUCCESS](state, status){
    state.fbStatus = "login:"+ status.status.status;
  },
  [types.FACEBOOK_LOGIN_FAILURE](state){
    state.fbStatus = "login:failure";
  },
  [types.LOAD_FACEBOOK_FRIENDS](state){
    state.friends = [];
  },
  [types.LOAD_FACEBOOK_FRIENDS_SUCCESS](state, friends){
    state.friends = friends.friends;
  },
  [types.LOAD_FACEBOOK_FRIENDS_FAILURE](){
    state.friends = [];
  },
  [types.LOAD_FACEBOOK_PROFILE](state){
    state.profile = null;
  },
  [types.LOAD_FACEBOOK_PROFILE_SUCCESS](state, profile){
    state.profile = profile.profile;
  },
  [types.LOAD_FACEBOOK_PROFILE_FAILURE](){
    state.profile = null;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}