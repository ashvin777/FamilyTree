<template>
<li>
  <div class="node" v-for="member in model.members" :class="{ 'partners' : model.members.length > 1,  'open' : open, 'root' : !$parent.model}">
    <md-card md-with-hover>
      <md-card-media>
        <md-card-media md-ratio="1:1">
          <img v-if="!member.picture" :src="'http://graph.facebook.com/'+member.id+'/picture?type=square&height=400'" alt="Skyscraper">
          <img v-if="member.picture" :src="member.picture.data.url" alt="Skyscraper">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <input v-model="member.name" />
          </md-card-header>

          <md-card-actions>
            <!-- <md-button class="md-icon-button" @click.native="changeType"> -->
            <md-button class="md-icon-button">
              <md-menu>
                <md-icon md-menu-trigger>person_add</md-icon>
                <md-menu-content>
                  <md-menu-item v-for="friend in friends" @click.native="addChild(friend)">
                    <md-icon>person_add</md-icon>
                    <span>{{friend.name}}</span>
                  </md-menu-item>
                </md-menu-content>
              </md-menu>

              <!-- <md-icon>person_add</md-icon> -->
            </md-button>

            <md-button class="md-icon-button" @click.native="toggle">
              <md-icon v-if="isFolder && !open">arrow_drop_down</md-icon>
              <md-icon v-if="isFolder && open">arrow_drop_up</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-menu>
                <md-icon md-menu-trigger>more_vert</md-icon>
                <md-menu-content>
                  <md-menu-item @click.native="addParent" v-show="!$parent.model">
                    <span>Add Parents</span>
                    <md-icon>exposure_plus_1</md-icon>
                  </md-menu-item>
                  <md-menu-item @click.native="addSpouse" v-show="model.members.length == 1">
                    <span>Add Spouse</span>
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
    <tree class="item" v-for="(model, index) in model.children" :model="model" :key="index" :friends="friends">
    </tree>
  </ul>
</li>
</template>

<script>
import Vue from "vue"

export default {
  name: "tree",
  props: {
    model: Object,
    friends: Array
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
    addChild: function(child) {
      var childName = "Children";
      this.model.children.push({
        members: [child],
        children: []
      });
      this.open = true;
    },
    addSpouse: function(){
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
      this.model.children.push(this.model);
    },
    remove: function() {
      var index = this.$parent.model.children.indexOf(this.model)
      this.$parent.model.children.splice(index, 1);
    }
  }
}
</script>

<style>
.node {
  width: 150px;
  margin: auto;
  display: inline-block;
  padding: 0 10px;
  position: relative;
}

.md-card .md-card-header {
  padding: 0px;
  margin-top: -45px;
  background-color: rgba(38, 39, 44, 0.57);
}

.md-card .md-card-header input {
  width: 100%;
  background: transparent;
  border: 0px;
  height: 45px;
  border: 0px;
  color: white;
  font-weight: 500;
  font-size: 16px;
  padding-left: 8px;
}

.md-card .md-card-actions {
  padding: 0px;
}

.md-subtoolbar {
  min-height: 40px;
  line-height: 40px;
  text-align: right;
  color: #fce2eb;
  background: rgba(0, 0, 0, 0.17);
}

ul:not(.md-list)>li+li {
  margin-top: 0px;
}

.node.partners.open:first-child:before {
  content: '';
  position: absolute;
  top: 50%;
  right: -0.5px;
  border-right: 1px solid #ccc;
  width: 0;
  height: 50%;
}

.node.partners:first-child:after {
  content: '';
  position: absolute;
  top: 50%;
  right: -0.5px;
  border-top: 1px solid #ccc;
  width: 15px;
  height: 0px;
}

/*.node.partners:nth-of-type(2):before {
  content: '';
  position: absolute;
  top: calc( 50% - 3px);
  left: -2.5px;
  width: 6px;
  height: 6px;
  background: #25e82d;
  border-radius: 100%;
  z-index: 10;
}*/


.node.partners:not(.root):nth-of-type(1):before {
  content: '';
  position: absolute;
  top: 0%;
  right: -0px;
  border-right: 1px solid #ccc;
  width: 0;
  height: 50%;
}

.node.partners:nth-of-type(2):after {
  content: '';
  position: absolute;
  top: 50%;
  left: -1px;
  border-top: 1px solid #ccc;
  width: 15px;
  height: 0px;
}
</style>
