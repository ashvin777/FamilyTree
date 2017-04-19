export default {
  name: "member",
  props: {
    member: Object,
    model: Object
  },
  data: function () {
    return {
      open: true
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    },
    token() {
      return this.$store.state.google.token;
    },
    age() {
      var dob = this.member.dob;
      var birthdate = new Date(dob);
      var cur = new Date();
      var diff = cur - birthdate;
      return Math.floor(diff / 31536000000);
    },
    parent(){
      return this.$parent.$parent.model || {};
    }
  },
  watch: {
    open: function () {
      this.$emit("open-action", this.open);
    },
    member: {
      handler() {
        console.log("Member details changed");
      },
      deep: true
    }
  },
  mounted(){
    this.$store.dispatch('loadMemberTreesReferences', this.member);
  },
  methods: {
    openMemberPopover(member) {
      this.$store.dispatch("setSelectedMembersParent", this.$parent.$parent.model || null);
      this.$store.dispatch("setSelectedMember", { member: member, model: this.model });
    },
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    deleteMember() {
      this.$store.dispatch("setSelectedMembersParent", this.$parent.$parent.model || null);
      this.$store.dispatch("setSelectedMember", { member: this.member, model: this.model });

      var parent = this.$store.state.member.selectedParent;
      if (parent || this.model.partners.length > 1) {
        this.$store.dispatch("deleteMember", this.member);
      } else {
        this.$store.dispatch("deleteTree", this.member);
      }
    },
    editMember() {
      this.$store.dispatch("setSelectedMembersParent", this.$parent.$parent.model || null);
      this.$store.dispatch("setSelectedMember", { member: this.member, model: this.model });
      this.$store.dispatch("setSelectedNewMember", this.member);
    },
    addMember() {
      this.$store.dispatch("setSelectedMembersParent", this.$parent.$parent.model || null);
      this.$store.dispatch("setSelectedMember", { member: this.member, model: this.model });
    }
  }
}