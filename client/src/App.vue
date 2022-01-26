<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="currentPath"
          class="el-menu-demo"
          mode="horizontal"
        >
          <li class="el-menu-item"><el-link href="/"><b>Feature flags</b></el-link></li>
          <el-menu-item v-for="link in links" :index="link[0]" :key="link[0]">
            <el-link :href="link[0]">{{link[1]}}</el-link>
          </el-menu-item>
          <!-- <el-menu-item index="3"><el-link href="/groups">Groups</el-link></el-menu-item>
          <el-menu-item index="4"><el-link href="/users">Users</el-link></el-menu-item> -->
          <el-menu-item index="5" disabled>Admins</el-menu-item>
        </el-menu>
      </el-header>

      <el-aside></el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const currentPath = computed(() => router.currentRoute.value.path);

    const links = [
      ['/instances', 'Instances'],
      ['/groups', 'Groups'],
      ['/users', 'Users'],
    ];

    return {
      currentPath,
      links,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
