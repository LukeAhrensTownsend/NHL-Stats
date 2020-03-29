<template>
  <div class="standings-container">
    <DivisionStandings :currentSeasonData="this.$props.currentSeasonData" />
  </div>
</template>

<script>
import DivisionStandings from "../components/DivisionStandings";

export default {
  name: "Standings",
  props: ["currentSeasonData"],
  components: {
    DivisionStandings
  }
};
</script>

<style>
.standings-container {
  padding: 0 5%;
}

.standings-header {
  font-size: 1.4em;
  font-weight: 600;
}

.conference-header {
  font-size: 1.3em;
  margin-bottom: 10px;
}

.standings-header,
.conference-container {
  margin-bottom: 25px;
}

.standings-table {
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 0.9em;
  margin-bottom: 15px;
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
  background-color: rgb(245, 245, 245);
  cursor: default;
}

.standings-table tr:last-child {
  border-bottom: none;
}

.standings-table th,
.standings-table td {
  text-align: left;
  padding: 8px;
}

.standings-table th {
  background-color: rgb(250, 250, 250);
  font-weight: 600;
}
</style>