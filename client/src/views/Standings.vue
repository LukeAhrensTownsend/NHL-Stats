<template>
  <div class="standings-container">
    <div class="standings-navbar">
      <div v-bind:class="{ active: isActiveStandingsTab('division') }" v-on:click="setActiveStandingsTab('division')">Division</div>
      <div v-bind:class="{ active: isActiveStandingsTab('conference') }" v-on:click="setActiveStandingsTab('conference')">Conference</div>
      <div v-bind:class="{ active: isActiveStandingsTab('wildcard') }" v-on:click="setActiveStandingsTab('wildcard')">Wild Card</div>
      <div v-bind:class="{ active: isActiveStandingsTab('league') }" v-on:click="setActiveStandingsTab('league')">League</div>
    </div>
    <DivisionStandings
      :currentSeasonData="this.$props.currentSeasonData"
      v-show="isActiveStandingsTab('division')"
    />
  </div>
</template>

<script>
import DivisionStandings from "../components/DivisionStandings";

export default {
  name: "Standings",
  props: ["currentSeasonData"],
  data: function() {
    return {
      activeStandingsTab: "division"
    };
  },
  components: {
    DivisionStandings
  },
  methods: {
    setActiveStandingsTab: function(tab) {
      this.activeStandingsTab = tab;
    },
    isActiveStandingsTab: function(tab) {
      return this.activeStandingsTab === tab;
    }
  }
};
</script>

<style>
.standings-container {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
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
  padding: 15px 0;
  text-align: center;
}

.standings-navbar div:first-child {
  border-left: none;
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