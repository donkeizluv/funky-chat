<template>
  <div id="app">
    <view :is=currentView  @login=onLogin :username=username />
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import ChatBox from "./components/ChatBox.vue";

export default {
  name: "app",
  components: {
    LoginForm,
    ChatBox
  },
  computed: {
    currentView() {
      if(this.loggedin)
        return "ChatBox"
      return "LoginForm"
    }
  },
  data() {
    return {
      loggedin: false,
      username: ''
    };
  },
   methods: {
    onLogin(cred) {
      this.loggedin = true;
      this.username = cred.username;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
