<template>
  <el-dialog :model-value="Boolean(instance)" :title="`Edit flags for ${instance}`"
    @close="close" @open="onOpen" >
    <el-table :data="Object.values(flags)">
      <el-table-column
        property="name"
        label="Name"
        width="256"
      ></el-table-column>
      <el-table-column
        property="description"
        label="Description"
      >
        <template #default="scope">
          {{scope.row.description}}
          <el-button circle @click="changeFlagDescription(scope.row.name)">
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
            @change="toggleFlagState(scope.row.name)"
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
          <el-button circle type="danger" @click="deleteFlag(scope.row.name)">
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button @click="addFlag">Add flag</el-button>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Edit, Delete } from '@element-plus/icons-vue';
import { Flag, InstancesApi } from "@/api/instances";
import { confirm, prompt } from '@/utils';
import { validateFlagNameRegexp } from '@/constants';

@Options({
  components: { Edit, Delete },
  props: { instance: { type: String } },
})
export default class FlagsDialog extends Vue {
  private readonly instance = ``;

  private flags: Flag[] = [];

  close() {
    this.flags = [];
    this.$emit(`update:instance`, null);
  }

  onOpen() {
    return this.fetchFlags();
  }

  async fetchFlags() {
    this.flags = await InstancesApi.getFlags(this.instance);
  }

  async addFlag() {
    const name = await prompt(`Add flag`, `Enter flag name:`, `new-flag`, {
      inputPattern: validateFlagNameRegexp,
      inputErrorMessage: `Invalid flag name`,
    });

    if (!name) return;

    await InstancesApi.createFlag(name, this.instance, ``, false);

    await this.fetchFlags();
  }

  async changeFlagDescription(name: string) {
    const flag = this.flags.find((_flag) => _flag.name === name);

    if (!flag) throw new Error();

    const description = await prompt(`Edit description`, `Enter new flag description:`, flag.description);

    if (description === null) return;

    await InstancesApi.updateFlag(name, this.instance, description, flag.defaultState);

    await this.fetchFlags();
  }

  async toggleFlagState(name: string) {
    const flag = this.flags.find((_flag) => _flag.name === name);

    if (!flag) throw new Error();

    await InstancesApi.updateFlag(name, this.instance, flag.description, !flag.defaultState);

    await this.fetchFlags();
  }

  async deleteFlag(name: string) {
    if (!await confirm(
      `Delete flag`,
      `Do you really want to delete flag ${name}? This will also delete all instances of this flag in any users and groups!`,
    )) return;

    await InstancesApi.deleteFlag(name, this.instance);

    await this.fetchFlags();
  }
}
</script>

<style>

</style>
