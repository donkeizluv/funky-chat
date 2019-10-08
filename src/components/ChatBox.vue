<template>
  <div>
    <div class="panel panel-border" ref="chatarea">
      <b-row v-for="mess in messages" :key="mess.guid" class="m-2">
        <template v-if="mess.me">
          <!-- right side text -->
          <b-col>
            <b-row class="justify-content-end">
              <div class="message-text message-text-font message-text-me">{{mess.mess}}</div>
              <!-- <message-entry
                :username="mess.username"
                :message="mess.mess"
                :me="mess.me"
                :id="mess.guid"
              />-->
            </b-row>
          </b-col>
        </template>
        <template v-else>
          <!-- left side text -->
          <b-col>
            <b-row class="justify-content-start">
              <div class="message-text message-text-font message-text-other">
                <div class="username-others">{{mess.username}}:</div>
                <div>{{mess.mess}}</div>
              </div>
              <!-- <message-entry
                :username="mess.username"
                :message="mess.mess"
                :me="mess.me"
                :id="mess.guid"
              />-->
            </b-row>
          </b-col>
        </template>
      </b-row>
    </div>
    <b-row>
      <b-col>
        <b-form class="form-inline justify-content-end" autocomplete="off" @submit.stop.prevent>
          <b-form-group class="custom-text-input-border pr-3">
            <b-form-input
              class="custom-control-inline custom-text-input"
              :maxlength="maxMessageLength"
              v-model="newMessage"
              type="text"
              size="sm"
              @keyup.enter.native="submitMessage"
            ></b-form-input>
            <i @click="submitMessage" class="send-icon fas fa-paper-plane"></i>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { GEN_GUID, GEN_RANDOM_STRING } from "../store/actions/action-types";
import {
  SUBMIT_NEW_MESSAGE,
  SEND_GREETING,
  ADD_TEST_MESSAGES,
  FETCH_MESSAGES
} from "../store/actions/chatbox/action-types";
import { messages, lastGreeting } from "../store/getters/chatbox/getters-type";
import {
  isAuthenticated,
  currentUser,
  isDev,
  isProd
} from "../store/getters/getter-types";
// some problem with 2 root elements
// import MessageEntry from "./shared/MessageEntry";

const CHATBOX_STORE = "chatbox";

export default {
  name: "ChatBox",
  sockets: {
    connect() {
      // eslint-disable-next-line no-console
      // console.log("socket connected");
    }
  },
  // components: {
  //   MessageEntry
  // },
  watch: {
    messages() {
      let vm = this;
      // scroll after render is completed to prevent missing last line
      vm.$nextTick(() => {
        vm.scrollDownBottom();
      });
    }
    // lastGreeting() {

    // }
  },
  async mounted() {
    await this.SEND_GREETING();
    await this.FETCH_MESSAGES();
    // if (this.isDev) {
    //   this.ADD_TEST_MESSAGES(111);
    // }
  },
  computed: {
    ...mapGetters(CHATBOX_STORE, [messages, lastGreeting]),
    ...mapGetters([isAuthenticated, currentUser, isDev, isProd]),
    canSubmitNewMessage() {
      return this.newMessage.trim() !== "";
    }
  },
  props: {
    maxMessageLength: {
      type: Number,
      default: 128
    }
  },
  data() {
    return {
      // messages: [],
      newMessage: ""
    };
  },
  methods: {
    ...mapActions(CHATBOX_STORE, [
      SUBMIT_NEW_MESSAGE,
      SEND_GREETING,
      ADD_TEST_MESSAGES,
      FETCH_MESSAGES
    ]),
    ...mapActions([GEN_GUID, GEN_RANDOM_STRING]),

    async submitMessage() {
      if (!this.canSubmitNewMessage) return;
      await this.SUBMIT_NEW_MESSAGE(this.newMessage);
      this.clearNewMessage();
    },
    clearNewMessage() {
      this.newMessage = "";
    },
    scrollDownBottom() {
      let chatArea = this.$refs.chatarea;
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/modules/chatbox.scss";
</style>