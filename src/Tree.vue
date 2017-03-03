<template>
<li>
  <div class="node" v-for="member in model.members" :class="{ 'partners' : model.members.length > 1}">
    <md-card md-with-hover>
      <md-card-media>
        <md-card-media md-ratio="1:1">
          <img src="assets/male.png" alt="Skyscraper">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <input v-model="member.name" />
          </md-card-header>

          <md-card-actions>
            <md-button class="md-icon-button" @click.native="changeType">
              <md-icon>person_add</md-icon>
            </md-button>

            <md-button class="md-icon-button" @click.native="toggle">
              <md-icon v-if="isFolder && !open">arrow_drop_down</md-icon>
              <md-icon v-if="isFolder && open">arrow_drop_up</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-menu>
                <md-icon md-menu-trigger>more_vert</md-icon>
                <md-menu-content>
                  <md-menu-item>
                    <span>Add Parents</span>
                    <md-icon>exposure_plus_1</md-icon>
                  </md-menu-item>
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
  </div>
  <ul v-show="open" v-if="isFolder">
    <tree class="item" v-for="(model, index) in model.children" :model="model" :key="index">
    </tree>
  </ul>
</li>
</template>

<script>
import Vue from "vue"

export default {
  name: "tree",
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
  watch: {},
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
}
</script>







<style></style>
