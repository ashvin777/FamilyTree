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
          return contact.name.toLowerCase().match(self.query.toLowerCase());
        });
    }
  },
  methods: {
    addMember(member) {
      this.$store.dispatch("addChild", member);
    },
    selectContact(contact) {
      let self = this;
      this.$f7.closeModal();
      this.$store.dispatch("setSelectedNewMember", contact);
      setTimeout(function () {
        self.$f7.popup(".popup-member-details");
      });
    },
    addMemberManually() {
      this.$store.dispatch("setSelectedNewMember", {});
    },
    onPopupOpen() {
      let self = this;
      this.query = "";
      setTimeout(function () {
        self.$refs.contactsScroller.scrollTop = 0;
      }, 1000);
    }
  }
}