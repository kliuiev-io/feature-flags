<template>
  <div class="home">
    <center>
      <h1>Feature flags</h1>
      <img alt="Vue logo" src="../assets/logo.png">
      <div>Select or create an instance to continue</div>
    </center>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Home extends Vue {}
</script>
