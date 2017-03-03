import Vue from 'vue'
import VueMaterial from 'vue-material'

import App from './App.vue'

Vue.use(VueMaterial);

new Vue({
  el: '#app',
  render: h => h(App)
});
