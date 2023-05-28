import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useReducer } from "react";

const GlobalDataContext = createContext(null);
const GlobalDataDispatchContext = createContext(null);

const getLastSettings = async () => {
    try {
        const  jsonValue = await AsyncStorage.getItem("@lastGameSettings");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
}

function getDefaultSettings(){
    return(
        {
            increment: 5,
            higherScoreWins: true,
            sortPlayers: false,
            useGlobalSettings: true,
            resetValue: 5,
            nextId: 0,
        }
    );
}

// let lastSettings = getLastSettings();
// if ( lastSettings["increment"] === null ) {
//     lastSettings = getDefaultSettings();
// }

const lastSettings = getDefaultSettings();

export function GlobalProvider( { children } ){
    const [globalData, globalDispatch] = useReducer(globalDataReducer, lastSettings);

      return (
        <GlobalDataContext.Provider value={globalData}>
            <GlobalDataDispatchContext.Provider value={globalDispatch}>
                {children}
            </GlobalDataDispatchContext.Provider>
        </GlobalDataContext.Provider>
      );
}

export function useGlobalData() {
    return useContext(GlobalDataContext);
}

export function useGlobalDataDispatch() {
    return useContext(GlobalDataDispatchContext);
}

function globalDataReducer(globalData, action) {
    switch ( action.type ) {
        case "update": {
            const newData = {...globalData};
            newData[action.key] = action.value;
            return newData;
        }

        case "updateMultiple": {
            const newData = {...globalData};
            for ( let i = 0; i < action.keys.length; i++ ) {
                newData[action.keys[i]] = action.values[i];
            }
            return newData;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}