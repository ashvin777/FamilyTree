<template>
<div id="app" v-cloak>
  <Navbar></Navbar>
  <div class="main-content">
    <TreeContainer></TreeContainer>
  </div>
  <FacebookFriendsPicker></FacebookFriendsPicker>
</div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html, body{
    background: #26272c !important;
    color: white;
    height: 100%;
    &.md-theme-default {
        background: #26272c !important;
        color: white;
        height: 100%;
    }
    #app {
        height: 100%;
        .main-content {
            height: calc( 100% - 64px);
        }
    }
}
</style>

<script>
import TreeContainer from './tree/TreeContainer.vue'
import TreeStyle from "./tree/TreeStyle.vue"
import Navbar from "./navbar/Navbar.vue"
import FacebookFriendsPicker from "./components/FacebookFriendsPicker.vue"

import $ from 'jquery';
window.$ = $;

export default {
  name: 'app',
  components: {
    TreeContainer,
    Navbar,
    FacebookFriendsPicker
  }
}
</script>
