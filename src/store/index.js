import Vue from "vue";
import Vuex from "vuex";
import rootStore from "./modules/root";
import chatboxStore from "./modules/chatbox";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    chatbox: chatboxStore
  },
  state: rootStore.state,
  getters: rootStore.getters,
  mutations: rootStore.mutations,
  actions: rootStore.actions
});
