<template>
  <div class="team-general-container">
    <div class="team-near-games">
      <div
        class="team-near-game"
        v-for="game in this.$props.selectedTeam.nearGames"
        v-bind:key="game.id"
      >
        <div class="team-near-game-header">{{game.header}}</div>
        <div
          class="team-near-game-time"
        >{{new Date(game.data.dates[0].games[0].gameDate).toDateString()}} - {{new Date(game.data.dates[0].games[0].gameDate).toLocaleTimeString()}}</div>
        <div class="team-near-game-venue">{{game.data.dates[0].games[0].venue.name}}</div>
        <div class="team-near-game-scoreboard">
          <div class="team-near-game-scoreboard-team">
            <img
              :src="require(`@/assets/NHL/team_logos/${game.data.dates[0].games[0].teams.away.team.id}.svg`)"
            />
            <div
              class="team-near-game-scoreboard-team-name"
            >{{game.data.dates[0].games[0].teams.away.team.name}}</div>
          </div>
          <div
            class="team-near-game-scoreboard-team-score"
            v-show="game.header === 'Previous Game'"
          >{{game.data.dates[0].games[0].teams.away.score}}</div>
          <span>-</span>
          <div
            class="team-near-game-scoreboard-team-score"
            v-show="game.header === 'Previous Game'"
          >{{game.data.dates[0].games[0].teams.home.score}}</div>
          <div class="team-near-game-scoreboard-team">
            <img
              :src="require(`@/assets/NHL/team_logos/${game.data.dates[0].games[0].teams.home.team.id}.svg`)"
            />
            <div
              class="team-near-game-scoreboard-team-name"
            >{{game.data.dates[0].games[0].teams.home.team.name}}</div>
          </div>
        </div>
        <div class="team-near-game-broadcasts">
          TV:
          <div
            class="team-near-game-broadcasts-tv"
            v-for="broadcast in game.data.dates[0].games[0].broadcasts"
            v-bind:key="broadcast.id"
          >{{`${broadcast.name}${(game.data.dates[0].games[0].broadcasts.indexOf(broadcast) !== (game.data.dates[0].games[0].broadcasts.length - 1)) ? ', ' : ''}`}}</div>
          <span>&#183;</span>
          Radio:
          <div
            class="team-near-game-broadcasts-radio"
            v-for="broadcast in game.data.dates[0].games[0].radioBroadcasts"
            v-bind:key="broadcast.name"
          >{{`${broadcast.name} (${broadcast.type})${(game.data.dates[0].games[0].radioBroadcasts.indexOf(broadcast) !== (game.data.dates[0].games[0].radioBroadcasts.length - 1)) ? ', ' : ''}`}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamSchedule",
  props: {
    selectedTeam: Object
  }
};
</script>

<style scoped>
.team-near-games {
  display: flex;
}

.team-near-games img {
  height: 75px;
}

.team-near-game {
  flex: 1;
  padding: 0 2%;
}

.team-near-game:first-child {
  border-right: 1px solid #eee;
}

.team-near-game-header {
  font-size: 1.4em;
  margin-bottom: 20px;
}

.team-near-game-time,
.team-near-game-broadcasts {
  font-size: 0.8em;
}

.team-near-game-broadcasts {
  margin-top: 35px;
}

.team-near-game-broadcasts span {
  margin: 0 10px;
}

.team-near-game-venue {
  font-size: 0.9em;
  margin-bottom: 10px;
}

.team-near-game-header,
.team-near-game-time,
.team-near-game-venue,
.team-near-game-broadcasts {
  text-align: center;
}

.team-near-game-broadcasts-tv,
.team-near-game-broadcasts-radio {
  display: inline;
}

.team-near-game-scoreboard {
  display: flex;
  justify-content: center;
}

.team-near-game-scoreboard span {
  color: #222;
  cursor: default;
  font-weight: 1000;
  font-size: 40px;
  margin: 10px 4%;
}

.team-near-game-scoreboard-team {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.team-near-game-scoreboard-team-name {
  font-size: 1em;
  margin-top: 15px;
}

.team-near-game-scoreboard-team-score {
  font-size: 3.5em;
}
</style>