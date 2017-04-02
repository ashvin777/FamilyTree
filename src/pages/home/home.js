import { mapGetters } from "vuex"

export default {
  computed: mapGetters({
    fbStatus : "getFBStatus",
    friends: "getFriends",
    profile: "getProfile"
  }),
  watch: {
    fbStatus(){
      if(this.fbStatus == "login:connected"){
        this.loadFacebookProfile();
        this.loadFacebookFriends();
      }
    },
    friends(){
      if(this.friends.length > 0 && this.profile)  this.openDashboard();
    },
    profile(){
      if(this.friends.length > 0 && this.profile)  this.openDashboard();
    }
  },
  mounted(){
    this.$store.dispatch('loadSDK');
  },
  methods: {
    loginFacebook(){
      this.$store.dispatch('login');
    },
    loadFacebookProfile(){
      this.$store.dispatch('loadProfile');
    },
    loadFacebookFriends(){
      this.$store.dispatch('loadFriends');
    },
    openDashboard(){
      this.$f7.views.main.router.loadPage("dashboard");
    }
  }
}