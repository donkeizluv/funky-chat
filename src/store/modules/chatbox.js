/* eslint-disable no-console */
import axios from "axios";
// names
import { GEN_GUID } from "../actions/action-types";
import {
  SEND_GREETING,
  SUBMIT_NEW_MESSAGE,
  REMOVE_MESSAGES,
  ADD_TEST_MESSAGES,
  FETCH_MESSAGES,
  SOCKET_ON_RECEIVED_MESSAGE,
  SOCKET_ON_RECEIVED_GREETING
} from "../actions/chatbox/action-types";
import {
  ADD_MESSAGES,
  SET_LAST_GREETING
} from "../mutations/chatbox/mutation-types";
import { messages, lastGreeting } from "../getters/chatbox/getters-type";
// apis
import apis from "../apis/apis";

// configs
const MESSAGE_LIMIT = 500;

// server side Socket events
const SEND_MESSAGE_SOCKET = "SEND_MESSAGE";
const SEND_GREETING_SOCKET = "SEND_GREETING";

const state = {
  messages: [],
  lastGreeting: ""
};
const getters = {
  [messages]: s => s.messages,
  [lastGreeting]: s => s.lastGreeting
};

const mutations = {
  [ADD_MESSAGES]: (s, v) => {
    if (!v) return;
    if (Array.isArray(v)) {
      s.messages = s.messages.concat(v);
      if (s.messages.length > MESSAGE_LIMIT) {
        s.messages.splice(0, s.messages.length - MESSAGE_LIMIT);
      }
      return;
    }
    if (s.messages.length > MESSAGE_LIMIT + 1) {
      s.messages.splice(0, 1);
    }
    s.messages.push(v);
  },
  [REMOVE_MESSAGES]: () => {
    // NYI
  },
  [SET_LAST_GREETING]: (s, v) => {
    s.lastGreeting = v;
  }
};
const actions = {
  [SUBMIT_NEW_MESSAGE]: async ({ dispatch, rootState }, p) => {
    let message = {
      userId: rootState.currentUser.userId,
      username: rootState.currentUser.username,
      guid: await dispatch(GEN_GUID, null, { root: true }),
      stamp: new Date(),
      mess: p.message
    };
    p.vm.$socket.emit(SEND_MESSAGE_SOCKET, message);
  },
  [SEND_GREETING]: ({ rootState }, p) => {
    p.vm.$socket.emit(SEND_GREETING_SOCKET, rootState.currentUser);
  },
  [SOCKET_ON_RECEIVED_MESSAGE]: ({ commit, rootState }, p) => {
    let message = {
      userId: p.userId,
      username: p.username,
      guid: p.guid,
      stamp: p.stamp,
      mess: p.mess,
      me: rootState.currentUser.userId === p.userId
    };
    commit(ADD_MESSAGES, message);
  },
  [SOCKET_ON_RECEIVED_GREETING]: ({ commit }, p) => {
    commit(SET_LAST_GREETING, p);
  },
  [FETCH_MESSAGES]: async ({ commit }) => {
    let { data } = await axios.get(apis.fetchMessages, { crossdomain: true });
    commit(
      ADD_MESSAGES,
      data
    );
  },
  [ADD_TEST_MESSAGES]: async ({ dispatch, commit, rootState }, p) => {
    let messages = [];
    for (let i = 0; i < p; i++) {
      let even = i % 2 === 0;
      messages.push({
        userId: even
          ? rootState.currentUser.userId
          : await dispatch(GEN_GUID, null, { root: true }),
        guid: await dispatch(GEN_GUID, null, { root: true }),
        mess:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        username: rootState.currentUser.username,
        stamp: new Date(),
        me: even
      });
    }
    commit(ADD_MESSAGES, messages);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
