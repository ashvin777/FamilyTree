import { mapGetters } from "vuex";

export default {
  data(){
    return {
      treeName: this.$store.state.tree.selectedTreeName
    }
  },
  computed : mapGetters({
    profile : "getProfile",
    trees: "getTrees"
  }),
  watch: {
    treeName(){
      this.$store.dispatch("setTree", this.treeName);
    }
  },
  methods: {
    logout(){
      window.location.reload();
    }
  }
}