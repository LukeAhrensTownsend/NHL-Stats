<template>
  <div class="teams-container">
    <div class="teams-navbar">
      <div
        v-for="conference in this.$props.teams"
        v-bind:key="conference.conferenceName"
        class="teams-navbar-conference"
      >
        <div class="teams-navbar-conference-header">{{ conference.conferenceName }}</div>
        <div class="teams-navbar-conference-content">
          <a
            class="teams-navbar-team"
            v-for="team in conference.teamRecords"
            v-bind:key="team.name"
          >
            <img
              v-bind:class="{ active: $route.params.teamId == team.id }"
              v-on:click="fetchTeamData(team.id)"
              :src="require(`@/assets/NHL/team_logos/${team.id}.svg`)"
            />
          </a>
        </div>
      </div>
    </div>
    <div id="teams-content-container" class="teams-content-container">
      <div class="teams-content-teamname"></div>
    </div>
    <pre>{{teamsData}}</pre>
  </div>
</template>

<script>
import API from "../../config/api";
import router from "../router";

export default {
  name: "Teams",
  props: ["teams"],
  data: function() {
    return {
      teamsData: []
    };
  },
  methods: {
    fetchTeamData: async function(teamId) {
      if (!this.teamsData.some(team => team.id === teamId)) {
        let teamData = await API.getTeamData(teamId);
        this.teamsData.push(teamData);
      }

      router.push(`${teamId}`);
    }
  },
  async created() {
    if (this.$route.params.teamId !== "0")
      this.fetchTeamData(this.$route.params.teamId);
  }
};
</script>

<style scoped>
.teams-navbar {
  display: flex;
}

.teams-navbar-conference {
  flex: 1;
  text-align: center;
}

.teams-navbar-conference:first-child {
  border-right: 1px solid #ccc;
  padding-right: 2%;
}

.teams-navbar-conference:last-child {
  padding-left: 2%;
}

.teams-navbar-conference-header {
  font-size: 1.2em;
  padding-bottom: 15px;
}

.teams-navbar-conference-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.teams-navbar-team {
  box-sizing: border-box;
}

.teams-navbar-team img:hover {
  background-color: #eee;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: 0.3s;
}

.teams-navbar-team img {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 3px;
  height: 60px;
  padding: 5px 0;
}

.teams-navbar-team .active {
  background-color: #ddd;
  border: 1px solid #ccc !important;
}

.teams-navbar-team .active:hover {
  background-color: #ddd;
  cursor: default;
}
</style>