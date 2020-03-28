<template>
  <div class="standings-container">
    <p class="error" v-if="error">{{ error }}</p>
    <h1 class='standings-header'>Division Standings ({{ this.$props.currentSeasonData.currentSeasonString }})</h1>
    <pre>{{ standings }}</pre>
  </div>
</template>

<script>
import API from "../../config/api";

export default {
  name: "DivisionStandings",
  props: [
    "currentSeasonData"
  ],
  data() {
    return {
      error: "",
      standings: {}
    };
  },
  async created() {
    try {
      this.standings = await API.getCurrentDivisonStandings();
    } catch (err) {
      this.error = err;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
