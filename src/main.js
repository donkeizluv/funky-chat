import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./styles/global-bg.css";

import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import VueSocketIOExt from "vue-socket.io-extended";
import socketInstance from "./utility/socket-instance";
import BootstrapVue from "bootstrap-vue";
// socketio
Vue.use(VueSocketIOExt, socketInstance, {
  store,
  actionPrefix: "SOCKET_",
  eventToActionTransformer: event => event.toUpperCase()
});
// bootstrap-vue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
