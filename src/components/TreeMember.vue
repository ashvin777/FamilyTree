<template>
  <f7-card>
    <f7-card-header no-border v-if="!member.picture" v-bind:style=" { backgroundImage: 'url(\'http://graph.facebook.com/'+member.id+'/picture?type=square&height=400\')' }">
      <input v-model="member.name" />
    </f7-card-header>
    <f7-card-header no-border v-if="member.picture" v-bind:style=" { backgroundImage: 'url(\''+member.picture.data.url+'\')' }">
      <input v-model="member.name" />
    </f7-card-header>
    <f7-card-footer>
      <f7-link @click.native="toggle()">
        <f7-icon v-if="isFolder && !open" material="arrow_drop_down"></f7-icon>
        <f7-icon v-if="isFolder && open" material="arrow_drop_up"></f7-icon>
      </f7-link>
      <f7-link popover-persons-options open-popover @click.native="onClickOptions">
        <f7-icon material="more_vert"></f7-icon>
      </f7-link>
    </f7-card-footer>
  </f7-card>
</template>

<script>
  import Vue from "vue";
  import store from "../store";
  import Events from "../services/events";
  
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
        open: true,
        selectedOption: -1,
        popoverSub: null,
        personSubcribtion: null,
        popoverOptions: [{
          id: "profile",
          text: "Profile"
        }, {
          id: "add_child",
          text: "Add Child"
        }, {
          id: "add_spouse",
          text: "Add Spouse"
        }, {
          id: "delete",
          text: "Delete"
        }]
      }
    },
    computed: {
      isFolder: function() {
        return this.model.children &&
          this.model.children.length
      }
    },
    mounted: function() {
      this.opener = $(this.$el).find(".person-add-opener");
      Events.subscribe("Popover:closed", this.onOptionPopoverClosed.bind(this));
      Events.subscribe("PersonPicker:closed", this.onPersonPickerClosed.bind(this));
    },
    watch: {
      open: function() {
        this.$emit("open-action", this.open);
      }
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
      addSpouse(spouse) {
        this.model.members.push(spouse);
      },
      removePerson: function() {
        var index = this.$parent.$parent.model.children.indexOf(this.model);
        this.$parent.$parent.model.children.splice(index, 1);
      },
      onClickOptions() {
        var options = this.popoverOptions;
        if (this.model.members.length >= 2 && options.length != 3) {
          options.splice(2, 1);
        }
        Events.publish("Popover:set-options", options);
        this.popoverSub = Events.subscribe("Popover:on-option-selected", this.onSelectOption.bind(this));
      },
      onPersonSelected(person) {
        if (this.selectedOption.id == "add_child") {
          this.addChild(person[0]);
        } else if (this.selectedOption.id == "add_spouse") {
          this.addSpouse(person[0]);
        }
      },
      onSelectOption(option) {
        this.selectedOption = option[0];
        if (this.selectedOption.id == "delete") {
          this.removePerson();
        } else {
          Events.publish("PersonPicker:open");
          this.personSubcribtion = Events.subscribe("PersonPicker:on-selected", this.onPersonSelected.bind(this));
        }
      },
      onOptionPopoverClosed() {
        if (this.popoverSub) {
          this.popoverSub.remove();
          this.popoverSub = null;
        }
      },
      onPersonPickerClosed() {
        if (this.personSubcribtion) {
          this.personSubcribtion.remove();
          this.personSubcribtion = null;
        }
      }
    }
  }
</script>

<style lang="scss">
  .tree {
    .card {
      margin: 0;
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
