import { View, Text, TextInput, ScrollView, Button, StyleSheet, Pressable } from "react-native";
import InputWithLabel from "./InputWithLabel";
import { useGlobalData, useGlobalDataDispatch } from "../data/globalData";
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
    }
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

    const [game, setGame] = useState(Object.keys(gameSettings)[0]);
    const currentGameSettings = gameSettings[game];

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
        </View>
    );
}

export default NewGameScreen;