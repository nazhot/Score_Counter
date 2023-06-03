import { StyleSheet, View, Button } from 'react-native';
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import { useGlobalData } from '../data/globalData';

const borderRadius = 10;
const borderWidth = 2;
const borderColor = "#b2cdf7";
const padding = 10;

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
            padding,
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
            padding,
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
            padding,
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

    const scoreData         = useScoreData();
    const scoreDataDispatch = useScoreDataDispatch();
    const globalData        = useGlobalData();
    const playerData        = scoreData.filter(u => u.id == route.params.id)[0];

    const [name,       setName]       = useState(playerData.name);
    const [score,      setScore]      = useState(playerData.score.toString());
    const [increment,  setIncrement]  = useState(playerData.increment.toString());
    const [resetValue, setResetValue] = useState(playerData.resetValue.toString());

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
                higherScoreWins: globalData.higherScoreWins,
            }
        });
        navigation.navigate("Score");
    }

    return(
        <View style={{flex: 1, backgroundColor: "#333"}}>
            <InputWithLabel
                styles={nameInputStyle}
                label="Name"
                text={name}
                onTextChange={setName}
            />
            <View/>
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
                styles={ { flex: 4} }
            />
            <Button
                onPress={saveChanges}
                title="Save"
                color="#841583"
            />
        </View>
    );
};


export default PlayerScreen;