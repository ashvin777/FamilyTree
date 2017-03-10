<template>
<f7-card>
  <f7-card-header no-border v-if="!member.picture" v-bind:style=" { backgroundImage: 'url(\'http://graph.facebook.com/'+member.id+'/picture?type=square&height=400\')' }">
    <input v-model="member.name" />
  </f7-card-header>
  <f7-card-header no-border v-if="member.picture" v-bind:style=" { backgroundImage: 'url(\''+member.picture.data.url+'\')' }">
    <input v-model="member.name" />
  </f7-card-header>
  <f7-card-footer>
    <f7-link class="autocomplete-standalone-popup">
      <input type="hidden">
      <div class="item-inner">
        <div class="item-title"></div>
        <div class="item-after"></div>
      </div>
      <f7-icon material="person_add"></f7-icon>
    </f7-link>
    <f7-link @click.native="toggle()">
      <f7-icon v-if="isFolder && !open" material="arrow_drop_down"></f7-icon>
      <f7-icon v-if="isFolder && open" material="arrow_drop_up"></f7-icon>
    </f7-link>
    <f7-link @click.native="remove()">
      <f7-icon material="more_vert"></f7-icon>
    </f7-link>
  </f7-card-footer>
  </div>

</f7-card>
</template>

<script>
import Vue from "vue"

export default {
  name: "TreeMember",
  components: {},
  props: {
    member: Object,
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
  mounted: function() {
    var self = this;
    this.$f7.autocomplete({
      opener: this.Dom7($(this.$el).find(".autocomplete-standalone-popup")),
      openIn: 'popup',
      pageTitle: 'Add Person',
      requestSourceOnOpen: true,
      backOnSelect: true,
      textProperty: 'name',
      limit : 30,
      source: self.personSource.bind(this),
      onChange: self.onPersonSelected.bind(this)
    });
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    addChild: function(child) {
      this.model.children.push({
        members: [child],
        children: []
      });
      this.open = true;
    },
    remove: function() {
      var index = this.$parent.model.children.indexOf(this.model)
      this.$parent.model.children.splice(index, 1);
    },
    personPicker() {
      return
    },
    personSource(autocomplete, query, render) {
      var results = [];
      // Find matched items
      for (var i = 0; i < this.friends.length; i++) {
        if (this.friends[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(this.friends[i]);
      }
      // Render items by passing array with result items
      render(results);
    },
    onPersonSelected(autocomplete, value) {
      this.addChild(value[0]);
    }
  }
}
</script>

<style lang="scss">
.tree {
    .card {
        margin: 0 8px;
        background: none;
        .card-header {
            padding: 0;
            height: 140px;
            background-size: cover;
            background-position: center center;
            input {
                position: absolute;
                bottom: 0;
                width: 100%;
                background: transparent;
                border: 0;
                line-height: 35px;
                border: 0;
                color: white;
                font-weight: 300;
                font-size: 16px;
                padding-left: 8px;
                background-color: rgba(38, 39, 44, 0.7);
                box-sizing: border-box;
            }
            &::after {
                display: none;
            }
        }
        .card-footer {
            padding: 0 7px;
            background: #1b1b1b;
            margin-top: -1px;
            min-height: 40px;
            &::before {
                display: none;
            }
            a {
                color: white;
                width: auto;
                min-width: 40px;
                height: auto;
                &:active {
                    opacity: 0.3;
                }
            }
        }
    }
}
</style>
