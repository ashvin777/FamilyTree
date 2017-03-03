var data = {
  "members": [{
    "id": "34sdt348f7",
    "name": "Natālija",
    "sex": 2,
    "image": "people/kurchik.jpg"
  },{
    "id": "34sdt348f7",
    "name": "Natālija",
    "sex": 2,
    "image": "people/kurchik.jpg"
  }],
  children: []
};
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
  watch: {
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
      this.model.children.push({
        "members": [{
          "id": "34sdt348f7",
          "name": childName,
          "sex": 2,
          "image": "people/kurchik.jpg"
        }]
      });
    },
    remove: function() {
      var index = this.$parent.model.children.indexOf(this.model)
      this.$parent.model.children.splice(index, 1);
    }
  }
})

Vue.use(VueMaterial);
new Vue({
  el: '#app',
  data: {
    treeData: data,
    zoom: 1
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
    this.treeData = JSON.parse(localStorage.getItem("TREE_DATA")) || this.treeData;
    var $mainContent = $(this.$el).find(".main-content");
    $mainContent.scrollLeft(2500 - $mainContent.width() / 2);
    $mainContent.scrollTop(100);
  },
  methods: {
    zoomIn: function($event) {
      if (this.zoom >= 2) {
        return;
      }
      this.zoom = this.zoom + 0.3;
    },
    zoomOut: function($event) {
      if (this.zoom < 0.5) {
        return;
      }
      this.zoom = this.zoom - 0.3;
    },
    scrollReset: function() {
      var $mainContent = $(this.$el).find(".main-content");
      $mainContent.scrollLeft(2500 - $mainContent.width() / 2);
      $mainContent.scrollTop(0);
    }
  }
})
