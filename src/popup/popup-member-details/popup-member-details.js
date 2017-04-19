import { mapGetters } from "vuex";

export default {
  data() {
    return {
      relation: null
    }
  },
  computed: {
    selectedNewMember() {
      this.$store.dispatch("extendSelectedNewMember");
      return Object.assign({}, this.$store.state.member.selectedNewMember);
    }
  },
  methods: {
    addRelative(event) {
      event.preventDefault();
      this.$store.dispatch("extendSelectedNewMember");
      this.$store.dispatch("attachTreeToMember", this.selectedNewMember.email);
      if (this.selectedNewMember.id) {
        this.updateMember();
      } else {
        switch (this.relation) {
          case "children": this.$store.dispatch("addChild", this.selectedNewMember); break;
          case "spouse": this.$store.dispatch("addSpouse", this.selectedNewMember); break;
          case "sibling": this.$store.dispatch("addSibling", this.selectedNewMember); break;
          case "parent": this.$store.dispatch("addParent", this.selectedNewMember); break;
          default: break;
        }
      }
      this.$f7.closeModal();
    },
    updateMember() {
      this.$store.dispatch("updateSelectedMember", this.selectedNewMember);
    },
    openAddMemberPopup() {
      this.$f7.closeModal();
      this.$f7.popup(".popup-add-member");
    }
  }
}