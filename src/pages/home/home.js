import { mapGetters } from "vuex"

export default {
  computed: mapGetters({
    googleStatus : "getGoogleStatus",
    contacts: "getContacts",
    profile: "getProfile"
  }),
  watch: {
    googleStatus(){
      if(this.googleStatus == "login:connected"){
        this.loadProfile();
        this.loadContacts();
      }
    },
    contacts(){
      if(this.contacts.length > 0 && this.profile)  this.openDashboard();
    },
    profile(){
      if(this.contacts.length > 0 && this.profile)  this.openDashboard();
    }
  },
  mounted(){
    this.$store.dispatch('loadSDK');
  },
  methods: {
    loginGoogle(){
      this.$store.dispatch('login');
    },
    loadProfile(){
      this.$store.dispatch('loadProfile');
    },
    loadContacts(){
      this.$store.dispatch('loadContacts');
    },
    openDashboard(){
      this.$f7.views.main.router.loadPage("dashboard");
    }
  }
}