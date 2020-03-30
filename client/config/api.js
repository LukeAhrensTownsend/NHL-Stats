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

module.exports = {
    getCurrentSeason: async function () {
        let data = await asyncFetch("seasons/current");

        return {
            currentSeasonString: `${data.seasons[0].seasonId.substring(0, 4)}-${data.seasons[0].seasonId.substring(6)}`
        }
    },
    getCurrentDivisionStandings: async function () {
        let data = await asyncFetch("standings/byDivision?expand=standings.record");

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
    getCurrentWildcardStandings: async function () {
        let data = await asyncFetch("standings/wildCardWithLeaders?expand=standings.record");

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
    getCurrentConferenceStandings: async function () {
        let data = await asyncFetch("standings/byConference?expand=standings.record");

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
    getCurrentLeagueStandings: async function () {
        let data = await asyncFetch("standings/byLeague?expand=standings.record");

        return {
            leagueName: "NHL",
            teamRecords: data.records[0].teamRecords
        }
    }
};
