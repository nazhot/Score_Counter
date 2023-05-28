import { View, Text, TextInput, ScrollView, Button } from "react-native";
import InputWithLabel from "./InputWithLabel";
import { useGlobalData, useGlobalDataDispatch } from "../data/globalData";
import gameSettings from "../data/games";
import { useState } from "react";


function createGameSettingsComponents(game, setGame){
    const gameButtons = [];
    for ( const gameName in gameSettings) {
        gameButtons.push(
            <Button
                onPress={() => setGame(gameName)}
                title={gameName}
                color={game === gameName ? "blue" : "white"}
            />
        );
    }

    return gameButtons;
}


const NewGameScreen = ( { navigation, routes } ) => {

    const [game, setGame] = useState(Object.keys(gameSettings)[0]);
    const currentGameSettings = gameSettings[game];

    return(
        <View>
            <ScrollView>
                {createGameSettingsComponents(game, setGame)}
            </ScrollView>
            <View>

            </View>
        </View>
    );
}

export default NewGameScreen;