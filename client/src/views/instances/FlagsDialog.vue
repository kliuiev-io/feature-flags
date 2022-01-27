<template>
  <el-dialog :model-value="Boolean(instance)" :title="`${instance} flags and defaults`"
    @close="close" @open="onOpen" >
    <el-table :data="Object.values(flags)">
      <el-table-column
        property="id"
        label="ID"
        width="256"
      ></el-table-column>
      <el-table-column
        property="description"
        label="Description"
      >
        <template #default="scope">
          {{scope.row.description}}
          <el-button circle @click="changeFlagDescription(scope.row.id)">
            <el-icon><edit /></el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        property="defaultState"
        label="Default state"
        width="128"
      >
        <template #default="scope">
          <el-switch
            @change="toggleFlagState(scope.row.id)"
            :model-value="scope.row.defaultState"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Operations"
        width="100"
      >
        <template #default="scope">
          <el-button circle type="danger" @click="deleteFlag(scope.row.id)">
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button @click="addFlag">Add flag</el-button>
  </el-dialog>
</template>

<script lang="ts">
import { Flags, InstancesApi } from "@/api/instances";
import { Options, Vue } from "vue-class-component";
import { Edit, Delete } from '@element-plus/icons-vue';

@Options({
  components: { Edit, Delete },
  props: { instance: { type: String } },
})
export default class FlagsDialog extends Vue {
  private readonly instance = `instance-name`;

  private readonly testFlags = [{ name: `Test`, description: `Test flag`, defaultState: true }];

  private flags: Flags = {};

  close() {
    this.flags = {};
    this.$emit(`update:instance`, null);
  }

  onOpen() {
    return this.fetchFlags();
  }

  async fetchFlags() {
    this.flags = await InstancesApi.getFlags(this.instance);
  }

  async addFlag() {
    const name = prompt(`Enter flag name:`, `new-flag`);

    if (!name) return;

    const description = prompt(`Enter flag description:`);

    if (description === null) return;

    const defaultState = confirm(`Choose flag default state (OK - true, Cancel - false):`);

    await InstancesApi.createFlag(name, this.instance, description, defaultState);

    await this.fetchFlags();
  }

  async changeFlagDescription(id: string) {
    const flag = this.flags[id];

    const description = prompt(`Enter new flag description:`, flag.description);

    if (description === null) return;

    await InstancesApi.updateFlag(id, this.instance, description, flag.defaultState);

    await this.fetchFlags();
  }

  async toggleFlagState(id: string) {
    const flag = this.flags[id];

    await InstancesApi.updateFlag(id, this.instance, flag.description, !flag.defaultState);

    await this.fetchFlags();
  }

  async deleteFlag(id: string) {
    if (!confirm(`Do you really want to delete flag ${id}? This will also delete all instances of this flag in any users and groups!`)) return;

    await InstancesApi.deleteFlag(id, this.instance);

    await this.fetchFlags();
  }
}
</script>

<style>

</style>
