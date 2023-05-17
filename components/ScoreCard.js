import { React } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: "25%",
        backgroundColor: "#3f1"
    }
});

const ScoreCard = ( {player, score} ) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>{player}</Text>
                <Image></Image>
            </View>
            <View>
                <Text>-</Text>
                <Text>{score}</Text>
                <Text>+</Text>
            </View>
        </View>
    );
};


