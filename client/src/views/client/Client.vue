<template>
  <div class="home">
    <h1>Test client flags</h1>

    <el-form label-width="120px">
      <el-form-item label="Instance">
        <el-input v-model="instance"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getFlags" :disabled="!instance">Get flags</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-tag v-for="flag in flags" :key="flag">{{flag}}</el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ClientApi } from '@/api/client';
import { ElMessage } from 'element-plus';

@Options({})
export default class Users extends Vue {
  private instance = ``;

  private email = ``;

  private flags: string[] = [];

  mounted() {
    this.instance = this.$store.state.currentInstance || ``;
  }

  async getFlags() {
    try {
      this.flags = await ClientApi.getFlags(this.instance, this.email);
    } catch (e) {
      ElMessage({ message: `Instance is not found (404)`, type: `error` });
    }
  }
}
</script>
