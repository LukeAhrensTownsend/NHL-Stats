<template>
  <b-container id="app" class="px-0" fluid>
    <b-navbar id="navbar" class="justify-content-center py-0" type="dark" sticky>
      <b-navbar-nav>
        <b-nav-item to="/standings" v-bind:active="this.$route.path.includes('standings')">Standings</b-nav-item>
        <b-nav-item to="/teams" v-bind:active="this.$route.path.includes('teams')">Teams</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view
      :teamList="teamList"
      :teamsDataCache="teamsDataCache"
      v-on:addToTeamsDataCache="addToTeamsDataCache"
    ></router-view>
  </b-container>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
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

#navbar {
  background-color: #222;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

#navbar .active {
  border-bottom: 5px solid #007cb2;
}

.custom-table {
  font-size: 0.8em;
  overflow-x: auto;
  width: 100%;
}

.custom-table table {
  border-collapse: collapse;
  min-width: 500px;
  width: 100%;
}

.custom-table tr {
  background-color: white;
  border-bottom: 1px solid #eee;
}

.custom-table tr:hover {
  background-color: rgb(250, 250, 250);
  cursor: default;
}

.custom-table th,
.custom-table td {
  text-align: left;
  padding: 12px 8px;
}

.custom-table th {
  background-color: rgb(245, 245, 245);
  font-weight: 600;
}
</style>
