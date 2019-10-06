<template>
  <div id="app">
    <app-bg :show="isAuthenticated" />
    <login-modal
      @submit="loginSubmit"
      :show="!isAuthenticated"
    />
    <b-container
      fluid
      class="mx-auto"
    >
      <b-row class="justify-content-center">
        <b-col
          class="p-0"
          cols=2
          xl=2
          lg=2
          md=2
        >
          <contact-list-panel :contacts="fakeContacts" />
        </b-col>
        <b-col
          class="p-0"
          cols=8
          xl=5
          md=8
        >
          <chat-box />
        </b-col>
        <b-col
          class="p-0"
          cols=2
          xl=2
          lg=2
          md=2
        >
          <current-user-panel :users="fakeUsers" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginModal from "./components/shared/LoginModal";
import ChatBox from "./components/ChatBox.vue";
import CurrentUserPanel from "./components/CurrentUserPanel.vue";
import ContactListPanel from "./components/ContactListPanel.vue";
import AppBg from "./components/shared/AppBackground";
import { mapActions, mapGetters } from "vuex";
import { LOGIN, GEN_GUID } from "./store/actions/action-types";
import { isAuthenticated, currentUser } from "./store/getters/getter-types";

export default {
  name: "app",
  components: {
    LoginModal,
    ChatBox,
    CurrentUserPanel,
    ContactListPanel,
    AppBg
  },
  computed: {
    ...mapGetters([isAuthenticated, currentUser]),
    fakeUsers: () => [
      "userA",
      "user_b",
      "user_c",
      "user_d",
      "user_e",
      "user_f",
      "user_g",
      "user_h"
    ],
    fakeContacts: () => [
      "contact_A",
      "contact_b",
      "contact_c",
      "contact_d",
      "contact_e",
      "contact_f",
      "contact_g",
      "contact_h"
    ]
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([LOGIN, GEN_GUID]),
    async loginSubmit(cred) {
      await this.LOGIN({
        userId: await this.GEN_GUID(),
        username: cred.username
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
