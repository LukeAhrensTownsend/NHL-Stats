<template>
  <b-container fluid>
    <div class="custom-table">
      <table>
        <tr class="table-head">
          <th class="text-center">#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Birth Date</th>
          <th>Birth Location</th>
          <th>Nationality</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Shoots</th>
          <th>Position</th>
        </tr>
        <tr v-for="player in $props.selectedTeamData.teamData.roster" :key="player.person.id">
          <td class="text-center">{{ player.person.primaryNumber }}</td>
          <td>{{ player.person.fullName }}</td>
          <td>{{ player.person.currentAge }}</td>
          <td>{{ formatBirthDate(player.person.birthDate) }}</td>
          <td>{{ player.person.birthCity }}, {{ player.person.birthStateProvince ? `${player.person.birthStateProvince}, ` : ""}}{{ player.person.birthCountry }}</td>
          <td>{{ player.person.nationality }}</td>
          <td>{{ player.person.height }}</td>
          <td>{{ player.person.weight }}</td>
          <td>{{ player.person.shootsCatches }}</td>
          <td>{{ player.person.primaryPosition.name }}</td>
        </tr>
      </table>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "TeamRoster",
  props: {
    selectedTeamData: Object
  },
  methods: {
    formatBirthDate: function(birthDate) {
      const monthStrings = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const date = new Date(birthDate);
      const month = monthStrings[date.getMonth()].substring(0, 3);
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    }
  }
};
</script>

<style scoped>
.custom-table {
  border: 1px solid #cbd5e0;
  border-radius: 8px;
}
</style>