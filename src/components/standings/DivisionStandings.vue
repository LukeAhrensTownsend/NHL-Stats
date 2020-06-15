<template>
  <b-container class="px-0" fluid>
    <p class="error" v-if="error">{{ error }}</p>
    <div v-for="conference in $props.standingsItems" :key="conference.conferenceName">
      <h4 class="ml-4 mt-3">{{ conference.conferenceName }}</h4>
      <div v-for="division in conference.divisions" :key="division.divisionName">
        <h5 class="ml-4 mt-3 mb-2">{{ division.divisionName }}</h5>
        <b-table
          :items="division.teamRecords"
          :fields="standingsFields"
          head-variant="light"
          class="custom-table mb-0"
          responsive
          fixed
          outlined
          hover
        ></b-table>
      </div>
    </div>
  </b-container>
</template>

<script>
import HELPERS from "../../scripts/helpers";

export default {
  name: "DivisionStandings",
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
        "division"
      );
    }
  }
};
</script>

<style scoped>
</style>
