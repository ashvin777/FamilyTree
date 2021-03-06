// Import Vue
import Vue from 'vue'

import jquery from 'jquery'
// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
// import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:*/
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

import VeeValidate from 'vee-validate';

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

//store
import store from './store'

import $ from 'jquery'

window.$ = $;

// Init F7 Vue Plugin
Vue.use(Framework7Vue);
Vue.use(VeeValidate);


// Init App
new Vue({
  el: '#app',
  store,
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    material: true,
    routes: Routes,
    pushState: true
  },
  // Register App Component
  components: {
    app: App
  }
});
