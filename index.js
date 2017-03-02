var data = {
  name: '',
  children: []
}

// define the item component
Vue.component('tree', {
  template: '#tree-template',
  props: {
    model: Object
  },
  data: function() {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function() {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function() {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      } else {
        this.addChild();
      }
    },
    addChild: function() {
      var childName = "Children";
      if (!childName) return;
      this.model.children.push({
        name: childName
      });
    },
    remove : function(){

      var index = this.$parent.model.children.indexOf(this.model)
    this.$parent.model.children.splice(index, 1)

      // delete this.$parent.model.children[this.$parent.model.children.indexOf(this.model)];
      // this.$parent.model.children.$remove(this.model);
    }
  }
})

Vue.use(VueMaterial);
// boot up the demo
new Vue({
  el: '#app',
  data: {
    treeData: data
  },
  watch: {
    treeData: {
      handler: function(newTreeData) {
        localStorage.setItem("TREE_DATA", JSON.stringify(newTreeData));
      },
      deep: true
    }
  },
  mounted: function() {
    this.treeData = JSON.parse(localStorage.getItem("TREE_DATA")) || {};
    var $mainContent = $(this.$el).find(".main-content");
    $mainContent.scrollLeft(2500 - $mainContent.width() / 2);
  }
})
