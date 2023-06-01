import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useGlobalData } from '../data/globalData';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#a02",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    currentGame: {
        flex: 3,
        fontSize: 20,
    },
    spacer: {
        flex: 6,
    },
    newGame: {
        flex: 1,
        fontSize: 10,
    }
});

const BottomNav = ( {screens, goToNewGameScreen} ) => {

    const globalData = useGlobalData();

    return (
        <View
        style={styles.container}
        >
            <Text style={styles.currentGame}>{globalData.currentGame}</Text>
            <View style={styles.spacer}/>
            <Pressable
                onPress={goToNewGameScreen}
                style={styles.newGame}
            >
                <FontAwesome
                    name="play"
                    size={30}
                    color="#fff"
                />
            </Pressable>
        </View>
    );
};

export default BottomNav;