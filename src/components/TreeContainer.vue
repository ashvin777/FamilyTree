<template>
  <div class="tree">
    <ul v-bind:style="{ transform: 'scale('+zoom+')' }">
      <TreeMembers :model="treeData" :friends.sync="friends">
      </TreeMembers>
    </ul>
    <Popover></Popover>
    <PersonPicker :friends.sync="friends"></PersonPicker>
  </div>
</template>

<script>
  import Vue from "vue"
  import TreeMembers from "./TreeMembers.vue"
  import FB from "../services/FB"
  import Events from "../services/events"
  import Popover from "./Popover.vue"
  import PersonPicker from "./PersonPicker.vue";
  
  import "./TreeStyle.vue"
  
  export default {
    name: 'app',
    components: {
      TreeMembers,
      Popover,
      PersonPicker
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
      this.recenter();
      this.loadFacebookData();
      Events.subscribe('zoomIn', this.zoomIn);
      Events.subscribe('zoomOut', this.zoomOut);
      Events.subscribe('recenter', this.recenter);
    },
    methods: {
      loadFacebookData() {
        var self = this;
        this.treeData = JSON.parse(localStorage.getItem("TREE_DATA")) || this.treeData;
        FB.getFriendsAndAccountDetails(function(profile, friends) {
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
      recenter: function() {
        var $el = $(this.$el);
        $el.scrollLeft(2500 - $el.width() / 2);
        $el.scrollTop(0);
      }
    }
  }
</script>

<style lang="scss">
  .popover {
    width: 200px;
  }
</style>
