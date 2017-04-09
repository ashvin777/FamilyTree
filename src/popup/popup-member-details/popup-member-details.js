import { mapGetters } from "vuex";

export default {
  data() {
    return {
      relation: null
    }
  },
  computed: mapGetters({
    "selectedNewMember": "getSelectedNewMember",
    "selectedMember": "getSelectedMember"
  }),
  methods: {
    updateProperty(prop, value) {
      this.$store.dispatch("updateMemberProperty", { prop, value });
    },
    addPhoneNumber(phone) {
      this.$store.dispatch("addPhoneNumber", phone);
    },
    addRelative(member) {
      switch(this.relation){
        case "children" : this.$store.dispatch("addChild", this.selectedNewMember); break;
        case "spouse": this.$store.dispatch("addSpouse", this.selectedNewMember); break;
        case "brother" : this.$store.dispatch("addBrother", this.selectedNewMember); break;
        case "parent" : this.$store.dispatch("addParent", this.selectedNewMember); break;
        default: break;
      }
    }
  }
}