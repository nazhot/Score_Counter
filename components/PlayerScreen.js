import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';


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
        container: {},
        input: {},
        text: {},
    }
);

const scoreInputStyle = StyleSheet.create(
    {
        container: {},
        input: {},
        text: {},
    }
);

const incrementInputStyle = StyleSheet.create(
    {
        container: {},
        input: {},
        text: {},
    }
);

const resetInputStyle = StyleSheet.create(
    {
        container: {},
        input: {},
        text: {},
    }
);


const PlayerScreen = ( {navigation, route}) => {

    const scoreData = useScoreData();
    const scoreDataDispatch = useScoreDataDispatch();
    const playerData = scoreData.filter(u => u.id == route.params.id)[0];

    const [name,       setName]       = useState(playerData.name);
    const [score,      setScore]      = useState(playerData.score);
    const [increment,  setIncrement]  = useState(playerData.increment);
    const [resetValue, setResetValue] = useState(playerData.resetValue);

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
                score: score,
            }
        });
        setScore(score);
    }

    function updateIncrement(increment){
        scoreDataDispatch({
            type: "update",
            user: {
                ...playerData,
                increment: increment,
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
                onTextChange={updateName}
            />
            <View>

            </View>
            <InputWithLabel
                styles={scoreInputStyle}
                label="Score"
                text={score}
                onTextChange={updateScore}
            />
            <InputWithLabel
                styles={incrementInputStyle}
                label="Increment"
                text={increment}
                onTextChange={updateIncrement}
            />
            <InputWithLabel
                styles={resetInputStyle}
                label="Reset Value"
                text={resetValue}
                onTextChange={setResetValue}
            />
        </View>
    );

};


export default PlayerScreen;