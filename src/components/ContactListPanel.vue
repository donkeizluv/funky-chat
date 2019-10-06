<template>
  <div class="panel panel-border">
    <b-row
      v-for="contact in contacts"
      :key="contact"
      class="p-1"
    >
      <b-col>
        <span class="entry entry-font">
          {{contact}}
        </span>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "ContactListPanel",
  data() {
    return {};
  },
  props: {
    contacts: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/modules/contact-list-panel.scss";
</style>