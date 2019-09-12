<template>
  <b-container>
    <b-row
      v-for="mess in messages"
      :key=mess.guid
    >
      <b-col
        v-if="!mess.me"
        md="6"
      >
        <b-badge variant="secondary">{{mess.username}}</b-badge> :
        {{mess.mess}}
      </b-col>
      <b-col
        v-else
        md="6"
        offset-md="6"
      >
        {{mess.mess}}
        : <b-badge variant="secondary">{{mess.username}}</b-badge>

      </b-col>
      &nbsp;
    </b-row>
    &nbsp;
    &nbsp;
    <b-row class="justify-content-center">
      <b-col sm="auto">
        <b-form
          inline
          @submit.stop.prevent
        >
          <b-form-group
            id="input-group-1"
            label-for="input-1"
          >
            <b-form-input
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
const sendMessageAction = "sending message";
export default {
  name: "ChatBox",
  sockets: {
    connect() {
      // eslint-disable-next-line no-console
      // console.log("socket connected");
    },
    newMessage(data) {
      this.messageReceived({
        me: this.username === data.username,
        username: data.username,
        guid: data.guid,
        stamp: data.stamp,
        mess: data.mess
      });
    }
  },
  mounted() {
    // this.messages.push({
    //   me: false,
    //   username: "puku",
    //   guid: this.GenGuid(),
    //   stamp: new Date(),
    //   mess: "yoooooo423423423432423444444444"
    // });
    // this.messages.push({
    //   me: true,
    //   username: "buku",
    //   guid: this.GenGuid(),
    //   stamp: new Date(),
    //   mess: "hello! yoooooo423423423432423444444444444444444"
    // });
  },
  computed: {
    canSubmitNewMessage() {
      return this.newMessage.trim() !== "";
    }
  },
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      newMessage: ""
    };
  },
  methods: {
    submitMessage() {
      if(!this.canSubmitNewMessage) return;
      let newMessage = this.createNewMessage(this.newMessage.trim());
      this.clearNewMessage();
      // this.messages.push(newMessage);
      this.$socket.emit(sendMessageAction, newMessage);
    },
    messageReceived(message) {
      this.messages.push(message);
    },
    createNewMessage(mess) {
      return {
        me: true,
        username: this.username,
        guid: this.GenGuid(),
        stamp: new Date(),
        mess: mess
      };
    },
    clearNewMessage() {
      this.newMessage = "";
    },
    GenGuid() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
  }
};
</script>
