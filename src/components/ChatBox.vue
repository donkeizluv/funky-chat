/* eslint-disable no-console */
<template>
  <b-container fluid>
    <div
      class="chatarea chatarea-border"
      ref="chatarea"
    >
      <b-row
        class="justify-content-center mt-2 mb-4"
        v-for="mess in messages"
        :key=mess.guid
      >
        <template v-if="mess.me">
          <!-- left most -->
          <b-col
            class="text-right"
            cols=1
            order=3
          >
            <!-- <b-badge
            class="badge-username"
            variant="success"
          >: {{mess.username}}</b-badge> -->
            <span class="badge-username d-inline-block pl-0">
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
          <!-- left most -->
          <b-col
            class="text-left"
            cols=1
            order=1
          >
            <!-- <b-badge
            class="badge-username"
            variant="secondary"
          >{{mess.username}} :</b-badge> -->
            <span class="badge-username d-inline-block">
              {{mess.username}}:
            </span>
          </b-col>
          <b-col
            class="text-left"
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
    &nbsp;
    &nbsp;
    &nbsp;
    <b-row class="justify-content-center">
      <b-col cols="2">
        <b-form
          autocomplete="off"
          inline
          @submit.stop.prevent
        >
          <b-form-group
            class="form-group-new-message"
            label-for="input-message"
            :description="`${newMessage.length}/${maxMessageLength}`"
          >
            <b-form-input
              id="input-message"
              :maxlength=maxMessageLength
              v-model="newMessage"
              type="text"
              @keyup.enter.native="submitMessage"
            ></b-form-input>
            &nbsp;
            <b-button
              size="sm"
              :disabled="!canSubmitNewMessage"
              @click="submitMessage"
              variant="primary"
            >Send</b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>

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
<style scoped>
.chatarea-border {
  border: solid;
  border-color: gainsboro;
  border-radius: 0.25rem;
}
.chatarea {
  display: inline-block;
  height: 500px;
  max-height: 500px;
  max-width: 800px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.chatbox-bg {
  background: rgb(250, 250, 250);
}
.badge-username {
  padding: 0.25em 0.4em;
  font-size: 13px;
  font-weight: bold;
  line-height: 16px;
}
.message-text {
  max-width: 100%;
  width: auto;
  display: block;
  border-radius: 0.25rem;
  overflow-wrap: break-word;
  padding: 0.25em 0.4em;
  margin: 0;
}
.message-text-font {
  color: white;
  font-size: 13px;
  line-height: 16px;
  font-weight: normal;
}
.message-text-me {
  float: right;
  text-align: right;
  background-color: #28a745;
}
.message-text-other {
  float: left;
  text-align: left;
  background-color: #6c757d;
}
.form-group-new-message {
  text-align: left;
}
</style>