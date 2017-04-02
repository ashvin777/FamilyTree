<template>
  <li>
    <div class="node" v-for="member in model.members" :key="member.id" :class="{ 'partners' : model.members.length > 1,  'open' : open, 'root' : !$parent.model}">
      <TreeMember :friends.sync="friends" :model="model" :member="member" @open-action="onOpenAction"></TreeMember>
    </div>
    <ul v-show="open" v-if="isFolder">
      <TreeMembers class="item" v-for="(model, index) in model.children" :model="model" :key="index" :friends.sync="friends">
      </TreeMembers>
    </ul>
  </li>
</template>

<script>
  import Vue from "vue"
  import TreeMember from "./TreeMember.vue"
  
  export default {
    name: "TreeMembers",
    props: {
      model: Object,
      friends: Array
    },
    components: {
      TreeMember
    },
    data: function() {
      return {
        open: true
      }
    },
    computed: {
      isFolder: function() {
        return this.model.children &&
          this.model.children.length
      }
    },
    methods: {
      onOpenAction: function(open) {
        this.open = open;
      }
    }
  }
</script>
