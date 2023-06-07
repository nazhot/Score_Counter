import { React } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import { useGlobalData, useGlobalDataDispatch } from '../data/globalData';
import nameThemes from '../data/names';
import { storeData } from '../data/asyncStorage';

const iconSize         = 30;
const textSize         = 18;
const iconColor        = "#ddd"
const containerPadding = 10;

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#333",
        flex: 1,
        flexDirection: "row",
        color: "#fff",
        padding: containerPadding,
    },
    winnerContainer: {
        color: "#ddd",
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        columnGap: 20,
    },
    text: {
        fontSize: textSize,
        color: "#ddd",
        margin: 5,
    },
    spacer: {
        flex: 4,
    },
    icons: {
        flex: 1,
        flexDirection: "row",
        columnGap: 20,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        color: "#ddd",
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
                    {scoreData.length > 0 && <View style={styles.winnerContainer}>
                        <Text style={styles.text}>{winner}</Text>
                        <FontAwesome
                            name="star"
                            size={iconSize}
                            color={iconColor}
                        />
                    </View>}
                </Pressable>
            </View>

            <View style={styles.icons}>
                <Pressable
                    onPress={() => {
                        scoreDataDispatch({
                            type: "add",
                            name: nameThemes[globalData.nameTheme][globalData.nextId % nameThemes[globalData.nameTheme].length],
                            globalData: globalData,
                        });
                        globalDataDispatch({
                            type: "update", 
                            newSettings: {
                                nextId: globalData.nextId + 1,
                            }
                        });
                        storeData(scoreData);
                    }}
                >
                    <FontAwesome
                        name="plus"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
                <Pressable
                    onPress={() => {
                        scoreDataDispatch({type: "resetAll", globalData: {higherScoreWins: globalData.higherScoreWins}})
                        storeData(scoreData);
                    }}
                >
                    <FontAwesome
                        name="clock-o"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
                <Pressable
                    onPress={() => {
                            scoreDataDispatch({type: "sort", globalData: {higherScoreWins: globalData.higherScoreWins}});
                            storeData(scoreData);
                        }
                    }
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