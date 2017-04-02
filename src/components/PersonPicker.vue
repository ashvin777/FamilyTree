<template>
  
</template>

<script>
  import Vue from "vue";
  import Events from "../services/events";
  
  var subscribition;
  export default {
    name: "PersonPicker",
    props: {
      friends: Array
    },
    data: function() {
      return {
        initialized: false,
        autocomplete: Object
      }
    },
    watch: {
      friends: function() {
        if (this.friends.length > 0) {
          this.init();
        }
      }
    },
    mounted: function() {
      if (this.friends.length > 0) {
        this.init();
      }
      subscribition = Events.subscribe("PersonPicker:open", this.openPersonPicker.bind(this));
    },
    methods: {
      init() {
        var self = this;
        if (this.initialized == false) {
          console.log("Loaded Persons");
          this.autocomplete = this.$f7.autocomplete({
            openIn: 'popup',
            pageTitle: 'Add Person',
            requestSourceOnOpen: true,
            backOnSelect: true,
            textProperty: 'name',
            limit: 30,
            onClose: self.onPickerClose.bind(self),
            source: self.getPersonData.bind(self),
            onChange: self.onPersonSelected.bind(self)
          });
          this.initialized = true;
        }
      },
      openPersonPicker: function() {
        if (Object.keys(this.autocomplete).length > 0) {
          this.autocomplete.open();
        }
      },
      getPersonData(autocomplete, query, render) {
        var results = [];
        for (var i = 0; i < this.friends.length; i++) {
          if (this.friends[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(this.friends[i]);
        }
        render(results);
      },
      onPersonSelected(autocomplete, value) {
        Events.publish("PersonPicker:on-selected", value);
      },
      onPickerClose(){
        Events.publish("PersonPicker:closed");
      }
    }
  }
</script>