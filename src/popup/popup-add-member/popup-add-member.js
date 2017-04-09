import { mapGetters } from "vuex";

export default {
  data: function () {
    return {
      query: ""
    }
  },
  computed: {
    member() {
      return this.$store.state.member.selectedMember;
    },
    filteredContacts() {
      let self = this;
      if (this.$store.state.google.contacts)
        return this.$store.state.google.contacts.filter(function (contact) {
          return contact.title.$t.toLowerCase().match(self.query.toLowerCase());
        });
    }
  },
  methods: {
    addMember(member) {
      this.$store.dispatch("addChild", member);
    },
    selectContact(contact){
      this.$store.dispatch("setSelectedNewMember", contact);
    }
  }
}