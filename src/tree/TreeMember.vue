<template>
<md-card md-with-hover>
  <md-card-media>
    <md-card-media md-ratio="1:1">
      <img v-if="!member.picture" :src="'http://graph.facebook.com/'+member.id+'/picture?type=square&height=400'" alt="Skyscraper">
      <img v-if="member.picture" :src="member.picture.data.url">
    </md-card-media>
    <md-card-area>
      <md-card-header>
        <input v-model="member.name" />
      </md-card-header>

      <md-card-actions>

        <md-button class="md-icon-button">
          <md-menu>
            <md-icon md-menu-trigger>person_add</md-icon>
            <md-menu-content>
              <md-menu-item @click.native="addChild()">
                <md-icon>person_add</md-icon>
                <span>Add Child</span>
              </md-menu-item>
              <md-menu-item @click.native="addSpouse" v-show="model.members.length == 1">
                <md-icon>exposure_plus_1</md-icon>
                <span>Add Spouse</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-button>

        <md-button class="md-icon-button" @click.native="toggle">
          <md-icon v-if="isFolder && !open">arrow_drop_down</md-icon>
          <md-icon v-if="isFolder && open">arrow_drop_up</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-menu>
            <md-icon md-menu-trigger>more_vert</md-icon>
            <md-menu-content>
              <md-menu-item @click.native="remove">
                <span>Delete</span>
                <md-icon>delete</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>

        </md-button>
      </md-card-actions>
    </md-card-area>
  </md-card-media>
</md-card>
</template>

<script>
import Vue from "vue"

export default {
  name: "TreeMember",
  components: {
  },
  props: {
    member: Object,
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
  watch: {},
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    addChild: function(child) {
      var childName = "Children";
      this.model.children.push({
        members: [child],
        children: []
      });
      this.open = true;
    },
    addSpouse: function() {
      var childName = "Children";
      debugger;
      this.model.members.push({
        "id": "34sdt348f7",
        "name": childName,
        "sex": 2,
        "image": "people/kurchik.jpg"
      });
    },
    addParent: function() {
      var childName = "Children";
      //this.model.children.push(this.model);
    },
    remove: function() {
      var index = this.$parent.model.children.indexOf(this.model)
      this.$parent.model.children.splice(index, 1);
    }
  }
}
</script>
