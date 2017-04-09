import Events from "../../services/events";
import { mapGetters } from "vuex";

export default {
  data: function () {
    return {}
  },
  computed: mapGetters({
    member: "getSelectedMember"
  }),
  methods: {
    deleteMember() {
      this.$store.dispatch("deleteMember", this.member);
      this.$f7.closeModal();
    },
    editMember(){
      this.$store.dispatch("setSelectedNewMember", this.member);
    }
  }
}