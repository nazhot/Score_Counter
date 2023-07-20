import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useReducer, useEffect } from "react";
import { GlobalProvider } from "./globalData";
import { storeData } from "./asyncStorage";

const ScoreDataContext = createContext(null);
const ScoreDataDispatchContext = createContext(null);


export function UserProvider( { children } ){
    const [scoreData, scoreDispatch] = useReducer(scoreDataReducer, []);

    const getLastScore = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@lastGameData");
            const lastScore = []; //jsonValue != null ? JSON.parse(jsonValue) : [];
            console.log(lastScore);
            scoreDispatch( { type: "set", data: lastScore } );
        } catch(e) {
            console.log(e);
        }
    }

    useEffect( () => {
        getLastScore();
    }, []);


    return (
    <GlobalProvider>
        <ScoreDataContext.Provider value={scoreData}>
            <ScoreDataDispatchContext.Provider value={scoreDispatch}>
                {children}
            </ScoreDataDispatchContext.Provider>
        </ScoreDataContext.Provider>
    </GlobalProvider>

    );
}

export function useScoreData() {
    return useContext(ScoreDataContext);
}

export function useScoreDataDispatch() {
    return useContext(ScoreDataDispatchContext);
}


function updatePlayersPlaces(scoreData, higherScoreWins){
    scoreData.forEach( (element, index) => {
        element.index = index;
    });

    scoreData.sort( (a, b) => {
        return higherScoreWins ? b.score - a.score : a.score - b.score;
    });

    let place = 1;

    for ( let i = 0; i < scoreData.length; i++ ) {
        if ( i !== 0 && scoreData[i - 1].score !== scoreData[i].score ){
            scoreData[i].place = i + 1;
            place = i + 1;
            continue;
        }
        scoreData[i].place = place;
    }

    scoreData.sort( (a, b) => {
        return a.index - b.index;
    });

    scoreData.forEach( element => {
        delete element.index;
    });

    return scoreData;

}

function scoreDataReducer(scoreData, action) {
    let newData;
    console.log(action.globalData);
    switch ( action.type ) {
        case "add": {
            newData = [...scoreData, {
                id: action.globalData.gameSettings.nextId,
                name: action.name,
                score: action.globalData.gameSettings.startingResetValue,
                increment: action.globalData.gameSettings.startingIncrement,
                resetValue: action.globalData.gameSettings.startingResetValue,
                place: 0,
            }];
            break;
        }

        case "update": {
            newData = scoreData.map( u => {
                if ( u.id === action.user.id ) {
                    return action.user;
                } else {
                    return u;
                }
            });
            break;
        }

        case "updateAll": {
            newData = scoreData.map( u => {
                return {
                    ...u,
                    ...action.newData,
                }
            });
            break;
        }

        case "increment": {
            newData = scoreData.map( u => {
                if ( u.id === action.id ) {
                    return {
                        ...u,
                        score: u.score + (u.increment * action.multiplier),
                    };
                } else {
                    return u;
                }
            });
            break;
        }

        case "resetAll" : {
            newData = scoreData.map( u => {
                return {
                    ...u,
                    score: u.resetValue,
                }
            });
            break;
        }

        case "delete": {
            newData = scoreData.filter( u => u.id !== action.id );
            break;
        }

        case "sort": {
            newData = scoreData;
            break;
        }

        case "set": {
            return action.data;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
    storeData("@lastGameData", newData);
    return updatePlayersPlaces(newData, action.globalData.gameSettings.higherScoreWins);
}