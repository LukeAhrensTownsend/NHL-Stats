<template>
  <DivisionStandings :currentSeasonData="this.$props.currentSeasonData" />
</template>

<script>
import DivisionStandings from "../components/DivisionStandings";

export default {
  name: "Standings",
  props: [
    "currentSeasonData"
  ],
  components: {
    DivisionStandings
  }
};
</script>

<style scoped>
</style>