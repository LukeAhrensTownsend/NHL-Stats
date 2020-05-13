<template>
  <b-container class="py-3" fluid>
    <b-row cols="2">
      <b-col
        align="center"
        v-for="conference in this.$props.teamList"
        v-bind:key="conference.conferenceName"
      >
        <h3 class="text-center">{{ conference.conferenceName }}</h3>
        <img
          v-for="team in conference.teamRecords"
          v-bind:key="team.teamData.name"
          v-bind:class="{ 'active shadow': $route.params.teamId == team.teamData.id }"
          v-on:click="$route.params.teamId != team.teamData.id && $router.push({ params: { teamId: team.teamData.id } })"
          :src="require(`@/assets/NHL/team_logos/${team.teamData.id}.svg`)"
        />
      </b-col>
    </b-row>
    <b-container v-if="Object.keys(this.selectedTeamData).length !== 0 && !isFetching" fluid>
      <div class="team-name-display display-4 text-center my-2">{{ selectedTeamData.teamData.name }}</div>
      <div class="lead text-center mb-4">{{ selectedTeamData.teamData.division }}</div>
      <b-nav tabs justified>
        <b-nav-item
          v-bind:active="this.$route.params.teamStatsCategory === 'schedule'"
          v-on:click="$router.push('schedule')"
        >Schedule</b-nav-item>
        <b-nav-item
          v-bind:active="this.$route.params.teamStatsCategory === 'stats'"
          v-on:click="$router.push('stats')"
        >Stats</b-nav-item>
        <b-nav-item
          v-bind:active="this.$route.params.teamStatsCategory === 'roster'"
          v-on:click="$router.push('roster')"
        >Roster</b-nav-item>
      </b-nav>
      <b-container class="team-content p-4" fluid>
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
      </b-container>
    </b-container>
    <div v-if="isFetching" class="lead text-center my-5">Gathering team data...</div>
  </b-container>
</template>

<script>
import API from "../scripts/api";
import TeamSchedule from "../components/teams/TeamSchedule";
import TeamStats from "../components/teams/TeamStats";
import TeamRoster from "../components/teams/TeamRoster";

export default {
  name: "Teams",
  props: {
    teamList: Object,
    teamsDataCache: Array
  },
  head: {
    title: {
      inner: "Teams",
      complement: "NHL Stats"
    }
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
      if (
        !this.$props.teamsDataCache.some(
          team => team.teamData.id === parseInt(teamId)
        )
      ) {
        this.isFetching = true;

        if (this.$route.params.teamId != teamId)
          this.$router.push({ params: { teamId: teamId } });

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

      if (teamId === this.$route.params.teamId) {
        this.selectedTeamData = this.$props.teamsDataCache.find(
          team => team.teamData.id === parseInt(teamId)
        );
      }

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
.row .col:first-child {
  border-right: 1px solid #eee;
}

img {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  height: calc(30px + 2.5vw);
  padding: 5px 0;
  width: calc(30px + 2.5vw);
}

img:hover {
  border: 1px solid #ddd;
  cursor: pointer;
  transition: 0.3s;
}

img.active {
  background-color: #222;
}

img.active:hover {
  background-color: #222;
  cursor: default;
}

.team-name-display {
  font-size: calc(30px + 1.5vw);
}

.nav-link.active {
  background-color: #f8f9fa;
  border-bottom: 1px solid #f8f9fa;
}

.team-content {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>