import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import store from "./store/index";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(
  new VueSocketIO({
    debug: false,
    connection:
      process.env.VUE_APP_ENV === "prod"
        ? process.env.VUE_APP_BASE_URI
        : "localhost:8000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
