<template>
  <b-container class="px-0" fluid>
    <p class="error" v-if="error">{{ error }}</p>
    <b-table
      v-if="$props.standingsItems"
      :items="$props.standingsItems"
      :fields="standingsFields"
      head-variant="light"
      class="custom-table mb-0"
      responsive
      fixed
      outlined
      hover
    ></b-table>
  </b-container>
</template>

<script>
import HELPERS from "../../scripts/helpers";

export default {
  name: "LeagueStandings",
  props: {
    standingsItems: Array
  },
  data() {
    return {
      error: ""
    };
  },
  computed: {
    standingsFields: function() {
      return HELPERS.generateStandingsFields(
        this.$props.standingsItems,
        this.$route.params.standingsSeason,
        "league"
      );
    }
  }
};
</script>

<style scoped>
</style>