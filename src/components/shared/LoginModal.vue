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
          required
          placeholder="Username"
        >
        </b-form-input>
        <b-form-input
          class="mt-3"
          type="password"
          placeholder="Password"
        >
        </b-form-input>
        <b-button
          class="mt-3"
          @click="onSubmit"
          :disabled="!canSubmit"
          variant="primary"
        >Submit</b-button>

      </b-form-group>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      cred: { username: "" }
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    canSubmit() {
      return this.cred.username.trim() !== "";
    }
  },
  methods: {
    onSubmit() {
      this.$emit("submit", { username: this.cred.username.trim() });
    }
  }
};
</script>
