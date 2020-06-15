module.exports = {
	asyncFetch: async function(url = "") {
		try {
			const response = await fetch(
				"https://statsapi.web.nhl.com/api/v1/" + url,
				{
					method: "GET",
				}
			);

			return await response.json();
		} catch (error) {
			console.log(error);
		}
	},
	generateStandingsItems: function(standings, season) {
		return {
			divisionStandings: Object.values(standings.divisionStandings).map(
				(conference) => {
					return {
						conferenceName: conference.conferenceName,
						divisions: conference.divisionRecords.map(
							(division) => {
								return {
									divisionName: division.divisionName,
									teamRecords: division.teamRecords.map(
										(team) => {
											return {
												divisionRankTeam: `\t${team.divisionRank}\t\t${team.team.name}`,
												gamesPlayed: team.gamesPlayed,
												wins: team.leagueRecord.wins,
												losses:
													team.leagueRecord.losses,
												ties: team.leagueRecord.ties,
												ot: team.leagueRecord.ot,
												points: team.points,
												row: team.row,
												goalsScored: team.goalsScored,
												goalsAgainst: team.goalsAgainst,
												goalsDifference: parseInt(
													`${
														team.goalsScored >
														team.goalsAgainst
															? "+"
															: ""
													}${team.goalsScored -
														team.goalsAgainst}`
												),
												homeRecord: `${
													team.records
														.overallRecords[0].wins
												}-${
													team.records
														.overallRecords[0]
														.losses
												}${
													team.records
														.overallRecords[0]
														.ties !== undefined &&
													season.substring(4) < 2005
														? `-${team.records.overallRecords[0].ties}`
														: ""
												}${
													team.records
														.overallRecords[0]
														.ot !== undefined &&
													season.substring(4) > 1999
														? `-${team.records.overallRecords[0].ot}`
														: ""
												}`,
												awayRecord: `${
													team.records
														.overallRecords[1].wins
												}-${
													team.records
														.overallRecords[1]
														.losses
												}${
													team.records
														.overallRecords[1]
														.ties !== undefined &&
													season.substring(4) < 2005
														? `-${team.records.overallRecords[1].ties}`
														: ""
												}${
													team.records
														.overallRecords[1]
														.ot !== undefined &&
													season.substring(4) > 1999
														? `-${team.records.overallRecords[1].ot}`
														: ""
												}`,
												last10Record: `${
													team.records
														.overallRecords[3].wins
												}-${
													team.records
														.overallRecords[3]
														.losses
												}${
													team.records
														.overallRecords[3]
														.ties !== undefined &&
													season.substring(4) < 2005
														? `-${team.records.overallRecords[3].ties}`
														: ""
												}${
													team.records
														.overallRecords[3]
														.ot !== undefined &&
													season.substring(4) > 1999
														? `-${team.records.overallRecords[3].ot}`
														: ""
												}`,
												streakCode:
													team.streak.streakCode,
											};
										}
									),
								};
							}
						),
					};
				}
			),
			wildCardStandings: Object.values(standings.wildCardStandings).map(
				(conference) => {
					return {
						conferenceName: conference.conferenceName,
						divisions: Object.values(
							conference.divisionRecords
						).map((division) => {
							return {
								divisionName: division.divisionName,
								teamRecords: division.teamRecords.map(
									(team) => {
										return {
											wildCardRankTeam: `\t${
												team.wildCardRank === "0"
													? team.divisionRank
													: team.wildCardRank
											}\t\t${team.team.name}`,
											gamesPlayed: team.gamesPlayed,
											wins: team.leagueRecord.wins,
											losses: team.leagueRecord.losses,
											ties: team.leagueRecord.ties,
											ot: team.leagueRecord.ot,
											points: team.points,
											row: team.row,
											goalsScored: team.goalsScored,
											goalsAgainst: team.goalsAgainst,
											goalsDifference: parseInt(
												`${
													team.goalsScored >
													team.goalsAgainst
														? "+"
														: ""
												}${team.goalsScored -
													team.goalsAgainst}`
											),
											homeRecord: `${
												team.records.overallRecords[0]
													.wins
											}-${
												team.records.overallRecords[0]
													.losses
											}${
												team.records.overallRecords[0]
													.ties !== undefined &&
												season.substring(4) < 2005
													? `-${team.records.overallRecords[0].ties}`
													: ""
											}${
												team.records.overallRecords[0]
													.ot !== undefined &&
												season.substring(4) > 1999
													? `-${team.records.overallRecords[0].ot}`
													: ""
											}`,
											awayRecord: `${
												team.records.overallRecords[1]
													.wins
											}-${
												team.records.overallRecords[1]
													.losses
											}${
												team.records.overallRecords[1]
													.ties !== undefined &&
												season.substring(4) < 2005
													? `-${team.records.overallRecords[1].ties}`
													: ""
											}${
												team.records.overallRecords[1]
													.ot !== undefined &&
												season.substring(4) > 1999
													? `-${team.records.overallRecords[1].ot}`
													: ""
											}`,
											last10Record: `${
												team.records.overallRecords[3]
													.wins
											}-${
												team.records.overallRecords[3]
													.losses
											}${
												team.records.overallRecords[3]
													.ties !== undefined &&
												season.substring(4) < 2005
													? `-${team.records.overallRecords[3].ties}`
													: ""
											}${
												team.records.overallRecords[3]
													.ot !== undefined &&
												season.substring(4) > 1999
													? `-${team.records.overallRecords[3].ot}`
													: ""
											}`,
											streakCode: team.streak.streakCode,
										};
									}
								),
							};
						}),
					};
				}
			),
			conferenceStandings: Object.values(
				standings.conferenceStandings
			).map((conference) => {
				return {
					conferenceName: conference.conferenceName,
					teamRecords: conference.teamRecords.map((team) => {
						return {
							conferenceRankTeam: `\t${team.conferenceRank}\t\t${team.team.name}`,
							gamesPlayed: team.gamesPlayed,
							wins: team.leagueRecord.wins,
							losses: team.leagueRecord.losses,
							ties: team.leagueRecord.ties,
							ot: team.leagueRecord.ot,
							points: team.points,
							row: team.row,
							goalsScored: team.goalsScored,
							goalsAgainst: team.goalsAgainst,
							goalsDifference: parseInt(
								`${
									team.goalsScored > team.goalsAgainst
										? "+"
										: ""
								}${team.goalsScored - team.goalsAgainst}`
							),
							homeRecord: `${
								team.records.overallRecords[0].wins
							}-${team.records.overallRecords[0].losses}${
								team.records.overallRecords[0].ties !==
									undefined && season.substring(4) < 2005
									? `-${team.records.overallRecords[0].ties}`
									: ""
							}${
								team.records.overallRecords[0].ot !==
									undefined && season.substring(4) > 1999
									? `-${team.records.overallRecords[0].ot}`
									: ""
							}`,
							awayRecord: `${
								team.records.overallRecords[1].wins
							}-${team.records.overallRecords[1].losses}${
								team.records.overallRecords[1].ties !==
									undefined && season.substring(4) < 2005
									? `-${team.records.overallRecords[1].ties}`
									: ""
							}${
								team.records.overallRecords[1].ot !==
									undefined && season.substring(4) > 1999
									? `-${team.records.overallRecords[1].ot}`
									: ""
							}`,
							last10Record: `${
								team.records.overallRecords[3].wins
							}-${team.records.overallRecords[3].losses}${
								team.records.overallRecords[3].ties !==
									undefined && season.substring(4) < 2005
									? `-${team.records.overallRecords[3].ties}`
									: ""
							}${
								team.records.overallRecords[3].ot !==
									undefined && season.substring(4) > 1999
									? `-${team.records.overallRecords[3].ot}`
									: ""
							}`,
							streakCode: team.streak.streakCode,
						};
					}),
				};
			}),
			leagueStandings: standings.leagueStandings.teamRecords.map(
				(team) => {
					return {
						leagueRankTeam: `\t${team.leagueRank}\t\t${team.team.name}`,
						gamesPlayed: team.gamesPlayed,
						wins: team.leagueRecord.wins,
						losses: team.leagueRecord.losses,
						ties: team.leagueRecord.ties,
						ot: team.leagueRecord.ot,
						points: team.points,
						row: team.row,
						goalsScored: team.goalsScored,
						goalsAgainst: team.goalsAgainst,
						goalsDifference: parseInt(
							`${
								team.goalsScored > team.goalsAgainst ? "+" : ""
							}${team.goalsScored - team.goalsAgainst}`
						),
						homeRecord: `${team.records.overallRecords[0].wins}-${
							team.records.overallRecords[0].losses
						}${
							team.records.overallRecords[0].ties !== undefined &&
							season.substring(4) < 2005
								? `-${team.records.overallRecords[0].ties}`
								: ""
						}${
							team.records.overallRecords[0].ot !== undefined &&
							season.substring(4) > 1999
								? `-${team.records.overallRecords[0].ot}`
								: ""
						}`,
						awayRecord: `${team.records.overallRecords[1].wins}-${
							team.records.overallRecords[1].losses
						}${
							team.records.overallRecords[1].ties !== undefined &&
							season.substring(4) < 2005
								? `-${team.records.overallRecords[1].ties}`
								: ""
						}${
							team.records.overallRecords[1].ot !== undefined &&
							season.substring(4) > 1999
								? `-${team.records.overallRecords[1].ot}`
								: ""
						}`,
						last10Record: `${team.records.overallRecords[3].wins}-${
							team.records.overallRecords[3].losses
						}${
							team.records.overallRecords[3].ties !== undefined &&
							season.substring(4) < 2005
								? `-${team.records.overallRecords[3].ties}`
								: ""
						}${
							team.records.overallRecords[3].ot !== undefined &&
							season.substring(4) > 1999
								? `-${team.records.overallRecords[3].ot}`
								: ""
						}`,
						streakCode: team.streak.streakCode,
					};
				}
			),
		};
	},
	generateStandingsFields: function(standings, season, standingsType) {
		return [
			// {
			// 	key: `${standingsType}Rank`,
			// 	sortable: true,
			// 	label: "Rank",
			// 	thStyle: { width: "75px", backgroundColor: "#e9ecef" },
			// 	class: "text-center",
			// 	stickyColumn: true,
			// },
			{
				key: `${standingsType}RankTeam`,
				sortable: true,
				sortDirection: "desc",
				label: "Rank",
				thStyle: {
					width: "225px",
					backgroundColor: "#e9ecef",
				},
				thClass: "pl-4",
				stickyColumn: true,
			},
			{
				key: "gamesPlayed",
				sortable: true,
				sortDirection: "desc",
				label: "GP",
				thStyle: { width: "65px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			{
				key: "wins",
				sortable: true,
				sortDirection: "desc",
				label: "W",
				thStyle: { width: "60px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			{
				key: "losses",
				sortable: true,
				sortDirection: "desc",
				label: "L",
				thStyle: { width: "60px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			parseInt(season.substring(4)) < 2005 && {
				key: "ties",
				sortable: true,
				sortDirection: "desc",
				label: "T",
				thStyle: { width: "65px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			parseInt(season.substring(4)) > 1999 && {
				key: "ot",
				sortable: true,
				sortDirection: "desc",
				label: "OT",
				thStyle: { width: "65px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			{
				key: "points",
				sortable: true,
				sortDirection: "desc",
				label: "PTS",
				thStyle: { width: "75px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			parseInt(season.substring(4)) > 2010 && {
				key: "row",
				sortable: true,
				sortDirection: "desc",
				label: "ROW",
				thStyle: { width: "75px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			{
				key: "goalsScored",
				sortable: true,
				sortDirection: "desc",
				label: "GF",
				thStyle: { width: "65px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			{
				key: "goalsAgainst",
				sortable: true,
				sortDirection: "desc",
				label: "GA",
				thStyle: { width: "65px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			{
				key: "goalsDifference",
				sortable: true,
				sortDirection: "desc",
				label: "DIFF",
				thStyle: { width: "75px" },
				thClass: "text-center",
				tdClass: "text-center pr-3",
			},
			{
				key: "homeRecord",
				sortable: false,
				label: "HOME",
				thStyle: { width: "85px" },
				class: "text-center",
			},
			{
				key: "awayRecord",
				sortable: false,
				label: "AWAY",
				thStyle: { width: "85px" },
				class: "text-center",
			},
			{
				key: "last10Record",
				sortable: false,
				label: "L10",
				thStyle: { width: "85px" },
				class: "text-center",
			},
			{
				key: "streakCode",
				sortable: false,
				label: "STRK",
				thStyle: { width: "65px" },
				class: "text-center",
			},
		];
	},
	getCurrentSeason: function() {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();

		return month > 7 ? `${year}${year + 1}` : `${year - 1}${year}`;
	},
	getTeamColor: function(teamName) {
		switch (teamName) {
			case "Anaheim Ducks":
				return "#b5985a";
			case "Arizona Coyotes":
				return "#8c2633";
			case "Boston Bruins":
				return "#fcb514";
			case "Buffalo Sabres":
				return "#002654";
			case "Calgary Flames":
				return "#ce1126";
			case "Carolina Hurricanes":
				return "#cc0000";
			case "Chicago Blackhawks":
				return "#ed1c24";
			case "Colorado Avalanche":
				return "#6f263d";
			case "Columbus Blue Jackets":
				return "#041e42";
			case "Dallas Stars":
				return "#006341";
			case "Detroit Red Wings":
				return "#c8102e";
			case "Edmonton Oilers":
				return "#fc4c02";
			case "Florida Panthers":
				return "#c8102e";
			case "Los Angeles Kings":
				return "#010101";
			case "Minnesota Wild":
				return "#154734";
			case "Montréal Canadiens":
				return "#a6192e";
			case "Nashville Predators":
				return "#ffb81c";
			case "New Jersey Devils":
				return "#c8102e";
			case "New York Islanders":
				return "#f47d30";
			case "New York Rangers":
				return "#0038a8";
			case "Ottawa Senators":
				return "#ce1126";
			case "Philadelphia Flyers":
				return "#f74902";
			case "Pittsburgh Penguins":
				return "#fcb514";
			case "San Jose Sharks":
				return "#006272";
			case "St. Louis Blues":
				return "#002f87";
			case "Tampa Bay Lightning":
				return "#00205b";
			case "Toronto Maple Leafs":
				return "#00205b";
			case "Vancouver Canucks":
				return "#041c2c";
			case "Vegas Golden Knights":
				return "#b9975b";
			case "Washington Capitals":
				return "#ed1c24";
			case "Winnipeg Jets":
				return "#0060a5";
			default:
				return "#000000";
		}
	},
	teamSortByCity: function(a, b) {
		const teamCity_a = a.teamData.shortName;
		const teamCity_b = b.teamData.shortName;

		let comparison = 0;
		if (teamCity_a > teamCity_b) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		return comparison;
	},
};
