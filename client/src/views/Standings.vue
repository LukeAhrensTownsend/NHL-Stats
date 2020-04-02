<template>
  <div class="standings-container">
    <div class="standings-navbar">
      <div
        v-bind:class="{ active: this.$route.params.standingsCategory === 'division' }"
        v-on:click="$router.push('division')"
        v-if="this.divisionsInUse"
      >Division</div>
      <div
        v-bind:class="{ active: this.$route.params.standingsCategory === 'wildcard' }"
        v-on:click="$router.push('wildcard')"
        v-if="this.wildCardInUse"
      >Wild Card</div>
      <div
        v-bind:class="{ active: this.$route.params.standingsCategory === 'conference' }"
        v-on:click="$router.push('conference')"
        v-if="this.conferencesInUse"
      >Conference</div>
      <div
        v-bind:class="{ active: this.$route.params.standingsCategory === 'league' }"
        v-on:click="$router.push('league')"
      >League</div>
    </div>

    <SeasonSelect />
    <div class="standings-header">{{ this.standingsHeader }}</div>

    <div class="standings-content-container">
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
    </div>
  </div>
</template>

<script>
import API from "../../config/api";
import DivisionStandings from "../components/standings/DivisionStandings";
import WildcardStandings from "../components/standings/WildcardStandings";
import ConferenceStandings from "../components/standings/ConferenceStandings";
import LeagueStandings from "../components/standings/LeagueStandings";
import SeasonSelect from "../components/SeasonSelect";

export default {
  name: "Standings",
  props: ["currentStandingsSeason"],
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
.standings-container {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

.standings-navbar {
  display: flex;
  margin-bottom: 20px;
}

.standings-navbar div {
  background-color: rgb(250, 250, 250);
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  flex: 1;
  padding: 10px 0;
  text-align: center;
}

.standings-navbar div:first-child {
  border-left: none;
  border-top-left-radius: 5px;
}

.standings-navbar div:last-child {
  border-top-right-radius: 5px;
}

.standings-navbar div:hover {
  background-color: rgb(245, 245, 245);
  cursor: pointer;
}

.standings-navbar .active {
  background-color: #fff;
  border-bottom: none;
}

.standings-navbar .active:hover {
  background-color: initial;
  cursor: default;
  text-decoration: none;
}

.standings-navbar .active:first-child {
  border-left: none;
  border-bottom-left-radius: 0;
}

.standings-navbar .active:last-child {
  border-right: none;
  border-bottom-right-radius: 0;
}

.standings-content-container {
  padding: 2%;
}

.standings-header {
  font-size: 1.5em;
  margin-left: 2%;
  margin-top: 40px;
}

.conference-header {
  font-size: 1.3em;
  margin-bottom: 10px;
}

.conference-container {
  margin-bottom: 25px;
}

.conference-container:last-child {
  margin-bottom: 0;
}

.division-container {
  margin-bottom: 10px;
}

.division-container:last-child {
  margin-bottom: 0;
}

.standings-table {
  border: 1px solid #ddd;
  border-radius: 3px;
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

.standings-team-logo {
  height: 30px;
  margin-top: 5px;
}
</style>