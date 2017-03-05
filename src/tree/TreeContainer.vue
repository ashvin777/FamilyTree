<template>
<div class="tree">
  <div class="md-subtoolbar">
    <md-button class="md-icon-button" @click.native="scrollReset()">
      <md-icon>face</md-icon>
    </md-button>
    <md-button class="md-icon-button" @click.native="zoomOut()">
      <md-icon>zoom_out</md-icon>
    </md-button>
    <md-button class="md-icon-button" @click.native="zoomIn()">
      <md-icon>zoom_in</md-icon>
    </md-button>
  </div>

  <ul v-bind:style="{ transform: 'scale('+zoom+')' }">
    <TreeMembers :model="treeData">
    </TreeMembers>
  </ul>
</div>
</template>

<style lang="scss">
.md-subtoolbar {
    min-height: 40px;
    line-height: 40px;
    text-align: right;
    color: #fce2eb;
    background: rgba(0, 0, 0, 0.17);
    position: absolute;
    z-index: 100;
}
</style>

<script>
import Vue from "vue"
import TreeMembers from "./TreeMembers.vue"
import FB from "../service/FB"

export default {
  name: 'app',
  components: {
    TreeMembers
  },
  data: function() {
    return {
      treeData: {
        members: [],
        children: []
      },
      friends: [],
      zoom: 1
    }
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
    this.init();
  },
  methods: {
    init() {
      this.scrollReset();
      this.loadFacebookData();
    },
    loadFacebookData() {
      var self = this;
      this.treeData = JSON.parse(localStorage.getItem("TREE_DATA")) || this.treeData;
      FB.getFriendsAndAccountDetails(function(profile, friends) {
        console.log(profile, friends, self.treeData.members);
        if (self.treeData.members.length == 0) {
          self.treeData.members.push(profile);
        }
        self.friends = friends;
      })
    },
    zoomIn: function($event) {
      if (this.zoom >= 1.5) {
        return;
      }
      this.zoom = this.zoom + 0.2;
    },
    zoomOut: function($event) {
      if (this.zoom < 0.5) {
        return;
      }
      this.zoom = this.zoom - 0.2;
    },
    scrollReset: function() {
      var $mainContent = $(".tree");
      $mainContent.scrollLeft(2500 - $mainContent.width() / 2);
      $mainContent.scrollTop(0);
    }
  }
}
</script>
