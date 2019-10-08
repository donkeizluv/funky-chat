<template>
  <div class="message-text">
    <template v-if="isMe">
      <div class="message-text-font message-text-me">
        <div>{{message}}</div>
      </div>
    </template>
    <template v-else>
      <div class="message-text-font message-text-other">
        <div class="username-others">{{username}}:</div>
        <div>{{message}}</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    me: {
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    isMe() {
      return !!this.me;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/modules/chatbox.scss";
</style>