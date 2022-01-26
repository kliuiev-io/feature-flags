<template>
  <div class="home">
    <div>Groups</div>

    <el-table :data="instances" style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column fixed="right" label="Operations" width="350">
        <template #default="scope">
          <el-button type="primary" size="small" @click="renameInstance(scope.row.name)">Edit</el-button>
          <el-button type="danger" size="small" @click="deleteInstance(scope.row.name)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { InstancesApi } from '@/api/instances';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Groups extends Vue {
  private instances: {name: string}[] = [];

  mounted() {
    this.fetchInstances();
  }

  async fetchInstances(): Promise<void> {
    this.instances = (await InstancesApi.getInstances()).map((instance) => ({ name: instance }));
  }
}
</script>
