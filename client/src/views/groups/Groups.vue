<template>
  <div class="home">
    <div>Groups</div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { InstancesApi } from '@/api/instances';

export default {
  setup() {
    const instances = ref<string[]>([]);

    async function fetchInstances() {
      // instances = instances.slice();
      instances.value = await InstancesApi.getInstances();
    }

    onMounted(fetchInstances);

    return {
      instances,
    };
  },
};
// import { Options, Vue } from 'vue-class-component';

// @Options({
//   components: {
//   },
// })
// export default class Groups extends Vue {}
</script>
