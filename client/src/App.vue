<template>
  <div id="app">
    <div class="navbar">
      <router-link to="/standings">Standings</router-link>
    </div>
    <div class="view-container">
      <router-view :currentSeasonData="currentSeasonData"></router-view>
    </div>
  </div>
</template>

<script>
import API from "../config/api";

export default {
  name: "App",
  data() {
    return {
      error: "",
      currentSeasonData: {}
    };
  },
  async created() {
    try {
      this.currentSeasonData = await API.getCurrentSeason();
    } catch (err) {
      this.error = err;
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Tahoma, Verdana, sans-serif;
}

.navbar {
  background-color: #FFF;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  width: 100%;
}

.navbar a {
  display: inline-block;
  padding: 15px;
}

.router-link-active {
  color: black;
  cursor: default;
  font-weight: 600;
  text-decoration: none;
}

.view-container {
  padding-top: 25px;
  padding-bottom: 10px;
}
</style>
