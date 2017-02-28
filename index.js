var treeFolderContents = {
  props: ['children'],
  components: {
    "tree-folder": treeFolder
  },
  template: '<ul>' +
    '<li v-for="child in children">' +
    '<tree-folder v-if="child.children" :children="child"/>' +
    '<span v-else>{{ child.name }}</span>' +
    '</li>' +
    '</ul>'
}

var treeFolder = {
  // props: ['folder'],
  // template: "<p>" +
  //   '<span>{{ folder.name }}</span>' +
  //   '<tree-folder-contents :children="folder.children"/>' +
  //   '</p>'

  props: ['children'],
  components: {
    "tree-folder-contents": treeFolderContents
  },
  template: "<p>testete</p>"
}

var app = new Vue({
  el: '#app',
  components: {
    "tree-folder": treeFolder,
    "tree-folder-contents": treeFolderContents
  },
  data: {
    children: [{
      name: "x folder",
      children: [{
        name: "x1",
        children: [{
          name: "x11",
          children: [{
            name: "x111"
          }, {
            name: "x112"
          }]
        }]
      }, {
        name: "x2",
        children: [{
          name: "x21"
        }, {
          name: "x22",
          children: [{
            name: "x221"
          }, {
            name: "x222"
          }]
        }]
      }]
    }]
  }
});
