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
<style scoped>
.panel-border {
  border: 2px;
  border-style: solid;
  border-color: rgb(76, 86, 122);
  border-left-width: 1px;
  border-right-width: 1px;
}
.panel {
  display: inline-block;
  height: 600px;
  max-height: 550px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
}
.panel::-webkit-scrollbar-track {
  -webkit-box-shadow: 0;
  box-shadow: 0;
  background-color: transparent;
}

.panel::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.panel::-webkit-scrollbar-thumb {
  background-color: rgb(187, 187, 187);
  border-radius: 1rem;
}

.username-others {
  padding: 0.25em 0.4em;
  font-size: 13px;
  font-weight: bold;
  line-height: 16px;
  color: gainsboro;
}
.username-me {
  padding: 0.25em 0.4em;
  font-size: 13px;
  font-weight: bold;
  line-height: 16px;
  color: forestgreen;
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
.send-icon {
  color: #007bff;
}
.send-icon:hover {
  cursor: pointer;
}
.custom-text-input-border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: rgb(76, 86, 122);
  border-bottom-right-radius: 0.5rem;
}
.custom-text-input {
  background: transparent;
  color: lightgray;
  border: 0;
}
.custom-text-input:focus {
  background: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>