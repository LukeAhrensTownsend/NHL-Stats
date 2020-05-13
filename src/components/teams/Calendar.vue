<template>
  <v-calendar
    class="custom-calendar w-100"
    :attributes="calendarAttributes"
    transition="slide-h"
    :min-date="new Date(getCurrentSeason().substring(0, 4), 8)"
    :max-date="new Date(getCurrentSeason().substring(4), 3)"
  >
    <template slot="day-content" slot-scope="props">
      <div class="day-cell" v-if="props.day.inMonth">
        {{props.day.day}}
        <div v-for="dayEvent in props.attributesMap" v-bind:key="dayEvent.key">
          <b-popover :target="dayEvent.key" triggers="hover" placement="bottom">
            <small>
              <div
                class="text-center"
              >{{new Date(dayEvent.customData.gameDate).toDateString()}} - {{new Date(dayEvent.customData.gameDate).toLocaleTimeString()}}</div>
              <div class="text-center mb-3">{{dayEvent.customData.venueName}}</div>
            </small>
            <div class="d-flex">
              <div class="text-center">
                <img
                  :src="require(`@/assets/NHL/team_logos/${dayEvent.customData.awayTeam.id}.svg`)"
                  :style="{ height: '60px' }"
                />
                <div>{{dayEvent.customData.awayTeam.name}}</div>
              </div>

              <div
                class="display-4 mx-2"
              >{{dayEvent.customData.gameState === "Final" ? `${dayEvent.customData.awayTeam.score} - ${dayEvent.customData.homeTeam.score}` : "vs"}}</div>

              <div class="text-center">
                <img
                  :src="require(`@/assets/NHL/team_logos/${dayEvent.customData.homeTeam.id}.svg`)"
                  :style="{ height: '60px' }"
                />
                <div>{{dayEvent.customData.homeTeam.name}}</div>
              </div>
            </div>
          </b-popover>

          <b-badge
            :id="dayEvent.key"
            v-if="dayEvent.customData"
            class="w-100 py-1"
            :style="$props.selectedTeamData.teamData.name === dayEvent.customData.homeTeam.name ? { backgroundColor: getTeamColor(dayEvent.customData.homeTeam.name) } : { border: '1px solid #ccc' }"
            :variant="$props.selectedTeamData.teamData.name === dayEvent.customData.awayTeam.name ? 'light' : null"
          >
            <img
              class="d-block mx-auto"
              :src="$props.selectedTeamData.teamData.name === dayEvent.customData.homeTeam.name ? require(`@/assets/NHL/team_logos/${dayEvent.customData.awayTeam.id}.svg`) : require(`@/assets/NHL/team_logos/${dayEvent.customData.homeTeam.id}.svg`)"
            />
            <div
              :style="dayEvent.customData.awayTeam.score > dayEvent.customData.homeTeam.score && { fontWeight: '1000' }"
            >
              {{dayEvent.customData.awayTeam.name}}
              <span
                v-if="dayEvent.customData.gameState === 'Final'"
              >({{dayEvent.customData.awayTeam.score}})</span>
            </div>
            <span class="mx-1">{{dayEvent.customData.gameState === "Final" ? "-" : "@"}}</span>
            <div
              :style="dayEvent.customData.homeTeam.score > dayEvent.customData.awayTeam.score && { fontWeight: '1000' }"
            >
              {{dayEvent.customData.homeTeam.name}}
              <span
                v-if="dayEvent.customData.gameState === 'Final'"
              >({{dayEvent.customData.homeTeam.score}})</span>
            </div>
          </b-badge>
        </div>
      </div>
    </template>
  </v-calendar>
</template>

<script>
import HELPERS from "../../scripts/helpers";

export default {
  name: "Calendar",
  props: {
    selectedTeamData: Object
  },
  computed: {
    calendarAttributes: function() {
      return this.$props.selectedTeamData.seasonGames.map(function(game) {
        return {
          dates: game.date,
          customData: {
            gameDate: game.games[0].gameDate,
            venueName: game.games[0].venue.name,
            gameState: game.games[0].status.abstractGameState,
            homeTeam: {
              id: game.games[0].teams.home.team.id,
              name: game.games[0].teams.home.team.name,
              score: game.games[0].teams.home.score
            },
            awayTeam: {
              id: game.games[0].teams.away.team.id,
              name: game.games[0].teams.away.team.name,
              score: game.games[0].teams.away.score
            }
          }
        };
      });
    }
  },
  methods: {
    getTeamColor: function(teamName) {
      return HELPERS.getTeamColor(teamName);
    },
    getCurrentSeason: function() {
      return HELPERS.getCurrentSeason();
    }
  }
};
</script>

<style>
.custom-calendar .vc-day {
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  padding: 3px;
}

.custom-calendar .day-cell {
  min-height: 125px;
}

.custom-calendar .badge {
  white-space: normal;
}

.custom-calendar .badge div {
  display: inline-block;
}

.custom-calendar img {
  height: 75px;
  width: 75px;
}

.custom-calendar .on-top {
  border-top: 1px solid #aaa;
}

.custom-calendar .on-left {
  border-left: 1px solid #aaa;
}

.custom-calendar .on-top.on-left {
  border-top-left-radius: 3px;
}

.custom-calendar .on-top.on-right {
  border-top-right-radius: 3px;
}

.custom-calendar .on-bottom.on-left {
  border-bottom-left-radius: 3px;
}

.custom-calendar .on-bottom.on-right {
  border-bottom-right-radius: 3px;
}

.popover {
  max-width: none;
}
</style>