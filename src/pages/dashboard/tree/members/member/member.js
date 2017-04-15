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
      var dob = new Date(this.member.dob);
      var ageDifMs = Date.now() - dob.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
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
      this.$store.dispatch("deleteMember", this.member);
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