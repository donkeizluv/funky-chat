import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

require('dotenv').config()

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: `${process.env.HOST || 'localhost'}:${process.env.PORT || 8000}`
  })
);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
