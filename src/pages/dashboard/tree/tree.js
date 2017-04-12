import toolbar from "./toolbar/toolbar.vue"
import members from "./members/members.vue"

import { mapGetters } from "vuex";

export default {
  components: {
    toolbar,
    members
  },
  data() {
    return {
      zoom: 1
    }
  },
  computed: mapGetters({
    "profile" : "getProfile",
    "treeData" : "getTreeData"
  }),
  mounted(){
    let self = this;
    this.onResetClick();
    this.$store.dispatch("loadTreeData", this.profile);
    this.$store.watch(function(){
      self.$store.dispatch("saveTreeDataInStorage", self.profile);
    });
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
    }
  }
}