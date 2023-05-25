import { React } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';

const iconSize = 30;
const textSize = 18;
const iconColor = "#000"
const containerPadding = 4;

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#aaa",
        flex: 1,
        flexDirection: "row",
    },
    winnerContainer: {
        color: "#000",
        flex: 2.5,
        flexDirection: "row",
        alignItems: "flex-end",
        padding: containerPadding,
    },
    text: {
        fontSize: textSize,
    },
    spacer: {
        flex: 4,
    },
    icons: {
        flex: 3,
        padding: containerPadding,
        flexDirection: "row",
        columnGap: 20,
        alignItems: "flex-end",
        justifyContent: "center",
    }
});

const NavBar = ( ) => {

    const scoreData         = useScoreData();
    const scoreDataDispatch = useScoreDataDispatch();

    let winner = "";
    let winnerScore = 0;
    for (let i = 0; i < scoreData.length; i++){
      if (scoreData[i].score > winnerScore){
        winner      = scoreData[i].name;
        winnerScore = scoreData[i].score;
      }
    }

    return (
        <View
        style={styles.navbar}
        >
            <View style={styles.winnerContainer}>
                <Text style={styles.text}>{winner}</Text>
                <FontAwesome
                    name="star"
                    size={iconSize}
                    color={iconColor}
                />
            </View>

            <View style={styles.spacer}></View>

            <View style={styles.icons}>
                <Pressable
                    onPress={() => scoreDataDispatch({
                        type: "add",
                        name: "Test",
                    })}
                >
                    <FontAwesome
                        name="plus"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
                <FontAwesome
                    name="clock-o"
                    size={iconSize}
                    color={iconColor}
                />
                <FontAwesome
                    name="ellipsis-h"
                    size={iconSize}
                    color={iconColor}
                />
            </View>
        </View>
    );
};

export default NavBar;