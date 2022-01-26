<template>
  <div class="home">
    <h1>Instances <el-button round @click="createInstance">+</el-button></h1>

    <el-table :data="instances" style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column fixed="right" label="Operations" width="350">
        <template #default="scope">
          <el-button type="success" size="small" disabled>Flags</el-button>
          <el-button type="success" size="small" disabled>Groups</el-button>
          <el-button type="success" size="small" disabled>Users</el-button>
          <el-button type="primary" size="small" @click="renameInstance(scope.row.name)">Edit</el-button>
          <el-button type="danger" size="small" @click="deleteInstance(scope.row.name)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { InstancesApi } from '../../api/instances';

export default {
  setup() {
    const instances = ref<{name: string}[]>([]);

    async function fetchInstances() {
      // instances = instances.slice();
      instances.value = (await InstancesApi.getInstances()).map((instance) => ({ name: instance }));
    }

    async function deleteInstance(name: string) {
      if (!confirm(`Do you really want to delete instance ${name} and ALL ITS DATA (groups, users, flags)?`)) return;
      await InstancesApi.deleteInstance(name);
      instances.value = instances.value.filter((instance) => instance.name !== name);
    }

    async function createInstance() {
      const name = prompt('Enter instance name:', 'instance-name');

      if (!name) return;

      await InstancesApi.createInstance(name);

      instances.value.push({ name });
    }

    async function renameInstance(oldName: string) {
      const newName = prompt('Enter new instance name:', oldName);

      if (!newName) return;

      await InstancesApi.renameInstance(oldName, newName);

      instances.value = instances.value.map((instance) => (instance.name === oldName ? { name: newName } : instance));
    }

    onMounted(fetchInstances);

    return {
      instances,
      deleteInstance,
      createInstance,
      renameInstance,
    };
  },
};
// import { Options, Vue } from 'vue-class-component';

// @Options({
//   components: {
//   },
// })
// export default class Instances extends Vue {}
</script>
