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
    getCurrentDivisonStandings: function () {
        return asyncFetch("standings/byDivision");
    }
};
