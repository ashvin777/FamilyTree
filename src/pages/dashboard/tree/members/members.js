import member from "./member/member.vue"
export default {
  name: "members",
  props: {
    model: Object
  },
  components:{
    member
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
    onOpenAction: function(open) {
      this.open = open;
    }
  }
}