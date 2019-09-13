<template>
  <div id="app">
    <view
      :is=currentView
      @login=onLogin
    />
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import ChatBox from "./components/ChatBox.vue";
import { mapActions, mapGetters } from "vuex";
import { LOGIN, GEN_GUID } from "../store/actions/action-types";
import { isAuthenticated, currentUser } from "../store/getters/getter-types";

export default {
  name: "app",
  components: {
    LoginForm,
    ChatBox
  },
  computed: {
    ...mapGetters([isAuthenticated, currentUser]),
    currentView() {
      if (this.isAuthenticated) return ChatBox;
      return LoginForm;
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapActions([LOGIN, GEN_GUID]),
    async onLogin(cred) {
      await this.LOGIN({
        userId: await this.GEN_GUID(),
        username: cred.username
      });
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
