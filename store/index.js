/* eslint-disable no-debugger */
/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import uuidv1 from "uuid/v1";
import { AUTHENTICATED, CURRENT_USER } from "./mutations/mutation-types";
import { LOGIN, GEN_GUID, GEN_RANDOM_STRING } from "./actions/action-types";
import {
  isAuthenticated,
  isDev,
  isProd,
  currentUser
} from "./getters/getter-types";
// import localForage from "localforage";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  // modules: {
  // },
  state: {
    isAuthenticated: false,
    currentUser: {
      userId: null,
      username: null
    }
  },
  getters: {
    [isAuthenticated]: s => s.isAuthenticated,
    [currentUser]: s => s.currentUser,
    [isDev]: () => process.env.VUE_APP_ENV === "dev",
    [isProd]: () => process.env.VUE_APP_ENV === "prod"
  },
  mutations: {
    [AUTHENTICATED]: (s, v) => {
      s.isAuthenticated = v;
    },
    [CURRENT_USER]: (s, v) => {
      s.currentUser = v;
    }
  },
  actions: {
    [LOGIN]: ({ commit }, p) => {
      commit(AUTHENTICATED, true);
      commit(CURRENT_USER, p);
    },
    [GEN_GUID]: () => {
      return uuidv1();
    },
    [GEN_RANDOM_STRING](length) {
      return uuidv1();
    }
  }
});
