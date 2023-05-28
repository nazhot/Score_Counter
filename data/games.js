const gameSettings = {
    "Rummy" : {
        increment: 5,
        resetValue: 0,
        highestScoreWins: true,
    },
    "Euchre" : {
        increment: 1,
        resetValue: 0,
        highestScoreWins: true,
    },
    "Cribbage" : {
        increment: 1,
        resetValue: 0,
        highestScoreWins: true,
    },
    "Scopa" : {
        increment: 1,
        resetValue: 0,
        highestScoreWins: true,
        winningScore: 11,
        pointReasonArray: ["7 of Diamonds", "Most Diamonds", "Most Cards", "Highest Set of Suits"],
    },
    "Frolf" : {
        increment: 1,
        resetValue: 0,
        highestScoreWins: false,
    },
}




export default gameSettings;