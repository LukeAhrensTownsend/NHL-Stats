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
    getCurrentDivisonStandings: function () {
        return asyncFetch("standings");
    }
};
