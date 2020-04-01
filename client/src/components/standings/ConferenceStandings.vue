<template>
  <div class="conference-standings-container">
    <p class="error" v-if="error">{{ error }}</p>
    <div
      v-for="conference in this.$props.standings"
      :key="conference.conferenceName"
      class="conference-container"
    >
      <div class="standings-table">
        <table>
          <tr class="table-head">
            <th colspan="2">{{ conference.conferenceName }}</th>
            <th>GP</th>
            <th>W</th>
            <th>L</th>
            <th v-show="conference.teamRecords[0].leagueRecord.ties">T</th>
            <th v-show="$route.params.standingsSeason.substring(4) > 1999">OT</th>
            <th>PTS</th>
            <th v-show="conference.teamRecords[0].row">ROW</th>
            <th>GF</th>
            <th>GA</th>
            <th>DIFF</th>
            <th>HOME</th>
            <th>AWAY</th>
            <th v-show="$route.params.standingsSeason.substring(4) > 1999">S/O</th>
            <th>L10</th>
            <th>STRK</th>
          </tr>
          <tr v-for="team in conference.teamRecords" :key="team.team.name">
            <td>{{ team.conferenceRank }}</td>
            <td>{{ team.team.name }}</td>
            <td>{{ team.gamesPlayed }}</td>
            <td>{{ team.leagueRecord.wins }}</td>
            <td>{{ team.leagueRecord.losses }}</td>
            <td v-show="team.leagueRecord.ties">{{ team.leagueRecord.ties }}</td>
            <td
              v-show="$route.params.standingsSeason.substring(4) > 1999"
            >{{ team.leagueRecord.ot }}</td>
            <td>{{ team.points }}</td>
            <td v-show="team.row">{{ team.row }}</td>
            <td>{{ team.goalsScored }}</td>
            <td>{{ team.goalsAgainst }}</td>
            <td>{{ team.goalsScored > team.goalsAgainst ? "+" : "" }}{{ (team.goalsScored - team.goalsAgainst) }}</td>
            <td>{{ team.records.overallRecords[0].wins }}-{{ team.records.overallRecords[0].losses }}{{ (team.records.overallRecords[0].ot !== undefined && $route.params.standingsSeason.substring(4) > 1999) ? `-${team.records.overallRecords[0].ot}` : ''}}</td>
            <td>{{ team.records.overallRecords[1].wins}}-{{ team.records.overallRecords[1].losses }}{{ (team.records.overallRecords[0].ot !== undefined && $route.params.standingsSeason.substring(4) > 1999) ? `-${team.records.overallRecords[0].ot}` : ''}}</td>
            <td
              v-show="$route.params.standingsSeason.substring(4) > 1999"
            >{{ team.records.overallRecords[2].wins }}-{{ team.records.overallRecords[2].losses }}</td>
            <td>{{ team.records.overallRecords[3].wins }}-{{ team.records.overallRecords[3].losses }}{{ (team.records.overallRecords[0].ot !== undefined && $route.params.standingsSeason.substring(4) > 1999) ? `-${team.records.overallRecords[0].ot}` : ''}}</td>
            <td>{{ team.streak.streakCode }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConferenceStandings",
  props: ["standings"],
  data() {
    return {
      error: ""
    };
  }
};
</script>

<style scoped>
</style>