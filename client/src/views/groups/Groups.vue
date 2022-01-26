<template>
  <div class="home">
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
</template>

<script lang="ts">
import { GroupsApi, Group } from '@/api/groups';
import { Options, Vue } from 'vue-class-component';

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
    const name = prompt(`Enter group name:`, `New group`);

    if (!name) return;

    const description = prompt(`Enter group description`);

    if (description === null) return;

    await GroupsApi.createGroup(this.instance, name, description);

    await this.fetchGroups();
  }

  async editGroup(group: Group) {
    const name = prompt(`Enter group's new name:`, group.name);

    if (!name) return;

    const description = prompt(`Enter group's new description`, group.description);

    if (description === null) return;

    await GroupsApi.updateGroup(group.id, this.instance, name, description);

    await this.fetchGroups();
  }

  async deleteGroup(groupId: string) {
    if (!confirm(`Do you really want to relete the group?`)) return;

    await GroupsApi.deleteGroup(groupId, this.instance);

    await this.fetchGroups();
  }
}
</script>
