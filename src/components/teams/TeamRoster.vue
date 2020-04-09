<template>
  <div class="team-roster-container">
    <pre>{{selectedTeamData.teamData.roster}}</pre>
  </div>
</template>

<script>
export default {
  name: "TeamRoster",
  props: {
    selectedTeamData: Object
  }
};
</script>

<style scoped>
</style>