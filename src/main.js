import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import store from "./store/index";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

let conn =
  process.env.VUE_APP_ENV === "prod"
    ? process.env.VUE_APP_BASE_URI
    : "localhost:8000";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: conn
  })
);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
