<template>
  <div class="home" v-if="instance">
    <h1>Groups <el-button round @click="createGroup">+</el-button></h1>

    <el-table :data="groups" style="width: 100%">
      <el-table-column prop="id" label="ID" width="128" />
      <el-table-column prop="name" label="Name" width="256" />
      <el-table-column prop="description" label="Description" />
      <el-table-column fixed="right" label="Operations" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editGroup(scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="deleteGroup(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-empty description="Please select an Instance" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { GroupsApi, Group } from '@/api/groups';
import { confirm, prompt } from '@/utils';

@Options({})
export default class Groups extends Vue {
  private groups: Group[] = [];

  mounted() {
    this.fetchGroups();
  }

  get instance() {
    return this.$store.state.currentInstance;
  }

  async fetchGroups() {
    this.groups = await GroupsApi.getGroups(this.instance);
  }

  async createGroup() {
    const name = await prompt(`Create group`, `Enter group name:`, `New group`);

    if (!name) return;

    const description = await prompt(`Create group`, `Enter group description`);

    if (description === null) return;

    await GroupsApi.createGroup(this.instance, name, description);

    await this.fetchGroups();
  }

  async editGroup(group: Group) {
    const name = await prompt(`Edit group`, `Enter group's new name:`, group.name);

    if (!name) return;

    const description = await prompt(`Edit group`, `Enter group's new description`, group.description);

    if (description === null) return;

    await GroupsApi.updateGroup(group.id, this.instance, name, description);

    await this.fetchGroups();
  }

  async deleteGroup(groupId: string) {
    if (!await confirm(`Delete group`, `Do you really want to relete the group?`)) return;

    await GroupsApi.deleteGroup(groupId, this.instance);

    await this.fetchGroups();
  }
}
</script>
