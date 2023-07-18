import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useReducer, useEffect } from "react";

const GlobalDataContext = createContext(null);
const GlobalDataDispatchContext = createContext(null);




export function GlobalProvider( { children } ){
    const [globalData, globalDispatch] = useReducer(globalDataReducer, {});

    const getLastSettings = async () => {
        try {
            const  jsonValue = await AsyncStorage.getItem("@lastGlobalData");
            const lastSettings = jsonValue != null ? JSON.parse(jsonValue) : getDefaultSettings();
            console.log(lastSettings);
            globalDispatch({type: "update", newSettings: lastSettings})
        } catch(e) {
            console.log(e);
        }
    }

    useEffect( () => {
        getLastSettings();
    }, []);
    function getDefaultSettings(){
        return(
            {
                startingIncrement: 5,
                higherScoreWins: true,
                sortPlayers: false,
                startingResetValue: 5,
                nextId: 0,
                currentGame: "Rummy",
                colorTheme: "autumn",
                nameTheme: "trees",
            }
        );
    }
    

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
            const newData = {
                ...globalData,
                ...action.newSettings
            };
            return newData;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}