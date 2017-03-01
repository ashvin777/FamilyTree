var data = {
  name: '+',
  children: []
}

// define the item component
Vue.component('tree', {
  template: '#tree-template',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      var childName = "Children";
      if (!childName) return;
      this.model.children.push({
        name: childName
      })
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#app',
  data: {
    treeData: data
  }
})
