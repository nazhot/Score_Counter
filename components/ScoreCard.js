import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useScoreDataDispatch } from '../data/scoreData';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3f1",
        flex: 1,
        flexDirection: "column",
    }, 
    title: {
        flex: 1,
        backgroundColor: "#add8e6",
        flexDirection: "row",
    },
    scoreContainer: {
        flexDirection: "row",
        flex: 10,
        color: "#fff",
        alignItems: "stretch",
        justifyContent: "center",
        textAlign: "center",
    },
    increment: {
        flex: 1,
        fontSize: 10,
        backgroundColor: "#FFA500",
        alignItems: "center",
        justifyContent: "center",
    },
    score: {
        flex: 9,
        fontSize: 30,
        textAlign: "center",
    }
});

const ScoreCard = ( {player, score, id, goToPlayerScreen} ) => {

    const scoreDataDispatch = useScoreDataDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{flex: 1}}>{player}</Text>
                <Pressable
                onPress={() => goToPlayerScreen(id)}
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
                onPress={() => scoreDataDispatch({
                    type: "increment",
                    id: id,
                    multiplier: -1,
                })}
                style={styles.increment}>
                    <Text >-</Text>
                </Pressable>

                <Text style={styles.score}>{score}</Text>
                <Pressable 
                onPress={() => scoreDataDispatch({
                    type: "increment",
                    id: id,
                    multiplier: +1,
                })}
                style={styles.increment}>
                    <Text>+</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default ScoreCard;