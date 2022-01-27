<template>
  <div class="home">
    <h1>Instances <el-button round @click="createInstance">+</el-button></h1>

    <el-table :data="instances" style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column fixed="right" label="Operations" width="350">
        <template #default="scope" width="100">
          <el-button type="success" size="small" @click="editFlags(scope.row.name)">Flags</el-button>
          <el-button type="primary" size="small" @click="renameInstance(scope.row.name)">Edit</el-button>
          <el-button type="danger" size="small" @click="deleteInstance(scope.row.name)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <flags-dialog v-model:instance="editFlagsInstance" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { InstancesApi } from '@/api/instances';
import { confirm, prompt } from '@/utils';
import { validateInstanceNameRegexp } from '@/constants';
import FlagsDialog from './FlagsDialog.vue';

@Options({ components: { FlagsDialog } })
export default class Instances extends Vue {
  instances: {name: string}[] = [];

  editFlagsInstance: string | null = null;

  mounted() {
    this.fetchInstances();
  }

  async fetchInstances() {
    const instances = await InstancesApi.getInstances();

    this.instances = instances.map((instance) => ({ name: instance }));

    await this.$store.dispatch(`fetchInstances`);
  }

  async createInstance() {
    const name = await prompt(`Create instance`, `Enter instance name:`, `instance-name`, {
      inputPattern: validateInstanceNameRegexp,
      inputErrorMessage: `Invalid name`,
    });

    if (!name) return;

    await InstancesApi.createInstance(name);

    await this.fetchInstances();
  }

  async renameInstance(oldName: string) {
    const newName = await prompt(`Rename instance`, `Enter new instance name:`, oldName, {
      inputPattern: validateInstanceNameRegexp,
      inputErrorMessage: `Invalid name`,
    });

    if (!newName) return;

    await InstancesApi.renameInstance(oldName, newName);

    await this.fetchInstances();
  }

  async deleteInstance(name: string) {
    if (!await confirm(
      `Delete instance`,
      `Do you really want to delete instance ${name} and ALL ITS DATA (groups, users, flags)?`,
    )) return;

    await InstancesApi.deleteInstance(name);

    await this.fetchInstances();
  }

  async editFlags(instance: string) {
    this.editFlagsInstance = instance;
  }
}
</script>
