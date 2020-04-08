<script>
import HELPERS from "../../../config/helpers";
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: {
    selectedTeamData: Object
  },
  data: function() {
    return {
      chartOptions: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "month"
              }
            }
          ]
        },
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    chartData: function() {
      const teamId = this.$route.params.teamId;

      return {
        datasets: [
          {
            label: `${this.$props.selectedTeamData.teamData.name} Points`,
            data: this.$props.selectedTeamData.seasonGames
              .map(function(game) {
                return {
                  x: game.date,
                  y:
                    game.games[0].teams.away.team.id == teamId
                      ? game.games[0].teams.away.leagueRecord.wins * 2 +
                        game.games[0].teams.away.leagueRecord.ot
                      : game.games[0].teams.home.leagueRecord.wins * 2 +
                        game.games[0].teams.home.leagueRecord.ot
                };
              })
              .slice(7),
            fill: false,
            borderColor: HELPERS.getTeamColor(this.$props.selectedTeamData.teamData.name),
            tension: 0,
            pointStyle: "line",
            responsive: true
          }
        ]
      };
    }
  },
  watch: {
    "$route.params.teamId": function() {
      this.renderChart(this.chartData, this.chartOptions);
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
};
</script>

<style scoped>
</style>