import { useContext, createContext, useReducer } from "react";

const ScoreDataContext = createContext(null);
const ScoreDataDispatchContext = createContext(null);

export function UserProvider( { children } ){
    const [scoreData, scoreDispatch] = useReducer(
        scoreDataReducer, 
        [
          {
            name: "Maddie",
            id: 0,
            score: 2,
            increment: 2,
          },
          {
            name: "Noah",
            id: 1,
            score: 1,
            increment: 3,
          }
        ]
      );

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