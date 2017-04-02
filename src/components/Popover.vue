<template>
  <f7-popover class="popover-persons-options" @popover:close="onClosed">
    <f7-list>
      <ul>
        <li>
          <a href="#" @click="onOptionClicked(option)" v-for="(option, key) in options" class="list-button item-link close-popover">{{option.text}}</a>
        </li>
      </ul>
    </f7-list>
  </f7-popover>
</template>

<script>
  import Vue from "vue";
  import Events from "../services/events";
  
  export default {
    name: "Popover",
    data: function() {
      return {
        options: Array
      }
    },
    mounted() {
      Events.subscribe("Popover:set-options", this.setOptions.bind(this));
    },
    methods: {
      setOptions(options) {
        this.options = options;
      },
      onClosed() {
        Events.publish("Popover:closed");
      },
      onOptionClicked(option) {
        Events.publish("Popover:on-option-selected", [option]);
      }
    }
  }
</script>