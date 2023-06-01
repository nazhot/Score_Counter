import { View, Text, TextInput, ScrollView, Button, StyleSheet, Pressable } from "react-native";
import InputWithLabel from "./InputWithLabel";
import { useGlobalData, useGlobalDataDispatch } from "../data/globalData";
import { useScoreDataDispatch } from "../data/scoreData";
import gameSettings from "../data/games";
import { useState } from "react";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topPanel: {
        flex: 1,
        flexDirection: "row",
    },
    settingsPanel: {
        flex: 9,
    },
    gameSetting: {
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    },
});

const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        flex: 1,
    },
    text: {
        flex: 1,
    }
})

function createGameNameComponents(game, setGame){
    const gameButtons = [];
    let key = 0;
    for ( const gameName in gameSettings) {
        gameButtons.push(
            <Pressable
                onPress={() => setGame(gameName)}
                key={key}
                style={[styles.gameSetting, { backgroundColor: game === gameName ? "blue" : "white"}]}
            >
                <Text>{gameName}</Text>
            </Pressable>
        );
        key++;
    }

    return gameButtons;
}

function createGameSettingsComponents(game, gamesSettings, setGamesSettings){
    const components = [];
    let count = 0;
    for ( const settingName in gamesSettings[game] ) {
        let settingValue = gamesSettings[game][settingName];
        components.push(
            <InputWithLabel
                label={settingName}
                text={settingValue}
                onTextChange={(text) => setGamesSettings(game, settingName, text)}
                key={count}
                styles={inputStyles}
            />
        );
        count++;
    }
    return components;
}


const NewGameScreen = ( { navigation, routes } ) => {

    const globalData          = useGlobalData();
    const globalDataDispatch  = useGlobalDataDispatch();
    const scoreDataDispatch   = useScoreDataDispatch();
    const [game, setGame]     = useState(globalData.currentGame);
    const [gamesSettings, setGamesSettings] = useState({...gameSettings});

    function editGameSettings(gameName, settingName, settingValue){
        const newGamesSettings = {...gamesSettings};
        const currentValue     = newGamesSettings[gameName][settingName];

              newGamesSettings[gameName][settingName] = settingValue;
        setGamesSettings(newGamesSettings);
    }

    function createNewGame() {
        if ( game === globalData.currentGame ) {
            navigation.navigate("Score");
            return;
        }

        const currentGameSettings = gamesSettings[game];

        globalDataDispatch({
            type: "update",
            newSettings: {
                currentGame: game,
                startingResetValue: parseInt(currentGameSettings.resetValue),
                startingIncrement:  parseInt(currentGameSettings.increment),
                higherScoreWins:    currentGameSettings.higherScoreWins.toString() === "true",
            }
        });
        scoreDataDispatch({
            type: "updateAll",
            newData: {
                increment:  parseInt(currentGameSettings.increment),
                score:      parseInt(currentGameSettings.resetValue),
                resetValue: parseInt(currentGameSettings.resetValue),
            }
        });
        navigation.navigate("Score");
    }


    return(
        <View
            style={styles.container}
        >
            <ScrollView
                style={styles.topPanel}
                horizontal={true}
            >
                {createGameNameComponents(game, setGame)}
            </ScrollView>
            <View
                style={styles.settingsPanel}
            >
                {createGameSettingsComponents(game, gamesSettings, editGameSettings)}
            </View>
            <Button
                title="Create New Game"
                onPress={createNewGame}
                color="#111"
            />
        </View>
    );
}

export default NewGameScreen;