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
    }
  },
  watch: {
    open: function () {
      this.$emit("open-action", this.open);
    }
  },
  mounted(){
    this.getContactPhoto(this.member);
  },
  methods: {
    openMemberPopover(member) {
      this.$store.dispatch("setSelectedMembersParent", this.$parent.$parent.model || null);
      this.$store.dispatch("setSelectedMember", { member: member, model: this.model });
    },
    getContactPhoto(member){
      this.$store.dispatch("loadContactPhoto", member);
    },
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  }
}