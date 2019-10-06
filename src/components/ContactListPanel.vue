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
<style scoped>
.entry {
  cursor: pointer;
}
.entry-font {
  font-size: 13px;
  line-height: 16px;
  font-weight: normal;
  color: white;
}
.panel-border {
  border: 2px;
  border-style: solid;
  border-color: rgb(76, 86, 122);
  border-radius: 0.4rem;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.panel {
  display: inline-block;
  height: 550px;
  max-height: 550px;
  max-width: 800px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
}
.panel::-webkit-scrollbar-track {
  -webkit-box-shadow: 0;
  box-shadow: 0;
  background-color: transparent;
}

.panel::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.panel::-webkit-scrollbar-thumb {
  background-color: rgb(187, 187, 187);
}
</style>