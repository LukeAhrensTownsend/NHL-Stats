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
    <b-row class="mx-auto px-4 my-4 justify-content-between">
      <h3 class="standings-header display-4">{{ this.standingsHeader }}</h3>
      <SeasonSelect />
    </b-row>

    <DivisionStandings
      :standingsItems="this.standingsItems.divisionStandings"
      v-if="this.$route.params.standingsCategory === 'division'"
    />
    <WildCardStandings
      :standingsItems="this.standingsItems.wildCardStandings"
      v-if="this.$route.params.standingsCategory === 'wildcard'"
    />
    <ConferenceStandings
      :standingsItems="this.standingsItems.conferenceStandings"
      v-if="this.$route.params.standingsCategory === 'conference'"
    />
    <LeagueStandings
      :standingsItems="this.standingsItems.leagueStandings"
      v-if="this.$route.params.standingsCategory === 'league'"
    />
  </b-container>
</template>

<script>
import API from "../scripts/api";
import HELPERS from "../scripts/helpers";
import DivisionStandings from "../components/standings/DivisionStandings";
import WildCardStandings from "../components/standings/WildCardStandings";
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
        wildCardStandings: {},
        conferenceStandings: {},
        leagueStandings: {
          leagueName: "NHL",
          teamRecords: []
        }
      },
      divisionsInUse: true,
      wildCardInUse: true,
      conferencesInUse: true
    };
  },
  components: {
    DivisionStandings,
    WildCardStandings,
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
              parseInt(this.$route.params.standingsSeason.substring(4)) - 1918
            ];

          this.divisionsInUse = season.divisionsInUse;
          this.wildCardInUse =
            this.$route.params.standingsSeason.substring(4) === "2013"
              ? false
              : season.wildCardInUse;
          this.conferencesInUse = season.conferencesInUse;
        });

        if (this.divisionsInUse)
          this.standings.divisionStandings = await API.getDivisionStandings(
            this.$route.params.standingsSeason
          );
        if (this.wildCardInUse)
          this.standings.wildCardStandings = await API.getWildCardStandings(
            this.$route.params.standingsSeason
          );
        if (this.conferencesInUse)
          this.standings.conferenceStandings = await API.getConferenceStandings(
            this.$route.params.standingsSeason
          );
        this.standings.leagueStandings.teamRecords = await API.getLeagueStandings(
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
      return `${this.$route.params.standingsCategory.charAt(0).toUpperCase() +
        this.$route.params.standingsCategory.slice(
          1
        )} Standings (${this.$route.params.standingsSeason.substring(
        0,
        4
      )}-${this.$route.params.standingsSeason.substring(4)})`;
    },
    standingsItems: function() {
      return HELPERS.generateStandingsItems(
        this.standings,
        this.$route.params.standingsSeason
      );
    }
  },
  async created() {
    this.fetchSeasonStandings();
  }
};
</script>

<style>
.custom-table {
  font-size: calc(10px + 0.3vw);
}

.standings-header {
  font-size: calc(20px + 0.5vw);
}

td {
  white-space: pre;
}
</style>