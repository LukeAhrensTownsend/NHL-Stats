<template>
  <div class="league-standings-container">
    <p class="error" v-if="error">{{ error }}</p>
    <div
      class="standings-header"
    >League Standings ({{ this.$props.currentSeasonData.currentSeasonString }})</div>
    <div class="standings-table">
      <table>
        <tr class="table-head">
          <th colspan="2">{{ standings.leagueName }}</th>
          <th>GP</th>
          <th>W</th>
          <th>L</th>
          <th>OT</th>
          <th>PTS</th>
          <th>ROW</th>
          <th>GF</th>
          <th>GA</th>
          <th>DIFF</th>
          <th>HOME</th>
          <th>AWAY</th>
          <th>S/O</th>
          <th>L10</th>
          <th>STRK</th>
        </tr>
        <tr v-for="team in standings.teamRecords" :key="team.team.name">
          <td>{{ team.leagueRank }}</td>
          <!-- <td>
            <a href="/teams/{{team.id}}">
              <img class="teamlogo" src="/NHL_team_logos/{{team.name}}.png" />
            </a>
          </td>-->
          <td>{{ team.team.name }}</td>
          <td>{{ team.gamesPlayed }}</td>
          <td>{{ team.leagueRecord.wins }}</td>
          <td>{{ team.leagueRecord.losses }}</td>
          <td>{{ team.leagueRecord.ot }}</td>
          <td>{{ team.points }}</td>
          <td>{{ team.row }}</td>
          <td>{{ team.goalsScored }}</td>
          <td>{{ team.goalsAgainst }}</td>
          <td>{{ team.goalsScored > team.goalsAgainst ? "+" : "" }}{{ (team.goalsScored - team.goalsAgainst) }}</td>
          <td>{{ team.records.overallRecords[0].wins }}-{{ team.records.overallRecords[0].losses }}-{{ team.records.overallRecords[0].ot }}</td>
          <td>{{ team.records.overallRecords[1].wins}}-{{ team.records.overallRecords[1].losses }}-{{ team.records.overallRecords[1].ot }}</td>
          <td>{{ team.records.overallRecords[2].wins }}-{{ team.records.overallRecords[2].losses }}</td>
          <td>{{ team.records.overallRecords[3].wins }}-{{ team.records.overallRecords[3].losses }}-{{ team.records.overallRecords[3].ot }}</td>
          <td>{{ team.streak.streakCode }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import API from "../../config/api";

export default {
  name: "LeagueStandings",
  props: ["currentSeasonData"],
  data() {
    return {
      error: "",
      standings: {}
    };
  },
  async created() {
    try {
      console.log("< REQUEST MADE TO API >");
      this.standings = await API.getCurrentLeagueStandings();
    } catch (err) {
      this.error = err;
    }
  }
};
</script>

<style scoped>
</style>