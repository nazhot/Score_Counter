const gameSettings = {
    "Rummy" : {
        increment: 5,
        resetValue: 0,
        higherScoreWins: true,
    },
    "Euchre" : {
        increment: 1,
        resetValue: 0,
        higherScoreWins: true,
    },
    "Cribbage" : {
        increment: 1,
        resetValue: 0,
        higherScoreWins: true,
    },
    "Scopa" : {
        increment: 1,
        resetValue: 0,
        higherScoreWins: true,
        winningScore: 11,
        pointReasonArray: ["7 of Diamonds", "Most Diamonds", "Most Cards", "Highest Set of Suits"],
    },
    "Frolf" : {
        increment: 1,
        resetValue: 0,
        higherScoreWins: false,
    },
}

export default gameSettings;