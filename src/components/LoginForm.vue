<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col sm="auto">
        <b-form
          @submit="onSubmit"
          inline
        >
          <b-form-group
            id="input-group-1"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="cred.username"
              type="text"
              required
              placeholder="Username"
            ></b-form-input>
            <b-button
              :disabled="!canSubmit"
              type="submit"
              variant="primary"
            >Submit</b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      cred: { username: "" }
    };
  },
  computed: {
    canSubmit() {
      return this.cred.username.trim() !== "";
    }
  },
  methods: {
    onSubmit() {
      this.$emit("login", { username: this.cred.username.trim() });
    }
  }
};
</script>
