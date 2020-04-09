<script>
import { Bar } from "vue-chartjs";

export default {
  name: "BarChart",
  extends: Bar,
  props: {
      selectedTeamData: Object
  },
  data: function() {
    return {
      chartOptions: {
        title: {
          display: true,
          text: "hello"
        },
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
};
</script>

<style scoped>
</style>