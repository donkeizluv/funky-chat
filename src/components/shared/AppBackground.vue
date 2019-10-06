<template>
  <div v-if="show">
    <div class="stars"></div>
    <div class="stars1"></div>
    <div class="stars2"></div>
  </div>
  <div v-else>
    <div class="black"></div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/modules/app.scss";
</style>