import GoogleApi from "../../api/google-api"
import * as types from '../mutation-types'

const state = {
  googleStatus: "",
  contacts: [],
  profile: null,
  token: null
}

const getters = {
  getContacts: state => state.contacts,
  getGoogleStatus: state => state.googleStatus,
  getProfile: state => state.profile,
  getAccessToken: state => state.token
}

const actions = {
  loadSDK({ commit, state }) {
    commit(types.LOAD_GOOGLE_SDK);
    GoogleApi.init(
      () => commit(types.LOAD_GOOGLE_SDK_SUCCESS),
      () => commit(types.LOAD_GOOGLE_SDK_FAILURE)
    );
  },
  login({ commit, state }) {
    commit(types.GOOGLE_LOGIN);
    GoogleApi.login(
      (status) => commit(types.GOOGLE_LOGIN_SUCCESS, status),
      (status) => commit(types.GOOGLE_LOGIN_FAILURE, status)
    );
  },
  loadContacts({ commit, state }) {
    commit(types.LOAD_GOOGLE_FRIENDS);
    GoogleApi.getContacts(
      (contacts) => commit(types.LOAD_GOOGLE_FRIENDS_SUCCESS, contacts),
      () => commit(types.LOAD_GOOGLE_FRIENDS_FAILURE)
    );
  },
  loadContactPhoto({ commit, state }, contact) {
    commit(types.LOAD_GOOGLE_CONTACT_PHOTO);
    GoogleApi.getContactPhoto(
      contact,
      () => commit(types.LOAD_GOOGLE_CONTACT_PHOTO_SUCCESS),
      () => commit(types.LOAD_GOOGLE_CONTACT_PHOTO_FAILURE)
    );
  },
  loadProfile({ commit, state }) {
    commit(types.LOAD_GOOGLE_PROFILE);
    GoogleApi.getProfile(
      (profile) => commit(types.LOAD_GOOGLE_PROFILE_SUCCESS, profile),
      () => commit(types.LOAD_GOOGLE_PROFILE_FAILURE)
    );
  }
}

const mutations = {
  [types.LOAD_GOOGLE_SDK](state) {
    state.googleStatus = "sdk:loading";
  },
  [types.LOAD_GOOGLE_SDK_SUCCESS](state) {
    state.googleStatus = "sdk:loaded";
  },
  [types.LOAD_GOOGLE_SDK_FAILURE](state) {
    state.googleStatus = "sdk:failed";
  },
  [types.GOOGLE_LOGIN](state) {
    state.googleStatus = "login:loading";
  },
  [types.GOOGLE_LOGIN_SUCCESS](state, status) {
    state.token = status.access_token;
    state.googleStatus = "login:" + (status.access_token ? "connected" : "failed");
  },
  [types.GOOGLE_LOGIN_FAILURE](state) {
    state.googleStatus = "login:failure";
  },
  [types.LOAD_GOOGLE_FRIENDS](state) {
    state.contacts = [];
  },
  [types.LOAD_GOOGLE_FRIENDS_SUCCESS](state, contacts) {
    var entries = [];
    contacts.feed.entry.forEach((contact) => {
      var image = null;
      contact.link.forEach(function(link){
        if( link.type == "image/*" ){
          image = link.href;
        }
      });
      entries.push({
        name: contact.title ? contact.title.$t : "",
        email: contact.gd$email ? contact.gd$email[0].address : '',
        phoneNumber: contact.gd$phoneNumber ? contact.gd$phoneNumber[0].$t : '',
        image: image
      });
    });
    state.contacts = entries;
  },
  [types.LOAD_GOOGLE_FRIENDS_FAILURE]() {
    state.contacts = [];
  },
  [types.LOAD_GOOGLE_PROFILE](state) {
    state.profile = null;
  },
  [types.LOAD_GOOGLE_PROFILE_SUCCESS](state, profile) {
    state.profile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      gender: '',
      image: profile.image.url,
      phoneNumber: '',
      dob: null,
      spouseId: null,
      googleId: profile.id,
      id: profile.id,
      root: true
    };
  },
  [types.LOAD_GOOGLE_PROFILE_FAILURE]() {
    state.profile = null;
  },
  [types.LOAD_GOOGLE_CONTACT_PHOTO](state) {
  },
  [types.LOAD_GOOGLE_CONTACT_PHOTO_SUCCESS](state) {
  },
  [types.LOAD_GOOGLE_CONTACT_PHOTO_FAILURE]() {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}