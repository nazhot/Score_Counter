import { React } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import { useGlobalData, useGlobalDataDispatch } from '../data/globalData';
import nameThemes from '../data/names';

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

const NavBar = ( {navigation} ) => {

    const scoreData          = useScoreData();
    const scoreDataDispatch  = useScoreDataDispatch();
    const globalData         = useGlobalData();
    const globalDataDispatch = useGlobalDataDispatch();
    const higherScoreWins    = globalData.gameSettings?.higherScoreWins;
    let   winner             = "";
    let   winnerScore        = higherScoreWins ? -30000: 30000;

    for (let i = 0; i < scoreData.length; i++){
        const shouldReplace = higherScoreWins ? scoreData[i].score > winnerScore : scoreData[i].score < winnerScore;
        if ( shouldReplace ) {
            winner      = scoreData[i].name;
            winnerScore = scoreData[i].score;
        }
    }

    function resetAll(){
        scoreDataDispatch({type: "resetAll", globalData: { gameSettings: {higherScoreWins: globalData.gameSettings.higherScoreWins}}});
    }

    return (
        <View
        style={styles.navbar}
        >
            <View style={styles.winnerContainer}>
                <Pressable
                onPress={() => globalDataDispatch({
                    type: "updateGame",
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
                            name: nameThemes[globalData.themeSettings.nameTheme][globalData.gameSettings.nextId % nameThemes[globalData.themeSettings.nameTheme].length],
                            globalData: globalData,
                        });
                        globalDataDispatch({
                            type: "updateGame", 
                            newSettings: {
                                nextId: globalData.gameSettings.nextId + 1,
                            },
                            //globalData: {higherScoreWins: globalData.gameSettings.higherScoreWins}
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
                    onPress={() => {
                        navigation.navigate("AreYouSure", {confirmFunction: resetAll});
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
                            scoreDataDispatch({type: "sort", globalData: { gameSettings: {higherScoreWins: globalData.gameSettings.higherScoreWins }}});
                        }
                    }
                >
                    <FontAwesome
                        name="arrows-v"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
                <Pressable
                    onPress={() => {
                            navigation.navigate("Settings");
                        }
                    }
                >
                    <FontAwesome
                        name="gear"
                        size={iconSize}
                        color={iconColor}
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default NavBar;