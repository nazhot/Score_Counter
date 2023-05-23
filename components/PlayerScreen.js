import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';


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

    const [name,       setName]       = useState(route.params.name);
    const [score,      setScore]      = useState(route.params.score);
    const [increment,  setIncrement]  = useState(route.params.increment);
    const [resetValue, setResetValue] = useState(route.params.resetValue);

    function updateName(name){
        route.params.updateName(route.params.index, name);
        setName(name);
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
        </View>
    );

};


export default PlayerScreen;