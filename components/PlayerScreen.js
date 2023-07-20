import { StyleSheet, View, Button, Pressable } from 'react-native';
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import { useGlobalData } from '../data/globalData';
import { FontAwesome } from '@expo/vector-icons';

const borderRadius = 10;
const borderWidth = 2;
const borderColor = "#b2cdf7";
const padding = 10;

const nameInputStyle = StyleSheet.create(
    {
        container: {
            height: 100,
        },
        input: {
            flex: 1,
            borderColor,
            borderRadius,
            borderWidth,
            padding,
            color: "#ddd",
        },
        text: {
            flex: 1,
            color: "#ddd",
        },
    }
);

const scoreInputStyle = StyleSheet.create(
    {
        container: {
            height: 100,
        },
        input: {
            flex: 1,
            borderColor,
            borderRadius,
            borderWidth,
            padding,
            color: "#ddd",
        },
        text: {
            flex: 1,
            color: "#ddd",
        },
    }
);

const incrementInputStyle = StyleSheet.create(
    {
        container: {
            height: 100,
        },
        input: {
            flex: 1,
            borderColor,
            borderRadius,
            borderWidth,
            padding,
            color: "#ddd",
        },
        text: {
            flex: 1,
            color: "#ddd",
        },
    }
);

const resetInputStyle = StyleSheet.create(
    {
        container: {
            height: 100,
        },
        input: {
                       flex: 1,
            borderColor,
            borderRadius,
            borderWidth,
            padding,
            color: "#ddd",
        },
        text: {
            flex: 1,
            color: "#ddd",
        },
    }
);

const PlayerScreen = ( {navigation, route}) => {

    const scoreData         = useScoreData();
    const scoreDataDispatch = useScoreDataDispatch();
    const globalData        = useGlobalData();
    const playerData        = scoreData.filter(u => u.id == route.params.id)[0];

    const [name,       setName]       = useState(playerData.name);
    const [score,      setScore]      = useState(playerData.score.toString());
    const [increment,  setIncrement]  = useState(playerData.increment.toString());
    const [resetValue, setResetValue] = useState(playerData.resetValue.toString());

    function deletePlayer(){
        scoreDataDispatch({type: "delete", id: playerData.id, globalData: { gameSettings: {higherScoreWins: globalData.gameSettings.higherScoreWins}}})
        navigation.navigate("Score");
    }

    function saveChanges(){
        scoreDataDispatch({
            type: "update",
            user: {
                ...playerData,
                name,
                score: parseInt(score),
                increment: parseInt(increment),
                resetValue: parseInt(resetValue),
            },
            globalData: {
                gameSettings: {higherScoreWins: globalData.gameSettings.higherScoreWins},
            }
        });
        navigation.navigate("Score");
    }

    return(
        <View style={{flex: 1, backgroundColor: "#333"}}>
            <InputWithLabel
                styles={nameInputStyle}
                label="Name"
                value={name}
                onChange={setName}
            />
            <InputWithLabel
                styles={scoreInputStyle}
                label="Score"
                value={score}
                onChange={setScore}
            />
            <InputWithLabel
                styles={incrementInputStyle}
                label="Increment"
                value={increment}
                onChange={setIncrement}
            />
            <InputWithLabel
                styles={resetInputStyle}
                label="Reset Value"
                value={resetValue}
                onChange={setResetValue}
            />
            <Pressable
                onPress={() => {
                        navigation.navigate("AreYouSure", {confirmFunction: deletePlayer});
                    }
                }
                    
            >
                <FontAwesome
                    name="trash"
                    size={30}
                    color="#ff2222"
                />
            </Pressable>
            <View style={{flex: 1, padding: 10, justifyContent: "flex-end"}}>
                    <Button
                        onPress={saveChanges}
                        title="Save"
                        color="#841583"
                    />
            </View>


        </View>
    );
};


export default PlayerScreen;