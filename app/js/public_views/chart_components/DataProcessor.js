function cleanSingleMandateVotingDataForChart(rawVotesData) {
    return rawVotesData.map(function (vote) {
        return {
            key: vote.candidate.firstName + ' ' + vote.candidate.lastName,
            value: vote.voteCount
        }
    })
}

function cleanMultiMandateVotingDataForChart(rawVotesData) {
    return rawVotesData.map(function (vote) {
        return {
            key: vote.party.name,
            value: vote.voteCount
        }
    })
}




module.exports = {cleanSingleMandateVotingDataForChart, cleanMultiMandateVotingDataForChart};