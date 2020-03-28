<template>
  <div id="app">
    <div class="navbar">
      <router-link to="/standings">Standings</router-link>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  background-color: white;
  position: sticky;
  top: 0;
  width: 100%;
}

.navbar a {
  display: inline-block;
  padding: 10px 15px;
}

.router-link-active {
  color: black;
  cursor: default;
  font-weight: 600;
  text-decoration: none;
}
</style>
