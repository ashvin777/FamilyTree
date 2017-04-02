<template>
  <!-- App -->
  <div id="app">
    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <f7-navbar>
              <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
              </f7-nav-left>
              <f7-nav-center sliding>Family Tree</f7-nav-center>
              <f7-nav-right>
                <f7-link>
                  <f7-icon material="favorite"></f7-icon>
                </f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-subnavbar>
              <f7-link @click.native="publish('recenter')">
                <f7-icon material="face"></f7-icon>
              </f7-link>
              <f7-link @click.native="publish('zoomOut')">
                <f7-icon material="zoom_out"></f7-icon>
              </f7-link>
              <f7-link @click.native="publish('zoomIn')">
                <f7-icon material="zoom_in"></f7-icon>
              </f7-link>
            </f7-subnavbar>
            <!-- <f7-page-content> -->
            <TreeContainer></TreeContainer>
            <!-- </f7-page-content> -->
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>
  
  </div>
</template>

<script>
  import Events from "./events"
  import TreeContainer from "./components/TreeContainer.vue"
  
  export default {
    components: {
      TreeContainer
    },
    methods: {
      publish: function(eventName) {
        Events.publish(eventName);
      }
    }
  }
</script>

<style lang="scss">
  $pink: #e91e63;
  $lightBlack: #1b1b1b;
  body,
  html {
    font-family: Roboto, Noto Sans, Noto, sans-serif;
  }
  
  .navbar {
    background: $pink;
    // height: 64px;
    .navbar-inner {
      .center {
        font-weight: 100;
        font-size: 20px;
        text-align: center;
      }
    }
  }
  
  .subnavbar {
    background: $lightBlack;
    color: white;
    display: inline-block;
    // top: 63px;
    padding: 0px 3px;
    a {
      width: 50px;
      display: inline-block;
      float: right;
      line-height: 48px;
    }
  }
  
  .pages {
    .page {
      background: rgba(0, 0, 0, .87);
      .page-content {
        padding-top: 104px;
      }
    }
    .autocomplete-page {
      .searchbar {
        background: $lightBlack;
      }
      .page-content {
        color: white;
        font-weight: 200;
      }
    }
  }
</style>
