import Events from "../../services/events";
import { mapGetters } from "vuex";

export default {
  data: function () {
    return {}
  },
  computed: {
    member() {
      return this.$store.state.member.selectedMember;
    },
    token() {
      return this.$store.state.google.token;
    }
  },
  methods: {
    deleteMember() {
      this.$store.dispatch("deleteMember", this.member);
    },
    editMember() {
      this.$store.dispatch("setSelectedNewMember", this.member);
    }
  }
}