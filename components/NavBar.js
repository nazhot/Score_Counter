import { React } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import { useGlobalData, useGlobalDataDispatch } from '../data/globalData';

const iconSize         = 30;
const textSize         = 18;
const iconColor        = "#000"
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

    const scoreData          = useScoreData();
    const scoreDataDispatch  = useScoreDataDispatch();
    const globalData         = useGlobalData();
    const globalDataDispatch = useGlobalDataDispatch();
    const higherScoreWins    = globalData.higherScoreWins;
    let   winner             = "";
    let   winnerScore        = higherScoreWins ? -30000: 30000;

    for (let i = 0; i < scoreData.length; i++){
        const shouldReplace = higherScoreWins ? scoreData[i].score > winnerScore : scoreData[i].score < winnerScore;
        if ( shouldReplace ) {
            winner      = scoreData[i].name;
            winnerScore = scoreData[i].score;
        }
    }

    return (
        <View
        style={styles.navbar}
        >
            <View style={styles.winnerContainer}>
                <Pressable
                onPress={() => globalDataDispatch({
                    type: "update",
                    newSettings: {
                        higherScoreWins: !higherScoreWins,
                    }
                })}>
                    <Text style={styles.text}>{winner}</Text>
                    <FontAwesome
                        name="star"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
            </View>

            <View style={styles.spacer}></View>

            <View style={styles.icons}>
                <Pressable
                    onPress={() => {
                        scoreDataDispatch({
                            type: "add",
                            name: "Test",
                            globalData: globalData,
                        });
                        globalDataDispatch({
                            type: "update", 
                            newSettings: {
                                nextId: globalData.nextId + 1,
                            }
                        });
                    }}
                >
                    <FontAwesome
                        name="plus"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
                <Pressable
                    onPress={() => scoreDataDispatch({type: "resetAll", globalData: {higherScoreWins: globalData.higherScoreWins}})}
                >
                    <FontAwesome
                        name="clock-o"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
                <Pressable
                    onPress={() => scoreDataDispatch({type: "sort", globalData: {higherScoreWins: globalData.higherScoreWins}})}
                >
                    <FontAwesome
                        name="arrows-v"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default NavBar;