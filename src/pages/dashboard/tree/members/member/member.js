export default {
  props: {
    member: Object,
    model: Object,
    friends: Array
  },
  data: function() {
    return {
      open: true
    }
  },
  computed: {
    isFolder: function() {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    openMemberPopover(member){
      this.$store.dispatch("setSelectedMember", member);
    }
  }
}