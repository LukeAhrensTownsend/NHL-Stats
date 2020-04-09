<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-links">
        <router-link to="/standings">Standings</router-link>
        <router-link to="/teams">Teams</router-link>
      </div>
    </div>
    <div class="view-container">
      <router-view
        :teamList="teamList"
        :teamsDataCache="teamsDataCache"
        v-on:addToTeamsDataCache="addToTeamsDataCache"
      ></router-view>
    </div>
  </div>
</template>

<script>
import API from "./scripts/api";

export default {
  name: "App",
  data() {
    return {
      error: "",
      teamList: {},
      teamsDataCache: []
    };
  },
  methods: {
    addToTeamsDataCache(teamData) {
      this.teamsDataCache.push(teamData);
    }
  },
  async created() {
    this.teamList = await API.getTeams();
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  font-family: Verdana, Helvetica, sans-serif;
  overflow-y: hidden;
}

.navbar {
  background-color: #222;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
}

.navbar-links {
  display: inline-block;
  margin: 0 auto;
}

.navbar a {
  border-bottom: 5px solid #222;
  color: #fff;
  display: inline-block;
  padding: 15px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: #007cb2;
  border-bottom: 5px solid #007cb2;
}

.router-link-active {
  background-color: #222 !important;
  border-bottom: 5px solid #007cb2 !important;
  color: black;
  cursor: default;
}

.view-container {
  background-color: rgb(245, 245, 245);
  color: #222;
  flex: 1;
  margin-top: 54px;
  overflow-y: auto;
  padding: 1% 25px;
}
</style>
