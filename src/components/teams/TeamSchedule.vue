<template>
  <b-container fluid>
    <b-row class="mb-4">
      <b-col
        class="team-near-game px-0 px-md-1"
        sm="12"
        md="6"
        v-for="game in this.$props.selectedTeamData.teamData.nearGames"
        v-bind:key="game.header"
      >
        <h3 class="text-center my-4">{{game.header}}</h3>
        <div v-if="game.data">
          <div class="lead text-center mb-3">
            {{new Date(game.data.dates[0].games[0].gameDate).toDateString()}} - {{new Date(game.data.dates[0].games[0].gameDate).toLocaleTimeString()}}
            <br />
            {{game.data.dates[0].games[0].venue.name}}
          </div>

          <div class="d-flex justify-content-center">
            <div class="text-center">
              <img
                :src="require(`@/assets/NHL/team_logos/${game.data.dates[0].games[0].teams.away.team.id}.svg`)"
                :style="{ height: '60px' }"
              />
              <div>{{game.data.dates[0].games[0].teams.away.team.name}}</div>
            </div>

            <div
              class="display-4 mx-2"
            >{{game.data.dates[0].games[0].status.abstractGameState === "Final" ? `${game.data.dates[0].games[0].teams.away.score} - ${game.data.dates[0].games[0].teams.home.score}` : "vs"}}</div>

            <div class="text-center">
              <img
                :src="require(`@/assets/NHL/team_logos/${game.data.dates[0].games[0].teams.home.team.id}.svg`)"
                :style="{ height: '60px' }"
              />
              <div>{{game.data.dates[0].games[0].teams.home.team.name}}</div>
            </div>
          </div>
          <small class="d-flex my-4 justify-content-center">
            <span class="mr-1">TV:</span>
            <div
              v-for="broadcast in game.data.dates[0].games[0].broadcasts"
              v-bind:key="broadcast.id"
              class="mr-1"
            >{{`${broadcast.name}${(game.data.dates[0].games[0].broadcasts.indexOf(broadcast) !== (game.data.dates[0].games[0].broadcasts.length - 1)) ? ', ' : ''}`}}</div>

            <span class="mx-2">&#183;</span>

            <span class="mr-1">Radio:</span>
            <div
              v-for="broadcast in game.data.dates[0].games[0].radioBroadcasts"
              v-bind:key="broadcast.name"
              class="mr-1"
            >{{`${broadcast.name} (${broadcast.type})${(game.data.dates[0].games[0].radioBroadcasts.indexOf(broadcast) !== (game.data.dates[0].games[0].radioBroadcasts.length - 1)) ? ', ' : ''}`}}</div>
          </small>
        </div>
        <div class="lead text-center my-5" v-else>Undetermined</div>

        <hr v-if="game.header === 'Previous Game'" class="d-md-none" />
        <div v-if="game.header === 'Next Game'" class="vr d-none d-md-block"></div>
      </b-col>
    </b-row>
    <Calendar class="w-100" :selectedTeamData="this.$props.selectedTeamData" />
  </b-container>
</template>

<script>
import Calendar from "../../components/teams/Calendar";

export default {
  name: "TeamSchedule",
  components: {
    Calendar
  },
  props: {
    selectedTeamData: Object
  }
};
</script>

<style>
.vr {
  border-left: 1px solid #eee;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
}
</style>