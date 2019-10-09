<template>
  <b-modal
    v-model="show"
    title="Login"
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-footer
    hide-header-close
    size="sm"
  >
    <div class="text-center">
      <b-form-group>
        <b-form-input
          class="mt-2"
          v-model="cred.username"
          type="text"
          :maxlength="usernameLength"
          required
          placeholder="Username"
        ></b-form-input>
        <b-form-input class="mt-3" v-model="cred.pwd" type="password" placeholder="Password"></b-form-input>
        <div class="m-2 text-danger">{{errorMessage}}</div>
        <b-button
          class="mt-2 mr-1"
          @click="onSubmit"
          :disabled="!canSubmit"
          variant="primary"
        >Submit</b-button>
        <b-button
          class="mt-2 ml-1"
          @click="onRegister"
          :disabled="!canSubmit"
          variant="success"
        >Register</b-button>
      </b-form-group>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { LOGIN, REGISTER_LOGIN } from "../../store/actions/action-types";

export default {
  name: "LoginForm",
  data() {
    return {
      errorMessage: null,
      cred: { username: "", pwd: "" }
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    usernameLength: {
      type: Number,
      default: 10
    }
  },
  computed: {
    canSubmit() {
      return this.cred.username.trim() !== "" && this.cred.pwd.trim() !== "";
    }
  },
  methods: {
    methods: {
      ...mapActions([LOGIN, REGISTER_LOGIN])
    },
    clearErrorMessage() {
      this.errorMessage = null;
    },
    async onSubmit(cred) {
      if (!this.canSubmit) return;
      this.clearErrorMessage();
      try {
        await this.LOGIN({
          username: cred.username,
          pwd: cred.pwd
        });
      } catch (ex) {
        this.errorMessage = ex.message || "Login failed.";
      }
    },
    async onRegister(cred) {
      if (!this.canSubmit) return;
      this.clearErrorMessage();
      try {
        await this.REGISTER_LOGIN({
          username: cred.username,
          pwd: cred.pwd
        });
      } catch (ex) {
        this.errorMessage = ex.message || "Register failed.";
      }
    }
  }
};
</script>
