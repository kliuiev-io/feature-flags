<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="currentPath"
          mode="horizontal"
        >
          <li class="el-menu-item title"><b>Feature flags</b></li>
          <el-menu-item v-for="link in links" :index="link[0]" :key="link[0]">
            <router-link class="link" :to="link[0]">{{link[1]}}</router-link>
          </el-menu-item>

          <div style="margin-left: 45vw" class="instance-select">Current instance:&nbsp;&nbsp;</div>

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
    [`/client`, `Test client`],
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

.link {
  text-decoration: none;
}

.title::before {
  $size: 24px;
  background: url('./assets/logo.png');

  content: '';
  width: $size;
  height: $size;
  background-size: contain;
  position: absolute;
  left: -$size / 2;
}

.title:hover,
.title:focus {
  background-color: inherit !important;
  cursor: default;
}
</style>
