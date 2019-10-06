/* eslint-disable no-console */
<template>
  <div>
    <div
      class="panel panel-border"
      ref="chatarea"
    >
      <b-row
        v-for="mess in messages"
        :key=mess.guid
        :class="['mt-2', 'mb-4', mess.me ? 'justify-content-end' : 'justify-content-start']"
      >
        <template v-if="mess.me">
          <!-- right side text -->
          <b-col
            class="text-right mr-4"
            cols=1
            order=3
          >
            <span class="username-me d-inline-block pl-0">
              :{{mess.username}}
            </span>
          </b-col>
          <b-col
            class="text-right pr-0"
            order=2
            cols=4
          >
            <span class="message-text message-text-font message-text-me">
              {{mess.mess}}</span>
          </b-col>
          <b-col
            cols="6"
            order="1"
          >
            <!-- padding -->
          </b-col>
        </template>
        <template v-else>
          <!-- left side text -->
          <b-col
            class="text-left ml-2"
            cols=1
            order=1
          >
            <span class="username-others d-inline-block">
              {{mess.username}}:
            </span>
          </b-col>
          <b-col
            class="text-left pl-3"
            order=2
            cols=4
          >
            <span class="message-text message-text-font message-text-other">
              {{mess.mess}}</span>
          </b-col>
          <b-col
            cols="6"
            order="3"
          >
            <!-- padding -->
          </b-col>
        </template>
      </b-row>
    </div>
    <b-row>
      <b-col sm>
        <b-form
          class="form-inline justify-content-end"
          autocomplete="off"
          @submit.stop.prevent
        >
          <b-form-group class="custom-text-input-border pr-3">
            <b-form-input
              class="custom-control-inline custom-text-input"
              :maxlength=maxMessageLength
              v-model="newMessage"
              type="text"
              size="sm"
              @keyup.enter.native="submitMessage"
            ></b-form-input>
            <!-- <b-button
              class="custom-control-inline"
              :disabled="!canSubmitNewMessage"
              @click="submitMessage"
              variant="outline-primary"
            >
              <i
                @click="submitMessage"
                :disabled="!canSubmitNewMessage"
               class="fas fa-paper-plane"></i>
            </b-button> -->

            <i
              @click="submitMessage"
              class="send-icon fas fa-paper-plane"
            ></i>
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
const CHATBOX_STORE = "chatbox";

export default {
  name: "ChatBox",
  sockets: {
    connect() {
      // eslint-disable-next-line no-console
      // console.log("socket connected");
    }
  },
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