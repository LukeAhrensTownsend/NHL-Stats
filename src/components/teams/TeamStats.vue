<template>
  <div class="team-stats-container">
    <LineChart :selectedTeamData="selectedTeamData" :height="400"/>
  </div>
</template>

<script>
import LineChart from "../charts/LineChart";
// import BarChart from "../charts/BarChart";

export default {
  name: "TeamStats",
  props: {
    selectedTeamData: Object
  },
  components: {
    // BarChart,
    LineChart
  }
};
</script>

<style scoped>
</style>