<template>
  <b-container class="px-0 pt-3" fluid>
    <b-nav tabs fill>
      <b-nav-item
        v-if="this.divisionsInUse"
        v-bind:active="this.$route.params.standingsCategory === 'division'"
        v-on:click="$router.push('division')"
      >Division</b-nav-item>
      <b-nav-item
        v-if="this.wildCardInUse"
        v-bind:active="this.$route.params.standingsCategory === 'wildcard'"
        v-on:click="$router.push('wildcard')"
      >Wild Card</b-nav-item>
      <b-nav-item
        v-if="this.conferencesInUse"
        v-bind:active="this.$route.params.standingsCategory === 'conference'"
        v-on:click="$router.push('conference')"
      >Conference</b-nav-item>
      <b-nav-item
        v-bind:active="this.$route.params.standingsCategory === 'league'"
        v-on:click="$router.push('league')"
      >League</b-nav-item>
    </b-nav>
      <b-row class="mx-auto px-3 py-4 justify-content-between">
          <h3 class="standings-header display-4">{{ this.standingsHeader }}</h3>
          <SeasonSelect />
      </b-row>

        <DivisionStandings
          :standings="this.standings.divisionStandings"
          v-if="this.$route.params.standingsCategory === 'division'"
        />
        <WildcardStandings
          :standings="this.standings.wildcardStandings"
          v-if="this.$route.params.standingsCategory === 'wildcard'"
        />
        <ConferenceStandings
          :standings="this.standings.conferenceStandings"
          v-if="this.$route.params.standingsCategory === 'conference'"
        />
        <LeagueStandings
          :standings="this.standings.leagueStandings"
          v-if="this.$route.params.standingsCategory === 'league'"
        />
  </b-container>
</template>

<script>
import API from "../scripts/api";
import DivisionStandings from "../components/standings/DivisionStandings";
import WildcardStandings from "../components/standings/WildcardStandings";
import ConferenceStandings from "../components/standings/ConferenceStandings";
import LeagueStandings from "../components/standings/LeagueStandings";
import SeasonSelect from "../components/SeasonSelect";

export default {
  name: "Standings",
  head: {
    title: {
      inner: `Standings`,
      complement: "NHL Stats"
    }
  },
  data: function() {
    return {
      standings: {
        divisionStandings: {},
        wildcardStandings: {},
        conferenceStandings: {},
        leagueStandings: {}
      },
      divisionsInUse: true,
      wildCardInUse: true,
      conferencesInUse: true
    };
  },
  components: {
    DivisionStandings,
    WildcardStandings,
    ConferenceStandings,
    LeagueStandings,
    SeasonSelect
  },
  methods: {
    fetchSeasonStandings: async function() {
      try {
        await API.getSeasonData().then(seasonData => {
          let season =
            seasonData.seasons[
              parseInt(this.$route.params.standingsSeason.substring(0, 4)) -
                1918
            ];

          this.divisionsInUse = season.divisionsInUse;
          this.wildCardInUse = season.wildCardInUse;
          this.conferencesInUse = season.conferencesInUse;
        });

        if (this.divisionsInUse)
          this.standings.divisionStandings = await API.getDivisionStandings(
            this.$route.params.standingsSeason
          );
        if (this.wildCardInUse)
          this.standings.wildcardStandings = await API.getWildcardStandings(
            this.$route.params.standingsSeason
          );
        if (this.conferencesInUse)
          this.standings.conferenceStandings = await API.getConferenceStandings(
            this.$route.params.standingsSeason
          );
        this.standings.leagueStandings = await API.getLeagueStandings(
          this.$route.params.standingsSeason
        );
      } catch (err) {
        this.error = err;
      }

      switch (this.$route.params.standingsCategory) {
        case "wildcard":
          if (!this.wildCardInUse) {
            if (!this.divisionsInUse) {
              this.$router.replace("league");
            } else {
              this.$router.replace("division");
            }
          }
          break;
        case "conference":
          if (!this.conferencesInUse) {
            if (!this.divisionsInUse) {
              this.$router.replace("league");
            } else {
              this.$router.replace("division");
            }
          }
          break;
        case "division":
          if (!this.divisionsInUse) this.$router.replace("league");
          break;
      }
    }
  },
  watch: {
    "$route.params.standingsSeason": function() {
      this.fetchSeasonStandings();
    }
  },
  computed: {
    standingsHeader: function() {
      let temp = "";

      switch (this.$route.params.standingsCategory) {
        case "division":
          temp = "Division";
          break;
        case "wildcard":
          temp = "Wild Card";
          break;
        case "conference":
          temp = "Conference";
          break;
        case "league":
          temp = "League";
          break;
      }

      return `${temp} Standings (${this.$route.params.standingsSeason.substring(
        0,
        4
      )}-${this.$route.params.standingsSeason.substring(4)})`;
    }
  },
  async created() {
    this.fetchSeasonStandings();
  }
};
</script>

<style>
.standings-header {
  font-size: calc(20px + 0.75vw);
}

.conference-header {
  font-size: 1.3em;
  margin-bottom: 10px;
}

.conference-container {
  border-bottom: 1px solid #eee;
  margin-bottom: 25px;
}

.division-container {
  border-top: 1px solid #eee;
}

.conference-container:last-child, .division-container:last-child {
  margin-bottom: 0;
}

.standings-table {
  font-size: 0.8em;
  overflow-x: auto;
  width: 100%;
}

.standings-table table {
  border-collapse: collapse;
  min-width: 500px;
  width: 100%;
}

.standings-table tr {
  border-bottom: 1px solid #eee;
}

.standings-table tr:hover {
  background-color: rgb(250, 250, 250);
  cursor: default;
}

.standings-table tr:last-child {
  border-bottom: none;
}

.standings-table th,
.standings-table td {
  text-align: left;
  padding: 12px 8px;
}

.standings-table th {
  background-color: rgb(245, 245, 245);
  font-weight: 600;
}

.standings-table th:first-child {
  width: 20%;
}
</style>