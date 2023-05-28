import { StyleSheet, View, Button } from 'react-native';
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import { useGlobalData, useGlobalDataDispatch } from '../data/globalData';

const borderRadius = 10;
const borderWidth = 2;
const borderColor = "#b2cdf7";

const styles = StyleSheet.create(
    {
        container: {},
        scoreInput: {},
        incrementInput: {},
        resetValueInput: {},
    }
);

const nameInputStyle = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        input: {
            flex: 1,
            borderColor,
            borderRadius,
            borderWidth,
        },
        text: {
            flex: 1,
        },
    }
);

const scoreInputStyle = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        input: {
            flex: 1,
            borderColor,
            borderRadius,
            borderWidth,
        },
        text: {
            flex: 1,
        },
    }
);

const incrementInputStyle = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        input: {
            flex: 1,
            borderColor,
            borderRadius,
            borderWidth,
        },
        text: {
            flex: 1,
        },
    }
);

const resetInputStyle = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        input: {},
        text: {},
    }
);


const PlayerScreen = ( {navigation, route}) => {

    const scoreData          = useScoreData();
    const scoreDataDispatch  = useScoreDataDispatch();
    const globalData         = useGlobalData();
    const globalDataDispatch = useGlobalDataDispatch();
    const playerData         = scoreData.filter(u => u.id == route.params.id)[0];

    const [name,       setName]       = useState(playerData.name);
    const [score,      setScore]      = useState(playerData.score.toString());
    const [increment,  setIncrement]  = useState(globalData.useGlobalSettings ? globalData.increment.toString() : playerData.increment.toString());
    const [resetValue, setResetValue] = useState(globalData.useGlobalSettings ? globalData.resetValue.toString() :playerData.resetValue.toString());

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
        });
        if ( globalData.useGlobalSettings ) {
            globalDataDispatch({
                type: "updateMultiple",
                keys: ["increment", "resetValue"],
                values: [increment, resetValue],
            });
        }
        navigation.navigate("Score");
    }

    function updateName(name){
        scoreDataDispatch({
            type: "update",
            user: {
                ...playerData,
                name: name,
            },
        });
        setName(name);
    }

    function updateScore(score){
        scoreDataDispatch({
            type: "update",
            user: {
                ...playerData,
                score: parseInt(score),
            }
        });
        setScore(score);
    }

    function updateIncrement(increment){
        scoreDataDispatch({
            type: "update",
            user: {
                ...playerData,
                increment: parseInt(increment),
            }
        });
        setIncrement(increment);
    }

    return(
        <View style={{flex: 1, backgroundColor: "#f1f"}}>
            <InputWithLabel
                styles={nameInputStyle}
                label="Name"
                text={name}
                onTextChange={setName}
            />
            <View>

            </View>
            <InputWithLabel
                styles={scoreInputStyle}
                label="Score"
                text={score}
                onTextChange={setScore}
            />
            <InputWithLabel
                styles={incrementInputStyle}
                label="Increment"
                text={increment}
                onTextChange={setIncrement}
            />
            <InputWithLabel
                styles={resetInputStyle}
                label="Reset Value"
                text={resetValue}
                onTextChange={setResetValue}
            />
            <View
            styles={ { flex: 4} }>

            </View>
            <Button
            onPress={saveChanges}
            title="Save"
            color="#841583"
            />
        </View>
    );

};


export default PlayerScreen;