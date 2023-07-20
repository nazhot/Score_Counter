import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';
import { useGlobalData } from '../data/globalData';
import colorThemes from "../data/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    }, 
    flattenedContainer: {
        height: 100,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center",
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
        flex: 2,
        flexDirection: "column",
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
    }
});

const ScoreCard = ( {name, score, id, goToPlayerScreen, flattened} ) => {

    const scoreData         = useScoreData();
    const scoreDataDispatch = useScoreDataDispatch();
    const globalData        = useGlobalData();
    const colorTheme        = colorThemes[globalData.themeSettings.colorTheme];
    const numColors         = colorTheme.length;
    const color             = colorTheme[id % numColors];
    const cardColor         = "hsl(" + color.hue + ", " + color.saturation + "%, " + color.lightness + "%)";
    const titleColor        = "hsl(" + color.hue + ", " + color.saturation + "%, " + color.lightness * 1.1 + "%)";
    const fontColor         = color.lightness > 50 ? "#000" : "#fff";
    const place             = scoreData.filter( (u) => u.id === id )[0].place.toString();


    function increment(multiplier){
        scoreDataDispatch({
            type: "increment",
            id: id,
            multiplier: multiplier,
            globalData: {
                gameSettings: {higherScoreWins: globalData.gameSettings.higherScoreWins },
            }
        });
    }

    if (flattened){
        return (
            <View style={[styles.flattenedContainer, {backgroundColor: cardColor}]}>
                <Pressable
                    onPress={() => goToPlayerScreen(id, name)}
                    style={{flex: 6, alignItems: "center", textAlignVertical: "center", paddingRight: 15}}
                >
                    <Text style={{flex: 1, textAlignVertical: "center", color: fontColor, fontSize: 20, paddingLeft: 15}}>{name + " " + place}</Text>
                </Pressable>
                <View style={styles.scoreContainer}>
                    <Pressable 
                    onPress={() => increment(-1)}
                    style={styles.increment}>
                        <Text style={{color: fontColor}}>-</Text>
                    </Pressable>
    
                    <Text style={[styles.score, {color: fontColor}]}>{score}</Text>
                    <Pressable 
                    onPress={() => increment(1)}
                    style={styles.increment}>
                        <Text style={{color: fontColor}}>+</Text>
                    </Pressable>
    
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, {backgroundColor: cardColor}]}>
            <View style={[styles.title, {backgroundColor: titleColor}]}>
                <Text style={{flex: 9, color: fontColor, paddingLeft: 15}}>{name + " " + place}</Text>
                <Pressable
                onPress={() => goToPlayerScreen(id, name)}
                style={{flex: 1, alignItems: "flex-end", paddingRight: 15}}>
                    <FontAwesome
                        name="edit"
                        size={30}
                        color={fontColor}
                        
                    />
                </Pressable>
            </View>
            <View style={styles.scoreContainer}>
                <Pressable 
                onPress={() => increment(-1)}
                style={styles.increment}>
                    <Text style={{color: fontColor}}>-</Text>
                </Pressable>

                <Text style={[styles.score, {color: fontColor}]}>{score}</Text>
                <Pressable 
                onPress={() => increment(1)}
                style={styles.increment}>
                    <Text style={{color: fontColor}}>+</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default ScoreCard;