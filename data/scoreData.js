import { useContext, createContext, useReducer } from "react";
import generateUniqueId from "generate-unique-id";

const ScoreDataContext = createContext(null);
const ScoreDataDispatchContext = createContext(null);

export function UserProvider( { children } ){


    const [scoreData, scoreDispatch] = useReducer(
        scoreDataReducer, 
        [
          {
            name: "Maddie",
            id: generateUniqueId({length: 10}),
            score: 2,
            increment: 2,
          },
          {
            name: "Noah",
            id: generateUniqueId({length: 10}),
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

function scoreDataReducer(scoreData, action) {
    switch ( action.type ) {
        case "addUser":

        case "updateName":

        case "updateScore":

        case "incrementScore":

        case "updateIncrement":

        
    }

}