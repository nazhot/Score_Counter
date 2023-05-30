import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useReducer } from "react";
import { GlobalProvider, useGlobalData } from "./globalData";

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
    const [scoreData, scoreDispatch] = useReducer(scoreDataReducer, lastScore);

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

function scoreDataReducer(scoreData, action) {
    switch ( action.type ) {
        case "add": {
            return [...scoreData, {
                id: action.globalData.nextId,
                name: action.name,
                score: action.globalData.startingResetValue,
                increment: action.globalData.startingIncrement,
                resetValue: action.globalData.startingResetValue,
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

        case "updateAll": {
            return scoreData.map( u => {
                return {
                    ...u,
                    ...action.newData,
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

        case "resetAll" : {
            return scoreData.map( u => {
                return {
                    ...u,
                    score: u.resetValue,
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