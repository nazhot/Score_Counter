import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

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

const ScoreCard = ( {player, score, updateScoreFunction} ) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{flex: 1}}>{player}</Text>
                <FontAwesome
                    name="edit"
                    size={30}
                    color="#fff"
                    style={{flex: 1, direction: "rtl"}}
                />
            </View>
            <View style={styles.scoreContainer}>
                <Pressable 
                onPress={() => updateScoreFunction(player, -1)}
                style={styles.increment}>
                    <Text >-</Text>
                </Pressable>

                <Text style={styles.score}>{score}</Text>
                <Pressable 
                onPress={() => updateScoreFunction(player, 1)}
                style={styles.increment}>
                    <Text>+</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default ScoreCard;