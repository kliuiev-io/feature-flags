<template>
  <div class="home">
    <h1>Users <el-button round @click="registerUser">+</el-button></h1>

    <el-table :data="users" style="width: 100%">
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="groups" label="Groups" />
      <el-table-column prop="flags" label="Flags" />
      <el-table-column fixed="right" label="Operations" width="256">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editGroups(scope.row.email)">Groups</el-button>
          <el-button type="primary" size="small" @click="editFlags(scope.row.email)">Flags</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row.email)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { User, UsersApi } from '../../api/users';

@Options({})
export default class Users extends Vue {
  private users: User[] = [];

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
    const email = prompt(`Enter email:`);

    if (!email) return;

    await UsersApi.registerUser(email, this.instance);

    await this.fetchUsers();
  }

  async editGroups(email: string) {
    alert('Not implemented yet');
  }

  async editFlags(email: string) {
    alert('Not implemented yet');
  }

  async deleteUser(email: string) {
    if (!confirm(`Do you really want to relete the user ${email}?`)) return;

    await UsersApi.deleteUser(email, this.instance);

    await this.fetchUsers();
  }
}
</script>
