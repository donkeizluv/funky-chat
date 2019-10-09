import utilityHelper from "./helper";
import { AUTHENTICATED, CURRENT_USER } from "../mutations/mutation-types";
import { LOGIN, REGISTER_LOGIN, GET_USER } from "../actions/action-types";
import {
  isAuthenticated,
  isDev,
  isProd,
  currentUser
} from "../getters/getter-types";
import axios from "axios";
import apis from "../apis/apis";

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
  [LOGIN]: async ({ dispatch, commit }, p) => {
    let user = await dispatch(GET_USER, p);
    if (user) {
      commit(AUTHENTICATED, true);
      commit(CURRENT_USER, p);
      return true;
    }
    return false;
  },
  [GET_USER]: async (c, p) => {
    let { data } = await axios.post(apis.user_get, { username: p.username, pwd: p.pwd });
    return data;
  },
  [REGISTER_LOGIN]: async ({ commit }, p) => {
    await axios.post(apis.user_create, { username: p.username, pwd: p.pwd });
    commit(AUTHENTICATED, true);
    commit(CURRENT_USER, p);
    return true;
  },
  ...utilityHelper.actions
};

export default {
  state,
  getters,
  actions,
  mutations
};
