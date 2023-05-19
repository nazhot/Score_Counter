import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: "25%",
        backgroundColor: "#3f1",
    }, 
    title: {
        flex: 1,
    },
    scoreContainer: {
        flexDirection: "row",
        flex: 10,
        color: "fff",
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
                />
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.increment}>-</Text>
                <Text>{score}</Text>
                <Text style={styles.increment}>+</Text>
            </View>
        </View>
    );
};


