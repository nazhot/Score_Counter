import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useReducer, useEffect } from "react";

const GlobalDataContext = createContext(null);
const GlobalDataDispatchContext = createContext(null);




export function GlobalProvider( { children } ){
    const [globalData, globalDispatch] = useReducer(globalDataReducer, {});

    const getLastSettings = async () => {
        try {
            const  jsonValue = await AsyncStorage.getItem("@lastGlobalData");
            const lastSettings = getDefaultSettings(); //jsonValue != null ? JSON.parse(jsonValue) : getDefaultSettings();
            console.log(lastSettings);
            globalDispatch({type: "set", newSettings: lastSettings})
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
                gameSettings: {
                    startingIncrement: 5,
                    higherScoreWins: true,
                    sortPlayers: false,
                    startingResetValue: 5,
                    nextId: 0,
                    currentGame: "Rummy",
                },
                
                themeSettings: {
                    colorTheme: "autumn",
                    nameTheme: "trees",
                }
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
        case "set": {
            const newData = {
                ...globalData,
                ...action.newSettings,
            };
            return newData;
        }

        case "updateGame": {
            const newData = {
                ...globalData,
                gameSettings: {...globalData.gameSettings, ...action.newSettings},
            };
            return newData;
        }

        case "updateTheme": {
            const newData = {
                ...globalData,
                themeSettings: {...globalData.themeSettings, ...action.newSettings},
            };
            return newData;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}