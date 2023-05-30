import { View, Text, TextInput, ScrollView, Button, StyleSheet, Pressable } from "react-native";
import InputWithLabel from "./InputWithLabel";
import { useGlobalData, useGlobalDataDispatch } from "../data/globalData";
import { useScoreDataDispatch } from "../data/scoreData";
import gameSettings from "../data/games";
import { useState } from "react";


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

function createGameSettingsComponents(game, setGame){
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


const NewGameScreen = ( { navigation, routes } ) => {

    const globalData          = useGlobalData();
    const globalDataDispatch  = useGlobalDataDispatch();
    const scoreDataDispatch   = useScoreDataDispatch();
    const [game, setGame]     = useState(globalData.currentGame);
    const currentGameSettings = gameSettings[game];

    function createNewGame() {
        if ( game === globalData.currentGame ) {
            navigation.navigate("Score");
            return;
        }
        globalDataDispatch({
            type: "update",
            newSettings: {
                currentGame: game,
                startingResetValue: currentGameSettings.resetValue,
                startingIncrement:  currentGameSettings.increment,
                higherScoreWins:    currentGameSettings.higherScoreWins,
            }
        });
        scoreDataDispatch({
            type: "updateAll",
            newData: {
                increment:  currentGameSettings.increment,
                score:      currentGameSettings.resetValue,
                resetValue: currentGameSettings.resetValue,
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
                {createGameSettingsComponents(game, setGame)}
            </ScrollView>
            <View
                style={styles.settingsPanel}
            >

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