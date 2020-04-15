let asyncFetch = async (url = "") => {
    try {
        const response = await fetch("https://statsapi.web.nhl.com/api/v1/" + url, {
            method: "GET"
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

let teamSortByCity = function (a, b) {
    const teamCity_a = a.teamData.shortName;
    const teamCity_b = b.teamData.shortName;

    let comparison = 0;
    if (teamCity_a > teamCity_b) {
        comparison = 1;
    } else {
        comparison = -1;
    }

    return comparison;
}

module.exports = {
    getSeasonData: async function () {
        let data = await asyncFetch("seasons")

        return data;
    },
    getDivisionStandings: async function (season) {
        let data = await asyncFetch(`standings/byDivision?expand=standings.record&season=${season}`);

        return {
            easternConferenceStandings: {
                conferenceName: "Eastern",
                divisionRecords: {
                    metropolitanDivisionStandings: {
                        divisionName: "Metropolitan",
                        teamRecords: data.records[0].teamRecords
                    },
                    atlanticDivisionStandings: {
                        divisionName: "Atlantic",
                        teamRecords: data.records[1].teamRecords
                    }
                }
            },
            westernConferenceStandings: {
                conferenceName: "Western",
                divisionRecords: {
                    centralDivisionStandings: {
                        divisionName: "Central",
                        teamRecords: data.records[2].teamRecords
                    },
                    pacificDivisionStandings: {
                        divisionName: "Pacific",
                        teamRecords: data.records[3].teamRecords
                    }
                }
            }
        }
    },
    getWildcardStandings: async function (season) {
        let data = await asyncFetch(`standings/wildCardWithLeaders?expand=standings.record&season=${season}`);

        return {
            easternConferenceStandings: {
                conferenceName: "Eastern",
                divisionRecords: {
                    metropolitanDivisionLeaders: {
                        divisionName: "Metropolitan",
                        teamRecords: data.records[2].teamRecords
                    },
                    atlanticDivisionLeaders: {
                        divisionName: "Atlantic",
                        teamRecords: data.records[3].teamRecords
                    },
                    wildCardRecords: {
                        divisionName: "Wild Card",
                        teamRecords: data.records[0].teamRecords
                    }
                }
            },
            westernConferenceStandings: {
                conferenceName: "Western",
                divisionRecords: {
                    centralDivisionLeaders: {
                        divisionName: "Central",
                        teamRecords: data.records[4].teamRecords
                    },
                    pacificDivisionLeaders: {
                        divisionName: "Pacific",
                        teamRecords: data.records[5].teamRecords
                    },
                    wildCardRecords: {
                        divisionName: "Wild Card",
                        teamRecords: data.records[1].teamRecords
                    }
                }
            }
        }
    },
    getConferenceStandings: async function (season) {
        let data = await asyncFetch(`standings/byConference?expand=standings.record&season=${season}`);

        return {
            easternConferenceStandings: {
                conferenceName: "Eastern",
                teamRecords: data.records[0].teamRecords
            },
            westernConferenceStandings: {
                conferenceName: "Western",
                teamRecords: data.records[1].teamRecords
            }
        }
    },
    getLeagueStandings: async function (season) {
        let data = await asyncFetch(`standings/byLeague?expand=standings.record&season=${season}`);

        return {
            leagueName: "NHL",
            teamRecords: data.records[0].teamRecords
        }
    },
    getTeams: async function () {
        let data = await asyncFetch("teams");
        let returnObject = {
            westernConference: {
                conferenceName: "Western",
                teamRecords: []
            },
            easternConference: {
                conferenceName: "Eastern",
                teamRecords: []
            }
        }

        for (const team of data.teams) {
            if (team.conference.name === "Western") {
                returnObject.westernConference.teamRecords.push({
                    teamData: team,
                    chartColor: ""
                });
            } else {
                returnObject.easternConference.teamRecords.push({
                    teamData: team,
                    chartColor: "#007cb2"
                });
            }
        }

        returnObject.westernConference.teamRecords.sort(teamSortByCity);
        returnObject.easternConference.teamRecords.sort(teamSortByCity);

        return returnObject;
    },
    getTeamData: async function (teamId) {
        let data = await asyncFetch(`teams/${teamId}?expand=team.roster&expand=team.schedule.previous&expand=team.schedule.next&expand=team.stats`);

        return {
            id: data.teams[0].id,
            name: data.teams[0].name,
            locationName: data.teams[0].locationName,
            teamName: data.teams[0].teamName,
            abbrevation: data.teams[0].abbrevation,
            venue: data.teams[0].venue.name,
            division: data.teams[0].division.name,
            conference: data.teams[0].conference.name,
            teamStats: data.teams[0].teamStats,
            roster: data.teams[0].roster.roster,
            nearGames: {
                previousGameSchedule: {
                    header: "Previous Game",
                    data: data.teams[0].previousGameSchedule
                },
                nextGameSchedule: {
                    header: "Next Game",
                    data: data.teams[0].nextGameSchedule
                }
            }
        }
    },
    getSeasonGamesByTeam: async function (teamId, season) {
        let data = await asyncFetch(`schedule?teamId=${teamId}&season=${season}`);

        return data.dates;
    },
    getPlayerData: async function(playerId) {
        let data = await asyncFetch(`people/${playerId}`);

        return data;
    }
};
