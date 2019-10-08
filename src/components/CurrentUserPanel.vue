<template>
  <div class="panel panel-border">
    <b-row v-for="user in users" :key="user" class="p-1">
      <b-col>
        <span class="entry entry-font">{{user}}</span>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "CurrentUserPanel",
  data() {
    return {};
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/modules/current-user-panel.scss";
</style>