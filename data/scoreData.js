import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useReducer } from "react";

const ScoreDataContext = createContext(null);
const ScoreDataDispatchContext = createContext(null);

const getLastScore = async () => {
    try {
        const  jsonValue = await AsyncStorage.getItem("@lastGameStore");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
}

let lastScore = getLastScore();
if (!Array.isArray(lastScore)) {
    lastScore = [];
}

export function UserProvider( { children } ){
    const [scoreData, scoreDispatch] = useReducer(
        scoreDataReducer, lastScore);

      return (
        <ScoreDataContext.Provider value={scoreData}>
            <ScoreDataDispatchContext.Provider value={scoreDispatch}>
                {children}
            </ScoreDataDispatchContext.Provider>
        </ScoreDataContext.Provider>
      );
}

export function useScoreData() {
    return useContext(ScoreDataContext);
}

export function useScoreDataDispatch() {
    return useContext(ScoreDataDispatchContext);
}

let nextId = 2;

function scoreDataReducer(scoreData, action) {
    switch ( action.type ) {
        case "add": {
            return [...scoreData, {
                id: nextId++,
                name: action.name,
                score: 0,
                increment: 1,
            }];
        }

        case "update": {
            return scoreData.map( u => {
                if ( u.id === action.user.id ) {
                    return action.user;
                } else {
                    return u;
                }
            });
        }

        case "increment": {
            return scoreData.map( u => {
                if ( u.id === action.id ) {
                    return {
                        ...u,
                        score: u.score + (u.increment * action.multiplier),
                    };
                } else {
                    return u;
                }
            });
        }

        case "delete": {
            return scoreData.filter( u => u.id !== action.id );
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}