<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="currentPath"
          mode="horizontal"
        >
          <li class="el-menu-item"><el-link href="/"><b>Feature flags</b></el-link></li>
          <el-menu-item v-for="link in links" :index="link[0]" :key="link[0]">
            <el-link :href="link[0]">{{link[1]}}</el-link>
          </el-menu-item>
          <el-menu-item index="5" disabled>Admins</el-menu-item>

          <el-select :model-value="currentInstance" @change="changeInstance" class="instance-select" placeholder="Select">
            <el-option
              v-for="instance in instances"
              :key="instance"
              :label="instance"
              :value="instance"
            >
            </el-option>
          </el-select>
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
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class App extends Vue {
  private readonly links = [
    [`/instances`, `Instances`],
    [`/groups`, `Groups`],
    [`/users`, `Users`],
  ];

  get currentPath() {
    return this.$router.currentRoute.value.path;
  }

  get instances() {
    return this.$store.state.instances;
  }

  get currentInstance() {
    return this.$store.state.currentInstance;
  }

  changeInstance(instance: string) {
    this.$store.dispatch(`changeInstance`, instance);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.instance-select {
  place-self: center;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
