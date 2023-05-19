import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3f1",
        flex: 1,
        flexDirection: "column",
    }, 
    title: {
        flex: 1,
        backgroundColor: "lightblue",
        flexDirection: "row",
    },
    scoreContainer: {
        flexDirection: "row",
        flex: 10,
        color: "fff",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    increment: {
        flex: 1,
        fontSize: 10,
    },
    score: {
        flex: 9,
        fontSize: 30,
    }
});

const ScoreCard = ( {player, score} ) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{flex: 1}}>{player}</Text>
                <FontAwesome
                    name="edit"
                    size="30"
                    color="fff"
                    style={{flex: 1, direction: "rtl"}}
                />
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.increment}>-</Text>
                <Text style={styles.score}>{score}</Text>
                <Text style={styles.increment}>+</Text>
            </View>
        </View>
    );
};

export default ScoreCard;