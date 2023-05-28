import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 10,
        overflow: "hidden",
    }, 
    title: {
        height: 45,
        flexDirection: "row",
        alignItems: "center",
    },
    scoreContainer: {
        flexDirection: "row",
        flex: 10,
        color: "#fff",
        alignItems: "stretch",
    },
    increment: {
        flex: 3,
        fontSize: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    score: {
        flex: 9,
        flexDirection: "column",
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
    }
});

const ScoreCard = ( {name, score, id, goToPlayerScreen, hue} ) => {

    const scoreData         = useScoreData();
    const scoreDataDispatch = useScoreDataDispatch();
    const cardColor         = "hsl(" + hue + ", 100%, 50%)";
    const titleColor        = "hsl(" + hue + ", 100%, 70%)";
    const storeData         = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("@lastGameData", jsonValue);
        } catch(e){
            console.log(e);
        }
    }

    function increment(multiplier){
        scoreDataDispatch({
            type: "increment",
            id: id,
            multiplier: multiplier,
        });

        storeData(scoreData);
    }

    return (
        <View style={[styles.container, {backgroundColor: cardColor}]}>
            <View style={[styles.title, {backgroundColor: titleColor}]}>
                <Text style={{flex: 1}}>{name}</Text>
                <View style={{flex: 8}}/>
                <Pressable
                onPress={() => goToPlayerScreen(id, name)}
                style={{flex: 1, direction: "rtl"}}>
                    <FontAwesome
                        name="edit"
                        size={30}
                        color="#fff"
                        
                    />
                </Pressable>
            </View>
            <View style={styles.scoreContainer}>
                <Pressable 
                onPress={() => increment(-1)}
                style={styles.increment}>
                    <Text >-</Text>
                </Pressable>

                <Text style={styles.score}>{score}</Text>
                <Pressable 
                onPress={() => increment(1)}
                style={styles.increment}>
                    <Text>+</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default ScoreCard;