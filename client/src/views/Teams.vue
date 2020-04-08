<template>
  <div class="teams-container">
    <div class="teams-navbar">
      <div
        v-for="conference in this.$props.teamList"
        v-bind:key="conference.conferenceName"
        class="teams-navbar-conference"
      >
        <div class="teams-navbar-conference-header">{{ conference.conferenceName }}</div>
        <div class="teams-navbar-conference-content">
          <a
            class="teams-navbar-team"
            v-for="team in conference.teamRecords"
            v-bind:key="team.teamData.name"
          >
            <img
              v-bind:class="{ active: $route.params.teamId == team.teamData.id }"
              v-on:click="$route.params.teamId != team.teamData.id && $router.push({ params: { teamId: team.teamData.id } })"
              :src="require(`@/assets/NHL/team_logos/${team.teamData.id}.svg`)"
            />
          </a>
        </div>
      </div>
    </div>
    <div
      id="team-container"
      class="team-container"
      v-if="Object.keys(this.selectedTeamData).length !== 0 && !isFetching"
    >
      <div class="teams-content-teamname">{{ selectedTeamData.teamData.name }}</div>
      <div class="teams-content-teamdivision">{{ selectedTeamData.teamData.division.name }}</div>
      <div class="team-content">
        <div class="team-content-navbar">
          <div
            v-bind:class="{ active: this.$route.params.teamStatsCategory === 'schedule' }"
            v-on:click="$router.push('schedule')"
          >Schedule</div>
          <div
            v-bind:class="{ active: this.$route.params.teamStatsCategory === 'stats' }"
            v-on:click="$router.push('stats')"
          >Stats</div>
          <div
            v-bind:class="{ active: this.$route.params.teamStatsCategory === 'roster' }"
            v-on:click="$router.push('roster')"
          >Roster</div>
        </div>
        <div class="team-content-main">
          <TeamSchedule
            v-if="this.$route.params.teamStatsCategory === 'schedule'"
            :selectedTeamData="selectedTeamData"
          />
          <TeamStats
            v-if="this.$route.params.teamStatsCategory === 'stats'"
            :selectedTeamData="selectedTeamData"
          />
          <TeamRoster
            v-if="this.$route.params.teamStatsCategory === 'roster'"
            :selectedTeamData="selectedTeamData"
          />
        </div>
      </div>
    </div>
    <div v-if="isFetching" class="loading-prompt">Gathering team data...</div>
  </div>
</template>

<script>
import API from "../../config/api";
import TeamSchedule from "../components/teams/TeamSchedule";
import TeamStats from "../components/teams/TeamStats";
import TeamRoster from "../components/teams/TeamRoster";

export default {
  name: "Teams",
  props: {
      teamList: Object,
      teamsDataCache: Array
  },
  data: function() {
    return {
      selectedTeamData: {},
      isFetching: false
    };
  },
  components: {
    TeamSchedule,
    TeamStats,
    TeamRoster
  },
  methods: {
    fetchTeamData: async function(teamId) {
      if (!this.$props.teamsDataCache.some(team => team.teamData.id === parseInt(teamId))) {
        this.isFetching = true;

        let teamData = await API.getTeamData(teamId);
        let seasonGames = await API.getSeasonGamesByTeam(teamId, "20192020");

        for (const player of teamData.roster) {
          let data = await API.getPlayerData(player.person.id);

          player.person = data.people[0];
          delete player.jerseyNumber;
          delete player.position;
        }

        this.$emit("addToTeamsDataCache", {
            teamData,
            seasonGames
        });
      }

      this.selectedTeamData = this.$props.teamsDataCache.find(
        team => team.teamData.id === parseInt(teamId)
      );

      if (this.$route.params.teamId != teamId)
        this.$router.push({ params: { teamId: teamId } });

      this.isFetching = false;
    }
  },
  watch: {
    "$route.params.teamId": function() {
      if (this.$route.params.teamId !== "0") {
        this.fetchTeamData(this.$route.params.teamId);
      } else {
        this.selectedTeamData = {};
      }
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
  margin: 0 2px;
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

.team-container {
  padding: 1% 2% 2% 2%;
}

.team-content {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  margin-top: 1%;
}

.team-content-navbar {
  display: flex;
  margin-bottom: 20px;
}

.team-content-navbar div {
  background-color: rgb(250, 250, 250);
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  flex: 1;
  padding: 15px 0;
  text-align: center;
}

.team-content-navbar div:first-child {
  border-left: none;
  border-top-left-radius: 5px;
}

.team-content-navbar div:last-child {
  border-top-right-radius: 5px;
}

.team-content-navbar div:hover {
  background-color: rgb(245, 245, 245);
  cursor: pointer;
}

.team-content-navbar .active {
  background-color: #fff;
  border-bottom: none;
}

.team-content-navbar .active:hover {
  background-color: initial;
  cursor: default;
  text-decoration: none;
}

.team-content-navbar .active:first-child {
  border-left: none;
  border-bottom-left-radius: 0;
}

.team-content-navbar .active:last-child {
  border-right: none;
  border-bottom-right-radius: 0;
}

.teams-content-teamname {
  font-size: 1.8em;
  margin-bottom: 10px;
}

.teams-content-teamname,
.teams-content-teamdivision {
  text-align: center;
}

.team-content-main {
  padding: 1% 2% 2% 2%;
}

.loading-prompt {
  font-size: 1.5em;
  margin-top: 10%;
  text-align: center;
}
</style>