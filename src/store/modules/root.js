import utilityHelper from "./helper";
import { AUTHENTICATED, CURRENT_USER } from "../mutations/mutation-types";
import { LOGIN } from "../actions/action-types";
import {
  isAuthenticated,
  isDev,
  isProd,
  currentUser
} from "../getters/getter-types";

const state = {
  isAuthenticated: false,
  currentUser: {
    userId: null,
    username: null
  }
};
const getters = {
  [isAuthenticated]: s => s.isAuthenticated,
  [currentUser]: s => s.currentUser,
  [isDev]: () => process.env.VUE_APP_ENV === "dev",
  [isProd]: () => process.env.VUE_APP_ENV === "prod"
};
const mutations = {
  [AUTHENTICATED]: (s, v) => {
    s.isAuthenticated = v;
  },
  [CURRENT_USER]: (s, v) => {
    s.currentUser = v;
  }
};
const actions = {
  [LOGIN]: ({ commit }, p) => {
    commit(AUTHENTICATED, true);
    commit(CURRENT_USER, p);
  },
  ...utilityHelper.actions
};

export default {
  state,
  getters,
  actions,
  mutations
};
