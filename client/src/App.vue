<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <li class="el-menu-item"><el-link href="/"><b>Feature flags</b></el-link></li>
          <el-menu-item index="2"><el-link href="/instances">Instances</el-link></el-menu-item>
          <el-menu-item index="3"><el-link href="/groups">Groups</el-link></el-menu-item>
          <el-menu-item index="4"><el-link href="/users">Users</el-link></el-menu-item>
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
