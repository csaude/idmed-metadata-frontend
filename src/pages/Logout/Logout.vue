<template>
  <div>Logout</div>
</template>
<script>
import { SessionStorage } from 'quasar';

export default {
  data() {
    return {};
  },
  created: function () {
    SessionStorage.clear();
    this.$router.push({ path: '/Login' });
  },
};
</script>
