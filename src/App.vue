<template>
<div id="app" class="tree" v-cloak>
  <md-toolbar class="md-accent">
    <md-button class="md-icon-button">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title" style="flex: 1">Family Tree</h2>

    <md-button class="md-icon-button">
      <md-icon>favorite</md-icon>
    </md-button>
  </md-toolbar>
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
  <div class="main-content">
    <ul v-bind:style="{ transform: 'scale('+zoom+')' }">
      <tree :model="treeData" :friends="friends">
      </tree>
    </ul>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import Tree from './Tree.vue'
import TreeStyle from "./TreeStyle.vue"
import FB from "./FB"

export default {
  name: 'app',
  components: {
    Tree
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
    this.treeData = JSON.parse(localStorage.getItem("TREE_DATA")) || this.treeData;
    var $mainContent = $(this.$el).find(".main-content");
    $mainContent.scrollLeft(2500 - $mainContent.width() / 2);
    $mainContent.scrollTop(100);
    this.initFB(this.getAccountDetails);
  },
  methods: {
    initFB: function(callback) {
      FB.init(function(response) {
        if (response.status === 'connected') {
          callback();
        } else if (response.status === 'not_authorized') {
          FB.login(function() {
            callback();
          });
        } else {
          console.log("other login error");
        }
      });
    },
    getAccountDetails: function() {
      let self = this;
      FB.getProfile(function(profile) {
        if (self.treeData.members.length == 0) {
          self.treeData.members.push(profile);
          self.getFriends();
        }
      });
    },
    getFriends: function() {
      let self = this;
      FB.getFriends(function(friends) {
        self.friends = friends.data.slice(0, 10);
      });
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
      var $mainContent = $(this.$el).find(".main-content");
      $mainContent.scrollLeft(2500 - $mainContent.width() / 2);
      $mainContent.scrollTop(0);
    }
  }
}
</script>

<style>

</style>
