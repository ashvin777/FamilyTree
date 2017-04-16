import toolbar from "./toolbar/toolbar.vue"
import members from "./members/members.vue"

import { mapState } from "vuex";

export default {
  components: {
    toolbar,
    members
  },
  data() {
    return {
      zoom: 1,
      view: "large"
    }
  },
  computed: mapState({
    "profile": state => state.google.profile,
    "treeData": state => state.tree.treeData
  }),
  watch: {
    treeData: {
      handler() {
        let self = this;
        self.$store.dispatch("saveTreeDataInStorage", self.profile);
      },
      deep: true
    }
  },
  mounted() {
    let self = this;
    this.onResetClick();
    this.$store.dispatch("loadTreeData", this.profile);
  },
  methods: {
    onResetClick() {
      var $el = $(this.$el);
      $el.scrollLeft(2500 - $el.width() / 2);
      $el.scrollTop(0);
    },
    onZoomInClick() {
      if (this.zoom >= 1.5) {
        return;
      }
      this.zoom = this.zoom + 0.2;
    },
    onZoomOutClick() {
      if (this.zoom < 0.5) {
        return;
      }
      this.zoom = this.zoom - 0.2;
    },
    toggleView() {
      this.view = (this.view == "large") ? "small" : "large";
    },
    add() {
      var treeName = prompt("Give a name to your tree");
      if (treeName) {
        var root = confirm("Are you in the tree ?");
        if (root) {
          this.$store.dispatch("loadTreeRootProfile", { profile: this.profile, treeName });
        } else {
          //not in tree. Add friends as a root
        }
      }
    }
  }
}