<template>
  <div class="home" v-if="instance">
    <h1>Users <el-button round @click="registerUser">+</el-button></h1>

    <el-table :data="users" style="width: 100%">
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="groups" label="Groups">
        <template #default="scope">
          <el-tag v-for="group in scope.row.groups" :key="group.name">{{group.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="flags" label="Flags">
        <template #default="scope">
          <el-tag v-for="flag in scope.row.flags" :key="flag.name">{{flag.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="256">
        <template #default="scope">
          <el-button type="success" size="small" @click="editGroups(scope.row.email)">Groups</el-button>
          <el-button type="success" size="small" @click="editFlags(scope.row.email)">Flags</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row.email)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <flags-dialog v-model:user="editFlagsUser" @update:user="fetchUsers" />
    <groups-dialog v-model:user="editGroupsUser" @update:user="fetchUsers" />
  </div>
  <el-empty v-else description="Please select an Instance" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { User, UsersApi } from '@/api/users';
import { confirm, prompt } from '@/utils';
import { validateEmailRegexp } from '@/constants';
import FlagsDialog from './FlagsDialog.vue';
import GroupsDialog from './GroupsDialog.vue';

@Options({ components: { FlagsDialog, GroupsDialog } })
export default class Users extends Vue {
  private users: User[] = [];

  private editFlagsUser: string | null = null;

  private editGroupsUser: string | null = null;

  mounted() {
    this.fetchUsers();
  }

  get instance() {
    return this.$store.state.currentInstance;
  }

  async fetchUsers() {
    this.users = await UsersApi.getUsers(this.instance);
  }

  async registerUser() {
    const email = await prompt(`Register user`, `Enter email:`, ``, {
      inputPattern: validateEmailRegexp,
      inputErrorMessage: `Invalid email`,
    });

    if (!email) return;

    await UsersApi.registerUser(email, this.instance);

    await this.fetchUsers();
  }

  async editGroups(email: string) {
    this.editGroupsUser = email;
  }

  async editFlags(email: string) {
    this.editFlagsUser = email;
  }

  async deleteUser(email: string) {
    if (!await confirm(`Delete user`, `Do you really want to relete the user ${email}?`)) return;

    await UsersApi.deleteUser(email, this.instance);

    await this.fetchUsers();
  }
}
</script>
