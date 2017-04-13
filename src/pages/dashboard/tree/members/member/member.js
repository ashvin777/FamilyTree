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
    }
  },
  watch: {
    open: function () {
      this.$emit("open-action", this.open);
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
    addMember(){
      this.$store.dispatch("setSelectedMembersParent", this.$parent.$parent.model || null);
      this.$store.dispatch("setSelectedMember", { member: this.member, model: this.model });
    }
  }
}