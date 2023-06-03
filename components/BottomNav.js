import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useGlobalData } from '../data/globalData';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    currentGame: {
        flex: 1,
        fontSize: 20,
        color: "#fff",
    },
    newGame: {
        flex: 1,
        fontSize: 10,
        color: "#fff",
        alignItems: "flex-end",
    }
});

const BottomNav = ( {screens, goToNewGameScreen} ) => {

    const globalData = useGlobalData();

    return (
        <View
        style={styles.container}
        >
            <Text style={styles.currentGame}>{globalData.currentGame}</Text>
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