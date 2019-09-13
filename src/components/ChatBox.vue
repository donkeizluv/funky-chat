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
      <b-col sm="auto">
        <b-form
          autocomplete="off"
          inline
          @submit.stop.prevent
        >
          <b-form-group
            id="input-group-1"
            label-for="input-1"
          >
            <b-form-input
              maxlength=128
              id="input-1"
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
import { GEN_GUID, GEN_RANDOM_STRING } from "../store/actions/action-types";
import { mapActions, mapGetters } from "vuex";
import {
  isAuthenticated,
  currentUser,
  isDev,
  isProd
} from "../store/getters/getter-types";
const sendMessageAction = "sending message";
export default {
  name: "ChatBox",
  sockets: {
    connect() {
      // eslint-disable-next-line no-console
      // console.log("socket connected");
    },
    newMessage(data) {
      this.onNewMessageReceived(data);
    }
  },
  async mounted() {
    if (this.isDev) {
      await this.addTestMessages(15);
    }
  },
  computed: {
    ...mapGetters([isAuthenticated, currentUser, isDev, isProd]),
    canSubmitNewMessage() {
      return this.newMessage.trim() !== "";
    }
  },
  data() {
    return {
      messages: [],
      newMessage: ""
    };
  },
  methods: {
    ...mapActions([GEN_GUID, GEN_RANDOM_STRING]),
    async submitMessage() {
      if (!this.canSubmitNewMessage) return;
      let newMessage = await this.createNewMessage(this.newMessage.trim());
      this.clearNewMessage();
      // this.messages.push(newMessage);
      this.$socket.emit(sendMessageAction, newMessage);
    },
    addMessage(message) {
      this.messages.push(message);
    },
    async createNewMessage(mess) {
      return {
        me: true,
        username: this.currentUser.username,
        guid: await this.GEN_GUID(),
        stamp: new Date(),
        mess: mess
      };
    },
    clearNewMessage() {
      this.newMessage = "";
    },
    scrollDownBottom() {
      let chatArea = this.$refs.chatarea;
      chatArea.scrollTop = chatArea.scrollHeight;
    },
    onNewMessageReceived(data) {
      let message = {
        me: this.currentUser.username === data.username,
        username: data.username,
        guid: data.guid,
        stamp: data.stamp,
        mess: data.mess
      };
      this.addMessage(message);
      if (message.me) {
        let vm = this;
        // scroll after render is completed to prevent missing last line
        this.$nextTick(() => {
          vm.scrollDownBottom();
        });
      }
    },
    async addTestMessages(messageCount) {
      for (let index = 0; index < messageCount; index++) {
        let mess = await this.createNewMessage(
          await this.GEN_RANDOM_STRING(10)
        );
        if (index % 2) {
          mess.me = false;
          mess.username = `${mess.username}_2`;
        }
        await this.addMessage(mess);
      }
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
  max-height: 500px;
  max-width: 800px;
  width: 100%;
  height: 80%;
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

@media (max-width: 690px) {
}
</style>