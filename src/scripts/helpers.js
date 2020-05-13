module.exports = {
    asyncFetch: async function (url = "") {
        try {
            const response = await fetch("https://statsapi.web.nhl.com/api/v1/" + url, {
                method: "GET"
            });

            return await response.json();
        } catch (error) {
            console.log(error);
        }
    },
    getCurrentSeason: function() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();

        return (month > 7 ? `${year}${year + 1}` : `${year - 1}${year}`);
    },
    teamSortByCity: function (a, b) {
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
    getTeamColor: function (teamName) {
        switch (teamName) {
            case "Anaheim Ducks":
                return "#b5985a"
            case "Arizona Coyotes":
                return "#8c2633"
            case "Boston Bruins":
                return "#fcb514"
            case "Buffalo Sabres":
                return "#002654"
            case "Calgary Flames":
                return "#ce1126"
            case "Carolina Hurricanes":
                return "#cc0000"
            case "Chicago Blackhawks":
                return "#ed1c24"
            case "Colorado Avalanche":
                return "#6f263d"
            case "Columbus Blue Jackets":
                return "#041e42"
            case "Dallas Stars":
                return "#006341"
            case "Detroit Red Wings":
                return "#c8102e"
            case "Edmonton Oilers":
                return "#fc4c02"
            case "Florida Panthers":
                return "#c8102e"
            case "Los Angeles Kings":
                return "#010101"
            case "Minnesota Wild":
                return "#154734"
            case "Montréal Canadiens":
                return "#a6192e"
            case "Nashville Predators":
                return "#ffb81c"
            case "New Jersey Devils":
                return "#c8102e"
            case "New York Islanders":
                return "#f47d30"
            case "New York Rangers":
                return "#0038a8"
            case "Ottawa Senators":
                return "#ce1126"
            case "Philadelphia Flyers":
                return "#f74902"
            case "Pittsburgh Penguins":
                return "#fcb514"
            case "San Jose Sharks":
                return "#006272"
            case "St. Louis Blues":
                return "#002f87"
            case "Tampa Bay Lightning":
                return "#00205b"
            case "Toronto Maple Leafs":
                return "#00205b"
            case "Vancouver Canucks":
                return "#041c2c"
            case "Vegas Golden Knights":
                return "#b9975b"
            case "Washington Capitals":
                return "#ed1c24"
            case "Winnipeg Jets":
                return "#0060a5"
            default:
                return "#000000"
        }
    }
}